import { Field, ObjectType, ID } from "type-graphql";
import { Column, Entity, OneToMany, ChildEntity, PrimaryColumn } from "typeorm";
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

	constructor(siret: string) {
		super();
		this.role = "trainer";
		this.siret = siret;
	}
}
