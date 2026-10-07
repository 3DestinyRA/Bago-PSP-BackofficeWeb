import { readEnv, requireEnv } from "./env";

/**
 * Envío del mail con el link de ingreso. **Solo servidor.**
 *
 * Usa el endpoint `mail/operator` del backend de Heroku, que ya tiene la plantilla
 * "Confirma tu ingreso — Acceder al Backoffice". Antes se llamaba desde el navegador,
 * con la API key incluida en el bundle: cualquiera podía mandar mails desde Bagó con
 * un link arbitrario.
 */
export const sendOperatorLoginLink = async (email: string, link: string): Promise<void> => {
	const apiUrl = requireEnv("EMAIL_SERVICE_API_URL", "NEXT_PUBLIC_EMAIL_SERVICE_API_URL");
	const apiKey = requireEnv("EMAIL_SERVICE_API_KEY", "NEXT_PUBLIC_EMAIL_SERVICE_API_KEY");
	const base = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;

	const response = await fetch(`${base}mail/operator`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ toEmail: email, confirmationLink: link, apiKey }),
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`El servicio de mail respondió HTTP ${response.status}`);
	}
};

/**
 * En desarrollo evita mandar mails reales (los operadores son personas de Bagó):
 * con AUTH_DEBUG_RETURN_LINK=1 el link se devuelve en la respuesta y se loguea.
 */
export const shouldReturnLinkInsteadOfEmail = (): boolean =>
	process.env.NODE_ENV !== "production" && readEnv("AUTH_DEBUG_RETURN_LINK") === "1";
