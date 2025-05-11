<?php

use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SchoolController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('sendPasswordResetLink', [PasswordResetLinkController::class, 'store']);

Route::get('eghlpaymentcallback', [OrderController::class, 'eghlpaymentcallback']);
Route::post('eghlpaymentcallback', [OrderController::class, 'eghlpaymentcallback']);


Route::post('upload_school_logo/{id}', [SchoolController::class, 'upload_school_logo']);
