<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayersController extends Controller
{
    public function index()
    {
        $Players = Player::all();

        return $Players->toArray();
    }

    public function show($id)
    {
        $Player = Player::find($id);

        if (!$Player) {
            return response()->json(['message' => 'Player not found'], 404);
        }

        return $Player->toArray();
    }

    public function update(Request $request, $id)
    {
        //
    }
}
