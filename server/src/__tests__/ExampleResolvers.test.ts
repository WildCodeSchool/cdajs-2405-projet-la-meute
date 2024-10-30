import { Example } from "../entities/Example";
import { ExampleResolver } from "../resolvers/ExampleResolvers";
import { MockTypeORM } from "mock-typeorm";

describe("ExampleResolvers", () => {

    let exampleResolver: ExampleResolver;
    let examples: Example[];
    let typeorm: MockTypeORM;

    beforeEach(() => {
        exampleResolver = new ExampleResolver();
        examples = [
            new Example("Ex"),
            new Example("am"),
            new Example("ple")
        ];
        typeorm = new MockTypeORM();
        typeorm.onMock(Example).toReturn(examples, 'find');
    }) 

    afterEach(() => {
        typeorm.restore();
    })

    describe("getSomeExamples", () => {

        it("should get a number of examples depending on the limit", async () => {   
            const limit = undefined;
            const fetchedExamples: Example[] = await exampleResolver.getSomeExamples(limit);
            expect(fetchedExamples.length).toBe(examples.length);
        })

        it("returns examples from TypeORM", async () => {
            const retrievedExamples: Example[] = await exampleResolver.getAllExamples();
            
            expect(retrievedExamples.length).toBe(examples.length);
        });


/*         it("should return an empty array if there are no examples", async () => {

            const typeorm = new MockTypeORM();
            typeorm.onMock(Example).toReturn([], 'find');

            const fetchedExamples: Example[] = await exampleResolver.getSomeExamples();
            expect(fetchedExamples.length).toBe(0);
        })

        it("should return all examples", async () => {
            const typeorm = new MockTypeORM();
            typeorm.onMock(Example).toReturn(examples, 'find');

            const fetchedExamples: Example[] = await exampleResolver.getSomeExamples();
            expect(fetchedExamples.length).toBe(3);
        }) */
    })
});