import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {
	@Field()
	id!: number;

	@Field()
	firstname!: string;

	@Field()
	lastname!: string;

	@Field()
	email!: string;

	@Field({ nullable: true })
	phone_number?: string;

	@Field({ nullable: true })
	city!: string;

	@Field({ nullable: true })
	postal_code!: string;

	@Field({ nullable: true })
	avatar!: string;

	@Field()
	role!: "trainer" | "owner";

	@Field({ nullable: true })
	description?: string;

	@Field({ nullable: true })
	siret?: string;

	@Field({ nullable: true })
	company_name?: string;
}
