<?php

use App\Http\Controllers\TeamsController;
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

Route::get('/', function () {
    return view('welcome');
});
