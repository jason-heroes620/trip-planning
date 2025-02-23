<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuotationItem extends Model
{
    protected $table = 'quotation_item';
    protected $primaryKey = 'quotation_item_id';
    public $timestamps = false;

    protected $fillable = [
        'quotation_id',
        'item_id',
        'uom',
        'item_qty',
        'unit_price',
        'sales_tax',
    ];
}
