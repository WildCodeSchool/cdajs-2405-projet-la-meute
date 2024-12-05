import { Owner } from "../entities/Owner";
import { Trainer } from "../entities/Trainer";
import { User } from "../entities/User";
import { UserResolvers } from "../resolvers/UserResolvers";
import { MockTypeORM } from "mock-typeorm";

describe("UserResolvers", () => {
	let userResolvers: UserResolvers;
	let typeorm: MockTypeORM;

	const owners: Owner = {
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		password_hashed: "hashedpassword123",
		phone_number: "123456789",
		city: "Paris",
		postal_code: "75000",
		role: "owner",
		dogs: [],
	};

	const trainers: Trainer = {
		id: 2,
		name: "Jane Doe",
		email: "jane.doe@example.com",
		password_hashed: "hashedpassword456",
		phone_number: "987654321",
		city: "Lyon",
		postal_code: "69000",
		role: "trainer",
		siret: "12345678901234",
		service: [],
		event: [],
	};

	beforeAll(() => {
		typeorm = new MockTypeORM();
	});

	beforeEach(() => {
		userResolvers = new UserResolvers();
	});

	describe("login", () => {
		beforeEach(() => {
			typeorm.onMock("User").toReturn(owners, "findOne");
			typeorm.onMock("User").toReturn(trainers, "findOne");
		});

		it("should log in a user", async () => {
			const email = "john.doe@example.com";
			const password = "hashedpassword123";
			const result = await userResolvers.login(email, password);
			expect(result).toEqual(owners);
		});
	});
});
