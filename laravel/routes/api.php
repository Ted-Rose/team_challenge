<?php

use App\Http\Controllers\Api\TeamsController;
use App\Http\Controllers\Api\PlayersController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});


  Route::get('/teams', [TeamsController::class, 'index'])->name('team.index');
  Route::get('/teams/{id}', [TeamsController::class, 'show'])->name('team.show');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
return $request->user();
});

Route::prefix('change-team-points')->group(function () {
  Route::post('/', [TeamsController::class, 'changePoints']);
});

Route::prefix('players')->group(function () {
  Route::get('/', [PlayersController::class, 'index'])->name('player.index');
  Route::get('/{id}', [PlayersController::class, 'show'])->name('player.show');
});

Route::prefix('change-player-points')->group(function () {
  Route::post('/', [PlayersController::class, 'changePoints']);
});

Route::prefix('change-player-points')->group(function () {
  Route::post('/', [PlayersController::class, 'changePoints']);
});

Route::post("/login", [AuthController::class, "login"]);

