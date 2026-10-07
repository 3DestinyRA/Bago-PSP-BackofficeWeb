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
		const url = new URL("/auth/sign-in", request.nextUrl.origin);
		url.searchParams.set("returnTo", request.nextUrl.pathname);
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/dashboard/:path*",
};
