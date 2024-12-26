<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QuotationController extends Controller
{
    public function index()
    {
        $quotations = [];
        return Inertia::render('Quotations', compact('quotations'));
    }
}
