import { IScanner } from "./scanner";
import { ITreatment } from "./treatment";

export interface IPatient {
	treatments: ITreatment[];
	weight: string;
	operator: string;
	name: string;
	medicSocial: string;
	dateBirth: string;
	identificationNumber: string;
	lastname: string;
	scanners: IScanner[];
	lastTreatment: ITreatment;
	lastScanner: IScanner;
	weightApp: string;
}
