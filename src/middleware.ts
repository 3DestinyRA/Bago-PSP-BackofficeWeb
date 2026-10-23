import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "bo_session";

/**
 * Primer filtro del dashboard: sin cookie de sesión, ni se carga la pantalla.
 *
 * Acá no se verifica la firma (el middleware corre en el edge y el secreto vive en el
 * servidor): la validación real la hace `/api/auth/me`, que además revalida contra
 * Salesforce. Esto evita servir el dashboard a quien no inició sesión.
 *
 * Antes este archivo solo agregaba CORS con `Access-Control-Allow-Origin: *` a todas
 * las rutas de API, lo que permitía que cualquier sitio las llamara desde el navegador
 * de un usuario logueado. Se quitó: las rutas se consumen desde el mismo origen.
 */
export function middleware(request: NextRequest) {
	const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

	if (!hasSession) {
		// `nextUrl.clone()` conserva el basePath al redirigir; armar la URL a mano con
		// `new URL("/auth/sign-in", origin)` lo descarta y deja al usuario fuera de la app.
		const url = request.nextUrl.clone();
		url.pathname = "/auth/sign-in";
		url.search = "";
		url.searchParams.set("returnTo", request.nextUrl.pathname);
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/dashboard/:path*",
};
