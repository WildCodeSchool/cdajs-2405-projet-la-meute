import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Coordinates {
	@Field(() => Float)
	latitude: number | undefined;

	@Field(() => Float)
	longitude: number | undefined;
}
