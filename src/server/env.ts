/**
 * Lectura de variables de entorno del SERVIDOR.
 *
 * Nada de lo que se lea acá debe tener prefijo `NEXT_PUBLIC_`: ese prefijo hace que
 * Next inyecte el valor en el bundle del navegador. Las credenciales de Salesforce y
 * el secreto de sesión estuvieron expuestas así (ver README → Seguridad).
 *
 * Aceptamos los nombres viejos como fallback para no romper el deploy mientras se
 * renombran las variables en Vercel, pero el nombre correcto es el primero.
 */
export const readEnv = (...names: string[]): string | undefined => {
	for (const name of names) {
		const value = process.env[name];
		if (value) return value;
	}
	return undefined;
};

export const requireEnv = (...names: string[]): string => {
	const value = readEnv(...names);
	if (!value) {
		throw new Error(`Falta configurar la variable de entorno ${names[0]} en el servidor`);
	}
	return value;
};
