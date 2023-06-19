FROM node:20-alpine AS build

WORKDIR /app
RUN npm i -g pnpm
COPY . .

# Build backend
RUN pnpm i --frozen-lockfile
RUN pnpm run build

# Build frontend
WORKDIR /app/web-ui-svelte
RUN rm -rf build
RUN pnpm i --frozen-lockfile
RUN pnpm run build

FROM node:20-alpine AS release

WORKDIR /app
RUN npm i -g pnpm

COPY --from=build /app/dist ./dist
COPY --from=build /app/web-ui-svelte/build ./web-ui-svelte/build
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .

RUN pnpm i --prod --frozen-lockfile

EXPOSE 1470
CMD ["pnpm", "start"]