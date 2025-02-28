<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Order;
use App\Models\Proposal;
use App\Models\ProposalProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $proposals = Order::select(['proposal_id'])->where('order_status', 2)->get();

        foreach ($proposals as $p) {
            $proposal_date = Proposal::select(['proposal_date'])->where('proposal_id', $p['proposal_id'])->first();
            $product = ProposalProduct::where('proposal_id', $p['proposal_id'])->first();
            $location = Location::where('id', $product['product_id'])->first();
            $p['image'] = $this->getImage($location['product_image']);
            $p['proposal_date'] = $proposal_date['proposal_date'];
        }

        $upcoming_trips = $proposals;

        return Inertia::render('Dashboard', compact('upcoming_trips'));
    }

    public function home()
    {
        return Inertia::render('Home');
    }

    public function getImage($product)
    {
        if ($product) {
            $file_name = explode('/', $product);
            $image = config('custom.merchant_host') . "storage/productImages/" . $file_name[sizeof($file_name) - 1];
            return $image;
        }
        return;
    }
}
