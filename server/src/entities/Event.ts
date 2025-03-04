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
	id?: number;

	@Column()
	@Field()
	date: Date;

	@Column()
	@Field()
	title: string;

	@Column()
	@Field()
	description: string;

	@Column("simple-json")
	@Field(() => Coordinates)
	location: Coordinates;

	@Column("int")
	@Field()
	group_max_size: number;

	@Column("decimal", { precision: 6, scale: 2 })
	@Field()
	price: number;

	// Ajouter une @Column duration pour la durée, voir si on l'ajoute en minutes, en heure...
	// L'ajouter ici

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
		title: string,
		description: string,
		location: Coordinates,
		group_max_size = 0,
		price = 0,
	) {
		this.trainer = trainer;
		this.service = service;
		this.date = date;
		this.title = title;
		this.description = description;
		this.location = location;
		this.group_max_size = group_max_size;
		this.price = price;
	}
}
