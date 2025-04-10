import { Field, ID, ObjectType } from "type-graphql";
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";
import { Dog } from "./Dog";

@Entity()
@ObjectType()
export class Participation {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	id?: number;

	@ManyToOne(
		() => Event,
		(event) => event.participation,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn({ name: "event_id" })
	@Field(() => Event)
	event?: Event;

	@ManyToOne(
		() => Dog,
		(dog) => dog.participation,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn({ name: "dog_id" })
	@Field(() => Dog)
	dog?: Dog;

	constructor(event_id: Event, dog_id: Dog) {
		this.event = event_id;
		this.dog = dog_id;
	}
}
