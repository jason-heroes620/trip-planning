<?php

namespace App\Http\Controllers;

use App\Events\OrderPaymentEvent;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Location;
use App\Models\OrderTotal;
use App\Models\PaymentDetails;
use App\Models\PaymentHistory;
use App\Models\PaymentLog;
use App\Models\Proposal;
use App\Models\ProposalFees;
use App\Models\ProposalItem;
use App\Models\ProposalProduct;
use App\Models\ProposalProductPrice;
use App\Models\Quotation;
use App\Models\QuotationDiscount;
use App\Models\School;
use Illuminate\Support\Facades\Log;
use Throwable;

class OrderController extends Controller
{
    public function index(Request $req)
    {
        $user = $req->user();
        $orders = Order::where('user_id', $user->id)->orderBy('created_at', 'DESC')->paginate(10);
        return Inertia::render('Orders', compact('orders'));
    }

    public function view(Request $req)
    {
        $order = Order::where('order_id', $req->id)->first();
        $quotation = Quotation::where('quotation_id', $order['quotation_id'])->first();
        $proposal = Proposal::where('proposal_id', $quotation['proposal_id'])->first();

        $total = 0;
        $fee_amount = 0.00;

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

        $discount = QuotationDiscount::where('quotation_id', $quotation['quotation_id'])->first();

        $proposalItems = ProposalItem::leftJoin('item', 'item.item_id', 'proposal_item.item_id')
            ->where('proposal_id', $proposal['proposal_id'])
            ->get(["item.item_name", "proposal_item.item_qty", "proposal_item.unit_price"]);

        foreach ($proposalItems as $item) {
            $total += $item['item_qty'] * $item['unit_price'];
        }

        $fees = ProposalFees::where('proposal_id', $proposal['proposal_id'])->get();
        foreach ($fees as $fee) {
            $fee_amount += $fee['fee_type'] === 'P' ? $total * $fee['fee_amount'] / 100 : $fee['fee_amount'];
        }
        $total += $fee_amount;
        $orderTotal = OrderTotal::where('order_id', $req->id)->orderBy('sort_order', 'asc')->get();

        $school = School::where('user_id', $proposal['user_id'])->first();

        return Inertia::render(
            'Order',
            compact('order', 'quotation', 'proposal', 'proposalProduct', 'proposalItems', 'school', 'discount', 'fees', 'total', 'orderTotal')
        );
    }

    public function payment_process(Request $req)
    {
        $order = Order::where('order_id', $req->id)->first();
        return Inertia::render('ProcessPayment', ['orderNo' => $order['order_no'], 'orderAmount' => $order['order_amount']]);
    }

