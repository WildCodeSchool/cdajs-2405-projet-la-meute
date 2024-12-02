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

// La classe Trainer est une sous-classe de User, elle hérite des propriétés et méthodes de User.

@Entity()
@ObjectType()
@ChildEntity()
export class Trainer extends User {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	trainer_id?: number;

	constructor() {
		super();
		this.role = "Trainer";
	}
}
