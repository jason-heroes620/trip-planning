<?php

namespace App\Http\Controllers;

use App\Events\OrderRequestEvent;
use App\Models\Fees;
use App\Models\Item;
use App\Models\Location;
use App\Models\LocationDetail;
use App\Models\LocationImages;
use App\Models\Order;
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
use App\Models\ProposalDiscount;
use App\Models\ReservedDates;
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

            $discount = 0;
            $proposal_discount = ProposalDiscount::where('proposal_id', $p['proposal_id'])->first();
            if ($proposal_discount) {
                if ($proposal_discount['discount_type'] == "F") {
                    $discount = $proposal_discount['discount_amount'];
                } else {
                    $discount = $amount * $proposal_discount['discount_amount'] / 100;
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

        $end_date = null;
        foreach ($proposal_product as $p) {
            $location = Location::where('id', $p['product_id'])->first();
            $p['location'] = $location;
            $p['url'] = (new LocationController)->getImage($location['product_image']);
            $detail = LocationDetail::where('product_id', $location['id'])->first();

            if ($end_date === null) {
                $end_date = $detail['event_end_date'];
            } else {
                if ($end_date < $detail['event_end_date'])
                    $end_date = $detail['event_end_date'];
            }
        }

        $product_prices = ProposalProduct::leftJoin('proposal_product_price', 'proposal_product_price.proposal_product_id', 'proposal_product.proposal_product_id')->where('proposal_id', $req->id)->get();

        // if ($proposal["status"] > 0) {
        // $items = Item::where('item_status', 0)->get(["item_id", "item_name", "unit_price", "item_type", "uom", "additional_unit_cost", "item_image", "item_status"]);
        // } else {
        $items = Item::where('item_status', 0)->get(["item_id", "item_name", "unit_price", "item_type", "uom", "additional_unit_cost", "item_image", "item_status", "item_description", "product_id"]);
        // }

        foreach ($items as $item) {
            $item['url'] = $this->getImage($item['item_image']);
        }

        $proposal_item = ProposalItem::leftJoin('item', 'proposal_item.item_id', '=', 'item.item_id')
            ->where('proposal_item.proposal_id', $req->id)->get(["item.item_id", "item_name", "item.uom", "item_qty", "proposal_item.unit_price", "item.sales_tax", "item_type", "item.additional_unit_cost"]);

        $origin = School::where('user_id', $proposal['user_id'])->select(['school_name', 'city', 'google_location'])->first();
        // $proposal['origin'] = $origin['school_name'] . ', ' . $origin['city'];
        $proposal['origin'] = $origin['google_location'];



        $amount = 0;
        foreach ($product_prices as $p) {
            $amount += $p['qty'] * $p['unit_price'];
        }
        foreach ($proposal_item as $p) {
            $amount += $p['item_qty'] * $p['unit_price'];
        }
        $proposal_discount = ProposalDiscount::where('proposal_id', $req->id)->first();

        if ($proposal_discount) {
            if ($proposal_discount['discount_type'] == "F") {
                $proposal['discount_type'] = 'F';
                $proposal['discount_amount'] = $proposal_discount['discount_amount'];
            } else {
                $proposal['discount_type'] = 'P';
                $proposal['discount_percentage'] = $proposal_discount['discount_amount'];
                $proposal['discount_amount'] = $amount * $proposal_discount['discount_amount'] / 100;
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
            'proposal_endDate' => $end_date,
        ]);
    }

    public function update(Request $req)
    {
        $user = $req->user();
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
                    ->where('attribute', 'student')
                    ->update([
                        'qty' => $req->input('qty_student')
                    ]);
                ProposalProductPrice::where('proposal_product_id', $p['proposal_product_id'])
                    ->where('attribute', 'teacher')
                    ->update([
                        'qty' => $req->input('qty_teacher')
                    ]);
            }

            ProposalItem::where('proposal_id', $req->input('proposal_id'))->delete();

            if (sizeof($req->input('proposal_items')) > 0) {
                $this->addOrRemoveProposalItem($req->input('proposal_items'), $req->input('proposal_id'));
            }

            $data["success"] = "Proposal updated";
            if ($req->input('proposal_status')) {
                Proposal::where('proposal_id', $req->input('proposal_id'))->update([
                    'proposal_status' => $req->input('proposal_status')
                ]);
                $data["request_order"] = "Your request has been submitted. Please allow 3 - 5 working days to verify and generate your order.";
                // add event to notify admin

                $proposal = Proposal::where('proposal_id', $req->input('proposal_id'))->first();
                $school = School::where('user_id', $user->id)->first();

                event(new OrderRequestEvent($school, $proposal));
            }

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

            $price = Location::select(["teacher_price", "student_price"])->where('id', $req->input('product_id'))->first();

            ProposalProductPrice::create([
                'proposal_product_id' => $proposal_product['proposal_product_id'],
                'uom' => 'pax',
                'unit_price' => $price["student_price"],
                'attribute' => 'student',
                'qty' => 1,
                'sales_tax' => 0.00
            ]);

            ProposalProductPrice::create([
                'proposal_product_id' => $proposal_product['proposal_product_id'],
                'uom' => 'pax',
                'unit_price' => $price["teacher_price"],
                'attribute' => 'teacher',
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
        $proposal = Proposal::where('proposal_id', $req->id)->first();
        $proposal = Proposal::where('proposal_id', $req->id)->first();
        $proposal_product = ProposalProduct::where('proposal_id', $req->id)->get();
        $order = Order::where('proposal_id', $req->id)->get();

        $school = School::where('user_id', $proposal['user_id'])->first();
        $schoolLogo =
            base64_encode(file_get_contents($school['school_logo']));
        $product_images = [];

        foreach ($proposal_product as $p) {
            $location = Location::where('id', $p['product_id'])->first();
            $file_name = explode('/', $location['product_image']);
            $image = $file_name[sizeof($file_name) - 1];
            $p['location'] = $location;
            // $p['url'] = (new LocationController)->getImage($location['product_image']);
            // $p['image'] = base64_encode(file_get_contents($location['product_image']));
            $p['product'] = $location['product_name'];
            $p['description'] = $location['product_description'];
            $p['activities'] = $location['product_description'];
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
            'cost_per_student' => round(($order->sum('order_amount') + ($proposal['markup_per_student'] * $proposal['qty_student'])) / ($proposal['qty_student'] + $proposal['qty_teacher'])),
            'schoolLogo' => $schoolLogo,
            'images' => $product_images,
        ];

        $pdf = Pdf::loadView('pdf_invoice', $data)->setPaper('a4', 'potrait');
        // return $pdf->download('example.pdf'); // or use stream() to view it in the browser
        return $pdf->download('proposal.pdf'); // or use stream() to view it in the browser
    }

    public function addMarkup(Request $req)
    {
        try {
            Proposal::where('proposal_id', $req->id)->update([
                'markup_per_student' => $req->input('markup_per_student')
            ]);
            $data['success'] = "Markup Has Been Added.";

            return response()->json($data);
        } catch (Exceptions $e) {
            Log::error("Error adding markup . " . $req->id . " " . $e);
            $data['error'] = "Failed To Add Markup Per Student.";

            return response()->json($data);
        }
    }

    public function getDisabledDays(Request $req)
    {
        $proposal_products = ProposalProduct::where('proposal_id', $req->id)->get(['product_id']);
        $data = [0, 6];
        foreach ($proposal_products as $p) {
            $detail = LocationDetail::where('product_id', $p['product_id'])->first();

            if ($detail['monday_start_time'] === null)
                array_push($data, 1);
            if ($detail['tuesday_start_time'] === null)
                array_push($data, 2);
            if ($detail['wednesday_start_time'] === null)
                array_push($data, 3);
            if ($detail['thursday_start_time'] === null)
                array_push($data, 4);
            if ($detail['friday_start_time'] === null)
                array_push($data, 5);
        }

        return response()->json(array_unique($data));
    }

    public function getDisabledDates(Request $req)
    {
        $user = $req->user();
        $reserved = [];
        $dates = ReservedDates::whereIn('product_id', $req->input('locationId'))->where('reserved_date', '>=', now())->get();
        foreach ($dates as $date) {
            $product = Location::where('id', $date['product_id'])->first();
            $count = ReservedDates::where('reserved_date', $date['reserved_date'])->count();
            if ($date['user_id'] !== $user->id && $product['max_group'] < $count + 1) {
                array_push($reserved, $date['reserved_date']);
            }
        }

        return array_unique($reserved);
    }
}
