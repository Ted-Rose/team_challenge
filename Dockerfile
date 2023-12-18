# Stage 1: Composer Install
FROM composer:2 AS composer

WORKDIR /var/www

COPY composer.json composer.lock ./

RUN composer install --ignore-platform-reqs --no-scripts --no-autoloader

# Stage 2: Final Image
FROM php:8.1-fpm-alpine

WORKDIR /var/www

# Install required extensions
RUN docker-php-ext-install pdo pdo_mysql sockets

# Copy vendor directory from the Composer stage
COPY --from=composer /var/www/vendor /var/www/vendor

# Copy the rest of the application files
COPY . .

# Set correct permissions
RUN chown -R www-data:www-data /var/www

# Generate the autoloader and optimize
RUN composer dump-autoload --optimize

# CMD php artisan serve --host=0.0.0.0
