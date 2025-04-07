import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity("search_index")
@ObjectType()
@Index("search_index_entity", ["entity_type", "entity_id"], { unique: true })
export class SearchIndex {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id!: number;

	@Column()
	@Field(() => String)
	entity_type!: string;

	@Column()
	@Field(() => Number)
	entity_id!: number;

	@Column("tsvector")
	@Field(() => String)
	document!: string;
}
