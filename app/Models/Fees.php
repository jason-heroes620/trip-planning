<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fees extends Model
{
    protected $table = 'fees';
    protected $primaryKey = 'fee_id';
    protected $fillable = [
        'fee_description',
        'fee_type',
        'fee_amount',
        'effective_date',
        'expiry_date',
        'fee_status'
    ];
}
