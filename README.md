# Team Challenge
A game for teams of all ages developed by Tedis

# Setup for development instructions
1. Rename `.env.template` to `.env`
    1. Rename `urls.template.json` to `urls.json`
    2. Update `base_url` in `urls.json` to BE base url
2. `docker-compose up --build`
3. Comment out `For docker-compose up` in `.env`
4. Comment in `For terminal` in `.env`
    In a new terminal:
4. `Php artisan migrate`
5. `php artisan migrate --seed`
6. Comment out `For terminal` in `.env`
7. Comment in `For Laravel app` in `.env`
8. Visit end points (http://localhost:8000/players for example)

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

# Local setup instructions


