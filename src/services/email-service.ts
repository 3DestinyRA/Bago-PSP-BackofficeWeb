import axios from "axios";

export class EmailService {
	private readonly apiUrl = process.env.NEXT_PUBLIC_EMAIL_SERVICE_API_URL as string;
	private readonly apiKey = process.env.NEXT_PUBLIC_EMAIL_SERVICE_API_KEY as string;

	async sendEmailOperatorLinking(email: string, link: string): Promise<void> {
		return await axios.post(`${this.apiUrl}mail/operator`, {
			toEmail: email,
			confirmationLink: link,
			apiKey: this.apiKey,
		});
	}
}

export const emailService = new EmailService();
