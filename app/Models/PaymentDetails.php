<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentDetails extends Model
{
    protected $table = "payment_details";
    protected $primaryKey = "payment_detail_id";
    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'payment_ref',
        'payment_method',
        'issuing_bank',
        'bank_ref',
        'status',
        'created',
    ];
}
