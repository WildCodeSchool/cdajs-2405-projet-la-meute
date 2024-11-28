import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Example } from "./Example";

@Entity()
@ObjectType()
export class Category {

    @PrimaryGeneratedColumn()
    @Field((_) => ID)
    id?: number;

    @Column()
    @Field()
    title: string;

    @OneToMany(() => Example, entity => entity.category)
    @Field((_) => [Example])
    examples?: Promise<Example[]>;

    constructor(
        title = ""
    ) {
        this.title = title;
    }
}