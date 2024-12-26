<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationImages extends Model
{
    protected $connection = 'merchant';
    protected $table = 'product_images';
}
