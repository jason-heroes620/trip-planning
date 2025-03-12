<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationFilter extends Model
{
    protected $connection = "merchant";
    protected $table = "product_filter";
    protected $primaryKey = "product_filter_id";
    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'filter_id'
    ];
}
