<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Proposal;
use App\Models\ProposalProduct;
use App\Models\ProposalProductPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Log;

class ProposalProductController extends Controller
{
    public function addProduct(Request $req)
    {
        $user = $req->user();
        if (sizeof($this->checkProductExist($req->input('proposal_id'), $req->input('product_id'))) === 0) {
            $proposal_product = ProposalProduct::create([
                'proposal_id' => $req->input('proposal_id'),
                'product_id' => $req->input('product_id'),
            ]);;

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

            $data['success'] = "Product has been added to your proposal";
            $data['no'] = sizeof($this->checkProductExist($req->input('proposal_id'), $req->input('product_id')));
            return response()->json($data);
        } else {
            $data['error'] = "Product already exist in your proposal";
            return response()->json($data);
        }
    }

    public function deleteProduct(Request $req)
    {
        $user = $req->user();
        try {
            $proposal = Proposal::where('proposal_id', $req->id)->first();
            if ($proposal['user_id'] === $user->id) {
                $product = ProposalProduct::where('proposal_id', $req->id)->where('product_id', $req->input('location_id'))->first();
                if ($product) {
                    ProposalProductPrice::where('proposal_product_id', $product['proposal_product_id'])->delete();
                    $product->delete();
                }

                return response()->json(["success"]);
            }
        } catch (Exceptions $e) {
            Log::error('Error deleting location for proposal. ', $req->id, '. ' . $e);
            return response()->json(['error' => 'Error deleting location from proposal']);
        }
    }

    private function checkProductExist(
        $proposal_id,
        $product_id
    ) {
        return ProposalProduct::where('proposal_id', $proposal_id)->where('product_id', $product_id)->get();
    }
}
