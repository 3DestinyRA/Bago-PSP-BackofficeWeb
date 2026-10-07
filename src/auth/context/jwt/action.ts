"use client";

// ----------------------------------------------------------------------

export type SignInParams = {
	email: string;
};

/**
 * Pide el link de ingreso.
 *
 * Toda la lógica vive en el servidor (`/api/auth/request-link`): consultar Salesforce,
 * firmar el token y mandar el mail. El navegador solo manda el mail tipeado y nunca ve
 * credenciales ni secretos.
 *
 * Responde igual exista o no el operador, para no filtrar qué mails están cargados.
 */
export const signInWithEmail = async ({ email }: SignInParams): Promise<void> => {
	const response = await fetch("/api/auth/request-link", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	});

	if (!response.ok) {
		const { message } = await response.json().catch(() => ({ message: "" }));
		throw new Error(message || "No pudimos procesar el ingreso. Probá de nuevo en unos minutos.");
	}
};

/** Cierra la sesión borrando la cookie del servidor. */
export const signOut = async (): Promise<void> => {
	await fetch("/api/auth/logout", { method: "POST" });
};
