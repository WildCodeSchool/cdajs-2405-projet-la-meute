import { createUnionType } from "type-graphql";
import { Event } from "../entities/Event";
import { Dog } from "../entities/Dog";
import { Trainer } from "../entities/Trainer";
import { Owner } from "../entities/Owner";
import { Favorite } from "../entities/Favorite";
import { Participation } from "../entities/Participation";
import { Service } from "../entities/Service";

export const EntityUnionType = createUnionType({
	name: "EntityUnionType",
	types: () => [Event, Dog, Trainer, Owner, Favorite, Participation, Service],
});
