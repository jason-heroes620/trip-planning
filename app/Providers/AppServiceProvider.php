<?php

namespace App\Providers;

use App\Events\OrderPaymentEvent;
use App\Events\QuotationAcceptedEvent;
use App\Events\QuotationRequestEvent;
use App\Events\SchoolRegistrationAdminEvent;
use App\Events\SchoolRegistrationEvent;
use App\Listeners\OrderPayment;
use App\Listeners\QuotationAccepted;
use App\Listeners\QuotationRequest;
use App\Listeners\SchoolRegistration;
use App\Listeners\SchoolRegistrationAdmin;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Event::listen(
            SchoolRegistrationEvent::class,
            SchoolRegistration::class,
        );

        Event::listen(
            SchoolRegistrationAdminEvent::class,
            SchoolRegistrationAdmin::class
        );

        Event::listen(
            QuotationRequestEvent::class,
            QuotationRequest::class,
        );

        Event::listen(
            QuotationAcceptedEvent::class,
            QuotationAccepted::class,
        );

        Event::listen(
            OrderPaymentEvent::class,
            OrderPayment::class
        );
    }
}
