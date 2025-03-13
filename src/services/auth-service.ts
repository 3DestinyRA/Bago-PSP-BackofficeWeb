import { ISalesforceApiResponseAuth } from "@/types/api-auth";
import axios from "axios";

export class AuthService {
	private static instance: AuthService;
	private readonly grantType = process.env.NEXT_PUBLIC_SALESFORCE_GRANT_TYPE as string;
	private readonly clientId = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID as string;
	private readonly clientSecret = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET as string;
	private readonly username = process.env.NEXT_PUBLIC_SALESFORCE_USERNAME as string;
	private readonly password = process.env.NEXT_PUBLIC_SALESFORCE_PASSWORD as string;
	private readonly authUrl = `${process.env.NEXT_PUBLIC_SALESFORCE_API_AUTH_URL}/services/oauth2/token`;

	private constructor() {}

	static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	async login(): Promise<boolean> {
		try {
			const formData = new URLSearchParams();
			formData.append("grant_type", this.grantType);
			formData.append("client_id", this.clientId);
			formData.append("client_secret", this.clientSecret);
			formData.append("username", this.username);
			formData.append("password", this.password);
			const response = await axios.post<ISalesforceApiResponseAuth>(this.authUrl, formData, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Access-Control-Allow-Origin": "http://localhost:3000",
				},
			});

			const { access_token, instance_url } = response.data;

			localStorage.setItem("accessTokenSalesforce", access_token);
			localStorage.setItem("instanceUrlSalesforce", instance_url);

			return true;
		} catch (error) {
			console.error("Error autenticando con Salesforce:", error);
			return false;
		}
	}

	async getAccessToken(): Promise<string | null> {
		return localStorage.getItem("accessTokenSalesforce");
	}

	async getInstanceUrl(): Promise<string | null> {
		return localStorage.getItem("instanceUrlSalesforce");
	}

	async refreshAccessToken(): Promise<boolean> {
		return this.login();
	}
}

export const authService = AuthService.getInstance();
