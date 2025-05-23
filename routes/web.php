<?php

use App\Events\QuotationRequestEvent;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ProposalProductController;
use App\Models\School;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'currentYear' => date('Y')
    ]);
})->name('home');

Route::get('/storage-link', function () {
    Artisan::call('storage:link');
    return "Storage link created";
});

Route::get('/config-cache', function () {
    Artisan::call('config:cache');
    return "Config cache created";
});

Route::get('/register', [SchoolController::class, 'create'])->name('school.create');
Route::post('/register', [SchoolController::class, 'register'])->name('school.register');

Route::get('/view-email-template', function () {
    $school = School::where('school_id', '5a4bfed5-7d01-4ace-919c-a1c7572fc9b9')->first();
    return view('emails.school_registration', compact('school'));
});

Route::get('/view-email-template-quotation-request', function () {
    $school = School::where('school_id', '5a4bfed5-7d01-4ace-919c-a1c7572fc9b9')->first();
    event(new QuotationRequestEvent($school));
    return (new MailMessage)->markdown('emails.quotation_request', compact('school'));
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // locations
    Route::get('/locations/{search?}/{filters?}', [LocationController::class, 'index'])->name('locations.index');
    Route::get('/location/{id}', [LocationController::class, 'view'])->name('location.view');
    Route::get('/locations_autocomplete', [LocationController::class, 'autocomplete'])->name('locations.autocomplete');
    Route::get('/locations_likes', [LocationController::class, 'myLikes'])->name('locations.likes');
    Route::put('/location_like/{id}', [LocationController::class, 'liked'])->name('location.liked');
    Route::put('/location_unlike/{id}', [LocationController::class, 'unliked'])->name('location.unliked');

    // billing
    Route::get('/quotations', [QuotationController::class, 'index'])->name('quotation.index');
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoice.index');


    // proposal
    Route::get('/proposals', [ProposalController::class, 'index'])->name('proposal.index');
    Route::get('/proposal/{id}', [ProposalController::class, 'view'])->name('proposal.view');
    Route::post('/proposal', [ProposalController::class, 'update'])->name('proposal.update');
    Route::get('/checkExistingProposal', [ProposalController::class, 'checkExistingProposal'])->name('proposal.check');
    Route::post('/proposal/create', [ProposalController::class, 'create'])->name('proposal.create');
    Route::patch('/proposal/{id}', [ProposalController::class, 'travel_info'])->name('proposal.travel_info');
    Route::get('/proposal_pdf/{id}', [ProposalController::class, 'createProposalPdf'])->name('proposal.pdf');

    Route::put('/proposal_markup/{id}', [ProposalController::class, 'addMarkup'])->name('proposal.markup');
    Route::get('/getDisabledDays/{id}', [ProposalController::class, 'getDisabledDays'])->name('proposal.getDisabledDays');
    Route::get('/getDisabledDates/{id}', [ProposalController::class, 'getDisabledDates'])->name('proposal.getDisabledDates');

    Route::post('/proposalProduct/add', [ProposalProductController::class, 'addProduct'])->name('proposalProduct.add');
    Route::delete('/proposal_location_delete/{id}', [ProposalProductController::class, 'deleteProduct'])->name('proposal_location.delete');
    Route::post('/proposal_file_upload', [ProposalController::class, 'uploadProposalFile'])->name('proposal_file.upload');
    Route::get('/proposal_file_download/{id}', [ProposalController::class, 'downloadProposalFile'])->name('proposal_file.download');

    // quotation
    Route::post('/quotation', [QuotationController::class, 'create'])->name('quotation.create');
    Route::get('/quotation/{id}', [QuotationController::class, 'view'])->name('quotation.view');
    Route::patch('/quotation/{id}', [QuotationController::class, 'accept'])->name('quotation.accept');

    // orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    Route::get('/order/{id}', [OrderController::class, 'view'])->name('order.view');
    Route::get('/payment_process/{id}', [OrderController::class, 'payment_process'])->name('payment.process');

    // invoice 
    Route::get('/invoice/{id}', [InvoiceController::class, 'view'])->name('invoice.view');
    Route::get('/payment_info/{id}', [InvoiceController::class, 'payment_info'])->name('payment.info');

    // account
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/account', [SchoolController::class, 'view'])->name('account.view');
    Route::post('/account/{id}', [SchoolController::class, 'update'])->name('account.update');

    Route::get('/terms_of_service', function () {
        return Inertia::render('TermsOfService');
    })->name('termsOfService');

    Route::get('/privacy_policy', function () {
        return Inertia::render('PrivacyPolicy');
    })->name('privacyPolicy');
});

require __DIR__ . '/auth.php';
