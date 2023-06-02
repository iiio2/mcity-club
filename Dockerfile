FROM node:18.12-alpine 

WORKDIR app/ 

COPY package.json . 

COPY pnpm-lock.yaml . 

RUN npm i -g pnpm 

COPY . . 

RUN pnpm i 

EXPOSE 5000 

CMD ["pnpm","run","dev"]