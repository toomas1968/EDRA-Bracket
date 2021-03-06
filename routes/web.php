<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/eliminators', [App\Http\Controllers\EventsController::class, 'index'])->name('eliminators');
Route::get('/eliminators/{eventID}/', [App\Http\Controllers\EventsController::class, 'classesList'])->name('events.classes');
Route::get('/eliminators/{eventID}/bracket', [App\Http\Controllers\EventsController::class, 'bracketTest'])->name('bracket.test');
Route::get('/eliminators/{eventID}/{classID}/bracket', [App\Http\Controllers\EventsController::class, 'bracket'])->name('bracket');

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

require __DIR__.'/auth.php';
