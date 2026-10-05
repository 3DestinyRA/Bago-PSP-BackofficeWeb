import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * TEMPORAL (pedido de Bagó, oct-2026): login único hardcodeado para que puedan
 * probar el backoffice mientras no exista el operador en Salesforce.
 *
 * Por qué del lado del servidor: este handler corre en el server de Next, así que
 * la clave NO viaja en el bundle del navegador. Si se comparara en el cliente,
 * cualquiera podría leerla desde el código de la página.
 *
 * Reemplazar por el login real contra Salesforce (ver README → "Login temporal").
 */
const DEMO_EMAIL = process.env.BACKOFFICE_DEMO_EMAIL ?? "appcalidaddevida@bago.com.ar";
const DEMO_PASSWORD = process.env.BACKOFFICE_DEMO_PASSWORD ?? "bago123";
const JWT_SECRET = process.env.JWT_SECRET_KEY ?? process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? "";

export async function POST(request: Request) {
	const body = await request.json().catch(() => null);
	const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
	const password = typeof body?.password === "string" ? body.password : "";

	// `code` le dice al cliente si tiene que cortar acá (era el usuario temporal pero
	// erró la clave) o seguir con el login real contra Salesforce (es otro mail).
	if (email !== DEMO_EMAIL.toLowerCase()) {
		return NextResponse.json({ code: "NO_ES_USUARIO_TEMPORAL" }, { status: 401 });
	}

	if (password !== DEMO_PASSWORD) {
		return NextResponse.json({ code: "CLAVE_INCORRECTA", message: "Email o clave incorrectos" }, { status: 401 });
	}

	if (!JWT_SECRET) {
		return NextResponse.json({ message: "Falta configurar JWT_SECRET_KEY en el servidor" }, { status: 500 });
	}

	// `demo: true` le avisa al AuthProvider que no busque este usuario en Salesforce.
	const token = jwt.sign({ email: DEMO_EMAIL, demo: true }, JWT_SECRET, { expiresIn: "7d" });

	return NextResponse.json({ token });
}
