<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'invoice';
    protected $primaryKey = 'invoice_id';

    protected $fillable = [
        'quotation_id',
        'user_id',
        'invoice_no',
        'invoice_date',
        'invoice_amount',
        'due_date',
        'invoice_status'
    ];
}
