<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentLog extends Model
{
    protected $table = "payment_log";
    protected $primaryKey = "payment_log_id";
    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'payment_ref',
        'created',
    ];
}
