
FROM node:18-alpine AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ecosystem.config.js ./
RUN npm install --production
CMD ["ls -a"]

FROM node:18-alpine AS Builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
RUN npm install --global pm2

# FROM node:alpine
# WORKDIR /usr/app
# RUN npm install --global pm2
# COPY ./package*.json ./
# RUN npm install --production
# COPY ./ ./
# RUN npm run build
# EXPOSE 3000
# USER node
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=deps /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ecosystem.config.js ./
EXPOSE 3000 

ENV PORT 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
# CMD ["pm2-runtime", "start", "npm", "--", "start"]

# CMD ["npm","start"]