"use server";

import { ISalesforceApiResponseAuth } from "@/types/api-auth";
import axiosInstance from "@/utils/axios";

const grantType = process.env.NEXT_PUBLIC_SALESFORCE_GRANT_TYPE as string;
const clientId = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID as string;
const clientSecret = process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET as string;
const username = process.env.NEXT_PUBLIC_SALESFORCE_USERNAME as string;
const password = process.env.NEXT_PUBLIC_SALESFORCE_PASSWORD as string;
const authUrl = `${process.env.NEXT_PUBLIC_SALESFORCE_API_AUTH_URL}/services/oauth2/token`;

export const login = async (): Promise<{ accessToken: string; instanceUrl: string } | undefined> => {
	try {
		const formData = new URLSearchParams();
		formData.append("grant_type", grantType);
		formData.append("client_id", clientId);
		formData.append("client_secret", clientSecret);
		formData.append("username", username);
		formData.append("password", password);
		const response = await axiosInstance.post<ISalesforceApiResponseAuth>(authUrl, formData, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		const { access_token, instance_url } = response.data;

		return {
			accessToken: access_token,
			instanceUrl: instance_url,
		};
	} catch (error) {
		console.error("Error autenticando con Salesforce:", error);
		return undefined;
	}
};
