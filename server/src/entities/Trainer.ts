import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import { Event } from "./Event";

// The Trainer class is a subclass of User; it inherits the properties and methods from User.

@ObjectType()
@Entity()
export class Trainer extends User {
	@Column({
		type: "varchar",
		length: 14,
	})
	@Field()
	siret: string;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	company_name: string;

	@Column()
	@Field()
	description: string;

	@OneToMany(
		() => Service,
		(service) => service.trainer,
		{ cascade: true },
	)
	@Field(() => [Service], { nullable: true })
	service?: Service[];

	@OneToMany(
		() => Event,
		(event) => event.trainer,
		{ cascade: true },
	)
	@Field(() => [Event], { nullable: true })
	event?: Event[];

	constructor(siret: string, company_name: string) {
		super();
		this.role = "trainer";
		this.siret = siret;
		this.company_name = company_name;
		this.description = "";
	}
}
