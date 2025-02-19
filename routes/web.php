<?php

// routes/web.php
use Illuminate\Support\Facades\Route;

Route::post('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);

Route::view('/{any?}', 'welcome')
    ->name('welcome')
    ->where('any', '.*');
