import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	OneToMany,
	ChildEntity,
} from "typeorm";
import { User } from "./User";
import { Dog } from "./Dog";

// The Owner class is a subclass of User; it inherits the properties and methods from User.

@ObjectType()
@ChildEntity("owner")
@Entity({ name: "owner" })
export class Owner extends User {

    @OneToMany(() => Dog, dog => dog.owner)
    @Field(() => [Dog], { nullable: true })
    dogs?: Dog[];

	constructor() {
		super();
		this.role = "Owner";
	}
}