    public function eghlpaymentcallback(Request $req)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
            if (!empty($req->post())) {
                $this->paymentCallback($req->post());
            } else {
                $payment['TransactionType'] = $req->TransactionType;
                $payment['PaymentID']       = $req->PaymentID;
                $payment['ServiceID']       = $req->ServiceID;
                $payment['OrderNumber']     = $req->OrderNumber;
                $payment['Amount']          = $req->Amount;
                $payment['CurrencyCode']    = $req->CurrencyCode;
                $payment['TxnID']           = $req->TxnID;
                $payment['PymtMethod']      = $req->PymtMethod;
                $payment['TxnStatus']       = $req->TxnStatus;
                $payment['AuthCode']        = $req->AuthCode;
                $payment['TxnMessage']      = $req->TxnMessage;
                $payment['IssuingBank']     = $req->IssuingBank;
                $payment['HashValue']       = $req->HashValue;
                $payment['HashValue2']      = $req->HashValue2;
                $payment['BankRefNo']       = $req->BankRefNo;

                $this->paymentCallback($payment);
            }
        } else {
            // return $this->sendError('', ['error' => 'Allowed headers POST'], 405);
        }
    }

    private function paymentCallback($payment)
    {
        $TransactionType = $payment['TransactionType'];
        $PaymentID = $payment['PaymentID'];
        $ServiceID = $payment['ServiceID'];
        $OrderNumber = $payment['OrderNumber'];
        $Amount = $payment['Amount'];
        $CurrencyCode = $payment['CurrencyCode'];
        $TxnID = !empty($payment['TxnID']) ? $payment['TxnID'] : '';
        $PymtMethod = $payment['PymtMethod'];
        $TxnStatus = $payment['TxnStatus'];
        $AuthCode = (!empty($payment['AuthCode'])) ? $payment['AuthCode'] : "";
        $TxnMessage = $payment['TxnMessage'];
        $IssuingBank = (!empty($payment['IssuingBank'])) ? $payment['IssuingBank'] : "";
        $HashValue = $payment['HashValue'];
        $HashValue2 = $payment['HashValue2'];
        $BankRefNo = !empty($payment['BankRefNo']) ? $payment['BankRefNo'] : '';

        $payment_detail = new PaymentDetails();
        $payment_history = new PaymentHistory();

        $payment_status = 1;

        if ($TxnStatus == 0) {
            $payment_detail->status = $payment_history->status = $payment_status = 2;
            $payment_history->payment_description = "Successful payment (eGHL Payment) $CurrencyCode $Amount [BankRefNo: $BankRefNo] [TxnStatus: $TxnStatus] [Payment method: $PymtMethod] [Issuing Bank: $IssuingBank]";
        } else if ($TxnStatus == 1) {
            if ($TxnMessage == "Buyer Cancelled") {
                $payment_detail->status = $payment_history->status = $payment_status = 3;
                $payment_history->payment_description = "Payment Cancelled by Shopper(eGHL Response)";
            } else {
                $payment_detail->status = $payment_history->status = $payment_status = 4;
                $payment_history->payment_description = "Failed Payment (eGHL Response) $CurrencyCode $Amount [BankRefNo: $BankRefNo] [TxnStatus:$TxnStatus] [Payment method:$PymtMethod]";
            }
        } else if ($TxnStatus == 2) {
            $payment_detail->status = $payment_history->status = $payment_status = 1;
            $payment_history->payment_description = "Pending Payment (eGHL Response) $CurrencyCode $Amount [BankRefNo: $BankRefNo] [TxnStatus:$TxnStatus] [Payment method:$PymtMethod]";
        }

        $payment_detail->order_no = $OrderNumber;
        $payment_detail->payment_ref = $PaymentID;
        $payment_detail->payment_method = $PymtMethod;
        $payment_detail->issuing_bank = $IssuingBank;
        $payment_detail->bank_ref = $BankRefNo;
        $payment_detail->created = date('Y-m-d H:i:s');
        $payment_detail->save();

        // insert payment_history
        $payment_history->order_no = $OrderNumber;
        $payment_history->created = date('Y-m-d H:i:s');
        $payment_history->save();


        // update event_payment status
        Order::where('order_no', $OrderNumber)
            ->update(
                ['order_status' => $payment_status]
            );

        if ($TxnStatus == 0 && !$this->checkIfPaymentIdExists($PaymentID)) {
            try {
                $payment_log = new PaymentLog();
                $payment_log->payment_ref = $PaymentID;
                $payment_log->created = date('Y-m-d H:i:s');
                $payment_log->save();
            } catch (Throwable $ex) {
                Log::error($ex);
            }
        }
        $order = Order::where('order_no', $OrderNumber)->first();
        $school = School::where('user_id', $order['user_id'])->first();
        if ($payment_status === 2) {
            event(new OrderPaymentEvent($school, $order));
        }

        // print_r($order);
        $domain = config('custom.trip_host') . "order/" . $order['order_id'];
        return redirect()->away($domain)->send();
    }

    private function checkIfPaymentIdExists($payment_id)
    {
        $payment = PaymentLog::where('payment_ref', $payment_id)->get()->count();
        if ($payment > 0) {
            return true;
        }
        return false;
    }
}
