import type { Owner } from "../entities/Owner";
import type { Trainer } from "../entities/Trainer";
import type { UpdateUserInput } from "../resolvers/inputTypes";
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
			lastname: "Doe",
			firstname: "John",
			email: "john.doe@example.com",
			password_hashed: "hashedpassword123",
			phone_number: "123456789",
			city: "Paris",
			postal_code: "75000",
			role: "owner",
			avatar: "https://placehold.co/400",
			dogs: [],
		},
	];

	const trainers: Trainer[] = [
		{
			id: 2,
			lastname: "Doe",
			firstname: "Jane",
			email: "jane.doe@example.com",
			password_hashed: "hashedpassword456",
			phone_number: "987654321",
			city: "Lyon",
			postal_code: "69000",
			role: "trainer",
			siret: "12345678901234",
			company_name: "educ de Lyon",
			description: "Lorem ipsum dolor sit amet",
			avatar: "https://placehold.co/400",
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

	/**
	 * FIXME: updateUser test works when login test is commented, not when it's there.
	 * Not sure mocking the save method is very useful
	 */
	describe("updateUser", () => {
		beforeEach(() => {
			const owners: Owner[] = [
				{
					id: 1,
					lastname: "Doe",
					firstname: "John",
					email: "john.doe@example.com",
					password_hashed: "hashedpassword123",
					phone_number: "123456789",
					city: "Paris",
					postal_code: "75000",
					role: "owner",
					avatar: "https://placehold.co/400",
					dogs: [],
				},
			];
			typeorm.onMock("Owner").toReturn(owners[0], "findOne");
			typeorm.onMock("Owner").toReturn(
				jest.fn((user) => user),
				"save",
			);
		});

		it("should update a user", async () => {
			const data = {
				id: 1,
				lastname: "Doe",
				firstname: "JohnChangement",
				email: "john@example.com",
				phone_number: "0123456789",
				city: "Paris",
				postal_code: "75000",
				avatar: "https://placehold.co/400",
				role: "owner",
			};
			const updatedUser = await userResolvers.updateUser(
				data as UpdateUserInput,
			);
			expect(updatedUser).not.toBeNull();
			expect(updatedUser.lastname).toEqual("Doe");
			expect(updatedUser.firstname).toEqual("JohnChangement");
			expect(updatedUser).not.toEqual(owners[0]);
		});
	});
});
