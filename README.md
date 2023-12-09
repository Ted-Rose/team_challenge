# Team Challenge
A game for teams of all ages developed by Tedis

# Setup

## Base setup
0. `docker-compose up --build` when first starting the project
1. `docker-compose up` when starting the project not for the first time
2. `docker-compose exec main php artisan migrate --seed` to create and seed db tables
3. Identify your IP Address
    1. Windows: `ipconfig`
        1. Under `Wireless LAN adapter Wi-Fi:` the correct address is `IPv4 Address`
4. Make a copy of `Frontend\src\urls.template.json` in the same directory and rename it to `urls.json`
    1. In `Frontend\src\urls.json` update `YOUR_URL` to `http://your_ip_address:8000`
5. Make a copy of `.env.template` in the same directory and rename it to `.env`
6. Visit `https://your_ip_address:8000` on your local network to begin
    1. Current password is `Bear`
    2. If encountering error connecting via your local network try turning off firewall
    3. Probably you won't be able to access the site from mobile phone without manually trusting the self-signed certificate (see the following section)
https://medium.com/@nhatcuong/site-with-both-http-and-https-pages-using-nginx-and-django-b2574559c2d9 

# Manually trusting the self-signed certificate
1. Follow [these](https://tecadmin.net/install-openssl-on-windows/) steps to install OpenSSL
2. cd `nginx\ssl`
3. `openssl genpkey -algorithm RSA -out server.key`
4. `openssl req -new -key server.key -out server.csr`
5. `openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365`
6. `docker\nginx\conf.d\default.conf` - define `proxy_pass` to match your `IPv4 Address`
7. Visit the HTTPS site on your local network using desktop device
8. Download the self signed SSL certificate
9. Copy the certificate to the root of the phone
10. Install the certificate from the phones settings (Google it)

# Setup for local deployment (without docker)
1. Make a copy of `.env.template`
2. Rename `.env copy.template` to `.env`
3. Rename `urls.template.json` to `urls.json`
4. Update `base_url` in `urls.json` to BE base url
5. Start MySQL server (on WAMPSERVER64 for example)
6. `composer install`
7. Identify your IP Address `ipconfig`
8. `php artisan serve`
  1. To access sita via mobile phone: `php artisan serve --host=your_ip_address --port=8000`
9. `php artisan migrate`
10. `php artisan db:seed`
11. `cd Frontend`
12. `npm start`
13. Visit http://localhost:8000/players for example
