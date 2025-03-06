import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	JoinColumn,
	PrimaryGeneratedColumn,
	ManyToMany,
} from "typeorm";
import { Trainer } from "./Trainer";
import { Event } from "./Event";

@Entity()
@ObjectType()
export class Service {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	id?: number;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	title: string;

	@Column({
		type: "varchar",
		length: 5,
	})
	@Field()
	smiley: string;

	@Column({
		type: "varchar",
		length: 20,
	})
	@Field()
	color: string;

	@ManyToMany(
		() => Event,
		(event) => event.services,
	)
	events?: Event[];

	constructor(title = "", smiley = "🐶", color = "#fff") {
		this.title = title;
		this.smiley = smiley;
		this.color = color;
	}
}
