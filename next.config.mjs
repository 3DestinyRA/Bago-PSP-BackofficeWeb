/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Docker: el Dockerfile compila con NEXT_OUTPUT=standalone para generar un servidor
	// autocontenido. En Vercel no se define, así que el deploy actual no cambia.
	output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
};

export default nextConfig;
