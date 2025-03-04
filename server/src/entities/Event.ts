import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	ManyToOne,
	ManyToMany,
	OneToMany,
	JoinColumn,
	JoinTable,
	PrimaryGeneratedColumn,
	BeforeInsert,
	BeforeUpdate,
} from "typeorm";
import { Trainer } from "./Trainer";
import { Service } from "./Service";
import { Participation } from "./Participation";
import { Coordinates } from "./Coordinates";

@Entity()
@ObjectType()
export class Event {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id?: number;

	@Column()
	@Field()
	title: string;

	@Column()
	@Field()
	description: string;

	@Column("simple-json")
	@Field(() => Coordinates)
	location: Coordinates;

	@Column()
	@Field()
	startDate: Date;

	@Column()
	@Field()
	endDate: Date;

	@Column("int")
	@Field()
	group_max_size: number;

	@Column("decimal", { precision: 6, scale: 2 })
	@Field()
	price: number;

	@ManyToOne(
		() => Trainer,
		(trainer) => trainer.event,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn([{ name: "trainer_id" }])
	trainer?: Trainer;

	@ManyToMany(
		() => Service,
		(service) => service.events,
		{ cascade: true },
	)
	@JoinTable({
		name: "event_services",
		joinColumn: { name: "event_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "service_id", referencedColumnName: "id" },
	})
	@Field(() => [Service], { nullable: true })
	services?: Service[];

	@OneToMany(
		() => Participation,
		(participation) => participation.event,
	)
	participation?: Participation[];

	constructor(
		trainer: Trainer,
		services: Service[],
		title: string,
		description: string,
		location: Coordinates,
		startDate: Date,
		endDate: Date,
		group_max_size = 0,
		price = 0,
	) {
		this.trainer = trainer;
		this.services = services;
		this.title = title;
		this.description = description;
		this.location = location;
		this.startDate = startDate;
		this.endDate = endDate;
		this.group_max_size = group_max_size;
		this.price = price;
	}

	@BeforeInsert()
	@BeforeUpdate()
	validateServicesCount() {
		if (this.services && this.services.length > 3) {
			throw new Error("Un événement ne peut pas avoir plus de 3 services.");
		}
	}
}
