import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	BeforeInsert,
	BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";
import validationRules from "@validation/validationRules";

// The User class is the parent class for the "Owner" and "Trainer" classes; they inherit properties and methods from User.
// If the role is "Owner," TypeORM loads an instance of the Owner class.
// If the role is "Trainer," TypeORM loads an instance of the Trainer class.
@Entity()
@ObjectType()
export abstract class User {
	private static readonly PASSWORD_REGEX = validationRules.PASSWORD.pattern;
	private static readonly EMAIL_REGEX = validationRules.EMAIL.pattern;

	private async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	@BeforeInsert()
	@BeforeUpdate()
	private async validateFields() {
		const keys = Object.keys(this) as Array<keyof User>;

		for (const key of keys) {
			if (typeof this[key] === "string" && key !== "password_hashed") {
				(this[key] as string) = (this[key] as string).trim();
			}
		}

		if (this.password_hashed && !this.isPasswordAlreadyHashed()) {
			if (!User.PASSWORD_REGEX.test(this.password_hashed)) {
				throw new Error(validationRules.PASSWORD.message);
			}
			this.password_hashed = await this.hashPassword(this.password_hashed);
		}

		if (this.email && !User.EMAIL_REGEX.test(this.email)) {
			throw new Error(validationRules.EMAIL.message);
		}

		if (
			this.phone_number &&
			!validationRules.PHONE.pattern.test(this.phone_number)
		) {
			throw new Error(validationRules.PHONE.message);
		}

		if (
			this.postal_code &&
			!validationRules.POSTAL_CODE.pattern.test(this.postal_code)
		) {
			throw new Error(validationRules.POSTAL_CODE.message);
		}
	}

	private isPasswordAlreadyHashed(): boolean {
		return this.password_hashed.startsWith("$2b$");
	}

	private async verifyPassword(plainPassword: string): Promise<boolean> {
		return bcrypt.compare(plainPassword, this.password_hashed);
	}

	public async checkPassword(password: string): Promise<boolean> {
		return this.verifyPassword(password);
	}

	public async resetPassword(newPassword: string): Promise<void> {
		if (!User.PASSWORD_REGEX.test(newPassword)) {
			throw new Error(validationRules.PASSWORD.message);
		}
		// BeforeInsert hash the password
		this.password_hashed = newPassword;
	}

	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id?: number;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	lastname: string;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	firstname: string;

	@Column({
		type: "varchar",
		length: 255,
		unique: true,
	})
	@Field()
	email: string;

	@Column({
		type: "varchar",
		length: 255,
		select: false,
	})
	@Field()
	password_hashed: string;

	@Column({
		type: "varchar",
		length: 15,
		nullable: true,
	})
	@Field({ nullable: true })
	phone_number?: string;

	@Column({
		type: "varchar",
		length: 50,
	})
	@Field()
	city: string;

	@Column({
		length: 5,
	})
	@Field()
	postal_code: string;

	@Column({
		type: "varchar",
		length: 255,
		default: "/upload/images/defaultuserprofile.jpg",
	})
	@Field()
	avatar: string;

	@Column({
		type: "varchar",
		length: 10,
	})
	@Field()
	role: string;

	constructor(
		lastname = "",
		firstname = "",
		email = "",
		password_hashed = "",
		phone_number = "",
		city = "",
		postal_code = "",
		role = "",
		avatar = "/upload/images/defaultuserprofile.jpg",
	) {
		this.lastname = lastname;
		this.firstname = firstname;
		this.email = email;
		this.password_hashed = password_hashed;
		this.phone_number = phone_number;
		this.city = city;
		this.postal_code = postal_code;
		this.role = role;
		this.avatar = avatar;
	}
}
