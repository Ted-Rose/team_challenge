FROM php:8.3-fpm-alpine

# Install required extensions
RUN docker-php-ext-install pdo_mysql

# Copy the Laravel application files to the container
COPY . .

# Install Composer and dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --no-scripts

# Expose port 9000
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
