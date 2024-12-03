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
import { Dog } from "./Dog";

// The Ownerr class is a subclass of User; it inherits the properties and methods from User.

@Entity()
@ObjectType()
@ChildEntity()
export class Owner extends User {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	owner_id?: number;

	@OneToMany(
		() => Dog,
		(dog) => dog.owner,
		{ cascade: true },
	)
	@Field(() => [Dog], { nullable: true })
	dog_id?: Dog[];

	constructor() {
		super();
		this.role = "Owner";
	}
}
