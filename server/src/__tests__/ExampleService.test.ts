import { Category } from "../entities/Category";
import { Example } from "../entities/Example";
import { ExampleService } from "../services/ExampleService";

describe("ExampleService", () => {

    describe("joinExampleTitles", () => {

        let exampleService: ExampleService;

        beforeEach(() => {
            exampleService = new ExampleService();
        });

        it("should return an empty string if there are no examples", () => {
            const joined: string = exampleService.joinExampleTitles([]);
            expect(joined).toBe("");
        })

        it("should return the joined example titles", () => {
            const example = [
                new Example("Ex"),
                new Example("am"),
                new Example("ple")
            ]
            const joined: string = exampleService.joinExampleTitles(example);
            console.log(example)
            expect(joined).toBe("Example");
        })
    })
});