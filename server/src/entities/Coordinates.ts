import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Coordinates {
	@Field(() => Float)
	latitude!: number;

	@Field(() => Float)
	longitude!: number;
}
