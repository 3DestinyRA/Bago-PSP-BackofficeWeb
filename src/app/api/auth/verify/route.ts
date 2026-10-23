import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions, signSessionToken, verifyMagicLinkToken } from "@/server/auth-token";
import { appUrl } from "@/server/base-url";

export const runtime = "nodejs";

/**
 * Paso 2 del ingreso: el link del mail entra por acá.
 *
 * Verifica la firma del token (cosa que antes no pasaba en ningún lado), lo cambia por
 * una cookie de sesión httpOnly y redirige al dashboard. El token del mail no sirve
 * como sesión: son dos tokens con propósitos distintos.
 */
export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get("token") ?? "";
	const email = verifyMagicLinkToken(token);

	if (!email) {
		const url = new URL(appUrl(request, "/auth/sign-in"));
		url.searchParams.set("error", "link-invalido");
		return NextResponse.redirect(url);
	}

	const response = NextResponse.redirect(appUrl(request, "/dashboard"));
	response.cookies.set(SESSION_COOKIE, signSessionToken(email), sessionCookieOptions);
	return response;
}
