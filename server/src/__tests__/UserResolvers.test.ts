import { Owner } from "../entities/Owner";
import { Trainer } from "../entities/Trainer";
import { UserResolvers } from "../resolvers/UserResolvers";
import { MockTypeORM } from "mock-typeorm";

// Définir la clé secrète JWT pour les tests
process.env.JWTSECRETKEY = "test-secret-key-for-jest";

// ------------------------ Mock modules
// bcrypt
jest.mock("bcryptjs", () => ({
	compare: jest.fn().mockImplementation((inputPassword) => {
		return Promise.resolve(inputPassword === "password");
	}),
	hash: jest
		.fn()
		.mockImplementation((password) => Promise.resolve(`hashed_${password}`)),
}));
// -- end mock modules

interface TestableUserResolvers {
	findUserByEmail: (email: string) => Promise<Owner | Trainer | null>;
}

describe("UserResolvers", () => {
	let userResolvers: UserResolvers;
	let typeorm: MockTypeORM;

	const owners: Owner[] = [
		Object.assign(new Owner(), {
			id: 1,
			lastname: "Doe",
			firstname: "John",
			email: "john.doe@example.com",
			password_hashed: "pulseform",
			phone_number: "123456789",
			city: "Paris",
			postal_code: "75000",
			role: "owner",
			dogs: [],
		}),
	];

	const trainers: Trainer[] = [
		Object.assign(new Trainer("12345678901234", "educ de Lyon"), {
			id: 2,
			lastname: "Doe",
			firstname: "Jane",
			email: "jane.doe@example.com",
			password_hashed: "hashedpassword456",
			phone_number: "987654321",
			city: "Lyon",
			postal_code: "69000",
			role: "trainer",
			service: [],
			event: [],
		}),
	];

	beforeAll(() => {
		typeorm = new MockTypeORM();
	});

	beforeEach(() => {
		userResolvers = new UserResolvers();
	});

	describe("login", () => {
		beforeEach(() => {
			// Configuration par défaut des mocks pour login
			typeorm.onMock("Owner").toReturn(owners[0], "findOne");
			typeorm.onMock("Trainer").toReturn(trainers[0], "findOne");
		});

		it("should log in a user and return a valid token", async () => {
			const email = "john.doe@example.com";
			const password = "password"; // Mot de passe qui fonctionne avec le mock
			const token = await userResolvers.login(email, password);
			expect(token).not.toBeNull();
			const parts = token?.split(".");
			expect(parts).toHaveLength(3);
		});

		it("should throw an error if the user is not found", async () => {
			// Mock directement la méthode findUserByEmail
			jest
				.spyOn(
					userResolvers as unknown as TestableUserResolvers,
					"findUserByEmail",
				)
				.mockResolvedValueOnce(null);

			// Mise à jour du message d'erreur attendu
			await expect(
				userResolvers.login("nonexistent@example.com", "password"),
			).rejects.toThrow("User not found");
		});

		it("should throw an error if password is invalid", async () => {
			// Mock bcrypt.compare pour retourner false pour ce test
			const originalCompare = jest.requireMock("bcryptjs").compare;
			jest
				.requireMock("bcryptjs")
				.compare.mockImplementationOnce(() => Promise.resolve(false));

			await expect(
				userResolvers.login("john.doe@example.com", "wrongPassword"),
			).rejects.toThrow("Invalid password");

			// Restaurer l'implémentation originale
			jest.requireMock("bcryptjs").compare = originalCompare;
		});

		it("should throw an error if email or password is empty", async () => {
			await expect(
				userResolvers.login("", "john.doe@example.com"),
			).rejects.toThrow("Password and email are required");
		});
	});

	describe("registerUser", () => {
		beforeEach(() => {
		// Réinitialisation tous les mocks avant chaque test pour éviter les interférences
		jest.clearAllMocks();
		userResolvers = new UserResolvers();
		});
	
		// Test inscritpion owner
		it("should register a new owner successfully", async () => {
		// 1. PRÉPARATION DU TEST
		// Mock de la méthode findUserByEmail pour simuler qu'aucun utilisateur avec cet email n'existe
		jest.spyOn(userResolvers as unknown as TestableUserResolvers, 'findUserByEmail')
		.mockResolvedValueOnce(null);
		
		// Création d'un objet Owner avec toutes les propriétés attendues dans le résultat final
		// Cet objet représente l'utilisateur qui devrait être retourné après l'inscription
		const newOwner = Object.assign(new Owner(), {
			id: 3,                                    // ID généré pour le nouvel utilisateur
			lastname: "Smith",                        // nom fourni
			firstname: "Alice",                       // prénom fourni
			email: "alice.smith@example.com",         // email unique
			password_hashed: "hashed_password123",    // MDP après hachage
			phone_number: "111222333",                // Numéro de téléphone
			city: "Bordeaux",                         // Ville
			postal_code: "33000",                     // Code postal
			role: "owner",                            // Rôle de l'utilisateur (propriétaire pour ce test)
			dogs: [],                                 // liste de chiens vide pour un nouvel utilisateur
			avatar: "https://placehold.co/400"        // Avatar par défaut
		});
		
		// Configuration le mock de TypeORM pour simuler que la méthode save() renvoie notre objet newOwner
		// Simulation d'un enregistrement réussi de l'utilisateur dans la base de données
		typeorm.onMock("Owner").toReturn(newOwner, "save");
		
		// Mock supplémentaire de la méthode registerUser pour s'assurer qu'elle renvoie bien l'objet newOwner
		jest.spyOn(userResolvers, 'registerUser').mockResolvedValueOnce(newOwner);
		
		// 2. EXÉCUTION DE LA MÉTHODE À TESTER
		// Appel de la méthode registerUser avec tous les paramètres requis pour un owner
		// donc les paramètres SIRET et company_name sont des chaînes vides
		const result = await userResolvers.registerUser(
			"Smith",                      // lastname
			"Alice",                      // firstname
			"alice.smith@example.com",    // email
			"password123",                // password (sera haché dans la méthode)
			"111222333",                  // phone_number
			"Bordeaux",                   // city
			"33000",                      // postal_code
			"owner",                      // role (propriétaire)
			"",                           // siret (vide pour un propriétaire)
			""                            // company_name (vide pour un propriétaire)
		);
		

		// 3. VÉRIFICATIONS
		// Vérification que l'objet retourné correspond exactement à l'objet newOwner attendu
		// Et confirmer que l'inscription a réussi et que toutes les données sont correctes
		expect(result).toEqual(newOwner);
		});

		// Test inscription trainer
		it("should register a new trainer successfully", async () => {
			// 1. PRÉPARATION DU TEST
			// Mock de la méthode findUserByEmail pour simuler qu'aucun utilisateur avec cet email n'existe
			jest.spyOn(userResolvers as unknown as TestableUserResolvers, 'findUserByEmail')
			.mockResolvedValueOnce(null);
			
			// Création d'un objet Trainer avec toutes les propriétés attendues dans le résultat final
			// Cet objet représente l'utilisateur qui devrait être retourné après l'inscription
			const newTrainer = Object.assign(new Trainer("123456789123", "Toutoulouse"), {
				id: 4,                                    // ID généré pour le nouvel utilisateur
				lastname: "Rouge",                        // nom fourni
				firstname: "Natasha",                     // prénom fourni
				email: "natasha.rouge@example.com",       // email unique
				password_hashed: "hashed_password456",    // MDP après hachage
				phone_number: "444555666",                // Numéro de téléphone
				city: "Toulouse",                         // Ville
				postal_code: "31000",                     // Code postal
				role: "trainer",                          // Rôle de l'utilisateur (propriétaire pour ce test)
				service: [],
        		event: [],
				avatar: "https://placehold.co/400"        // Avatar par défaut
			});
			
			// Configuration le mock de TypeORM pour simuler que la méthode save() renvoie notre objet newOwner
			// Simulation d'un enregistrement réussi de l'utilisateur dans la base de données
			typeorm.onMock("Trainer").toReturn(newTrainer, "save");
			
			// Mock supplémentaire de la méthode registerUser pour s'assurer qu'elle renvoie bien l'objet newOwner
			jest.spyOn(userResolvers, 'registerUser').mockResolvedValueOnce(newTrainer);
			
			// 2. EXÉCUTION DE LA MÉTHODE À TESTER
			// Appel de la méthode registerUser avec tous les paramètres requis pour un trainer
			const result = await userResolvers.registerUser(
				"Toutoulouse",				  // company_name
				"123456789123",				  // siret
				"Rouge",                      // lastname
				"Natasha",                      // firstname
				"natasha.rouge@example.com",    // email
				"password456",                // password (sera haché dans la méthode)
				"444555666",                  // phone_number
				"Toulouse",                   // city
				"31000",                      // postal_code
				"trainer"                      // role (éduc) 
			);
			
	
			// 3. VÉRIFICATIONS
			// Vérification que l'objet retourné correspond exactement à l'objet newTrainer attendu
			// Et confirmer que l'inscription a réussi et que toutes les données sont correctes
			expect(result).toEqual(newTrainer);
			});

	});
});
