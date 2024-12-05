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

@Entity()
@ObjectType()
export class Event {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	event_id?: number;

	@Column()
	@Field()
	date: Date;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	localization: string;

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
		localisation = "",
		groupSizeMax = 0,
	) {
		this.trainer = trainer;
		this.service = service;
		this.date = date;
		this.localization = localisation;
		this.groupSizeMax = groupSizeMax;
	}
}
