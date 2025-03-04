import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";
import { dataSource } from "../dataSource/dataSource";
import { Owner } from "../entities/Owner";
import { Trainer } from "../entities/Trainer";
import { PasswordResetToken } from "../entities/PasswordResetToken";
import { EmailService } from "../services/EmailService";
import * as authTypes from "../types/authTypes";
import * as crypto from "node:crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UpdateUserInput } from "../types/inputTypes";
import { MessageAndUserResponse } from "../types/responseType";

@Resolver()
export class UserResolvers {
	private async findUserByEmail(
		/**
		 * This function centralizes the logic to retrieve user by email
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

	// Get user with token
	@Query(() => Trainer || Owner || null)
	async ME(@Arg("token") token: string): Promise<Trainer | Owner | null> {
		if (!token) {
			throw new Error("Token is required");
		}

		const secretKey = process.env.JWTSECRETKEY;
		if (!secretKey) {
			throw new Error("JWT secret key is not defined");
		}

		try {
			const payload = jwt.verify(token, secretKey) as authTypes.UserPayload;

			const user =
				(await dataSource.manager.findOne(Owner, {
					where: { id: payload.userId, role: payload.role },
				})) ||
				(await dataSource.manager.findOne(Trainer, {
					where: { id: payload.userId, role: payload.role },
				}));

			if (!user) {
				throw new Error("User not found");
			}

			return user;
		} catch (err) {
			console.error("Failed to verify token:", err);
			throw new Error("Invalid token");
		}
	}

	// Login
	// User logs in with email and password
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
		const secretKey = process.env.JWTSECRETKEY;
		if (!secretKey) {
			throw new Error("JWT secret key is not defined");
		}

		const user = await this.findUserByEmail(email, {
			select: ["id", "password_hashed", "role"],
		});

		if (!user) {
			throw new Error("User not found");
		}

		// Using bcrypt to compare submitted password with hashed password
		const validPassword = await user.checkPassword(password);
		if (!validPassword) {
			throw new Error("Invalid password");
		}

		// JWT creation
		const token = jwt.sign(
			{
				userId: user.id,
				role: user.role,
			},
			secretKey,
			{ expiresIn: "1h" },
		);

		return token;
	}

	// request password reset
	// User requests a password reset with their email and receives a token for reinitialization.
	@Mutation(() => authTypes.ResetPasswordResponse)
	async RequestPasswordReset(
		@Arg("email") email: string,
	): Promise<authTypes.ResetPasswordResponse> {
		try {
			if (!email) {
				throw new Error("Email are required");
			}

			const user = await this.findUserByEmail(email, {
				select: ["email", "id"],
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
			const token = crypto.randomBytes(32).toString("hex");

			const tokenRepository = dataSource.getRepository(PasswordResetToken);

			const passwordResetToken = new PasswordResetToken();
			passwordResetToken.user_id = user.id;
			passwordResetToken.token = token;
			passwordResetToken.user_role =
				user instanceof Owner ? "owner" : "trainer";
			passwordResetToken.expires_at = new Date(Date.now() + 900000); // 15 minutes

			await tokenRepository.save(passwordResetToken);

			const emailService = new EmailService();
			await emailService.sendPasswordResetEmail(email, token);

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

	// request password reset
	// User have a valid token and reset password.
	@Mutation(() => authTypes.ResetPasswordResponse)
	async PasswordReset(
		@Arg("token") token: string,
		@Arg("newPassword") newPassword: string,
	): Promise<authTypes.ResetPasswordResponse> {
		try {
			const tokenRepository = dataSource.getRepository(PasswordResetToken);
			const resetToken = await tokenRepository.findOne({
				where: {
					token,
					used: false,
					expires_at: MoreThan(new Date()),
				},
			});

			if (!resetToken || token !== resetToken.token) {
				return {
					success: false,
					message: "Ce lien de réinitialisation est invalide ou a expiré",
				};
			}

			if (resetToken.user_role === "owner") {
				const ownerRepository = dataSource.getRepository(Owner);
				const owner = await ownerRepository.findOne({
					where: { id: resetToken.user_id },
				});

				if (!owner) {
					return {
						success: false,
						message: "Utilisateur non trouvé",
					};
				}

				await owner.resetPassword(newPassword);
				await ownerRepository.save(owner);
			} else {
				const trainerRepository = dataSource.getRepository(Trainer);
				const trainer = await trainerRepository.findOne({
					where: { id: resetToken.user_id },
				});

				if (!trainer) {
					return {
						success: false,
						message: "Utilisateur non trouvé",
					};
				}

				await trainer.resetPassword(newPassword);
				await trainerRepository.save(trainer);
			}

			await tokenRepository.update({ id: resetToken.id }, { used: true });

			return {
				success: true,
				message: "Votre mot de passe a été modifié avec succès",
			};
		} catch (error) {
			console.error("Erreur changement mot de passe:", error);
			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Une erreur est survenue lors du changement de mot de passe",
			};
		}
	}

	// Update User
	@Mutation(() => MessageAndUserResponse)
	/**
	 * Updates a user.
	 * @param updatedUser - Partial data to update the user.
	 * @returns The updated user.
	 * @throws {Error} If the user is not found.
	 */
	async UpdateUser(
		@Arg("updatedUser", () => UpdateUserInput) updatedUser: UpdateUserInput,
	): Promise<MessageAndUserResponse> {
		const { id, role, ...fieldsToUpdate } = updatedUser;
		const userRole = role.toLowerCase() === "owner" ? Owner : Trainer;

		// Fetch user from database
		const user = await dataSource.manager.findOne(userRole, { where: { id } });

		if (!user) {
			return {
				message: "User not found",
			};
		}

		let hasChanges = false;

		// Take each key of fieldsToUpdate and update the user if the value is different
		for (const key of Object.keys(
			fieldsToUpdate,
		) as (keyof typeof fieldsToUpdate)[]) {
			if (
				fieldsToUpdate[key] !== undefined &&
				user[key as keyof typeof user] !== fieldsToUpdate[key]
			) {
				hasChanges = true;
				(user[key as keyof typeof user] as string) = fieldsToUpdate[key];
			} else {
			}
		}

		// If there's no change, message = "There was no field to update"
		if (!hasChanges) {
			return {
				message: "There was no field to update",
				user,
			};
		}

		// Save updated user
		await dataSource.manager.save(user);

		return {
			message: "User updated successfully",
			user,
		};
	}
}
