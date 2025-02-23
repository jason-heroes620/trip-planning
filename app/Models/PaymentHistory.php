<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentHistory extends Model
{
    protected $table = 'payment_history';
    protected $primaryKey = 'payment_history_id';
    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'status',
        'payment_description',
        'created'
    ];
}
