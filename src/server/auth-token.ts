import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { requireEnv } from "./env";

/**
 * Tokens de acceso. **Solo servidor.**
 *
 * Antes el token se firmaba en el navegador con `NEXT_PUBLIC_JWT_SECRET_KEY` y al
 * volver nadie verificaba la firma: cualquiera podía fabricarse una sesión con el mail
 * de cualquier operador. Ahora se firma y se verifica acá, con `AUTH_SECRET`, que no
 * se expone al cliente.
 */

export const SESSION_COOKIE = "bo_session";

const MAGIC_TTL_SECONDS = 15 * 60; // el link del mail: corto a propósito
const SESSION_TTL_SECONDS = 8 * 60 * 60; // una jornada de trabajo

const secret = () => requireEnv("AUTH_SECRET");

type TokenPurpose = "magic-link" | "session";

type TokenPayload = {
	email: string;
	purpose: TokenPurpose;
	jti: string;
};

const sign = (email: string, purpose: TokenPurpose, expiresIn: number): string =>
	jwt.sign({ email, purpose, jti: crypto.randomUUID() } satisfies TokenPayload, secret(), { expiresIn });

const verify = (token: string, purpose: TokenPurpose): string | null => {
	try {
		const payload = jwt.verify(token, secret()) as Partial<TokenPayload>;
		// Un token de link no sirve como sesión ni al revés.
		if (payload?.purpose !== purpose || !payload?.email) return null;
		return payload.email;
	} catch {
		return null;
	}
};

export const signMagicLinkToken = (email: string) => sign(email, "magic-link", MAGIC_TTL_SECONDS);
export const verifyMagicLinkToken = (token: string) => verify(token, "magic-link");

export const signSessionToken = (email: string) => sign(email, "session", SESSION_TTL_SECONDS);
export const verifySessionToken = (token: string) => verify(token, "session");

export const sessionCookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
	maxAge: SESSION_TTL_SECONDS,
};
