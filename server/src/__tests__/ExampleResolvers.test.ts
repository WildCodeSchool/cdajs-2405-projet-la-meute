import { Example } from "../entities/Example";
import { ExampleResolver } from "../resolvers/ExampleResolvers";
import { MockTypeORM } from "mock-typeorm";

describe("ExampleResolvers", () => {

    let exampleResolver: ExampleResolver;
    let examples: Example[];

    beforeEach(() => {
        exampleResolver = new ExampleResolver();
        examples = [
            new Example("Ex"),
            new Example("am"),
            new Example("ple")
        ];
    }) 

    describe("getSomeExamples", () => {

        it("should get a number of examples depending on the limit", async () => {   
            
            const typeorm = new MockTypeORM();
            typeorm.onMock(Example).toReturn(examples, 'find');

            const fetchedExamples: Example[] = await exampleResolver.getSomeExamples(1);
            expect(fetchedExamples.length).toBe(1);
        })

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
})