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

// La classe Owner est une sous-classe de User, elle hérite des propriétés et méthodes de User.

@Entity()
@ObjectType()
@ChildEntity()
export class Owner extends User {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	owner_id?: number;

	constructor(dog_id: number[]) {
		super();
		this.role = "Owner";
	}
}
