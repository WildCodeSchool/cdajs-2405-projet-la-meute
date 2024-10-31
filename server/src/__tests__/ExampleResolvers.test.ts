import { Example } from "../entities/Example";
import { Category } from "../entities/Category";
import { ExampleResolver } from "../resolvers/ExampleResolvers";
import { MockTypeORM } from "mock-typeorm";

describe("ExampleResolvers", () => {
    let exampleResolver: ExampleResolver;
    let examples: Example[];
    let typeorm: MockTypeORM;
    let categories: Category[];

    beforeEach(() => {
        exampleResolver = new ExampleResolver();
        examples = [
            new Example("Ex"),
            new Example("am"),
            new Example("ple")
        ];
        categories = [
            new Category("Cate"),
            new Category("gory")
        ]
        typeorm = new MockTypeORM();
        
        typeorm.onMock(Example).toReturn(examples, 'find');
        typeorm.onMock(Example).toReturn(examples[0], 'findOneBy');
        typeorm.onMock(Example).toReturn(examples[0], 'save');
        typeorm.onMock(Example).toReturn({ affected: 1 }, 'delete');
        typeorm.onMock(Category).toReturn(categories[0], 'findOne');

    });

    afterEach(() => {
        typeorm.restore();
    });

    // Tests pour getSomeExamples et getAllExamples
    describe("getSomeExamples", () => {
        it("should get a number of examples depending on the limit", async () => {   
            const limit = undefined;
            const fetchedExamples = await exampleResolver.getSomeExamples(limit);
            expect(fetchedExamples.length).toBe(examples.length);
        });

        it("returns all examples", async () => {
            const retrievedExamples = await exampleResolver.getAllExamples();
            expect(retrievedExamples.length).toBe(examples.length);
        });
    });

    // Test pour getExampleById
    describe("getExampleById", () => {
        it("should return an example by ID", async () => {
            // toujours true même quand on change l'id......
            const retrievedExample = await exampleResolver.getExampleById(2);
            console.log('👉👉 retrievedExample', retrievedExample);
            console.log('👉👉 examples[1]', examples[1]);
            console.log('👉👉 data', examples[2].id);
            
            
            
            expect(retrievedExample).toEqual(examples[1]);
        });
    });
});


// TODO: couper le projet et utiliser Jest pour mocker la datasource, la db et les entités