import { IUser } from "@/types/user";
import { ApiFacade } from "./api-facade";
import { authService } from "./auth-service";


class PatientService {
	private readonly api: ApiFacade;

	constructor(api: ApiFacade) {
		this.api = api;
	}

	private async ensureAuthenticated() {
		const token = await authService.getAccessToken();
		if (!token) {
			await authService.login();
		}
	}

	async getOperatorByEmail(email: string) {
		await this.ensureAuthenticated();
		return this.api.get<IUser>(`/services/apexrest/operador/pacientes/email=${email}&family=REMODULIN`);
	}
}

export const patientService = new PatientService(new ApiFacade());
