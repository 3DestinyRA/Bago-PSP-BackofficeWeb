"use client";

import { generateToken, setSession } from "./utils";
import { CONFIG } from "@/config-global";
import { getOperatorByEmail } from "@/actions/patient-service";
import { sendEmailOperatorLinking } from "@/actions/email-service";
import { patientService } from "@/api/patient-service";

// ----------------------------------------------------------------------

export type SignInParams = {
	email: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithEmail = async ({ email }: SignInParams): Promise<void> => {
	try {
		await patientService.ensureAuthenticated();
		const response = await getOperatorByEmail(email);

		if (response?.message === "") {
			const token = generateToken(email);
			const link = `${CONFIG.site.basePath}/auth/sign-in/verify-email?token=${token}`;
			await sendEmailOperatorLinking(email, link);
		} else {
			throw new Error(response?.message);
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
