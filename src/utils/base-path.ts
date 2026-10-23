/**
 * Prefijo de ruta bajo el que se sirve la app (el `basePath` de Next), o "" si va en la raíz.
 *
 * Lo fija `BASE_PATH` al compilar (ver next.config.mjs). Sirve en navegador y servidor.
 *
 * Next antepone el prefijo solo en `next/link` y en el router, pero NO en los
 * `fetch("/api/...")` ni en las URLs que armamos a mano: para esos casos usar `withBasePath`.
 */
export const BASE_PATH: string = process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "";

/** `withBasePath("/api/auth/me")` -> "/backoffice-psp/api/auth/me" (o el mismo path sin prefijo). */
export const withBasePath = (path: string): string => `${BASE_PATH}${path}`;
