# Team Challenge
A game for teams of all ages developed by Tedis

# Setup

## Base setup
- Identify your IP Address
    1. Windows: `ipconfig`
        1. Under `Wireless LAN adapter Wi-Fi` the correct address is `IPv4 Address`
- Make a copy of `react\src\urls.template.json` rename it to `urls.json`
    1. In `react\src\urls.json` update `base_url` to `https://your_ip_address` (use http for HTTP)
- Make a copy of `laravel\.env.template` and rename it to `.env`
- Make a copy of `nginx\conf.d\default.conf.template.htpps` and rename it to `default.conf`
    - NOTE: For HTTP copy `nginx\conf.d\default.conf.template.htpp` instead
- `docker-compose up --build` when first starting the project
    - NOTE: `docker-compose up` when starting the project not for the first time
- `docker-compose exec laravel php artisan migrate --seed` to create and seed db tables
- Visit `https://your_ip_address` on your local network to begin (use http for HTTP)
    1. Current password is `Bear`
    2. If encountering error connecting via your local network try turning off firewall
    3. Probably you won't be able to access the site from mobile phone without manually trusting the self-signed certificate (see section `Manually trusting the self-signed certificate` below)

# Manually trusting the self-signed certificate
1. Follow [these](https://tecadmin.net/install-openssl-on-windows/) steps to install OpenSSL
2. `cd nginx\ssl`
3. `openssl genpkey -algorithm RSA -out server.key`
4. `openssl req -new -key server.key -out server.csr`
    1. !!! Make sure to enter the full url your going to use to access your site in the `Common Name (CN)` (https://localhost or https://127.0.0.1 for example)
5. `openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365`
6. `docker\nginx\conf.d\default.conf` - define `proxy_pass` to match your `IPv4 Address`
7. Visit the HTTPS site on your local network using desktop device
8. Download the self signed SSL certificate
9. Copy the certificate to the root of the phone
10. Install the certificate from the phones settings (Google it for detailed instructions)

# Setup for local deployment (without Docker)
- Make a copy of `react\src\urls.template.json` rename it to `urls.json`
    1. In `react\src\urls.json` update `base_url` to `http://your_ip_address:8000`
- Make a copy of `.env.template` and rename it to `.env`
- Launch WampServer and make sure db configuration matches `.env` and `docker-compose.yaml`
- `cd laravel`
- `composer install`
- `php artisan serve`
  - NOTE: To access sita via mobile phone: `php artisan serve --host=your_ip_address --port=8000`
- `php artisan migrate`
- `php artisan db:seed`
- In another terminal `cd react`
- `npm start`
