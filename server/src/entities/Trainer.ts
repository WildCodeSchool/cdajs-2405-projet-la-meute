import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	ChildEntity,
} from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import { Event } from "./Event";

// The Trainer class is a subclass of User; it inherits the properties and methods from User.

@Entity()
@ObjectType()
@ChildEntity()
export class Trainer extends User {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	trainer_id?: number;

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
		this.role = "Trainer";
		this.siret = siret;
	}
}
