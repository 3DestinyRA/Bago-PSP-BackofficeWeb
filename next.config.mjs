// Prefijo de ruta bajo el que se sirve la app (ej. "/backoffice-psp" detrás de un nginx
// que publica https://sitio.ejemplo.com/backoffice-psp). Se fija al COMPILAR: Next lo
// incrusta en las rutas, los assets y el router. Vacío = la app va en la raíz.
const normalizeBasePath = (value = "") => {
	const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
	return trimmed ? `/${trimmed}` : "";
};

const basePath = normalizeBasePath(process.env.BASE_PATH);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	basePath: basePath || undefined,
	// Next no antepone el basePath a los `fetch("/api/...")` del navegador ni a las
	// redirecciones del servidor: el código lo lee de acá (ver src/utils/base-path.ts).
	env: {
		NEXT_PUBLIC_APP_BASE_PATH: basePath,
	},
	// Docker: el Dockerfile compila con NEXT_OUTPUT=standalone para generar un servidor
	// autocontenido. En Vercel no se define, así que el deploy actual no cambia.
	output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
};

export default nextConfig;
