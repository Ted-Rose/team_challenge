<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlayersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $players = [
            [
                "name" => "Bear",
                "nfc_number" => "123",
                "teams_id" => 1,
            ],
            [
                "name" => "Rabbit",
                "nfc_number" => "123",
                "teams_id" => 1,
            ],
            [
                "name" => "Dolphin",
                "nfc_number" => "123qeqw",
                "teams_id" => 2,
            ],
            [
                "name" => "Camel",
                "nfc_number" => "eqwe123",
                "teams_id" => 3,
            ],
            [
                "name" => "Python",
                "nfc_number" => "eqwe21",
                "teams_id" => 4,
            ],
            [
                "name" => "Python",
                "nfc_number" => "eqwe21",
                "teams_id" => 5,
            ],
        ];

        foreach ($players as $playerData) {
            $team = Team::find($playerData['teams_id']);

            if ($team) {
                Player::create($playerData);
            }
        }
    }
}
