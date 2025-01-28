import { ObjectType, Field } from "type-graphql";
import { Trainer } from "../entities/Trainer";
import { Owner } from "../entities/Owner";

@ObjectType()
export class MessageAndUserResponse {
	@Field()
	message!: string;

	@Field(() => Trainer || Owner)
	user!: Trainer | Owner;
}
