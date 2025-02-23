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
        $newProducts = Location::where('status', 0)->orderBy('created', 'desc')->take(5)->get();
        $product_ids = [];
        foreach ($newProducts as $p) {
            array_push($product_ids, $p['id']);
        }
        $products = Location::where('status', 0)->whereNotIn('id', $product_ids)->orderBy('created', 'desc')->paginate(12);

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

        foreach ($product_images as $i) {
            $i['url'] = $this->getImage($i['image_path']);
        }

        return Inertia::render('Location', [
            'product' => $product,
            'productDetail' => $product_detail,
            'productImages' => $product_images,
        ]);
    }

    public function getImage($product)
    {
        if ($product) {
            $file_name = explode('/', $product);
            $image = "http://localhost:8000/storage/productImages/" . $file_name[sizeof($file_name) - 1];
            return $image;
        }
        return;
    }
}
