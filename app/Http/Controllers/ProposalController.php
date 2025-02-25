<?php

namespace App\Http\Controllers;

use App\Models\Fees;
use App\Models\Item;
use App\Models\Location;
use App\Models\LocationImages;
use App\Models\Proposal;
use App\Models\ProposalFees;
use App\Models\ProposalItem;
use App\Models\ProposalProduct;
use App\Models\ProposalProductPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\Uid\UuidV8;
use App\Models\Quotation;
use App\Models\QuotationDiscount;
use App\Models\School;
use Barryvdh\DomPDF\Facade\Pdf;

class ProposalController extends Controller
{
    public function checkExistingProposal(Request $req)
    {
        $user = $req->user();
        $proposal = $this->getProposals($user);

        return response()->json(compact('proposal'));
    }

    public function index(Request $req)
    {
        $user = $req->user();
        $proposals = Proposal::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(10);
        foreach ($proposals as $p) {
            $amount = 0.00;
            $fee_amount = 0.00;

            $proposal_item = ProposalItem::where('proposal_id', $p['proposal_id'])->get();
            foreach ($proposal_item as $i) {
                $amount += $i['item_qty'] * $i['unit_price'];
            }

            $proposal_product = ProposalProduct::leftJoin('proposal_product_price', 'proposal_product_price.proposal_product_id', 'proposal_product.proposal_product_id')
                ->where('proposal_id', $p['proposal_id'])->get();
            foreach ($proposal_product as $i) {
                $amount += $i['qty'] * $i['unit_price'];
            }

            $fees = ProposalFees::where('proposal_id', $p['proposal_id'])->get();
            foreach ($fees as $fee) {
                $fee_amount += $fee['fee_type'] === 'P' ? $amount * $fee['fee_amount'] / 100 : $fee['fee_amount'];
            }
            $amount += $fee_amount;

            $quotation = Quotation::select(['quotation_id'])->where('proposal_id', $p['proposal_id'])->first();
            $discount = 0;
            if ($quotation) {
                $quotation_discount = QuotationDiscount::where('quotation_id', $quotation['quotation_id'])->first();
                if ($quotation_discount) {
                    if ($quotation_discount['discount_type'] == "F") {
                        $discount = $quotation_discount['discount_amount'];
                    } else {
                        $discount = $amount * $quotation_discount['discount_amount'] / 100;
                    }
                }
            }

            $p['amount'] = $amount - $discount;
        }

        return Inertia::render('Proposals', [
            'proposals' => $proposals,
        ]);
    }

    public function view(Request $req)
    {
        $proposal = Proposal::where('proposal_id', $req->id)->first();
        $proposal_product = ProposalProduct::where('proposal_id', $req->id)->get();

        foreach ($proposal_product as $p) {
            $location = Location::where('id', $p['product_id'])->first();
            $p['location'] = $location;
            $p['url'] = (new LocationController)->getImage($location['product_image']);
        }

        $product_prices = ProposalProduct::leftJoin('proposal_product_price', 'proposal_product_price.proposal_product_id', 'proposal_product.proposal_product_id')->where('proposal_id', $req->id)->get();

        if ($proposal["status"] > 0) {
            $items = Item::where('item_status', 0)->get(["item_id", "item_name", "unit_price", "item_type", "uom", "additional_unit_cost", "item_image", "item_status"]);
        } else {
            $items = Item::get(["item_id", "item_name", "unit_price", "item_type", "uom", "additional_unit_cost", "item_image", "item_status", "item_description"]);
        }

        foreach ($items as $item) {
            $item['url'] = $this->getImage($item['item_image']);
        }

        $proposal_item = ProposalItem::leftJoin('item', 'proposal_item.item_id', '=', 'item.item_id')
            ->where('proposal_item.proposal_id', $req->id)->get(["item.item_id", "item_name", "item.uom", "item_qty", "proposal_item.unit_price", "item.sales_tax", "item_type", "item.additional_unit_cost"]);

        $origin = School::where('user_id', $proposal['user_id'])->select(['school_name', 'city', 'google_place_name'])->first();
        // $proposal['origin'] = $origin['school_name'] . ', ' . $origin['city'];
        $proposal['origin'] = $origin['google_place_name'];

        $quotation = Quotation::select(['quotation_id'])->where('proposal_id', $p['proposal_id'])->first();

        if ($quotation) {
            $amount = 0;
            foreach ($product_prices as $p) {
                $amount += $p['qty'] * $p['unit_price'];
            }
            foreach ($proposal_item as $p) {
                $amount += $p['item_qty'] * $p['unit_price'];
            }
            $quotation_discount = QuotationDiscount::where('quotation_id', $quotation['quotation_id'])->first();

            if ($quotation_discount) {
                if ($quotation_discount['discount_type'] == "F") {
                    $proposal['discount_type'] = 'F';
                    $proposal['discount_amount'] = $quotation_discount['discount_amount'];
                } else {
                    $proposal['discount_type'] = 'P';
                    $proposal['discount_percentage'] = $quotation_discount['discount_amount'];
                    $proposal['discount_amount'] = $amount * $quotation_discount['discount_amount'] / 100;
                }
            }
        }

        $proposal_fees = ProposalFees::where('proposal_id', $req->id)->get();

        return Inertia::render('Proposal', [
            'proposal' => $proposal,
            'proposal_product' => $proposal_product,
            'product_prices' => $product_prices,
            'items' => $items,
            'proposal_item' => $proposal_item,
            'proposal_fees' => $proposal_fees,
        ]);
    }

