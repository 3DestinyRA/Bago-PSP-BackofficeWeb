import { NextRequest, NextResponse } from "next/server";
import { signMagicLinkToken } from "@/server/auth-token";
import { sendOperatorLoginLink, shouldReturnLinkInsteadOfEmail } from "@/server/mailer";
import { findOperatorByEmail } from "@/server/salesforce";
import { baseUrl } from "@/server/base-url";

export const runtime = "nodejs";

/**
 * Paso 1 del ingreso: pide el link de acceso.
 *
 * Responde SIEMPRE lo mismo exista o no el operador. Si distinguiéramos, cualquiera
 * podría averiguar qué mails son operadores del programa probando direcciones.
 */
export async function POST(request: NextRequest) {
	const body = await request.json().catch(() => null);
	const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

	if (!email || !email.includes("@")) {
		return NextResponse.json({ ok: true });
	}

	try {
		const operator = await findOperatorByEmail(email);

		if (operator) {
			const token = signMagicLinkToken(email);
			const link = `${baseUrl(request)}/api/auth/verify?token=${encodeURIComponent(token)}`;

			if (shouldReturnLinkInsteadOfEmail()) {
				console.log(`[auth] link de ingreso para ${email}: ${link}`);
				return NextResponse.json({ ok: true, link });
			}

			await sendOperatorLoginLink(email, link);
		}
	} catch (error) {
		// Un fallo de Salesforce o del servicio de mail no es lo mismo que un mail
		// inexistente: acá sí avisamos, para no dejar a la persona esperando un mail
		// que nunca va a llegar.
		console.error("[auth] no se pudo generar el link de ingreso:", error);
		return NextResponse.json(
			{ ok: false, message: "No pudimos procesar el ingreso. Probá de nuevo en unos minutos." },
			{ status: 500 }
		);
	}

	return NextResponse.json({ ok: true });
}
