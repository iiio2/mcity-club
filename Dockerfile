FROM docker.io/library/node:lts-alpine AS base

# Prepare pnpm https://pnpm.io/installation#using-corepack
RUN npm i -g corepack@latest && corepack enable && apk add git --no-cache

# Declared after the layers above so a differing UID does not rebuild them.
ARG UID=911
ARG GID=911

# Create a dedicated user and group
RUN set -eux; \
    addgroup -g $GID mcity; \
    adduser -u $UID -D -G mcity mcity;

# Prepare work directory, owned by the user that installs and runs everything
WORKDIR /app
RUN chown mcity:mcity /app

USER mcity

# Prepare deps. Postinstall scripts are skipped: the only one in the tree is
# simple-git-hooks, which installs git hooks that are useless in a container.
# The source itself is bind-mounted at runtime, so it is not copied here.
COPY --chown=mcity:mcity package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY --chown=mcity:mcity patches ./patches

RUN pnpm i --frozen-lockfile --ignore-scripts

EXPOSE 5000/tcp

CMD ["pnpm", "dev"]
