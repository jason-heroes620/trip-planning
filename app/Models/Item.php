<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = "item";
    public $timestamps = false;

    protected $fillable = [
        'item_code',
        'item_name',
        'uom',
        'unit_price',
        'additional',
        'additional_unit_cost',
        'sales_tax',
        'item_type',
        'provider_id',
        'item_status',
        'item_description'
    ];
}
