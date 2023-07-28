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
1. Rename `.env.template` to `.env`
    1. Rename `urls.template.json` to `urls.json`
    2. Update `base_url` in `urls.json` to BE base url
2. Comment in `For Laravel app` in `.env`
3. Comment out `For terminal` in `.env`
4. Comment out `For docker-compose up` in `.env`
5. Comment out all except db and volumes in `docker-compose.yaml`
6. `docker-compose up --build`
7. Identify your IP Address `ipconfig`
8. `php artisan serve --host=192.168.43.45 --port=8000`
9. `cd Frontend`
10. `npm start`
11. Visit http://localhost:8000/players for example


