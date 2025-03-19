export interface ITreatmentApi {
	tipoBomba: string | null;
	producto: string | null;
	medicoTratante: string | null;
	fechaInicio: string | null;
	dosis: string | null;
	dni: string | null;
}

export interface IScannerApi {
	velocidadInfusion: string | null;
	presentacionMensual: string | null;
	mlRestantes: string | null;
	fechaHoraEscaneo: string | null;
	duracionCartucho: string | null;
	dosis: string | null;
	DNI: string | null;
}

export interface IPatientApi {
	nombre: string | null;
	apellido: string | null;
	dni: string | null;
	msg: string | null;
	Pacientes:
		| {
				Tratamientos: ITreatmentApi[];
				peso: string | null;
				operadorDesignado: string | null;
				obraSocial: string | null;
				nombre: string | null;
				apellido: string | null;
				dni: string | null;
				fechaNacimiento: string | null;
				Escaneos: IScannerApi[];
		  }[]
		| null;
}
