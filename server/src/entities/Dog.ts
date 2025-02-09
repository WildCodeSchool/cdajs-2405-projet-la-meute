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

	@Column("timestamp")
	@Field()
	birthDate: Date;

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

	@Column({
		nullable: true,
	})
	@Field({ nullable: true })
	info?: string;

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

	@Field()
	getAge(): number {
		const diff = new Date().getTime() - new Date(this.birthDate).getTime();
		return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
	}

	constructor(
		owner: Owner,
		name = "",
		birthDate = new Date(),
		breed = "",
		picture = "/upload/images/defaultdog.jpg",
		info = "Informations complémentaires",
	) {
		this.owner = owner;
		this.name = name;
		this.birthDate = birthDate;
		this.breed = breed;
		this.picture = picture;
		this.info = info;
	}
}
