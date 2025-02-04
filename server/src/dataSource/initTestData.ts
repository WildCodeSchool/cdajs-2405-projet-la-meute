import { dataSource } from "./dataSource";
import { Owner } from "../entities/Owner";
import { Dog } from "../entities/Dog";
import { Trainer } from "../entities/Trainer";
import { Service } from "../entities/Service";
import { Event } from "../entities/Event";
import { Participation } from "../entities/Participation";
import { Favorite } from "../entities/Favorite";

async function createData() {
	const queryRunner = dataSource.createQueryRunner();

	if (!dataSource.isInitialized) {
		await dataSource.initialize();
		console.info("Database connection established.");
	}

	try {
		await queryRunner.manager.query('DROP TABLE IF EXISTS "favorite" CASCADE');
		await queryRunner.manager.query(
			'DROP TABLE IF EXISTS "participation" CASCADE',
		);
		await queryRunner.manager.query('DROP TABLE IF EXISTS "event" CASCADE');
		await queryRunner.manager.query('DROP TABLE IF EXISTS "service" CASCADE');
		await queryRunner.manager.query('DROP TABLE IF EXISTS "dog" CASCADE');
		await queryRunner.manager.query('DROP TABLE IF EXISTS "trainer" CASCADE');
		await queryRunner.manager.query('DROP TABLE IF EXISTS "owner" CASCADE');
		await queryRunner.manager.query('DROP TABLE IF EXISTS "user" CASCADE');
		await queryRunner.manager.query(
			'DROP TABLE IF EXISTS "password_reset_token" CASCADE',
		);
		// Let TypeORM recreate the tables with proper inheritance
		await dataSource.synchronize();

		//1. Create owners
		const ownerRepository = dataSource.getRepository(Owner);
		const dogRepository = dataSource.getRepository(Dog);

		const owner = new Owner();
		owner.lastname = "Doe";
		owner.firstname = "John";
		owner.email = "john@example.com";
		owner.password_hashed = "pulseform";
		owner.phone_number = "0123456789";
		owner.city = "Paris";
		owner.postal_code = "75000";

		const savedOwner1 = await ownerRepository.save(owner);

		//2. Create trainers

		const trainerRepository = dataSource.getRepository(Trainer);
		const trainer = new Trainer("12345678901234", "educ de Lyon");
		trainer.lastname = "Smith";
		trainer.firstname = "Jane";
		trainer.email = "jane@example.com";
		trainer.password_hashed = "mdpdefou";
		trainer.phone_number = "0987654321";
		trainer.city = "Lyon";
		trainer.postal_code = "69000";

		const savedTrainer = await trainerRepository.save(trainer);

		//3. Create dog

		const dog1 = new Dog(savedOwner1, "Rex", 3, "Caniche de Siberie");
		const savedDog1 = await dogRepository.save(dog1);

		const dog2 = new Dog(savedOwner1, "Luna", 2, "Golden Retriever");
		const savedDog2 = await dogRepository.save(dog2);

		// 4. Create Service
		const serviceRepository = dataSource.getRepository(Service);
		const service = new Service(
			savedTrainer,
			"Dressage Canin",
			"Formation complète pour votre chien",
			"education",
		);
		const savedService = await serviceRepository.save(service);

		// 5. Create Event
		const eventRepository = dataSource.getRepository(Event);
		const event = new Event(
			savedTrainer,
			savedService,
			new Date("2024-12-20"),
			"Parc Canin de Lyon",
			5,
		);
		const savedEvent = await eventRepository.save(event);

		// 6. Create Participation
		const participationRepository = dataSource.getRepository(Participation);
		const participation = new Participation(savedEvent, savedDog1);
		await participationRepository.save(participation);

		// 7. Create Favorite
		const favoriteRepository = dataSource.getRepository(Favorite);
		const favorite = new Favorite(savedTrainer, savedOwner1, new Date());
		await favoriteRepository.save(favorite);

		console.info("Test data created successfully.");
	} catch (error) {
		console.error("Error creating test data:", error);
	} finally {
		await queryRunner.release();
	}
}

export async function initTestData() {
	await createData();
	console.info("Test data created successfully.");
}
