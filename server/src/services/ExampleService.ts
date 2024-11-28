import type { Example } from "../entities/Example";
import { NotificationService } from "../services/NotificationService";

export class ExampleService {
	private readonly notificationService: NotificationService;

	constructor(
		notificationService: NotificationService = new NotificationService(),
	) {
		this.notificationService = notificationService;
	}

	joinExampleTitles(examples: Example[]): string {
		if (examples.length === 0) {
			return "";
		}

		const joined: string = examples.map((example) => example.title).join("");
		return joined;
	}

	sendNotification(example: Example): void {
		this.notificationService.sendEmail(example.title, "some guy");
	}
}
