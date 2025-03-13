"use client";

import { patientService } from "@/services/patient-service";
import { setSession } from "./utils";
import { emailService } from "@/services/email-service";
import jwt from "jsonwebtoken";
import { CONFIG } from "@/config-global";

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

		if (response?.message === "") {
			const token = generateToken(response.identificationNumber);
			const link = `${CONFIG.site.basePath}/auth/sign-in/verify-email?token=${token}`;
			await emailService.sendEmailOperatorLinking(email, link);
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

export const generateToken = (identificationNumber: string) => {
	return jwt.sign({ identificationNumber }, process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? "", { expiresIn: "7d" });
};