    public function update(Request $req)
    {
        try {
            Proposal::where('proposal_id', $req->input('proposal_id'))->update([
                'proposal_name' => $req->input('proposal_name'),
                'proposal_date' => !empty($req->input('proposal_date')) ? date('Y-m-d', strtotime(str_replace('/', '-', $req->input('proposal_date')))) : null,
                'qty_student' => $req->input('qty_student'),
                'qty_teacher' => $req->input('qty_teacher'),
                'special_request' => $req->input('special_request')
            ]);

            $proposal_product = ProposalProduct::where('proposal_id', $req->input('proposal_id'))->get();
            foreach ($proposal_product as $p) {

                ProposalProductPrice::where('proposal_product_id', $p['proposal_product_id'])
                    ->where('attribute', 'child')
                    ->update([
                        'qty' => $req->input('qty_student')
                    ]);
                ProposalProductPrice::where('proposal_product_id', $p['proposal_product_id'])
                    ->where('attribute', 'adult')
                    ->update([
                        'qty' => $req->input('qty_teacher')
                    ]);
            }

            ProposalItem::where('proposal_id', $req->input('proposal_id'))->delete();

            if (sizeof($req->input('proposal_items')) > 0) {
                $this->addOrRemoveProposalItem($req->input('proposal_items'), $req->input('proposal_id'));
            }

            $data["success"] = "Proposal updated";

            return response()->json($data);
        } catch (Exceptions $e) {
            Log::info($e);
            $data["failed"] = "Proposal update failed";
            return response()->json($data);
        }
    }

    public function create(Request $req)
    {
        $user = $req->user();
        $uid = UuidV8::v4();

        if (!sizeof($this->checkIfProposalNameExist($user, $req->input('proposal_name'))) > 0) {
            Proposal::create([
                'proposal_id' => $uid,
                'user_id' => $user->id,
                'proposal_name' => $req->input("proposal_name")
            ]);

            $proposal_product = ProposalProduct::create([
                'proposal_id' => $uid,
                'product_id' => $req->input('product_id'),
            ]);

            $price = Location::select(["adult_price", "child_price"])->where('id', $req->input('product_id'))->first();

            ProposalProductPrice::create([
                'proposal_product_id' => $proposal_product['proposal_product_id'],
                'uom' => 'pax',
                'unit_price' => $price["child_price"],
                'attribute' => 'child',
                'qty' => 1,
                'sales_tax' => 0.00
            ]);

            ProposalProductPrice::create([
                'proposal_product_id' => $proposal_product['proposal_product_id'],
                'uom' => 'pax',
                'unit_price' => $price["adult_price"],
                'attribute' => 'adult',
                'qty' => 1,
                'sales_tax' => 0.00
            ]);

            $data["success"] = "Proposal has been created";
            $data["data"] = $this->getProposals($user);
            return response()->json($data);
        } else {
            $data["error"] = "Proposal name already exist. Please choose another name";
            $data["data"] = $this->getProposals($user);
            return response()->json($data);
        }
    }

