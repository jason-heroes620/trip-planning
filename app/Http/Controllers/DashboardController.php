<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Order;
use App\Models\Proposal;
use App\Models\ProposalProduct;
use App\Models\Quotation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $proposal_count = Proposal::select('proposal_status', DB::raw('count(*) as total'))->whereIn('proposal_status', [0, 2])->groupBy('proposal_status')->get();
        $quotation_count = Quotation::select('quotation_status', DB::raw('count(*) as total'))->whereIn('quotation_status', [0, 1, 3])->groupBy('quotation_status')->get();
        $order_count = Order::where('order_status', '<=', 1)->count();

        $proposals = Order::select(['proposal_id'])->where('order_status', 2)->get();

        foreach ($proposals as $p) {
            $proposal_date = Proposal::select(['proposal_date'])->where('proposal_id', $p['proposal_id'])->first();
            $product = ProposalProduct::where('proposal_id', $p['proposal_id'])->first();
            $location = Location::where('id', $product['product_id'])->first();
            $p['image'] = $this->getImage($location['product_image']);
            $p['proposal_date'] = $proposal_date['proposal_date'];
        }

        $upcoming_trips = $proposals;

        return Inertia::render('Dashboard', compact('upcoming_trips', 'proposal_count', 'quotation_count', 'order_count'));
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
