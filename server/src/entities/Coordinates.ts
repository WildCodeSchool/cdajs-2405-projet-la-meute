import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Coordinates {
	@Field(() => Float)
	latitude?: number;

	@Field(() => Float)
	longitude?: number;

	@Field(() => String, { nullable: true })
	postal_code?: string;

	@Field(() => String, { nullable: true })
	city?: string;

	constructor(
		latitude: number,
		longitude: number,
		postal_code?: string,
		city?: string,
	) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.postal_code = postal_code;
		this.city = city;
	}
}
