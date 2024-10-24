import type { Example } from "../entities/Example";

export class ExampleService {

    joinExampleTitles(examples: Example[]): string {
        if (examples.length === 0) {
            return ""
        }

        const joined: string = examples.map(example => example.title).join("");
        return joined;
    }

}