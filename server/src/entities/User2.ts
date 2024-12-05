/* import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	user_id?: number;

	@Column({ type: "varchar", length: 255 })
	@Field()
	name: string;

	@Column({ type: "varchar", length: 255 })
	@Field()
	email: string;

	@Column({ select: false })
	@Field({ nullable: true })
	password_hashed: string;

	@Column({ type: "varchar", length: 15 })
	@Field()
	phone_number: string;

	@Column({ type: "varchar", length: 255 })
	@Field()
	city: string;

	@Column({ type: "varchar", length: 5 })
	@Field()
	postal_code: string;

	@Column({
		type: "enum",
		enum: ["OWNER", "TRAINER"],
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
		role = "",
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
 */