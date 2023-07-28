<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                "name" => "Bear",
                "nfc_number" => "123",
                "password" => "Bear",
                "teams_id" => 1,
            ],
            [
                "name" => "Rabbit",
                "nfc_number" => "123",
                "password" => "Rabbit",
                "teams_id" => 1,
            ],
            [
                "name" => "Dolphin",
                "nfc_number" => "123qeqw",
                "password" => "Dolphin",
                "teams_id" => 2,
            ],
            [
                "name" => "Camel",
                "nfc_number" => "eqwe123",
                "password" => "Camel",
                "teams_id" => 3,
            ],
            [
                "name" => "Python",
                "nfc_number" => "eqwe21",
                "password" => "Python",
                "teams_id" => 4,
            ],
            [
                "name" => "Tedis",
                "nfc_number" => "1234",
                "password" => "Tedis",
                "teams_id" => 1,
            ],
            [
                "name" => "Dāvids",
                "nfc_number" => "04:89:D0:3A:4B:11:90",
                "password" => "Davids",
                "teams_id" => 2,
            ],
            [
                "name" => "Sāra",
                "nfc_number" => "5678",
                "password" => "Sara",
                "teams_id" => 3,
            ]
        ];

        foreach($users as $key => $value) {
            User::create($value);
        }
    }
}
