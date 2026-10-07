import { NextRequest } from "next/server";
import { readEnv } from "./env";

/**
 * Base pública del sitio.
 *
 * Importa que sea exacta: la cookie de sesión se guarda contra el host que respondió,
 * así que si el link del mail apunta a un host y el redirect sale por otro (`localhost`
 * vs `127.0.0.1`, o el host interno detrás del proxy de Vercel), el navegador descarta
 * la cookie y el ingreso queda en loop contra el login.
 *
 * En producción conviene fijar `AUTH_BASE_URL`.
 */
export const baseUrl = (request: NextRequest): string => {
	const configured = readEnv("AUTH_BASE_URL", "NEXT_PUBLIC_BASE_PATH");
	if (configured) return configured.replace(/\/$/, "");

	const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
	const proto = request.headers.get("x-forwarded-proto") ?? "https";
	return host ? `${proto}://${host}` : new URL(request.url).origin;
};
