import { Field, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class PasswordResetToken {
	@PrimaryGeneratedColumn()
	@Field()
	id?: number;

	@Column()
	@Field()
	token: string;

	@Column({
		type: "enum",
		enum: ["owner", "trainer"],
	})
	@Field()
	user_role: "trainer" | "owner";

	@CreateDateColumn()
	@Field()
	created_at: Date;

	@Column()
	@Field()
	expires_at: Date;

	@Column({ default: false })
	@Field()
	expired: boolean;

	constructor(
		token: string,
		user_role: "owner" | "trainer",
		created_at: Date,
		expires_at: Date,
		expired = false,
	) {
		this.token = token;
		this.user_role = user_role;
		this.created_at = created_at;
		this.expires_at = expires_at;
		this.expired = expired;
	}
}
