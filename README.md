# Team Challenge

A game for teams of all ages developed by Tedis

# Setup

## Setup for production
- Build containers with `docker-compose -f docker-compose.prod.yaml build` when first starting the project
  - `docker-compose -f docker-compose.dev.yaml down`
    - To prevent port conflicts with dev containers
- Start containers with `docker-compose -f docker-compose.prod.yaml up`
- `docker-compose exec laravel php artisan migrate --seed` to create and seed db tables
- Visit `https://your_ip_address:1443` on your local network to begin
  !!! Note the "1443" port that is set in case port 443 is already taken
  1. Current password is `Bear`
  2. If encountering error connecting via your local network try turning off firewall
  3. Probably you won't be able to access the site from mobile phone without manually trusting the self-signed certificate (see section `Manually trusting the self-signed certificate` below)

## Setup for development
- Build containers with this command when first starting the project:
  - `docker-compose -f docker-compose.prod.yaml down`
    - To prevent port conflicts with prod containers
  - `docker-compose -f docker-compose.dev.yaml build`
  - `docker-compose exec laravel-dev php artisan migrate --seed` to create and seed db tables
  - Note: Docker on your host machine might not have the permissions to mount the host machines directories - needed to provide live reload when editing laravel or react files.
    - You can either grant docker the permissions or manually copy the laravel's and react's directories to the containers when want to trigger reload using this commands:
    ```
    docker cp ./react/src react-dev:/
    docker cp ./laravel laravel-dev:/var/www/html/
    ```
      - Refreshing your website should now update React according to the latest src directory files
- Start containers with `docker-compose -f docker-compose.prod.yaml up`

## Add users, players and NFC id's
1. To add users (users that can log in) modify array `users` in `laravel/database/seeders/PlayersTableSeeder.php`
2. To add players (users that can have points) modify array `players` in `laravel/database/seeders/PlayersTableSeeder.php`
3. To add teams modify array `teams` in `laravel/database/seeders/TeamsTableSeeder.php`


# Manually trusting the self-signed certificate

6. `docker\nginx\conf.d\default.conf` - define `proxy_pass` to match your `IPv4 Address`
7. Visit the HTTPS site on your local network using desktop device
8. Download the self signed SSL certificate
9. Copy the certificate to the root of the phone
10. Install the certificate from the phones settings (Google it for detailed instructions)

# Setup for local deployment without Docker

!!! All terminal commands for each step have to be ran from this projects root directory!

### 1. Fill templates

- Make a copy of `react\src\urls.template.json` rename it to `urls.json`
  - In `react\src\urls.json` update `base_url` to `http://your_ip_address:8000`
- Make a copy of `laravel\.env.template` and rename it to `.env`

### 2. Set up Laravel

- `cd laravel`
- `composer update`
- `composer install`

### 4. Set up React

- `cd react`
- `npm install`
- `npm run build`
- `npm start`

### 5. Launch application

- Launch MySQL and fill db:
  - `cd laravel`
  - `php artisan migrate`
  - `php artisan db:seed`
- For launching React & Laravel using Nginx:
  - Generate SSL certificates:
    - IMPORTANT - modify `your_ip_address` in command below!
  ```
  sudo mkdir -p /etc/nginx/ssl && \
  sudo openssl genrsa -des3 -passout pass:x -out /etc/nginx/ssl/server.pass.key 2048 && \
  sudo openssl rsa -passin pass:x -in /etc/nginx/ssl/server.pass.key -out /etc/nginx/ssl/server.key && \
  sudo rm /etc/nginx/ssl/server.pass.key && \
  sudo openssl req -new -key /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.csr -subj '/C=LV/ST=Riga/L=Riga/O=OrgName/OU=IT Department/CN=your_ip_address' && \
  sudo openssl x509 -req -days 365 -in /etc/nginx/ssl/server.csr -signkey /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
  ```
  - `sudo cp . /var/www/html`
  - `sudo rm /etc/nginx/sites-enabled/previous-project`
  - `sudo cp react/conf.d/default.conf /etc/nginx/sites-available/team_challenge`
  - `sudo ln -s /etc/nginx/sites-available/team_challenge /etc/nginx/sites-enabled/`
  - `sudo nginx -t`
  - `sudo systemctl restart nginx`
- For launching React & Laravel using npm and php:
  - `cd laravel`
    - `php artisan serve`
    - NOTE: To access sita via mobile phone: `php artisan serve --host=your_ip_address --port=8000`
  - `cd react`
    - `npm start`

Generating SSL certificates

1. Install OpenSSL:

- Windows - follow [these](https://tecadmin.net/install-openssl-on-windows/) steps

2. `cd nginx\ssl`
3. `openssl genpkey -algorithm RSA -out server.key`
4. `openssl req -new -key server.key -out server.csr`
   1. !!! Make sure to enter the full url your going to use to access your site in the `Common Name (CN)` (https://localhost or https://127.0.0.1 for example)
5. `openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365`
