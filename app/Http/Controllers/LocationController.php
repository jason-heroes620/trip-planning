<?php

namespace App\Http\Controllers;

use App\Models\Filters;
use App\Models\Location;
use App\Models\LocationDetail;
use App\Models\LocationFilter;
use App\Models\LocationImages;
use Inertia\Inertia;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index(Request $req)
    {
        $query = Location::query();
        $query->leftJoin('product_filter', 'product_filter.product_id', 'products.id')->where('products.status', 0);

        // Apply search filter
        if ($req->filled('search')) {
            $query->where('product_name', 'like', '%' . $req->search . '%');
        }

        // show latest created locations order by date desc
        $newProducts = Location::select(['id', 'product_name', 'merchant_id', 'location', 'student_price', 'product_image'])->where('status', 0)->orderBy('created', 'desc')->take(6)->get();
        $product_ids = [];
        foreach ($newProducts as $p) {
            array_push($product_ids, $p['id']);
        }

        $products = [];
        if ($req->filled('search') || $req->filled('filter')) {
            if ($req->filled('filter')) {
                $products = $query->whereIn('product_filter.filter_id', $req->filter)->distinct()->paginate(12);
            } else {
                $products = $query->distinct()->paginate(12);
            }
        } else {
            $products = Location::select(['id', 'product_name', 'merchant_id', 'location', 'student_price', 'product_image'])
                ->where('status', 0)
                ->whereNotIn('id', $product_ids)
                ->orderBy('created', 'desc')
                ->paginate(12);
        }

        if (count($products) > 0) {
            foreach ($products as $product) {
                $filter = "";
                $product['url'] = $this->getImage($product['product_image']);
                $filters = LocationFilter::leftJoin('filters', 'product_filter.filter_id', 'filters.filter_id')
                    ->where('product_filter.product_id', $product['id'])->get("filters.filter_description");
                $index = 0;
                foreach ($filters as $f) {

                    $filter .= $f['filter_description'];
                    $index++;
                    $index < count($filters) ? $filter .= ", " : "";
                }
                $product['filters'] = $filter;
            }
        }
        // print_r($products);

        foreach ($newProducts as $product) {
            $product['url'] = $this->getImage($product['product_image']);
        }

        $filters = Filters::where('filter_status', 0)->orderBy('filter_description', 'DESC')->get(["filter_id", "filter_description"]);

        return Inertia::render('Locations', [
            'newProducts' => $newProducts,
            'products' => $products,
            'filters' => $filters,
            'search' => $req->search,
            'filter' => $req->filter
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
            $image = config('custom.merchant_host') . "storage/productImages/" . $file_name[sizeof($file_name) - 1];
            return $image;
        }
        return;
    }

    public function autocomplete(Request $req)
    {
        $search = $req->query('search');

        $products = Location::where('product_name', 'like', "%{$search}%")
            ->where('status', 0)
            ->limit(6)
            ->pluck('product_name');

        return response()->json($products);
    }
}
