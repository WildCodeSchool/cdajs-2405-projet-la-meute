import { Field, ObjectType } from "type-graphql";

// Reset Password
@ObjectType()
export class ResetPasswordResponse {
	@Field()
	success?: boolean;

	@Field(() => String, { nullable: true })
	message?: string;
}

// User Context
@ObjectType()
export class UserPayload {
	@Field()
	id?: number;

	@Field(() => String, { nullable: true })
	role?: "Trainer" | "Owner";
}
