# Imagen de produccion del backoffice (Next.js 14, salida "standalone").
#
#   docker build -t bago-backoffice .
#   docker run --rm -p 3000:3000 --env-file .env bago-backoffice
#
# Las credenciales NO se hornean en la imagen: llegan como variables de entorno al
# ejecutar el contenedor (ver .env.template). Al compilar solo se necesitan valores que
# no son secretos y que Next incrusta en el codigo: las NEXT_PUBLIC_* y BASE_PATH.
#
# Para servirla bajo un prefijo de ruta (ej. detras de un nginx):
#   docker build --build-arg BASE_PATH=/backoffice-psp -t bago-backoffice .

ARG NODE_VERSION=22

# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---------------------------------------------------------------------------
# Dependencias: se reinstalan solo cuando cambia package.json o yarn.lock.
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---------------------------------------------------------------------------
# Build de Next.
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Valores publicos que Next incrusta en el codigo (src/config-global.ts, next.config.mjs).
# BASE_PATH es el prefijo de ruta bajo el que se sirve la app (vacio = en la raiz).
ARG BASE_PATH=""
ARG NEXT_PUBLIC_ASSETS_URL=""
ARG NEXT_PUBLIC_BASE_PATH=""
ENV BASE_PATH=$BASE_PATH \
    NEXT_PUBLIC_ASSETS_URL=$NEXT_PUBLIC_ASSETS_URL \
    NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

# Activa `output: "standalone"` en next.config.mjs (en Vercel no se define).
ENV NEXT_OUTPUT=standalone
RUN yarn build

# ---------------------------------------------------------------------------
# Runtime: solo el servidor tracificado por Next, sin node_modules completo.
FROM base AS runner
# Mismo BASE_PATH que en el build: el healthcheck consulta la ruta con prefijo.
ARG BASE_PATH=""
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    BASE_PATH=$BASE_PATH

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node
EXPOSE 3000

# 127.0.0.1 y no "localhost": en Alpine localhost resuelve primero a ::1 y el
# servidor escucha en IPv4.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- "http://127.0.0.1:${PORT}${BASE_PATH}/api/health" >/dev/null || exit 1

CMD ["node", "server.js"]
