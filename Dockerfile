FROM node:22.9.0-alpine3.20

WORKDIR /usr/src/app

# Copy files
COPY apps/ /usr/src/app/apps/
COPY packages/ /usr/src/app/packages/
COPY pnpm-lock.yaml pnpm-workspace.yaml *.json *.js /usr/src/app/

# Setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}/${PATH}"
RUN corepack enable

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN cp /usr/src/app/apps/web/.env.development.local /usr/src/app/apps/web/.env && \
	pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
