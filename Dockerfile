FROM nginx:alpine

COPY public /usr/share/nginx/html
  
RUN sed -i 's/listen 80;/listen 8000;/' /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]