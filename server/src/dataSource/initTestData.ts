import { dataSource } from "./dataSource";
import { faker } from "@faker-js/faker";
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

		const generateFrenchPhone = () => {
			const phoneNumber = `06${faker.number.int({ min: 10000000, max: 99999999 })}`;
			return phoneNumber;
		};

		//1. Create owners
		const ownerRepository = dataSource.getRepository(Owner);
		const dogRepository = dataSource.getRepository(Dog);

		//Fix owners
		const owners: Owner[] = [];
		const john = ownerRepository.create({
			lastname: "Doe",
			firstname: "John",
			email: "john@example.com",
			password_hashed: "C@niche22",
			phone_number: generateFrenchPhone(),
			city: "Paris",
			postal_code: "75000",
		});
		const marie = ownerRepository.create({
			lastname: "Chantal",
			firstname: "Marie",
			email: "marie-chantal@example.com",
			password_hashed: "C@niche22",
			phone_number: generateFrenchPhone(),
			city: "Lille",
			postal_code: "59000",
		});

		const fixOwners = await ownerRepository.save([john, marie]);

		// === Random owners ===
		for (let i = 0; i < 50; i++) {
			owners.push(
				ownerRepository.create({
					firstname: faker.person.firstName(),
					lastname: faker.person.lastName(),
					email: faker.internet.email(),
					password_hashed: "C@niche22",
					phone_number: generateFrenchPhone(),
					city: faker.location.city(),
					postal_code: faker.location.zipCode("#####"),
				}),
			);
		}
		const savedOwners = await ownerRepository.save(owners);
		const allOwners = [...fixOwners, ...savedOwners];

		//2. Create trainers
		const trainerRepository = dataSource.getRepository(Trainer);

		//Fix Trainer
		const trainers: Trainer[] = [];
		const jane = trainerRepository.create({
			firstname: "Jane",
			lastname: "Smith",
			email: "jane@example.com",
			password_hashed: "C@niche22",
			phone_number: generateFrenchPhone(),
			city: "Lyon",
			postal_code: "69000",
			description: "Je suis un très bon éducateur et je sens bon.",
			siret: faker.string.numeric(14),
			company_name: faker.company.name(),
		});
		trainers.push(jane);

		// === Random trainers ===
		for (let i = 0; i < 10; i++) {
			trainers.push(
				trainerRepository.create({
					firstname: faker.person.firstName(),
					lastname: faker.person.lastName(),
					email: faker.internet.email(),
					password_hashed: "C@niche22",
					phone_number: generateFrenchPhone(),
					city: faker.location.city(),
					postal_code: faker.location.zipCode("#####"),
					description: faker.lorem.sentences(2),
					siret: faker.string.numeric(14),
					company_name: faker.company.name(),
				}),
			);
		}
		const savedTrainers = await trainerRepository.save(trainers);

		//3. Create dog
		const dogs: Dog[] = [];
		for (let i = 0; i < 100; i++) {
			dogs.push(
				dogRepository.create({
					name: faker.animal.petName(),
					birthDate: faker.date.past({ years: 10 }),
					breed: faker.animal.dog(),
					owner: faker.helpers.arrayElement(allOwners),
				}),
			);
		}
		const savedDogs = await dogRepository.save(dogs);

		// 4. Create Service
		const serviceRepository = dataSource.getRepository(Service);
		const colorOptions = [
			"#1D7AFC",
			"#2898BD",
			"#1F845A",
			"#5B7F24",
			"#B38600",
			"#A84900",
			"#C9372C",
			"#AE4787",
			"#352C63",
		];

		const smileyOptions = [
			"🏋️‍♀️",
			"🧘‍♂️",
			"🏃‍♂️",
			"🚴‍♀️",
			"🏊‍♀️",
			"🤸‍♂️",
			"🎾",
			"🏀",
			"⚽",
			"🏌️‍♀️",
		];

		const services: Service[] = [];
		for (let i = 0; i < 10; i++) {
			services.push(
				serviceRepository.create({
					title: faker.commerce.productName(),
					smiley: faker.helpers.arrayElement(smileyOptions),
					color: faker.helpers.arrayElement(colorOptions),
				}),
			);
		}

		const savedServices = await serviceRepository.save(services);

		// 5. Create Event
		const eventRepository = dataSource.getRepository(Event);
		const events: Event[] = [];
		for (let i = 0; i < 30; i++) {
			const start = faker.date.soon({ days: 15 });
			const end = new Date(start.getTime() + 1000 * 60 * 60);

			events.push(
				eventRepository.create({
					title: faker.lorem.sentence(),
					description: faker.lorem.paragraph(),
					location: {
						longitude: faker.location.latitude(),
						latitude: faker.location.longitude(),
					},
					startDate: start,
					endDate: end,
					group_max_size: faker.number.int({ min: 5, max: 20 }),
					price: Number.parseFloat(faker.commerce.price({ max: 80 })),
					trainer: faker.helpers.arrayElement(savedTrainers),
					services: faker.helpers.arrayElements(savedServices, {
						min: 1,
						max: 3,
					}),
				}),
			);
		}

		const savedEvents = await eventRepository.save(events);

		// 6. Create Participation
		const participationRepository = dataSource.getRepository(Participation);
		const participations: Participation[] = [];
		for (let i = 0; i < 30; i++) {
			participations.push(
				participationRepository.create({
					dog: faker.helpers.arrayElement(savedDogs),
					event: faker.helpers.arrayElement(savedEvents),
				}),
			);
		}
		await participationRepository.save(participations);

		// 7. Create Favorite
		const favoriteRepository = dataSource.getRepository(Favorite);
		const favorites: Favorite[] = [];
		for (let i = 0; i < 15; i++) {
			favorites.push(
				favoriteRepository.create({
					owner: faker.helpers.arrayElement(allOwners),
					trainer: faker.helpers.arrayElement(savedTrainers),
					add_date: faker.date.recent(),
				}),
			);
		}
		await favoriteRepository.save(favorites);

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

initTestData();
