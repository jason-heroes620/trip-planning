<?php

namespace App\Http\Controllers;

use App\Events\QuotationAcceptedEvent;
use App\Events\QuotationRequestEvent;
use App\Models\Fees;
use App\Models\Location;
use App\Models\Proposal;
use App\Models\ProposalFees;
use App\Models\ProposalProduct;
use App\Models\ProposalItem;
use App\Models\ProposalProductPrice;
use App\Models\ProposalTotal;
use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Models\QuotationProduct;
use App\Models\QuotationProductPrice;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\Uid\UuidV8;
use App\Models\QuotationDiscount;
use App\Models\School;

class QuotationController extends Controller
{
    public function index(Request $req)
    {
        $user = $req->user();
        $quotations = Quotation::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(10);

        foreach ($quotations as $q) {
            $amount = 0.00;
            $fee_amount = 0.00;

            $proposal = Proposal::leftJoin('school', 'school.user_id', '=', 'proposal.user_id')
                ->where('proposal.proposal_id', $q['proposal_id'])->first();

            $quotation_item = ProposalItem::where('proposal_id', $q['proposal_id'])->get();
            foreach ($quotation_item as $i) {
                $amount += $i['item_qty'] * $i['unit_price'];
            }

            $quotation_product = ProposalProduct::leftJoin('proposal_product_price', 'proposal_product_price.proposal_product_id', 'proposal_product.proposal_product_id')
                ->where('proposal_id', $q['proposal_id'])->get();
            foreach ($quotation_product as $i) {
                $amount += $i['qty'] * $i['unit_price'];
            }

            $fees = ProposalFees::where('proposal_id', $proposal['proposal_id'])->get();
            foreach ($fees as $fee) {
                $fee_amount += $fee['fee_type'] === 'P' ? $amount * $fee['fee_amount'] / 100 : $fee['fee_amount'];
            }
            $amount += $fee_amount;

            $quotation_discount = QuotationDiscount::where('quotation_id', $q['quotation_id'])->first();
            $discount = 0;
            if ($quotation_discount) {
                if ($quotation_discount['discount_type'] == "F") {
                    $discount = $quotation_discount['discount_amount'];
                } else {
                    $discount = $amount * $quotation_discount['discount_amount'] / 100;
                }
            }
            $q['proposal_name'] = $proposal['proposal_name'];
            $q['amount'] = $amount - $discount;
        }

        return Inertia::render('Quotations', [
            'quotations' => $quotations,
        ]);
    }

    public function create(Request $req)
    {
        $quotation_id = UuidV8::v4();
        $user = $req->user();

        try {
            Proposal::where('proposal_id', $req->input('proposal_id'))->update([
                'proposal_status' => 2,
            ]);

            Quotation::create([
                'quotation_id' => $quotation_id,
                'quotation_no' => "",
                'quotation_date' => date('Y-m-d'),
                'proposal_id' => $req->input('proposal_id'),
                'user_id' => $user->id,
            ]);

            // ProposalTotal::create([
            //     'proposal_id' => $req->input('proposal_id'),
            //     'code' => 'sub_total',
            //     'title' => 'Sub Total',
            //     'value' => $req->input('subTotal'),
            //     'sort_order' => 1
            // ]);

            // ProposalTotal::create([
            //     'proposal_id' => $req->input('proposal_id'),
            //     'code' => 'total',
            //     'title' => 'Total',
            //     'value' => $req->input('total'),
            //     'sort_order' => 99
            // ]);

            // $proposal_product = ProposalProduct::where('proposal_id', $req->input('proposal_id'))->get();
            // foreach ($proposal_product as $p) {
            //     $quotation_product = QuotationProduct::create([
            //         'product_id' => $p['product_id'],
            //         'quotation_id' => $quotation_id
            //     ]);

            //     $proposal_price = ProposalProductPrice::where('proposal_product_id', $p['proposal_product_id'])->get();
            //     foreach ($proposal_price as $pp) {
            //         QuotationProductPrice::create([
            //             'quotation_product_id' => $quotation_product['quotation_product_id'],
            //             'attribute' => $pp['attribute'],
            //             'uom' => $pp['uom'],
            //             'qty' => $pp['qty'],
            //             'unit_price' => $pp['unit_price'],
            //             'sales_tax' => $pp['sales_tax'],
            //         ]);
            //     }
            // }

            // $proposal_item = ProposalItem::where('proposal_id', $req->input('proposal_id'))->get();
            // foreach ($proposal_item as $p) {
            //     QuotationItem::create([
            //         'item_id' => $p['item_id'],
            //         'uom' => $p['uom'],
            //         'item_qty' => $p['item_qty'],
            //         'unit_price' => $p['unit_price'],
            //         'sales_tax' => $p['sales_tax'],
            //         'quotation_id' => $quotation_id
            //     ]);
            // }
            $school = School::where('user_id', $user->id)->first();
            event(new QuotationRequestEvent($school));
            $data["success"] = "Your request for quotation has been sent. Please allow 3 - 5 business days for us to process your request.";

            return response()->json($data);
        } catch (Exceptions $e) {
            Log::info('Error in create quotation for proposal id ' . $req->input('proposal_id') . ' ' . $e);
            $data["failed"] = "There was an issue processing your request. Please seek help from Heroes admin.";
            return response()->json($data);
        }
    }

    public function view(Request $req)
    {
        $quotation = Quotation::where('quotation_id', $req->id)->first();
        $proposal = Proposal::where('proposal_id', $quotation['proposal_id'])->first();
        $quotation_product = ProposalProduct::where('proposal_id', $quotation['proposal_id'])->get();
        $prices = [];
        foreach ($quotation_product as $p) {
            $location = Location::where('id', $p['product_id'])->first();
            $p['location'] = $location;
            $p['url'] = (new LocationController)->getImage($location['product_image']);
            $price = ProposalProductPrice::where('proposal_product_id', $p['proposal_product_id'])->get();
            $p['price'] = $price;
            $prices = array_merge($price->toArray(), $prices);
        }
        $quotation_item = ProposalItem::leftJoin('item', 'item.item_id', '=', 'proposal_item.item_id')
            ->where('proposal_id', $quotation['proposal_id'])->get(["item.item_id", "item.item_name", "item.item_type", "proposal_item.unit_price", "proposal_item.uom", "proposal_item.item_qty", "item.additional_unit_cost"]);

        $fees = Fees::where('effective_date', '<=', now())->where('expiry_date', null)->get();

        $quotation_discount = QuotationDiscount::where('quotation_id', $req->id)->first();

        return Inertia::render('Quotation', compact('quotation', 'proposal', 'quotation_product', 'quotation_item', 'prices', 'quotation_discount', 'fees'));
    }

    public function accept(Request $req)
    {
        try {
            Quotation::where('quotation_id', $req->id)->update([
                'quotation_status' => 2,
                'accepted_date' => date('Y-m-d H:i:s'),
                'quotation_amount' => $req->input('quotation_amount')
            ]);
            $quotation = Quotation::select(["quotation_no", "user_id"])->where('quotation_id', $req->id)->first();
            $school = School::select("school_name")->where("user_id", $quotation['user_id'])->first();

            event(new QuotationAcceptedEvent($quotation, $school));
            $data["success"] = "Quotation has been accepted. Please allow 3 - 5 business days for us to process your request.";
            // need notification to admin

            return response()->json($data);
        } catch (Exceptions $e) {
            Log::info('Error in accept quotation for quotation id ' . $req->id . ' ' . $e);
            $data["failed"] = "There was an issue processing your request. Please seek help from Heroes admin.";
            return response()->json($data);
        }
    }
}
