<?php

use App\Http\Controllers\TeamsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PlayersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::prefix('teams')->group(function () {
    Route::get('/', [TeamsController::class, 'index'])->name('team.index');
    Route::get('/{id}', [TeamsController::class, 'show'])->name('team.show');
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
