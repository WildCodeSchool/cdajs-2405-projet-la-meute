import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// The User class is the parent class for the "Owner" and "Trainer" classes; they inherit properties and methods from User.
// If the role is "Owner," TypeORM loads an instance of the Owner class.
// If the role is "Trainer," TypeORM loads an instance of the Trainer class.

@Entity()
@ObjectType()
export abstract class User {
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
	) {
		this.lastname = lastname;
		this.firstname = firstname;
		this.email = email;
		this.password_hashed = password_hashed;
		this.phone_number = phone_number;
		this.city = city;
		this.postal_code = postal_code;
		this.role = role;
	}
}
