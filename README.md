This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker

El proyecto se puede levantar en un contenedor. La imagen es de producción (Next.js en
modo `standalone`, unos 260 MB, corre como usuario no root) y **no lleva credenciales**:
se leen de variables de entorno al arrancar.

### Levantarlo en local

Requiere Docker con Compose v2.

```bash
cp .env.template .env      # completar los valores (ver abajo)
docker compose up --build
```

Abrir <http://localhost:3000>. El contenedor expone `/api/health` y Docker lo marca
`healthy` cuando responde.

Hay que completar en `.env` (el detalle está comentado en `.env.template`): `AUTH_SECRET`
(generar con `openssl rand -base64 48`), las `SALESFORCE_*`, `EMAIL_SERVICE_API_URL` y
`EMAIL_SERVICE_API_KEY`.

### Cómo se ingresa

El ingreso es por mail, sin contraseña: el operador escribe su mail, le llega un enlace y
al abrirlo queda con la sesión iniciada (el enlace dura 15 minutos; la sesión, 8 horas).
Solo recibe el enlace un mail que exista como operador en Salesforce.

- **Con la imagen el mail sale de verdad** hacia el operador. `AUTH_DEBUG_RETURN_LINK` solo
  funciona cuando `NODE_ENV` no es `production`, o sea con `yarn dev` y no dentro de Docker.
- **`AUTH_BASE_URL` tiene que ser la URL exacta con la que se abre el sitio.** La cookie de
  sesión se guarda contra ese host: si el enlace del mail apunta a otro, el ingreso queda en
  loop. Con Compose, si no se define, sigue al puerto publicado.
- La cookie es `Secure`: sobre `http://localhost` anda en Chrome y Firefox, **no en Safari**.
  En cualquier otro host hace falta HTTPS.

### Otro puerto

```bash
APP_PORT=3100 AUTH_BASE_URL=http://localhost:3100 docker compose up
```

Si `AUTH_BASE_URL` figura en `.env`, hay que cambiarla ahí también.

### Solo la imagen, sin Compose

```bash
docker build -t bago-backoffice .
docker run --rm -p 3000:3000 --env-file .env bago-backoffice
```

`docker run --env-file` no interpreta comillas: en `.env` los valores van sin comillas.
Si se compila desde una Mac con Apple Silicon para correr en un servidor `amd64`, agregar
`--platform linux/amd64` al `docker build`.

### Seguridad

- Los `.env` quedan fuera de la imagen (`.dockerignore`) y ninguna credencial aparece dentro
  de ella ni en el bundle que baja el navegador.
- Compose publica el puerto solo en `127.0.0.1`, porque el backoffice muestra datos de
  pacientes. Para exponerlo en una red hay que poner HTTPS adelante.
- El contenedor corre sin privilegios extra (`no-new-privileges`, sin capabilities).

## Login temporal (octubre 2026)

Mientras el operador no exista en Salesforce, el backoffice acepta un **login único
hardcodeado** para que Bagó pueda probar: el mail y la clave que figuran en la card de
Trello "Revisar login Backoffice operadores".

- Lo valida el servidor en `src/app/api/auth/demo-login/route.ts`, así la clave **no
  viaja en el bundle** del navegador. Se puede sobrescribir con `BACKOFFICE_DEMO_EMAIL`
  y `BACKOFFICE_DEMO_PASSWORD`.
- Con ese usuario se entra directo (sin link por mail) y **no se consulta Salesforce**,
  así que el dashboard queda en cero: no hay operador real del cual traer pacientes.
- El login real (operador de Salesforce + link por mail) sigue funcionando para
  cualquier otro mail.

**Para sacarlo** cuando se integre Salesforce: borrar la ruta `api/auth/demo-login`, el
bloque 1 de `signInWithEmail` (`src/auth/context/jwt/action.ts`), el chequeo `demo` del
`AuthProvider` y el campo de clave del formulario.

### Configuración pendiente

El `.env` del repo define las variables de Salesforce con los nombres de la app mobile
(`EXPO_PUBLIC_*`) y el código lee `NEXT_PUBLIC_*`, así que hoy **no autentica contra
Salesforce**. Esas credenciales, además, apuntan a producción y viajan al navegador por
tener prefijo `NEXT_PUBLIC`: conviene moverlas al servidor al integrar.
