import { User } from "../entities/User";
import { UserResolvers } from "../resolvers/UserResolvers";
import { MockTypeORM } from "mock-typeorm";

describe("UserResolvers", () => {
	let userResolvers: UserResolvers;
	let users: User[];
	let typeorm: MockTypeORM;

	beforeAll(() => {
		typeorm = new MockTypeORM();
	});

	beforeEach(() => {
		userResolvers = new UserResolvers();
		users = [
			new User(
				"User1",
				"user1@yopmail.com",
				"password123",
				"0600000000",
				"Lille",
				"59000",
				"OWNER",
			),
            new User(
                "User2",
                "user2@yopmail.com",
                "password123",
                "0600000000",
                "Bordeaux",
                "33000",
                "TRAINER",
            ),
		];
	});

	describe("login", () => {
		beforeEach(() => {
			typeorm.onMock("User").toReturn(users[0], "findOne");
		});

		it("should log in a user and return a token", async () => {
			const token = await userResolvers.login("User1", "user1@yopmail.com", "password123");
			expect(token).not.toBeNull();
		});

		it("should return a token that is a valid JWT (3 parts)", async () => {
			const token = await userResolvers.login("User1", "user1@yopmail.com", "password123");
			const parts = token?.split(".");
			expect(parts).toHaveLength(3);
		});

		it("should throw an error if the user is not found", async () => {
			await expect(
				userResolvers.login("User1", "user1@yopmail.com", "wrongPassword"),
			).rejects.toThrow("Invalid password");
			await expect(userResolvers.login("", "email", "name")).rejects.toThrow(
				"Password and either email or name are required",
			);
		});
	});
});
