import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	JoinColumn,
} from "typeorm";
import { Owner } from "./Owner";
import { Participation } from "./Participation";

@Entity()
@ObjectType()
export class Dog {
	@PrimaryGeneratedColumn()
	@Field((_) => ID)
	id?: number;

	@Column({
		type: "varchar",
		length: 80,
	})
	@Field()
	name: string;

	@Column("int")
	@Field()
	age: number;

	@Column({
		type: "varchar",
		length: 30,
	})
	@Field()
	breed: string;

	@Column({
		nullable: true,
		default: "/upload/images/defaultdog.jpg",
	})
	@Field({ nullable: true })
	picture?: string;

	@ManyToOne(
		() => Owner,
		(owner) => owner.dogs,
		{ nullable: false, onDelete: "CASCADE" },
	)
	@JoinColumn([
		{
			name: "owner_id",
			referencedColumnName: "id",
		},
	])
	owner: Owner;

	@OneToMany(
		() => Participation,
		(participation) => participation.dog,
	)
	@Field(() => [Participation], { nullable: true })
	participation?: Participation[];

	constructor(owner: Owner, name = "", age = 0, breed = "", picture = "") {
		this.owner = owner;
		this.name = name;
		this.age = age;
		this.breed = breed;
		this.picture = picture;
	}
}
