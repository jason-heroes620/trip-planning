<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filters extends Model
{
    protected $connection = "merchant";
    protected $table = "filters";
    protected $primaryKey = "filter_id";

    protected $fillable = [
        'filter_name',
        'filter_description',
        'filter_status'
    ];

    public function locations()
    {
        return $this->belongsToMany(Location::class)->using(LocationFilter::class);
    }
}
