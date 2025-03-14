import axios from "axios";
import { login } from "@/actions/auth-service";

export const httpClient = axios.create({
	timeout: 5000,
});

httpClient.interceptors.request.use(
	async (config) => {
		const responseLogin = await login();

		if (responseLogin?.accessToken && responseLogin?.instanceUrl) {
			config.baseURL = responseLogin.instanceUrl;
			config.headers.Authorization = `Bearer ${responseLogin.accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

httpClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			const refreshed = await login();
			if (refreshed) {
				error.config.baseURL = refreshed.instanceUrl;
				error.config.headers.Authorization = `Bearer ${refreshed.accessToken}`;
				return axios(error.config);
			}
		}
		return Promise.reject(error instanceof Error ? error : new Error(error));
	}
);
