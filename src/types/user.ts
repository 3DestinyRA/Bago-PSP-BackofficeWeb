import { IPatient } from "./patient";

export interface IUser {
    name: string;
    lastname: string;
    identificationNumber: string;
    message: string;
    patients: IPatient[]
}