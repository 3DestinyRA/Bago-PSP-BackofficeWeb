import { IScanner } from "./scanner";
import { ITreatment } from "./treatment";

export interface IPatient {
    treatments: ITreatment[];
    weight: number;
    operator: string;
    name: string;
    medicSocial: string;
    dateBirth: string;
    identificationNumber: string;
    lastname: string;
    scanners: IScanner[];

}