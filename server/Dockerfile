FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

RUN npx prisma generate

COPY . .
RUN npm run build

RUN npm prune --production

FROM node:20-alpine AS production
ENV NODE_ENV=production
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

USER node
EXPOSE 4000
CMD ["node", "dist/server.js"]