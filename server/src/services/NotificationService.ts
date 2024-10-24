export class NotificationService {
    sendEmail(title: string, to: string) {
        console.info(`Sending notification to ${to} about the example with title: "${title}".`);
    }
}