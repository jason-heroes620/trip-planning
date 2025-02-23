<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuotationProduct extends Model
{
    protected $table = 'quotation_product';
    protected $primaryKey = 'quotation_product_id';
    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'uom',
        'product_qty',
        'unit_price',
        'sales_tax',
        'quotation_id',
    ];
}
