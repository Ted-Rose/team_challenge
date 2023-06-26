# Start with a base image
FROM php:7.4-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libonig-dev \
    libcurl4-openssl-dev \
    libpng-dev \
    libjpeg-dev \
    libzip-dev \
    zip \
    unzip \
    git

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the composer.json and composer.lock files
COPY composer.json composer.lock ./

# Install project dependencies
RUN composer install --no-scripts --no-autoloader

# Copy the rest of the application code
COPY . .

# Generate the autoloader
RUN composer dump-autoload --optimize

# Set permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Generate an application key
RUN php artisan key:generate

# Expose the port that the web server will listen on
EXPOSE 9000

# Start the PHP-FPM service
CMD ["php-fpm"]
