<?php

namespace App\Listeners;

use App\Events\SchoolRegistrationEvent;
use App\Mail\SchoolRegistrationEmail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SchoolRegistration
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
    public function handle(SchoolRegistrationEvent $event): void
    {
        Log::info('School approved mail sent to ' . $event->school['email']);
        // $emails = [$event->school['email'], 'admin@heroes.my'];
        $emails = [$event->school['email']];
        $bccEmail = ['jason.w@heroes.my'];
        Mail::to($emails)
            ->bcc($bccEmail)
            ->send(new SchoolRegistrationEmail($event->school));
    }
}
