<?php

namespace App\Http\Controllers;

use App\Events\SchoolRegistrationEvent;
use App\Events\SchoolRegistrationAdminEvent;
use App\Models\School;
use Illuminate\Support\Facades\Exceptions;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
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
            $school_id = UuidV8::v4();
            $school = School::create([
                'school_id' => $school_id,
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

            $school_logo = "";
            if ($req->file('school_logo') && count($req->file('school_logo')) > 0) {
                foreach ($req->file('school_logo') as $file) {
                    $school_logo = storage_path('app/public/schoolLogos');
                    $file_name = $this->randomFileNameGenerator(
                        15,
                        $this->getFileExtension($file->getClientOriginalName())
                    );
                    $file->move($school_logo, $file_name);

                    School::where('school_id', $school_id)->update([
                        'school_logo' => $school_logo . '/' . $file_name,
                    ]);
                }
            }

            // need event to send email notification to admin and user
            event(new SchoolRegistrationEvent($school));
            event(new SchoolRegistrationAdminEvent($school));

            return redirect()->back()->with(['success' => '']);
        } catch (Exceptions $e) {
            Log::info('School registration error.' . $e);
            return redirect()->back()->with(['fail' => '']);
        }
    }

    private function randomFileNameGenerator($length, $extension)
    {
        return substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyz', ceil($length / strlen($x)))), 1, $length) . '.' . $extension;
    }

    private function getFileExtension($file)
    {
        $extension = explode(".", $file);
        return end($extension);
    }
}
