<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function changePoints(Request $request)
    {
        $id = $request->input('id');
        $points = $request->input('points');

        Log::info("Updating points for player with ID: $id. New points: $points");

        if (!is_numeric($points)) {
            return response()->json(['message' => 'Invalid points value'], 400);
        }

        $player = Player::find($id);

        if (!$player) {
            return response()->json(['message' => 'Player not found'], 404);
        }

        $currentPoints = $player->points;

        // Calculate the new points
        $newPoints = $currentPoints + $points;

        $player->points = $newPoints;
        $player->save();

        return response()->json(['message' => 'Points updated successfully', 'player' => $player], 200);
    }
}
