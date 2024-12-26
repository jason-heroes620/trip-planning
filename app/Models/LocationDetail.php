<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationDetail extends Model
{
    protected $connection = 'merchant';
    protected $table = 'product_detail';
}
