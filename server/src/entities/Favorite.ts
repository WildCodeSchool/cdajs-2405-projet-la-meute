import { Field, ID, ObjectType } from "type-graphql";
import {
	Entity,
	ManyToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
	Column,
} from "typeorm";
import { Trainer } from "./Trainer";
import { Owner } from "./Owner";

@Entity()
@ObjectType()
export class Favorite {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	id?: number;

	@Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
	@Field()
	add_date: Date;

	@ManyToOne(
		() => Trainer,
		(trainer) => trainer.id,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn([
		{
			name: "trainer_id",
		},
	])
	@Field(() => Trainer)
	trainer: Trainer;

	@ManyToOne(
		() => Owner,
		(owner) => owner.id,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn([
		{
			name: "owner_id",
		},
	])
	@Field(() => Owner)
	owner: Owner;

	constructor(trainer_id: Trainer, owner_id: Owner, add_date: Date) {
		this.trainer = trainer_id;
		this.owner = owner_id;
		this.add_date = add_date;
	}
}
