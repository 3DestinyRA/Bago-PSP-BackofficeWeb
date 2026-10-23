import { NextRequest } from "next/server";
import { BASE_PATH } from "@/utils/base-path";
import { readEnv } from "./env";

/**
 * Base pública del sitio, con el prefijo de ruta si la app se sirve bajo uno
 * (ej. `https://sitio.ejemplo.com/backoffice-psp`).
 *
 * Importa que sea exacta: la cookie de sesión se guarda contra el host que respondió,
 * así que si el link del mail apunta a un host y el redirect sale por otro (`localhost`
 * vs `127.0.0.1`, o el host interno detrás del proxy de Vercel o de un nginx que no
 * reenvía `Host`), el navegador descarta la cookie y el ingreso queda en loop.
 *
 * En producción conviene fijar `AUTH_BASE_URL`.
 */
export const baseUrl = (request: NextRequest): string => {
	const configured = readEnv("AUTH_BASE_URL", "NEXT_PUBLIC_BASE_PATH");
	if (configured) return withBasePath(configured.replace(/\/+$/, ""));

	const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
	const proto = request.headers.get("x-forwarded-proto") ?? "https";
	const origin = host ? `${proto}://${host}` : new URL(request.url).origin;
	return `${origin}${BASE_PATH}`;
};

/**
 * La app compilada con BASE_PATH solo responde bajo ese prefijo, así que la URL pública
 * siempre lo lleva. Si `AUTH_BASE_URL` se cargó sin él (solo el origen), se lo agregamos
 * en vez de mandar al usuario a una ruta que no existe.
 */
const withBasePath = (url: string): string => (BASE_PATH && !url.endsWith(BASE_PATH) ? `${url}${BASE_PATH}` : url);

/**
 * URL absoluta de una ruta de la app, conservando el prefijo.
 *
 * No usar `new URL("/dashboard", baseUrl(...))`: un path que empieza con `/` reemplaza al
 * de la base y descarta el prefijo (`https://host/backoffice-psp` -> `https://host/dashboard`).
 */
export const appUrl = (request: NextRequest, path: string): string => `${baseUrl(request)}${path}`;
