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
                "name" => "Wolf",
                "nfc_number" => "04:1B:B7:AB:66:26:81",
                "password" => Hash::make("Wolf"),
                "email" => "wolf@example.com",
            ],
            [
                "name" => "Rat",
                "nfc_number" => "04:CF:7F:AC:66:26:81",
                "password" => Hash::make("Rat"),
                "email" => "rat@example.com",
            ],
            [
                "name" => "Bear",
                "nfc_number" => "04:CF:7F:AC:66:26:81",
                "password" => Hash::make("Bear"),
                "email" => "bear@example.com",
            ],
            [
                "name" => "Rabbit",
                "nfc_number" => "04:48:44:AC:66:26:81",
                "password" => Hash::make("Rabbit"),
                "email" => "rabbit@example.com",
            ],
            [
                "name" => "Dolphin",
                "nfc_number" => "04:16:82:AB:66:26:81",
                "password" => Hash::make("Dolphin"),
                "email" => "dolphin@example.com",
            ],
            [
                "name" => "Camel",
                "nfc_number" => "04:A3:A6:AB:66:26:81",
                "password" => Hash::make("Camel"),
                "email" => "camel@example.com",
            ],
            [
                "name" => "Python",
                "nfc_number" => "04:36:F3:AF:66:26:81",
                "password" => Hash::make("Python"),
                "email" => "python@example.com",
            ],
            [
                "name" => "Eagle",
                "nfc_number" => "04:ED:1E:A1:67:26:81",
                "password" => Hash::make("Eagle"),
                "email" => "eagle@example.com",
            ],
            [
                "name" => "Panda",
                "nfc_number" => "04:BC:EA:AF:66:26:81",
                "password" => Hash::make("Panda"),
                "email" => "panda@example.com",
            ],
            [
                "name" => "Lion",
                "nfc_number" => "04:6E:31:A1:67:26:81",
                "password" => Hash::make("Lion"),
                "email" => "lion@example.com",
            ],
    ];

        foreach($users as $key => $value) {
            User::create($value);
        }
    }
}
