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
	id?: number;

	@Column()
	@Field()
	date: Date;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	location: string;

	@Column("int")
	@Field()
	group_max_size: number;

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
		location = "",
		group_max_size = 0,
	) {
		this.trainer = trainer;
		this.service = service;
		this.date = date;
		this.location = location;
		this.group_max_size = group_max_size;
	}
}
