FROM php:8.3-fpm-alpine

# Install required extensions
RUN docker-php-ext-install pdo_mysql

# Set the working directory
WORKDIR /var/www/html

# Copy the Laravel application files to the container
COPY . .

# Install Composer and dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --no-scripts

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN apk add --no-cache openssl

# RUN mkdir /etc/nginx/ssl
# RUN openssl genrsa -des3 -passout pass:x -out /etc/nginx/ssl/server.pass.key 2048
# RUN openssl rsa -passin pass:x -in /etc/ssl/server.pass.key -out /etc/nginx/ssl/server.key
# RUN rm /etc/nginx/ssl/server.pass.key
# RUN openssl req -new -key /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.csr
# RUN -subj "/C=UK/ST=Warwickshire/L=Leamington/O=OrgName/OU=IT Department/CN=your_ip_address"
# RUN openssl x509 -req -days 365 -in /etc/nginx/ssl/server.csr -signkey /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt


# Expose port 9000
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
