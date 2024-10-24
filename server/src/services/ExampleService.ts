import type { Example } from "../entities/Example";

export class ExampleService {

    sumOfExampleIds(examples: Example[]): number {
        if (examples.length === 0) {
            return 0;
        }

        const sum: number = examples.map(example => example.id ?? 0).reduce((previous, current) => {
            previous += current;
            return previous;
        }, 0);
        return sum / examples.length;
    }
}