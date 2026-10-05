"use client";

import { generateToken, setSession } from "./utils";
import { CONFIG } from "@/config-global";
import { getOperatorByEmail } from "@/actions/patient-service";
import { sendEmailOperatorLinking } from "@/actions/email-service";
import { patientService } from "@/api/patient-service";

// ----------------------------------------------------------------------

export type SignInParams = {
	email: string;
	password: string;
};

/** Cómo se resolvió el ingreso: entrando directo, o con el link enviado por mail. */
export type SignInMode = "directo" | "link-por-mail";

/** **************************************
 * Sign in
 *************************************** */
export const signInWithEmail = async ({ email, password }: SignInParams): Promise<SignInMode> => {
	try {
		// 1) Login temporal hardcodeado (pedido de Bagó, oct-2026): lo valida el
		// servidor en /api/auth/demo-login, así la clave no viaja al navegador.
		// Si entra por acá, no se consulta Salesforce ni se manda mail.
		const demoResponse = await fetch("/api/auth/demo-login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (demoResponse.ok) {
			const { token } = await demoResponse.json();
			await setSession(token);
			return "directo";
		}

		if (demoResponse.status !== 401) {
			const { message } = await demoResponse.json().catch(() => ({ message: "" }));
			throw new Error(message || "No se pudo iniciar sesión");
		}

		const demoError = await demoResponse.json().catch(() => ({ code: "" }));
		if (demoError?.code === "CLAVE_INCORRECTA") {
			// Es el usuario temporal con la clave equivocada: no tiene sentido seguir
			// al login de Salesforce, y el error de ahí confundiría más.
			throw new Error(demoError.message ?? "Email o clave incorrectos");
		}

		// 2) Login real: operador de Salesforce + link de verificación por mail.
		await patientService.ensureAuthenticated();
		const response = await getOperatorByEmail(email);

		if (response?.message === "") {
			const token = generateToken(email);
			const link = `${CONFIG.site.basePath}/auth/sign-in/verify-email?token=${token}`;
			await sendEmailOperatorLinking(email, link);
			return "link-por-mail";
		}

		throw new Error(response?.message || "Email o clave incorrectos");
	} catch (error) {
		console.error("Error al iniciar sesión:", error);
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
		console.error("Error al cerrar sesión:", error);
		throw error;
	}
};
