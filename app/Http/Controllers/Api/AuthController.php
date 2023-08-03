<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

# Log for debug
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);
        Log::info('Login request received', $request->all());


        // Get the validated data
        $validatedData = $request->all();

        // Dump the validated data to inspect
        // dd($validatedData);

        $user = \App\Models\User::where("email", $request->email)->first();

        Log::info('User logged in', ['user' => $user->toArray()]);
        Log::info('User password', ['user' => $user->password]);
        Log::info('Received password', ['user' => $request->password]);

        if (!$user) {
            throw ValidationException::withMessages([
                "email" => ["The provided credentials are incorrect."]
            ]);
        }

        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                # Don't inform the hacker that he has guessed the username
                "email" => ["The provided credentials are incorrect."]
            ]);
        }

        $token = $user->createToken("api-token")->plainTextToken;

        return response()->json([
            "token" => $token
        ]);
    }

    public function logout(Request $request)
    {

    }
}
