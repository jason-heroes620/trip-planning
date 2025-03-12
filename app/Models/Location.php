<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $connection = 'merchant';
    protected $table = 'products';

    public function filters()
    {
        return $this->belongsToMany(Filters::class)->using(LocationFilter::class);
    }
}
