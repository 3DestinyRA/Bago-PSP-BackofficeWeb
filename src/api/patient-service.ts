"use client";

import { authService } from "./auth-service";
import { login } from "@/actions/auth-service";

class PatientService {
	async ensureAuthenticated() {
		const token = authService.getAccessToken();
		if (!token) {
			const responseLogin = await login();

			if (!responseLogin) {
				throw new Error("Ha ocurrido un error en el servidor, intente más tarde");
			} else {
				authService.setAccessToken(responseLogin.accessToken);
				authService.setInstanceUrl(responseLogin.instanceUrl);
			}
		}
	}
}

export const patientService = new PatientService();
