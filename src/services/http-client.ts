import axios from "axios";
import { authService } from "./auth-service";

export const httpClient = axios.create({
	timeout: 5000,
});

httpClient.interceptors.request.use(
	async (config) => {
		const token = await authService.getAccessToken();
		const instanceUrl = await authService.getInstanceUrl();

		console.log(token, instanceUrl);

		if (token && instanceUrl) {
			config.baseURL = instanceUrl;
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			throw new Error("Ha ocurrido un error en el servidor, intente más tarde");
		}

		return config;
	},
	(error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

httpClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			const refreshed = await authService.refreshAccessToken();
			if (refreshed) {
				error.config.headers.Authorization = `Bearer ${await authService.getAccessToken()}`;
				return axios(error.config);
			}
		}
		return Promise.reject(error instanceof Error ? error : new Error(error));
	}
);
