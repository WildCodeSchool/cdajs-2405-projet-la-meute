import { Category } from "../entities/Category";
import { CategoryResolver } from "../resolvers/CategoryResolvers";
import { MockTypeORM } from "mock-typeorm";

describe("CategoryResolvers", () => {
    let categoryResolver: CategoryResolver;
    let categories: Category[];
    let typeorm: MockTypeORM;

    beforeAll(() => {
        typeorm = new MockTypeORM();
    })

    beforeEach(() => {
        categoryResolver = new CategoryResolver();
        categories = [
            new Category("Ex"),
            new Category("am"),
            new Category("ple")
        ];
    })

    afterEach(() => {
        typeorm.resetAll();
    });

    afterAll(() => {
        typeorm.restore();
    });

    // ------------------------ UNIT TESTS
    describe("getSomeCategories", () => {

        it("should get all categories when limit is undefined", async () => {   
            typeorm.onMock(Category).toReturn(categories, 'find');

            const fetchedCategories: Category[] = await categoryResolver.getSomeCategories();
            expect(fetchedCategories.length).toBe(categories.length);
            expect(fetchedCategories).toEqual(categories);
        })

        it("should get a number of categories depending on the limit", async () => {
            const limit = 2;
            typeorm.onMock(Category).toReturn(categories.slice(0, limit), 'find');

            const fetchedCategories: Category[] = await categoryResolver.getSomeCategories(limit);
            expect(fetchedCategories.length).toBe(limit);
        })

        it("should return an empty array if there are no categories", async () => {
            typeorm.onMock(Category).toReturn([], 'find');
            categories = [];

            const fetchedCategories: Category[] = await categoryResolver.getSomeCategories();
            expect(fetchedCategories.length).toBe(0);
            expect(fetchedCategories).toEqual(categories);
        })
    })

    describe("getCategoryById", () => {

        it("should return the category with the given id", async () => {
            const id = 2;
            typeorm.onMock(Category).toReturn(categories[id - 1], 'findOneBy');

            const fetchedCategory: Category | null = await categoryResolver.getCategoryById(id);    
            expect(fetchedCategory).toEqual(categories[id - 1]);
            expect(fetchedCategory).not.toBeNull();
        })

        it("should return null if there is no category with the given id", async () => {
            const id = 5; // ID inexistant
            typeorm.onMock(Category).toReturn(null, 'findOneBy');
    
            const fetchedCategory: Category | null = await categoryResolver.getCategoryById(id);
            expect(fetchedCategory).toBeNull();
        })
    })

    describe("createCategory", () => {

        it("should create a new category", async () => {    
            typeorm.onMock(Category).toReturn(categories[0], 'save');

            const createdCategory: Category | null = await categoryResolver.createCategory("Ex");
            expect(createdCategory).toEqual(categories[0]);
            expect(createdCategory).not.toBeNull();
        })
    })
})