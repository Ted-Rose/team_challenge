# Team Challenge
A game for teams of all ages developed by Tedis

0. `docker-compose up --build` when first starting the project
1. `docker-compose up` when starting the project for not the first time
2. `docker-compose exec main php artisan migrate --seed` to create and seed db tables
3. Identify your IP Address
    1. Windows: `ipconfig`
        1. Under `Wireless LAN adapter Wi-Fi:` the correct address is `IPv4 Address`
4. In `Frontend\src\urls.json` update `YOUR_URL` to `http://your_ip_address:8000`
5. Visit `http://your_ip_address:8000` on your local network to begin
    1. Current password is `Bear`
    2. If encountering error connecting via your local network try turning off firewall

# Setup for local deployment instructions
1. Copy `.env.template`
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
