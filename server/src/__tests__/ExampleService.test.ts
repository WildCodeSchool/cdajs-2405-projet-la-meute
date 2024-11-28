jest.mock("../services/NotificationService");

import { Example } from "../entities/Example";
import { ExampleService } from "../services/ExampleService";

describe("ExampleService", () => {
	let exampleService: ExampleService;

	beforeEach(() => {
		exampleService = new ExampleService();
	});

	describe("joinExampleTitles", () => {
		it("should return an empty string if there are no examples", () => {
			const joined: string = exampleService.joinExampleTitles([]);
			expect(joined).toBe("");
		});

		it("should return the joined example titles", () => {
			const example = [
				new Example("Ex"),
				new Example("am"),
				new Example("ple"),
			];
			const joined: string = exampleService.joinExampleTitles(example);
			expect(joined).toBe("Example");
		});
	});

	describe("sendNotification", () => {
		it("should send a notification", () => {
			const example = new Example("Example");
			const sent = exampleService.sendNotification(example);
			expect(sent).toBe(undefined);
		});
	});
});
