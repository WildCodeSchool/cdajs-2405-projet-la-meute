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
		await queryRunner.manager.query(
			'DROP TABLE IF EXISTS "event_services" CASCADE',
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

		const owner2 = new Owner();
		owner2.lastname = "Chantal";
		owner2.firstname = "Marie";
		owner2.email = "marie-chantal@example.com";
		owner2.password_hashed = "linux4ever";
		owner2.phone_number = "0612456789";
		owner2.city = "Lille";
		owner2.postal_code = "59000";

		const savedOwner2 = await ownerRepository.save(owner2);

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
		trainer.description = "Je suis un très bon éducateur et je sens bon.";

		const savedTrainer = await trainerRepository.save(trainer);

		//3. Create dog
		const dog1 = new Dog(
			savedOwner1,
			"Rex",
			new Date("2020-01-01"),
			"Caniche de Siberie",
		);
		const savedDog1 = await dogRepository.save(dog1);

		const dog2 = new Dog(
			savedOwner1,
			"Luna",
			new Date("2023-04-15"),
			"Golden Retriever",
		);
		const savedDog2 = await dogRepository.save(dog2);

		// 4. Create Service
		const serviceRepository = dataSource.getRepository(Service);
		const service = new Service("Manger des chips", "🥔", "#B38600");
		const savedService = await serviceRepository.save(service);

		// 5. Create Event
		const eventRepository = dataSource.getRepository(Event);
		const event = new Event(
			savedTrainer,
			[savedService],
			"Formation Super spéciale du jour",
			"Formation complète pour que votre chien apprenne à raporter la baballe ! (⚽ baballe non fournie)",
			{
				latitude: 45.7771392,
				longitude: 4.8560401,
			},
			new Date("2025-03-05T09:00:00"),
			new Date("2025-03-05T09:45:00"),
			5,
			40,
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
