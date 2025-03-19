import { IPatientApi, IScannerApi, ITreatmentApi } from "@/types/api/patient-api";
import { IScanner } from "@/types/scanner";
import { ITreatment } from "@/types/treatment";
import { IUser } from "@/types/user";

export class PatientMapper {
	static fromApiToDomain(patient: IPatientApi): IUser {
		console.log("patient", patient);
		return {
			name: patient.nombre ?? "",
			lastname: patient.apellido ?? "",
			identificationNumber: patient.dni ?? "",
			message: patient.msg ?? "",
			patients:
				patient?.Pacientes?.map((item) => ({
					treatments: item.Tratamientos.map((item) => ({
						deviceType: item.tipoBomba ?? "",
						product: item.producto ?? "",
						professionalAssign: item.medicoTratante ?? "",
						startDate: item.fechaInicio ?? "",
						doses: item.dosis ? parseFloat(item.dosis) : 0,
						identificationNumber: item.dni ?? "",
					})),
					weight: item.peso ?? "0",
					operator: item.operadorDesignado ?? "",
					name: item.nombre ?? "",
					medicSocial: item.obraSocial ?? "",
					dateBirth: item.fechaNacimiento ?? "",
					identificationNumber: item.dni ?? "",
					lastname: item.apellido ?? "",
					scanners:
						item.Escaneos.map((item) => ({
							infusionVelocity: item.velocidadInfusion ? parseFloat(item.velocidadInfusion) : 0,
							presentationMonth: item.presentacionMensual ?? "",
							remainingMl: item.mlRestantes ? parseFloat(item.mlRestantes) : 0,
							remainingCartridge: item.duracionCartucho ? parseFloat(item.duracionCartucho) : 0,
							doses: item.dosis ? parseFloat(item.dosis) : 0,
							identificationNumber: item.DNI ?? "",
						})) ?? [],
					lastTreatment: this.fromTreatmentToDomain(
						item.Tratamientos.reduce((prev, current) => {
							const prevDate = new Date(prev?.fechaInicio ?? "");
							const currentDate = new Date(current?.fechaInicio ?? "");
							return prevDate > currentDate ? prev : current;
						}, item.Tratamientos[0] ?? {})
					),
					lastScanner: this.fromScannerToDomain(
						item.Escaneos.reduce((prev, current) => {
							const prevDate = new Date(prev?.fechaHoraEscaneo ?? "");
							const currentDate = new Date(current?.fechaHoraEscaneo ?? "");
							return prevDate > currentDate ? prev : current;
						}, item.Escaneos[0] ?? {})
					),
				})) ?? [],
		};
	}

	static fromTreatmentToDomain(treatment: ITreatmentApi): ITreatment {
		return {
			deviceType: treatment.tipoBomba ?? "",
			product: treatment.producto ?? "",
			professionalAssign: treatment.medicoTratante ?? "",
			startDate: treatment.fechaInicio ?? "",
			doses: treatment.dosis ? parseFloat(treatment.dosis) : 0,
			identificationNumber: treatment.dni ?? "",
		};
	}

	static fromScannerToDomain(scanner: IScannerApi): IScanner {
		return {
			infusionVelocity: scanner.velocidadInfusion ? parseFloat(scanner.velocidadInfusion) : 0,
			presentationMonth: scanner.presentacionMensual ?? "",
			remainingMl: scanner.mlRestantes ? parseFloat(scanner.mlRestantes) : 0,
			remainingCartridge: scanner.duracionCartucho ? parseFloat(scanner.duracionCartucho) : 0,
			doses: scanner.dosis ? parseFloat(scanner.dosis) : 0,
			identificationNumber: scanner.DNI ?? "",
		};
	}
}
