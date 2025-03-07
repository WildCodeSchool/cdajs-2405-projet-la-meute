import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Coordinates {
	@Field(() => Float)
	latitude?: number;

	@Field(() => Float)
	longitude?: number;

	constructor(latitude: number, longitude: number) {
		this.latitude = latitude;
		this.longitude = longitude;
	}
}
