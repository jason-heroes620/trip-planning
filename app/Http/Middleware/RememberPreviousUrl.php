<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class RememberPreviousUrl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->method() === 'GET' && !$request->is('login')) {
            session(['previous_url' => url()->previous()]);
        }

        Inertia::share([
            'previousUrl' => session('previous_url'),
        ]);

        return $next($request);
    }
}
