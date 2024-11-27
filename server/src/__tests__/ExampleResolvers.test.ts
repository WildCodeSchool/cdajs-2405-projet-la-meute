import { Example } from "../entities/Example";
import { Category } from "../entities/Category";
import { ExampleResolver } from "../resolvers/ExampleResolvers";
import { MockTypeORM } from "mock-typeorm";

describe("ExampleResolvers", () => {
    let exampleResolver: ExampleResolver;
    let examples: Example[];
    let typeorm: MockTypeORM;

    beforeAll(() => {
        typeorm = new MockTypeORM();
    })

    beforeEach(() => {
        exampleResolver = new ExampleResolver();
        examples = [
            new Example("Ex"),
            new Example("am"),
            new Example("ple")
        ];
    })

    afterEach(() => {
        typeorm.resetAll();
    });

    afterAll(() => {
        typeorm.restore();
    });

    // ------------------------ UNIT TESTS
    describe("getSomeExamples", () => {

        it("should get all examples when limit is undefined", async () => {   
            typeorm.onMock(Example).toReturn(examples, 'find');

            const fetchedExamples: Example[] = await exampleResolver.getSomeExamples();
            expect(fetchedExamples.length).toBe(examples.length);
            expect(fetchedExamples).toEqual(examples);
        })

        it("should get a number of examples depending on the limit", async () => {
            const limit = 2;
            typeorm.onMock(Example).toReturn(examples.slice(0, limit), 'find');

            const fetchedExamples: Example[] = await exampleResolver.getSomeExamples(limit);
            expect(fetchedExamples.length).toBe(limit);
        })

        it("should return an empty array if there are no examples", async () => {
            typeorm.onMock(Example).toReturn([], 'find');
            examples = [];

            const fetchedExamples: Example[] = await exampleResolver.getSomeExamples();
            expect(fetchedExamples.length).toBe(0);
            expect(fetchedExamples).toEqual(examples);
        })
    })

    describe("getExampleById", () => {

        it("should return the example with the given id", async () => {
            const id = 2;
            typeorm.onMock(Example).toReturn(examples[id - 1], 'findOneBy');

            const fetchedExample: Example | null = await exampleResolver.getExampleById(id);    
            expect(fetchedExample).toEqual(examples[id - 1]);
            expect(fetchedExample).not.toBeNull();
        })

        it("should return null if there is no example with the given id", async () => {
            const id = 5; // ID inexistant
            typeorm.onMock(Example).toReturn(null, 'findOneBy');
    
            const fetchedExample: Example | null = await exampleResolver.getExampleById(id);
            expect(fetchedExample).toBeNull();
        })
    })
})