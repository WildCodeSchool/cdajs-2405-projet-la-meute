import { ObjectType, Field } from "type-graphql";
import { Trainer } from "../entities/Trainer";
import { Owner } from "../entities/Owner";
import { Event } from "../entities/Event";

@ObjectType()
export class MessageAndUserResponse {
	@Field()
	message!: string;

	@Field(() => Trainer || Owner)
	user?: Trainer | Owner;
}

@ObjectType()
export class EventResponse {
	@Field()
	message!: string;

	@Field(() => Event)
	event?: Event;
}
