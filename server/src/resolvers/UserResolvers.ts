import {
	Arg,
	Mutation,
	Query,
	Resolver,
	Field,
	ObjectType,
} from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Owner } from "../entities/Owner";
import { Trainer } from "../entities/Trainer";
import { PasswordResetToken } from "../entities/PasswordResetToken";
import bcrypt from "bcryptjs";
import * as crypto from "node:crypto";
import jwt from "jsonwebtoken";

@ObjectType()
class ResetPasswordResponse {
	@Field()
	success?: boolean;

	@Field(() => String, { nullable: true })
	message?: string;
}

@Resolver()
export class UserResolvers {
	private async findUserByEmail(
		/**
		 * This function centralizes the logic to retrirve user by email
		 * @param email - The email of the user to search for.
		 * @param options - Additional options (select fields or relations) to customize the query.
		 */
		email: string,
		options: object = {},
	): Promise<Trainer | Owner | null> {
		return (
			(await dataSource.manager.findOne(Owner, {
				where: { email },
				...options,
			})) ||
			(await dataSource.manager.findOne(Trainer, {
				where: { email },
				...options,
			}))
		);
	}

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
		return this.findUserByEmail(email);
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

		const user = await this.findUserByEmail(email, {
			select: ["id", "password_hashed"],
		});

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

	// request password reset
	// User requests a password reset with their email and receives a token for reinitialization.
	@Mutation(() => ResetPasswordResponse)
	/**
	 * @returns An email with token if we found an user with corresponding email
	 */
	async requestPasswordReset(
		@Arg("email") email: string,
	): Promise<ResetPasswordResponse> {
		try {
			if (!email) {
				throw new Error("Email are required");
			}

			const user = await this.findUserByEmail(email, {
				select: ["email"],
			});

			// for security we always send a good response
			if (!user) {
				return {
					success: true,
					message:
						"Si votre email existe, vous recevrez un lien de réinitialisation.",
				};
			}

			// Generate and save token
			const resetToken = crypto.randomBytes(32).toString("hex");
			const tokenHash = await bcrypt.hash(resetToken, 10);

			const tokenRepository = dataSource.getRepository(PasswordResetToken);
			const passwordResetToken = new PasswordResetToken();
			passwordResetToken.id = user.id;
			passwordResetToken.token = tokenHash;
			passwordResetToken.user_role =
				user instanceof Owner ? "owner" : "trainer";
			passwordResetToken.expires_at = new Date(Date.now() + 900000); // 15 minutes
			await tokenRepository.save(passwordResetToken);

			return {
				success: true,
				message:
					"Si votre email existe, vous recevrez un lien de réinitialisation.",
			};
		} catch (error) {
			console.error("Erreur réinitialisation mot de passe:", error);
			return {
				success: false,
				message: "Une erreur est survenue",
			};
		}
	}
}
