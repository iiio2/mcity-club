FROM node:18.12-alpine 

WORKDIR app/ 

RUN corepack enable

RUN apk update 

RUN apk add git --no-cache 

COPY package.json . 

COPY pnpm-lock.yaml . 

RUN pnpm i --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm i --frozen-lockfile

EXPOSE 5000 

CMD ["pnpm","run","dev"]