import type { Owner } from "../entities/Owner";
import type { Trainer } from "../entities/Trainer";
import { UserResolvers } from "../resolvers/UserResolvers";
import { MockTypeORM } from "mock-typeorm";

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

describe("UserResolvers", () => {
	let userResolvers: UserResolvers;
	let typeorm: MockTypeORM;

	const owners: Owner[] = [
		{
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password_hashed: "hashedpassword123",
			phone_number: "123456789",
			city: "Paris",
			postal_code: "75000",
			role: "owner",
			dogs: [],
		},
	];

	const trainers: Trainer[] = [
		{
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
		},
	];

	beforeAll(() => {
		typeorm = new MockTypeORM();
	});

	beforeEach(() => {
		userResolvers = new UserResolvers();
	});

	describe("login", () => {
		beforeEach(() => {
			typeorm.onMock("Owner").toReturn(owners[0], "findOne");
			typeorm.onMock("Trainer").toReturn(trainers[0], "findOne");
		});

		it("should log in a user and return a valid token", async () => {
			const email = "john.doe@example.com";
			const password = "hashedpassword123";
			const token = await userResolvers.login(email, password);
			expect(token).not.toBeNull();
			const parts = token?.split(".");
			expect(parts).toHaveLength(3);
		});

		it("should throw an error if the user is not found", async () => {
			await expect(
				userResolvers.login("wrongPassword", "john.doe@example.com"),
			).rejects.toThrow("Invalid password");
			await expect(
				userResolvers.login("", "john.doe@example.com"),
			).rejects.toThrow("Password and email are required");
		});
	});
});
