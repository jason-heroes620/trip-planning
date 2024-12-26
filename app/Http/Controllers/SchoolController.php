<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Support\Facades\Exceptions;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Symfony\Component\Uid\UuidV8;

class SchoolController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $req)
    {
        try {
            School::create([
                'school_id' => UuidV8::v4(),
                'school_name' => $req->input('school_name'),
                'address_1' => $req->input('address_1'),
                'address_2' => $req->input('address_2'),
                'address_3' => $req->input('address_3'),
                'city' => $req->input('city'),
                'postcode' => $req->input('postcode'),
                'state' => $req->input('state'),
                'contact_person' => $req->input('contact_person'),
                'contact_no' => $req->input('contact_no'),
                'mobile_no' => $req->input('mobile_no'),
                'email' => $req->input('email'),
            ]);

            // need event to send email notification to admin and user
            return redirect()->back()->with(['success' => '']);
        } catch (Exceptions $e) {
            return redirect()->back()->with(['fail' => '']);
        }
    }
}
