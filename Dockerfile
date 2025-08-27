FROM docker.io/library/node:lts-alpine

WORKDIR app/ 

RUN npm i -g --force corepack && corepack enable

RUN apk update 

RUN apk add git --no-cache 

COPY package.json . 

COPY pnpm-lock.yaml . 

COPY patches ./patches

RUN pnpm i --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm i --frozen-lockfile

EXPOSE 5000 

CMD ["pnpm", "dev"]
