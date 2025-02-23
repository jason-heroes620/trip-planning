<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Location;
use App\Models\Order;
use App\Models\OrderTotal;
use App\Models\PaymentDetails;
use App\Models\Proposal;
use App\Models\ProposalItem;
use App\Models\ProposalProduct;
use App\Models\ProposalProductPrice;
use App\Models\Quotation;
use App\Models\QuotationDiscount;
use App\Models\School;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $req)
    {
        $user = $req->user();
        $invoices = Invoice::where('user_id', $user->id)->orderBy('created_at', 'DESC')->paginate(10);

        return Inertia::render('Invoices', compact('invoices'));
    }

    public function view(Request $req)
    {
        $invoice = Invoice::where('invoice_id', $req->id)->first();
        $order = Order::where('order_id', $invoice['order_id'])->first();
        $proposal = Proposal::where('proposal_id', $order['proposal_id'])->first();

        $total = 0;
        $product_price = [];
        $proposalProduct = ProposalProduct::where('proposal_product.proposal_id', $proposal['proposal_id'])->get();
        foreach ($proposalProduct as $product) {
            $product_price = ProposalProductPrice::where('proposal_product_id', $product['proposal_product_id'])->get();
            $product['product_price'] = $product_price;
            $product['product'] = Location::select(["product_name"])->where('id', $product['product_id'])->first();
            foreach ($product_price as $price) {
                $total += $price['qty'] * $price['unit_price'];
            }
        }

        $proposalItems = ProposalItem::leftJoin('item', 'item.item_id', 'proposal_item.item_id')
            ->where('proposal_id', $proposal['proposal_id'])
            ->get(["item.item_name", "proposal_item.item_qty", "proposal_item.unit_price"]);

        foreach ($proposalItems as $item) {
            $total += $item['item_qty'] * $item['unit_price'];
        }

        $orderTotal = OrderTotal::where('order_id', $order['order_id'])->orderBy('sort_order', 'asc')->get();

        $school = School::where('user_id', $proposal['user_id'])->first();
        $payment = PaymentDetails::where("order_no", $order["order_no"])->first();

        return Inertia::render(
            'Invoice',
            compact('invoice', 'order', 'proposal', 'proposalProduct', 'proposalItems', 'orderTotal', 'payment')
        );
    }

    public function payment_info(Request $req)
    {
        $invoice = Invoice::where('invoice_id', $req->id)->first();
        return response()->json(['invoice_amount' => $invoice['invoice_amount']]);
    }

    public function payment_process(Request $req)
    {
        $invoice = Invoice::where('invoice_id', $req->id)->first();
        return Inertia::render('ProcessPayment', ['invoiceNo' => $invoice['invoice_no'], 'invoiceAmount' => $invoice['invoice_amount']]);
    }
}
