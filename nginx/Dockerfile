# Stage 1: Build stage
FROM nginx:latest AS build-stage


# Copy SSL configuration files to the build stage
COPY ./conf.d /etc/nginx/conf.d

# Generate SSL certificates
RUN mkdir -p /etc/nginx/ssl && \
  openssl genrsa -des3 -passout pass:x -out /etc/nginx/ssl/server.pass.key 2048 && \
  openssl rsa -passin pass:x -in /etc/nginx/ssl/server.pass.key -out /etc/nginx/ssl/server.key && \
  rm /etc/nginx/ssl/server.pass.key && \
  openssl req -new -key /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.csr -subj '/C=UK/ST=Warwickshire/L=Leamington/O=OrgName/OU=IT Department/CN=192.168.96.72' && \
  openssl x509 -req -days 365 -in /etc/nginx/ssl/server.csr -signkey /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt

# Stage 2: Runtime stage
FROM nginx:latest

# # Copy React build files to the build stage
# COPY --from=build-stage /react/build /etc/nginx/html
# Copy SSL certificates from the build stage
COPY --from=build-stage /etc/nginx/ssl /etc/nginx/ssl

# Copy configuration files from the build stage
COPY --from=build-stage /etc/nginx/conf.d /etc/nginx/conf.d

# # Copy other necessary files (e.g., HTML files) if needed
COPY --from=build-stage /react_build /etc/nginx/html

# Expose ports
EXPOSE 443

# Command to start nginx
CMD ["nginx", "-g", "daemon off;"]
