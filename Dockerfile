FROM nginx:alpine

COPY public /usr/share/nginx/html

RUN sed -i 's/listen\s*80;/listen 8000;/' /etc/nginx/conf.d/default.conf

EXPOSE 8000

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
