<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthCheckController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return 'Hello World';
});

Route::get('/auth-check', [AuthCheckController::class, 'check']);

Route::middleware(['auth:sanctum', 'web'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum', 'web'])->get('/getEmailOnly', function (Request $request) {
    return User::first()->email;
});

require __DIR__.'/auth.php';
