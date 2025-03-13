import { PatientMapper } from "@/mapper/patient-mapper";
import { ApiFacade } from "./api-facade";
import { authService } from "./auth-service";
import { IPatientApi } from "@/types/api/patient-api";

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
		const response = await this.api.get<IPatientApi>(
			`/services/apexrest/operador/pacientes/email=${email}&family=REMODULIN`
		);
		return PatientMapper.fromApiToDomain(response);
	}
}

export const patientService = new PatientService(new ApiFacade());
