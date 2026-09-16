# ──────────────────────────────────────────────────────────────
# outsourcing-claim-dashboard — Coolify 배포용 Dockerfile (정적 빌드 → nginx)
# ──────────────────────────────────────────────────────────────
# 빌드: docker build -t outsourcing-claim-dashboard .
# 실행: docker run -p 8080:8080 outsourcing-claim-dashboard
# ──────────────────────────────────────────────────────────────

# Stage 1: build (정적 번들 생성)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve (정적 파일 → 비루트 nginx)
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
# Coolify Health Check Path: /healthz
# 기본 이미지가 uid 101(non-root)로 실행됩니다.
