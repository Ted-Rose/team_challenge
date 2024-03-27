# Team Challenge

A game for teams of all ages

# Setup

## Setup for production
- Copy `react\src\urls.template.json` to `react\src\urls.json`:
    - `cp react/src/urls.template.json react/src/urls.json`
- Update `urls.json` variable `base_url` with your ip address and port 1443
- Build containers:
    - `docker-compose -f docker-compose.prod.yaml build`
- Shut down dev containers to prevent port conflicts (in case you have started them)
    - `docker-compose -f docker-compose.dev.yaml down`
- Start prod containers:
    - `docker-compose -f docker-compose.prod.yaml up`
- Create and seed db tables:
    - `docker-compose -f docker-compose.prod.yaml exec laravel php artisan migrate --seed`
- Visit `https://your_ip_address:1443` on your local network to begin
  - !!! Note the "1443" port that is set in case port 443 is already taken
  - Current password is `Bear`
  - If encountering error connecting via your local network try turning off firewall
  - If issues with trusting SSL certificate via phone see section `Manually trusting the self-signed certificate` under `Most common issues`

## Setup for development
- Copy `react\src\urls.template.json` to `react\src\urls.json`:
    - `cp react/src/urls.template.json react/src/urls.json`
- Update `urls.json` variable `base_url` with your ip address and port 9000
    - Note the port 9000 which differs from the prod port!
- Build containers:
    - `docker-compose -f docker-compose.dev.yaml build`
- Shut down dev containers to prevent port conflicts (in case you have started them)
    - `docker-compose -f docker-compose.prod.yaml down`
- Start dev containers:
    - `docker-compose -f docker-compose.dev.yaml up`
- Create and seed db tables:
    - `docker-compose -f docker-compose.dev.yaml exec laravel-dev php artisan migrate --seed`
- Visit `https://your_ip_address:1443` on your local network to begin
  - !!! Note the "1443" port that is set in case port 443 is already taken
  - Current password is `Bear`
  - If encountering error connecting via your local network try turning off firewall
  - If issues with trusting SSL certificate via phone see section `Manually trusting the self-signed certificate` below
- Note: Docker on your host machine might not have the permissions to mount the host machines directories - needed to provide live reload when editing laravel or react files.
    - You can either grant docker the permissions or manually copy the laravel's and react's directories to the containers when want to trigger reload using this commands:
    ```
    docker cp ./react/src react-dev:/
    docker cp ./laravel laravel-dev:/var/www/html/
    ```
    - Refreshing your website should now update React according to the latest src directory files

## Add users, players and NFC id's
1. To add users (users that can log in) modify array `users` in `laravel/database/seeders/PlayersTableSeeder.php`
2. To add players (users that can have points) modify array `players` in `laravel/database/seeders/PlayersTableSeeder.php`
    - `nfc_number` has to be in uppercase!
3. To add teams modify array `teams` in `laravel/database/seeders/TeamsTableSeeder.php`

# Most common issues
## Manually trusting the self-signed certificate
1. Visit the HTTPS site on your local network using desktop device
2. Download the self signed SSL certificate
3. Copy the certificate to the root of the phone
4. Install the certificate from the phones settings (Google it for detailed instructions)

# Setup for local deployment without Docker

!!! All terminal commands for each step have to be ran from this projects root directory!

### 1. Fill templates

### 2. Set up Laravel

- `cd laravel`
- `composer update`
- `composer install`

### 3. Set up React

- `cd react`
- `npm install`
- `npm run build`
- `npm start`

### 4. Launch application

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
