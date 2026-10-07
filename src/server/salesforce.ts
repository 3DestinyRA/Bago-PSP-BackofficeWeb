import { IPatientApi } from "@/types/api/patient-api";
import { readEnv, requireEnv } from "./env";

/**
 * Cliente de Salesforce. **Solo servidor**: las credenciales nunca salen de acá.
 *
 * Antes esta misma llamada se hacía desde el navegador con variables `NEXT_PUBLIC_*`,
 * así que usuario y contraseña del integrador viajaban en el código de la página.
 */

const authUrl = () =>
	requireEnv("SALESFORCE_API_AUTH_URL", "NEXT_PUBLIC_SALESFORCE_API_AUTH_URL", "EXPO_PUBLIC_SALESFORCE_API_AUTH_URL");

const credentials = () => ({
	grant_type:
		readEnv("SALESFORCE_GRANT_TYPE", "NEXT_PUBLIC_SALESFORCE_GRANT_TYPE", "EXPO_PUBLIC_SALESFORCE_GRANT_TYPE") ??
		"password",
	client_id: requireEnv("SALESFORCE_CLIENT_ID", "NEXT_PUBLIC_SALESFORCE_CLIENT_ID", "EXPO_PUBLIC_SALESFORCE_CLIENT_ID"),
	client_secret: requireEnv(
		"SALESFORCE_CLIENT_SECRET",
		"NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET",
		"EXPO_PUBLIC_SALESFORCE_CLIENT_SECRET"
	),
	username: requireEnv("SALESFORCE_USERNAME", "NEXT_PUBLIC_SALESFORCE_USERNAME", "EXPO_PUBLIC_SALESFORCE_USERNAME"),
	password: requireEnv("SALESFORCE_PASSWORD", "NEXT_PUBLIC_SALESFORCE_PASSWORD", "EXPO_PUBLIC_SALESFORCE_PASSWORD"),
});

type SalesforceSession = { accessToken: string; instanceUrl: string; expiresAt: number };

// Antes se pedía un token nuevo en CADA request (interceptor de axios). Lo cacheamos
// 30 minutos: Salesforce limita la cantidad de logins por usuario.
let session: SalesforceSession | null = null;

const login = async (): Promise<SalesforceSession> => {
	const response = await fetch(`${authUrl()}/services/oauth2/token`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams(credentials()),
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`Salesforce rechazó la autenticación (HTTP ${response.status})`);
	}

	const data = await response.json();
	if (!data?.access_token || !data?.instance_url) {
		throw new Error("Salesforce no devolvió access_token");
	}

	return {
		accessToken: data.access_token,
		instanceUrl: data.instance_url,
		expiresAt: Date.now() + 30 * 60 * 1000,
	};
};

const getSession = async (): Promise<SalesforceSession> => {
	if (session && session.expiresAt > Date.now()) return session;
	session = await login();
	return session;
};

const get = async <T>(path: string, retryOnUnauthorized = true): Promise<T> => {
	const current = await getSession();
	const response = await fetch(`${current.instanceUrl}${path}`, {
		headers: { Authorization: `Bearer ${current.accessToken}` },
		cache: "no-store",
	});

	if (response.status === 401 && retryOnUnauthorized) {
		session = null;
		return get<T>(path, false);
	}

	if (!response.ok) {
		throw new Error(`Salesforce respondió HTTP ${response.status} en ${path}`);
	}

	return (await response.json()) as T;
};

/**
 * El mail va crudo en el PATH de la Apex, que no lo decodifica: mandando `%40` en
 * lugar de `@` responde "No se encontro operador" (verificado contra producción).
 * Por eso validamos en vez de encodear — así un mail con `/`, `?`, `#`, `&` o `%`
 * tampoco puede alterar la URL que se le pide a Salesforce.
 */
const PATH_SAFE_EMAIL = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Busca al operador por mail. Devuelve el operador con sus pacientes, o `null` si no
 * existe (Salesforce responde `msg: "No se encontro operador"`).
 */
export const findOperatorByEmail = async (email: string): Promise<IPatientApi | null> => {
	if (!PATH_SAFE_EMAIL.test(email)) return null;

	const path = `/services/apexrest/operador/pacientes/email=${email}&family=REMODULIN`;
	const operator = await get<IPatientApi>(path);

	// La Apex devuelve 200 con `msg` cuando no encuentra nada.
	if (!operator || operator.msg) return null;

	return operator;
};
