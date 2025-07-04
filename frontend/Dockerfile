# reference: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Multi-stage build for Next.js production
FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --only=production

RUN npm install lightningcss

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY .env .env.example ./
COPY frontend/ ./frontend/
COPY --from=deps /app/node_modules ./frontend/node_modules
WORKDIR /app/frontend

# Disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

# Build
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/frontend/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
