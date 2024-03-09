<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
        /**
         * Seed the application's database.
         *
         * @return void
         */
        public function run()
        {
            $this->call(TeamsTableSeeder::class);
            $this->call(PlayersTableSeeder::class);
            $this->call(UsersTableSeeder::class);
            // Runs the seeder class we want to seed
        }
}
