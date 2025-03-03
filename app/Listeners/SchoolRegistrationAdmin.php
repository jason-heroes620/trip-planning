<?php

namespace App\Listeners;

use App\Events\SchoolRegistrationAdminEvent;
use App\Mail\SchoolRegistrationAdminEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;


class SchoolRegistrationAdmin
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
    public function handle(SchoolRegistrationAdminEvent $event): void
    {
        Log::info('School approved mail sent to ' . $event->school['email']);
        // $emails = [$event->school['email'], 'admin@heroes.my'];
        $emails = ['felicia.n@heroes.my', 'afiq.a@heroes.my'];
        $bccEmail = ['jason.w@heroes.my'];
        Mail::to($emails)
            ->bcc($bccEmail)
            ->send(new SchoolRegistrationAdminEmail($event->school));
    }
}
