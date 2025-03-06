<?php

namespace App\Listeners;

use App\Events\QuotationAcceptedEvent;
use App\Mail\QuotationAcceptedEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;


class QuotationAccepted
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
    public function handle(QuotationAcceptedEvent $event): void
    {
        Log::info('School approved mail sent to ' . $event->school['email']);
        $emails = ['felicia.n@heroes.my', 'afiq.a@heroes.my'];
        $bccEmail = ['jason.w@heroes.my'];

        foreach ($emails as $recipient) {
            Mail::to($recipient)
                ->bcc($bccEmail)
                ->send(new QuotationAcceptedEmail($event->quotation, $event->school));
        }
    }
}
