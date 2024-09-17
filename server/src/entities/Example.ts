import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Category } from "./Category";

@Entity()
@ObjectType()
export class Example extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(_ => ID)
    id?: number;

    @Column()
    @Field()
    title: string;

    @ManyToOne(() => Category, category => category.examples, { eager: true, onDelete: "SET NULL" })
    @Field(_ => Category, { nullable: true })
    category?: Category;

    constructor(
        title: string = ""
    ) {
        super();

        this.title = title;
    }
}