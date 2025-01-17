import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	JoinColumn,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Trainer } from "./Trainer";
import { Service } from "./Service";
import { Participation } from "./Participation";
import { Coordinates } from "./Coordinates";

@Entity()
@ObjectType()
export class Event {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	event_id?: number;

	@Column()
	@Field()
	date: Date;

	@Column("simple-json")
	@Field(() => Coordinates)
	location: Coordinates;

	@Column("int")
	@Field()
	groupSizeMax: number;

	@ManyToOne(
		() => Trainer,
		(trainer) => trainer.event,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn([
		{
			name: "trainer_id",
		},
	])
	trainer?: Trainer;

	@ManyToOne(
		() => Service,
		(service) => service.event,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn({ name: "service_id" })
	service: Service;

	@OneToMany(
		() => Participation,
		(participation) => participation.event,
	)
	participation?: Participation[];

	constructor(
		trainer: Trainer,
		service: Service,
		date: Date,
		location: Coordinates,
		groupSizeMax = 0,
	) {
		this.trainer = trainer;
		this.service = service;
		this.date = date;
		this.location = location;
		this.groupSizeMax = groupSizeMax;
	}
}
