import { createUnionType } from "type-graphql";
import { Event } from "../entities/Event";
import { Dog } from "../entities/Dog";

export const EntityUnionType = createUnionType({
	name: "EntityUnionType",
	types: () => [Event, Dog],
});
