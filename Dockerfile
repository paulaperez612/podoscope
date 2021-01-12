FROM nginx:alpine
WORKDIR /app
COPY ./build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY start.sh .
RUN pwd
RUN ls -la
CMD ["./start.sh"]
