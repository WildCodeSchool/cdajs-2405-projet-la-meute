import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { Example } from "../entities/Example";

@Resolver(Category)
export class CategoryResolver {

    // Get Some Categories
    // If 'take' is undefined, return all categories
    @Query(type => [Category])
    async getSomeCategories(@Arg("limit", ({ nullable: true })) limit?: number): Promise<Category[]> {
        const category: Category[] = await Category.find({
            take: limit,
        });
        return category;
    }

    // Get one Category by ID
    @Query(() => Category, { nullable: true })
    async getCategoryById(@Arg("id") id: number): Promise<Category | null> {
        return Category.findOneBy({ id });
    }

    // Create new Category
    @Mutation(() => Category)
    async createCategory(
        @Arg("title") title: string
    ): Promise<Category | null> {
        try {
            const category = new Category();
            category.title = title;
            await category.save();
            return category;
        } catch (error) {
            console.error("Creation failed. ", error);
            return null;
        }
    }

    // Update an Category
    @Mutation(() => Category, { nullable: true })
    async updateCategory(
        @Arg("id") id: number,
        @Arg("title", { nullable: true }) title?: string
    ): Promise<Category | null> {
        try {
            // Find the right Category
            const category = await Category.findOneBy({ id });
            if (!category) {
                console.error(`Unassigned Id ${id}`);
                return null;
            }
            // Update provided fields
            if (title !== undefined) {
                category.title = title;
            }
            // Save and return the updated Category
            await category.save();
            return category;
        } catch (error) {
            console.error("Failed to update id: ", id, error);
            return null;
        }
    }

    // Delete a Category
    // A Category is deleted from the database and removed from all its Examples
    @Mutation(() => Boolean) // True if success
    async deleteCategory(@Arg("id") id: number): Promise<boolean> {
        try {
            // Find all Examples for this Category
            const examples = await Example.find({ where: { category: { id } } });
            console.log('👉👉 examples', examples);
            
            // Delete Category from the Examples
            await Promise.all(examples.map(async (example) => {
                example.category = undefined;
                console.log('👉👉 example', example);
                await example.save();
            }));
            // When empty, delete the Category from the database
            const result = await Category.delete(id);
            console.log('👉👉 result', result);
            
            return result.affected !== 0; // Returns true if a row has been affected
        } catch (error) {
            console.error("Failed to delete id: ", id, error);
            return false;
        }
    }

    // autres CRUD
}
