<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProposalController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('guest')->group(
    function () {
        Route::get('register', [SchoolController::class, 'create'])->name('school.create');
        Route::post('register', [SchoolController::class, 'register'])->name('school.register');
    }
);

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // trips
    Route::get('/locations', [LocationController::class, 'index'])->name('locations.index');
    Route::get('/location/{id}', [LocationController::class, 'view'])->name('location.view');

    // billing
    Route::get('/quotations', [QuotationController::class, 'index'])->name('quotation.index');
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoice.index');


    // proposal
    Route::get('/proposal/checkExistingProposal', [ProposalController::class, 'checkExistingProposal'])->name('proposal.check');

    // account
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
