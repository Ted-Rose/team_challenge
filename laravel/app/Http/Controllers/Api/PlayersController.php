<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PlayersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

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
        $newPoints = $currentPoints + $points;
        $message = 'Points added successfully';

        $player->points = $newPoints;
        $player->save();

        return response()->json(['message' => $message, 'player' => $player], 200);
    }
}
