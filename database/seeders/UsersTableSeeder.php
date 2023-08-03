<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
                "email" => "bear@example.com",
                "nfc_number" => "123",
                "password" => Hash::make("Bear"),
            ],
            [
                "name" => "Rabbit",
                "email" => "rabbit@example.com",
                "nfc_number" => "123",
                "password" => Hash::make("Rabbit"),
            ],
            [
                "name" => "Dolphin",
                "email" => "dolphin@example.com",
                "nfc_number" => "123qeqw",
                "password" => Hash::make("Dolphin"),
            ],
            [
                "name" => "Camel",
                "email" => "camel@example.com",
                "nfc_number" => "eqwe123",
                "password" => Hash::make("Camel"),
            ],
            [
                "name" => "Python",
                "email" => "python@example.com",
                "nfc_number" => "eqwe21",
                "password" => Hash::make("Python"),
            ],
            [
                "name" => "Tedis",
                "email" => "tedis@example.com",
                "nfc_number" => "1234",
                "password" => Hash::make("Tedis"),
            ],
            [
                "name" => "Dāvids",
                "email" => "davids@example.com",
                "nfc_number" => "04:89:D0:3A:4B:11:90",
                "password" => Hash::make("Davids"),
            ],
            [
                "name" => "Sāra",
                "email" => "sara@example.com",
                "nfc_number" => "5678",
                "password" => Hash::make("Sara"),
            ]
        ];

        foreach($users as $key => $value) {
            User::create($value);
        }
    }
}
