<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\LocationDetail;
use App\Models\LocationImages;
use Inertia\Inertia;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $newProducts = Location::where('status', 0)->orderBy('created', 'asc')->take(5)->get();
        $products = Location::where('status', 0)->orderBy('created', 'asc')->paginate(10);

        foreach ($products as $product) {
            $product['url'] = $this->getImage($product['product_image']);
        }

        foreach ($newProducts as $product) {
            $product['url'] = $this->getImage($product['product_image']);
        }
        return Inertia::render('Locations', [
            'newProducts' => $newProducts,
            'products' => $products
        ]);
    }

    public function view(Request $req)
    {
        $product = Location::find($req->id);
        $product_detail = LocationDetail::where('product_id', $req->id)->first();
        $product_images = LocationImages::where('product_id', $req->id)->get();

        return Inertia::render('LocationView', [
            'product' => $product,
            'product_detail' => $product_detail,
            'product_images' => $product_images,
        ]);
    }

    private function getImage($product)
    {
        if (!empty($product)) {
            $file_name = explode('/', $product);
            $image = "http://localhost:8001/" . 'storage/productImages/' . $file_name[sizeof($file_name) - 1];
            return $image;
        }
        return;
    }
}
