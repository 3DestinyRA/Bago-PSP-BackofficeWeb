import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Chequeo de salud para Docker y balanceadores.
 *
 * Solo confirma que el servidor responde: no toca Salesforce ni lee secretos, así que
 * se puede consultar sin sesión y no gasta logins del usuario de integración.
 */
export function GET() {
	return NextResponse.json({ ok: true });
}
