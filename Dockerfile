FROM openresty/openresty:1.25.3.1-0-alpine-fat

# Создание директорий
RUN mkdir -p /usr/local/openresty/nginx/lua && \
    mkdir -p /usr/share/nginx/static_authenticated && \
    mkdir -p /usr/share/nginx/static_public && \
    mkdir -p /var/log/nginx

COPY ./nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY ./jwt-auth.lua /usr/local/openresty/nginx/lua/jwt-auth.lua
COPY ./jwt.lua /usr/local/openresty/lualib/resty/jwt.lua

# Копирование статических файлов
COPY ./static_authenticated /usr/share/nginx/static_authenticated
COPY ./static_public /usr/share/nginx/static_public

# Установка прав доступа
RUN chown -R nobody:nobody /usr/share/nginx && \
    chown -R nobody:nobody /var/log/nginx && \
    chmod -R 755 /usr/share/nginx

EXPOSE 7000

# Запуск с информационным уровнем логирования в stdout
CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off; error_log stderr info;"]