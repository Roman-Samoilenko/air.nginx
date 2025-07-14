FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY ./air /etc/nginx/conf.d/default.conf

COPY ./static /usr/share/nginx/static