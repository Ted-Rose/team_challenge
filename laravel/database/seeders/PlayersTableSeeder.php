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
                "name" => "Wolf",
                "nfc_number" => "04:1B:B7:AB:66:26:81",
                "password" => "Wolf",
                "teams_id" => 1,
            ],
            [
                "name" => "Rat",
                "nfc_number" => "04:CF:7F:AC:66:26:81",
                "password" => "Rat",
                "teams_id" => 1,
            ],
            [
                "name" => "Bear",
                "nfc_number" => "04:CF:7F:AC:66:26:81",
                "password" => "Bear",
                "teams_id" => 1,
            ],
            [
                "name" => "Rabbit",
                "nfc_number" => "04:48:44:AC:66:26:81",
                "password" => "Rabbit",
                "teams_id" => 1,
            ],
            [
                "name" => "Dolphin",
                "nfc_number" => "04:16:82:AB:66:26:81",
                "password" => "Dolphin",
                "teams_id" => 2,
            ],
            [
                "name" => "Camel",
                "nfc_number" => "04:A3:A6:AB:66:26:81",
                "password" => "Camel",
                "teams_id" => 3,
            ],
            [
                "name" => "Python",
                "nfc_number" => "04:36:F3:AF:66:26:81",
                "password" => "Python",
                "teams_id" => 4,
            ],
            [
                "name" => "Eagle",
                "nfc_number" => "04:ED:1E:A1:67:26:81",
                "password" => "Eagle",
                "teams_id" => 1,
            ],
            [
                "name" => "Panda",
                "nfc_number" => "04:BC:EA:AF:66:26:81",
                "password" => "Panda",
                "teams_id" => 2,
            ],
            [
                "name" => "Lion",
                "nfc_number" => "04:6E:31:A1:67:26:81",
                "password" => "Lion",
                "teams_id" => 3,
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
