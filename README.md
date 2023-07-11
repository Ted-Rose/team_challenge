# Team Challenge
A game for teams of all ages developed by Tedis

# Setup instructions
1. Rename `.env.example` to `.env`
2. docker-compose up --build
3. Comment out `For docker-compose up` in `.env`
4. Comment in `For terminal` in `.env`
    In a new terminal:
4. Php artisan migrate
5. php artisan migrate --seed
6. Comment out `For terminal` in `.env`
7. Comment in `For Laravel app` in `.env`
8. Visit end points (http://localhost:8000/players for example)


