<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = [
            [
                "name" => "Forest animals",
            ],
            [
                "name" => "Water animals"
            ],
            [
                "name" => "Desert animals"
            ],
            [
                "name" => "Jungle animals"
            ],
        ];

        foreach($teams as $key => $value) {
            Team::create($value);
        }
    }
}