    public function travel_info(Request $req)
    {
        try {
            Proposal::where('proposal_id', $req->id)->update([
                'travel_duration' => $req->input('duration'),
                'travel_distance' => $req->input('distance')
            ]);

            return response()->json(['success' => 'Travel info updated']);
        } catch (Exceptions $e) {
            Log::error('Error update distance and duration');
            return response()->json(['error' => 'Error updating travel distance and duration']);
        }
    }

    private function getProposals($user)
    {
        return
            Proposal::select(['proposal_name as label', 'proposal_id as value'])->where('proposal_status', 0)
            ->where('user_id', $user->id)
            ->get();
    }

    private function checkIfProposalNameExist($user, $proposal_name)
    {
        return Proposal::where('user_id', $user->id)->where('proposal_name', $proposal_name)->get();
    }

    private function addOrRemoveProposalItem($itemArray, $proposal_id)
    {
        try {
            // Log::info($itemArray . ' ' . $proposal_id);
            foreach ($itemArray as $t) {
                $item = Item::where('item_id', $t['item_id'])->first();
                ProposalItem::updateOrCreate(
                    ['proposal_id' => $proposal_id, 'item_id' => $t['item_id'],],
                    ['item_qty' => $t['item_qty'], 'uom' => $t['uom'], 'unit_price' => $t['unit_price'], 'sales_tax' => $item['sales_tax']]
                );
            }
        } catch (Exceptions $e) {
            Log::info('error ', $e);
        }
    }

    public function getImage($item)
    {
        if ($item) {
            $file_name = explode('/', $item);
            $image = config('custom.trip_host') . "storage/food/" . $file_name[sizeof($file_name) - 1];
            return $image;
        }
        return;
    }

    public function createProposalPdf(Request $req)
    {
        // $id = '790ea717-fbfd-4fc1-ba20-9c532bbe4076';
        $proposal = Proposal::where('proposal_id', $req->id)->first();
        $proposal = Proposal::where('proposal_id', $req->id)->first();
        $proposal_product = ProposalProduct::where('proposal_id', $req->id)->get();
        $quotation = Quotation::select(["quotation_amount"])->where('proposal_id', $req->id)->first();

        $school = School::where('user_id', $proposal['user_id'])->first();
        $schoolLogo =
            base64_encode(file_get_contents($school['school_logo']));
        $product_images = [];

        foreach ($proposal_product as $p) {
            $location = Location::where('id', $p['product_id'])->first();
            $file_name = explode('/', $location['product_image']);
            $image = $file_name[sizeof($file_name) - 1];
            $p['location'] = $location;
            $p['url'] = (new LocationController)->getImage($location['product_image']);
            $p['image'] = base64_encode(file_get_contents($location['product_image']));
            $p['product'] = $location['product_name'];
            $p['description'] = $location['product_description'];
            $product_images = LocationImages::select(['image_path'])->where('product_id', $p['product_id'])->get();
        }

        foreach ($product_images as $img) {
            $img['image'] =
                base64_encode(file_get_contents($img['image_path']));
        }

        $data = [
            'title' => $proposal['proposal_name'],
            'content' => 'This is a dynamically generated PDF using Laravel DomPDF with Inertia.js.',
            'date' => date('d/M/Y', strtotime($proposal['proposal_date'])),
            'products' => $proposal_product,
            'cost_per_student' => round(($quotation['quotation_amount'] + $proposal['additional_cost']) / ($proposal['qty_student'] + $proposal['qty_teacher'])),
            'schoolLogo' => $schoolLogo,
            'images' => $product_images,
        ];

        $pdf = Pdf::loadView('pdf_invoice', $data)->setPaper('a4', 'potrait');
        // return $pdf->download('example.pdf'); // or use stream() to view it in the browser
        return $pdf->download('proposal.pdf'); // or use stream() to view it in the browser
    }

    public function addAdditionalCost(Request $req)
    {
        try {
            Proposal::where('proposal_id', $req->id)->update([
                'additional_cost' => $req->input('additional_cost')
            ]);
            $data['success'] = "Additional Cost Added.";

            return response()->json($data);
        } catch (Exceptions $e) {
            Log::error("Error adding additional cost. " . $req->id . " " . $e);
            $data['error'] = "Failed to add Additional Cost.";

            return response()->json($data);
        }
    }
}
