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
import { Event } from "./Event";

@Entity()
@ObjectType()
export class Service {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	service_id?: number;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	title: string;

	@Column({
		type: "text",
	})
	@Field()
	description: string;

	@Column({
		type: "varchar",
		length: 25,
	})
	@Field()
	tag: string;

    @ManyToOne(() => Trainer)
    @JoinColumn({ name: "trainer_id" })
    @Field(() => Trainer)
    trainer?: Trainer;

	@OneToMany(
		() => Event,
		(event) => event.service,
		{ cascade: true },
	)
	event?: Event[];

	constructor(trainer_id: Trainer, title = "", description = "", tag = "") {
		this.trainer = trainer_id;
		this.title = title;
		this.description = description;
		this.tag = tag;
	}
}
