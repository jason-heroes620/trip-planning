<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservedDates extends Model
{
    protected $table = 'reserved_dates';
    protected $primaryKey = 'reserved_date_id';

    protected $fillable = [
        'reserved_date',
        'user_id',
        'product_id',
        'reserved_date_status',
    ];
}
