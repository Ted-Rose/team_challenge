<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TeamsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $teams = Team::all();

        return $teams->toArray();
    }

    public function show($id)
    {
        $team = Team::find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        return $team->toArray();
    }

    public function changePoints(Request $request)
    {
        $id = $request->input('id');
        $points = $request->input('points');

        Log::info("Updating points for team with ID: $id. Points change: $points");

        if (!is_numeric($points)) {
            return response()->json(['message' => 'Invalid points value'], 400);
        }

        $team = Team::find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $currentPoints = $team->points;
        $newPoints = $currentPoints + $points;
        $message = 'Points added successfully';

        // Update points for all players with the same teams_id
        Player::where('teams_id', $id)->update(['points' => \DB::raw("points + $points")]);

        $team->points = $newPoints;
        $team->save();

        return response()->json(['message' => $message, 'team' => $team], 200);
    }

}
