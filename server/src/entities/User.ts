import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	TableInheritance,
} from "typeorm";

// La classe User est la classe parente des classes "Owner" et "Trainer", elles héritent des propriétés et méthodes de User.
// Si le role est "Owner", TypeORM charge une instance de la classe Owner.
// Si le role est "Trainer", TypeORM charge une instance de la classe Trainer.

@Entity()
@ObjectType()
@TableInheritance({ column: { type: "varchar", name: "role" } })
export class User {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	user_id?: number;

	@Column({
		length: 255,
	})
	@Field()
	name: string;

	@Column({
		length: 255,
		unique: true,
	})
	@Field()
	email: string;

	@Column({
		length: 255,
	})
	@Field()
	password_hashed: string;

	@Column({
		length: 15,
		nullable: true,
	})
	@Field({ nullable: true })
	phone_number?: string;

	@Column({
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
