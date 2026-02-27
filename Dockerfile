# ─── Stage 1: dependencies + build ───────────────────────────────────────────
FROM node:20-alpine AS builder

# Native addon dependencies (required by better-sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy manifests first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* vars are baked in at build time — pass them as build args
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN npm run build

# ─── Stage 2: lean production image ──────────────────────────────────────────
FROM node:20-alpine AS runner

# Native addon runtime dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

ENV NODE_ENV=production
# Disable Next.js telemetry inside the container
ENV NEXT_TELEMETRY_DISABLED=1

# Only copy what the standalone build needs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Create the data directory for the SQLite volume mount
RUN mkdir -p /app/data

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
