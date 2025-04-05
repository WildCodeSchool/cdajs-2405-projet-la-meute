import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";
import validationRules from "@validation/validationRules";

// The Trainer class is a subclass of User; it inherits the properties and methods from User.

@ObjectType()
@Entity()
export class Trainer extends User {
	@BeforeInsert()
	@BeforeUpdate()
	private async validateTrainerFields() {
		this.siret = this.siret.trim();

		if (this.siret && !validationRules.SIRET.pattern.test(this.siret)) {
			throw new Error(validationRules.SIRET.message);
		}
	}

	@Column({
		type: "varchar",
		length: 14,
	})
	@Field()
	siret: string;

	@Column({
		type: "varchar",
		length: 255,
	})
	@Field()
	company_name: string;

	@Column()
	@Field()
	description: string;

	@OneToMany(
		() => Event,
		(event) => event.trainer,
		{ cascade: true },
	)
	@Field(() => [Event], { nullable: true })
	event?: Event[];

	constructor(siret: string, company_name: string) {
		super();
		this.role = "trainer";
		this.siret = siret;
		this.company_name = company_name;
		this.description = "";
	}
}
