FROM node:12 as builder

WORKDIR /app

# Installing dependencies
ADD package.json ./

RUN npm install

COPY . .

ENV NODE_ENV production
RUN npm run build

FROM nginx:1.17-alpine

RUN apk add --no-cache gettext

COPY --from=builder app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder app/build /var/www


EXPOSE 80
CMD nginx -c /etc/nginx/nginx.conf
HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
