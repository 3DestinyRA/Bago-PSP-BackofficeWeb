import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/server/auth-token";
import { findOperatorByEmail } from "@/server/salesforce";
import { PatientMapper } from "@/mapper/patient-mapper";

export const runtime = "nodejs";

/**
 * Sesión actual + datos del operador (incluye sus pacientes).
 *
 * Es la única puerta por la que el navegador recibe datos de Salesforce: la consulta
 * se hace acá, con las credenciales del servidor. Se revalida contra Salesforce en
 * cada carga, así que si dan de baja al operador la sesión deja de funcionar.
 */
export async function GET(request: NextRequest) {
	const token = request.cookies.get(SESSION_COOKIE)?.value ?? "";
	const email = verifySessionToken(token);

	if (!email) {
		return NextResponse.json({ user: null }, { status: 401 });
	}

	try {
		const operator = await findOperatorByEmail(email);

		if (!operator) {
			return NextResponse.json({ user: null }, { status: 401 });
		}

		return NextResponse.json({ user: PatientMapper.fromApiToDomain(operator) });
	} catch (error) {
		console.error("[auth] no se pudo recuperar el operador:", error);
		return NextResponse.json({ user: null, message: "No pudimos conectarnos con Salesforce" }, { status: 502 });
	}
}
