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
        $emails = ['felicia.n@heroes.my', 'afiq.a@heroes.my'];
        $bccEmail = ['jason.w@heroes.my'];

        foreach ($emails as $recipient) {
            Mail::to($recipient)
                ->bcc($bccEmail)
                ->send(new QuotationRequestEmail($event->school));
        }
    }
}
