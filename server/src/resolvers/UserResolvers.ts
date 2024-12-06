import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Owner } from "../entities/Owner";
import { Trainer } from "../entities/Trainer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

@Resolver()
export class UserResolvers {
	// Get all owners
	@Query(() => [Owner])
	async getAllOwners(): Promise<Owner[]> {
		const owners: Owner[] = await dataSource.manager.find(Owner);
		return owners;
	}

	// Get all trainers
	@Query(() => [Trainer])
	async getAllTrainers(): Promise<Trainer[]> {
		const trainers: Trainer[] = await dataSource.manager.find(Trainer);
		return trainers;
	}

	// Get one user by email
	@Query(() => Trainer || Owner || null)
	async getUserByEmail(
		@Arg("email") email: string,
	): Promise<Trainer | Owner | null> {
		const user: Trainer | Owner | null =
			(await dataSource.manager.findOneBy(Owner, { email })) ||
			(await dataSource.manager.findOneBy(Trainer, { email }));
		return user;
	}

	// Login
	// User logs in with name/email and password
	@Mutation(() => String, { nullable: true })
	/**
	 * Authenticates a user by verifying the password and returns a JWT token if successful.
	 * @returns A JWT token if authentication is successful with userId stored, null otherwise.
	 * @throws An error if email or password are not provided, or if authentication fails.
	 */
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
	): Promise<string | null> {
		if (!password || !email) {
			throw new Error("Password and email are required");
		}

		const user: Trainer | Owner | null =
			(await dataSource.manager.findOne(Owner, {
				where: { email },
				select: ["id", "password_hashed"],
			})) ||
			(await dataSource.manager.findOne(Trainer, {
				where: { email },
				select: ["id", "password_hashed"],
			}));

		if (!user) {
			throw new Error("User not found");
		}

		// Using bcrypt to compare submitted password with hashed password
		//const validPassword = await bcrypt.compare(password, user.password_hashed);
		const validPassword = password === user.password_hashed;
		if (!validPassword) {
			throw new Error("Invalid password");
		}

		// JWT creation
		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWTSECRETKEY || "default secret",
			{ expiresIn: "1h" },
		);

		return token;
	}
}
