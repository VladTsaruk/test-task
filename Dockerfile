ARG NODE_VERSION=22.16.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run build

FROM base as final

ENV NODE_ENV=production

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

COPY package.json .

RUN chown -R node:node /usr/src/app/dist

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER node

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
