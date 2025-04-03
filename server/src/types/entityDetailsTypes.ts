import { ObjectType, Field } from "type-graphql";
import { EntityUnionType } from "./entityUnionTypes";

@ObjectType()
export class EntityDetails {
	@Field()
	type!: string;

	@Field(() => EntityUnionType)
	data!: typeof EntityUnionType;
}
