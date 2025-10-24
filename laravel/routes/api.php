<?php

use App\Http\Controllers\RecepiesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

route::apiResource('recepies',RecepiesController::class);
