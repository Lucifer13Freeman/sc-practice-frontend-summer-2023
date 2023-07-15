FROM node:18.12.1-slim as build

WORKDIR /build

ADD . /build
ADD .npmrc /build/.npmrc


RUN apt update
RUN apt install -y git
RUN npm ci && \
    npm run build

###############################################################################

FROM nginx as frontend

COPY --from=build --chown=nginx:nginx /build/dist/sc-practice-frontend /usr/share/nginx/html/
COPY ./configuration/nginx/default.conf /etc/nginx/conf.d/default.conf
