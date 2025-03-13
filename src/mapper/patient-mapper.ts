import { IPatientApi } from "@/types/api/patient-api";
import { IUser } from "@/types/user";

export class PatientMapper {
	static fromApiToDomain(patient: IPatientApi): IUser {
		return {
			name: patient.nombre ?? "",
			lastname: patient.apellido ?? "",
			identificationNumber: patient.dni ?? "",
			message: patient.msg ?? "",
			patients: [],
		};
	}
}
