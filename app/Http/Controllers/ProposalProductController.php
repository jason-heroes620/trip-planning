<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\ProposalProduct;
use App\Models\ProposalProductPrice;
use Illuminate\Http\Request;

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

            $price = Location::select(["teacher_price", "child_price"])->where('id', $req->input('product_id'))->first();
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

    private function checkProductExist(
        $proposal_id,
        $product_id
    ) {
        return ProposalProduct::where('proposal_id', $proposal_id)->where('product_id', $product_id)->get();
    }
}
