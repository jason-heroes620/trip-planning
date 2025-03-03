<?php

namespace App\Listeners;

use App\Events\OrderPaymentEvent;
use App\Mail\OrderPaymentEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;


class OrderPayment
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
    public function handle(OrderPaymentEvent $event): void
    {
        Log::info('Payment made mail sent to admin');
        $emails = ['felicia.n@heroes.my', 'afiq.a@heroes.my'];
        $bccEmail = ['jason.w@heroes.my'];
        Mail::to($emails)
            ->bcc($bccEmail)
            ->send(new OrderPaymentEmail($event->school, $event->order));
    }
}
