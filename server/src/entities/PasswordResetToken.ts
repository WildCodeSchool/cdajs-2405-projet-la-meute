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
	user_id?: number;

	@Column()
	@Field()
	token?: string;

	@Column({
		type: "enum",
		enum: ["owner", "trainer"],
	})
	@Field()
	user_role?: "trainer" | "owner";

	@CreateDateColumn()
	@Field()
	created_at?: Date;

	@Column()
	@Field()
	expires_at?: Date;

	@Column({ default: false })
	@Field()
	used?: boolean;
}
