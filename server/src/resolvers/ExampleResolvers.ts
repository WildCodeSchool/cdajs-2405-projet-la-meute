import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Example } from "../entities/Example";
import { Category } from "../entities/Category";

@Resolver(Example)
export class ExampleResolver {

    // Get some Examples
    // If 'take' is undefined, return all examples
    @Query(type => [Example])
    async getSomeExamples(@Arg("limit", { nullable: true }) limit?: number): Promise<Example[]> {
        const examples: Example[] = await Example.find({
            take: limit,
        });
        return examples;
    }

    // Get one Example by ID
    @Query(() => Example, { nullable: true })
    async getExampleById(@Arg("id") id: number): Promise<Example | null> {
        return Example.findOneBy({ id });
    }

    // Create new Example
    @Mutation(() => Example)
    async createExample(
        @Arg("title") title: string,
        @Arg("categoryId", { nullable: true }) categoryId?: number
    ): Promise<Example | null> {
        try {
            const example = new Example();
            example.title = title;
            if (categoryId) {
                const category = await Category.findOne({ where: { id: categoryId } });
                if (category) {
                    example.category = category;
                }
            }
            await example.save();
            return example;
        } catch (error) {
            console.error("Creation failed. ", error);
            return null;
        }
    }

    // Update an Example
    @Mutation(() => Example, { nullable: true })
    async updateExample(
        @Arg("id") id: number,
        @Arg("title", { nullable: true }) title?: string,
        @Arg("categoryId", { nullable: true }) categoryId?: number
    ): Promise<Example | null> {
        try {
            // Find the right Example
            const example = await Example.findOneBy({ id });
            if (!example) {
                console.error(`Unassigned Id ${id}`);
                return null;
            }
            // Update provided fields
            if (title !== undefined) {
                example.title = title;
            }
            if (categoryId !== undefined) {
                // Find the right Category
                const category = await Category.findOneBy({ id: categoryId });
                // Update Example
                if (category) {
                    example.category = category;
                } else {
                    console.error("Unrecognized ID category: ", categoryId)
                    return null;
                }
            }
            // Save and return the updated Example
            await example.save();
            return example;
        } catch (error) {
            console.error("Failed to update id: ", id, error);
            return null;
        }
    }

    // Delete an Example
    @Mutation(() => Boolean) // True if success
    async deleteExample(@Arg("id") id: number): Promise<boolean> {
        try {
            const result = await Example.delete(id);
            return result.affected !== 0; // Returns true if a row has been affected
        } catch (error) {
            console.error("Failed to delete id: ", id, error);
            return false;
        }
    }

    // autres CRUD
}
