import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	TableInheritance,
} from "typeorm";

// The User class is the parent class for the "Owner" and "Trainer" classes; they inherit properties and methods from User.
// If the role is "Owner," TypeORM loads an instance of the Owner class.
// If the role is "Trainer," TypeORM loads an instance of the Trainer class.

@Entity()
@ObjectType()
@TableInheritance({
	column: { type: "enum", name: "role", enum: ["Trainer", "Owner"] },
})
export class User {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	user_id?: number;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	name: string;

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
		type: "int",
		length: 5,
	})
	@Field()
	postal_code: string;

	@Column({
		type: "enum",
		enum: ["Trainer", "Owner"],
		default: "Owner",
	})
	@Field()
	role: string;

	constructor(
		name = "",
		email = "",
		password_hashed = "",
		phone_number = "",
		city = "",
		postal_code = "",
		role = "Owner",
	) {
		this.name = name;
		this.email = email;
		this.password_hashed = password_hashed;
		this.phone_number = phone_number;
		this.city = city;
		this.postal_code = postal_code;
		this.role = role;
	}
}
