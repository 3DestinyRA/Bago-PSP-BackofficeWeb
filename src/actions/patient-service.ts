"use server";

import { IPatientApi } from "@/types/api/patient-api";
import { PatientMapper } from "@/mapper/patient-mapper";
import { httpClient } from "@/api/http-client";

export async function getOperatorByEmail(email: string) {
	try {
		const response = await httpClient.get<IPatientApi>(
			`/services/apexrest/operador/pacientes/email=${email}&family=REMODULIN`
		);
		return PatientMapper.fromApiToDomain(response.data);
	} catch (error) {
		console.log("Error getting operator by email:", error);
		return null;
	}
}
