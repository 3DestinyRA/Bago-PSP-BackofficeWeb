"use client";

import { patientService } from "@/services/patient-service";
import { setSession } from "./utils";
import { emailService } from "@/services/email-service";

// ----------------------------------------------------------------------

export type SignInParams = {
	email: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithEmail = async ({ email }: SignInParams): Promise<void> => {
	try {
		const response = await patientService.getOperatorByEmail(email);

		console.log(response);

		if (response) {
			// TODO - Generate Link and Save in localStorage partially
			await emailService.sendEmailOperatorLinking(email, "link");
		}
	} catch (error) {
		console.error("Error al iniciar sesión:", error);
		throw error;
	}
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
	try {
		await setSession(null);
	} catch (error) {
		console.error("Error al cerrar sesión:", error);
		throw error;
	}
};
