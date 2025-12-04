# --- Stage 1: Build ---
FROM oven/bun:1.3.3 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

# COPY . . akan menyalin .env.production juga (asal tidak di .dockerignore)
COPY . .

# Saat 'bun run build' jalan, Vite otomatis mendeteksi mode production
# dan akan membaca variabel dari .env.production
RUN bun run build

# --- Stage 2: Runner ---
FROM oven/bun:1.3.3-alpine

WORKDIR /app
RUN bun add -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]