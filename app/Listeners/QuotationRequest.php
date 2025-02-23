<?php

namespace App\Listeners;

use App\Events\QuotationRequestEvent;
use App\Mail\QuotationRequestEmail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class QuotationRequest
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(QuotationRequestEvent $event): void
    {
        Log::info('Quotation Requested, ' . 'school: ' . $event->school['school_name']);
        $emails = ['admin@heroes.my', 'jason.w@heroes.my'];
        Mail::to($emails)->send(new QuotationRequestEmail($event->school));
    }
}
