<?php

namespace App\Listeners;

use App\Events\OrderRequestEvent;
use App\Mail\OrderRequestEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;


class OrderRequest
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
    public function handle(OrderRequestEvent $event): void
    {
        Log::info('Order request email sent to admin');
        $emails = ['felicia.n@heroes.my', 'afiq.a@heroes.my'];
        // $emails = ['admin@heroes.my'];
        $bccEmail = ['jason.w@heroes.my'];

        foreach ($emails as $recipient) {
            Mail::to($recipient)
                ->bcc($bccEmail)
                ->send(new OrderRequestEmail($event->school, $event->proposal));
        }
    }
}
