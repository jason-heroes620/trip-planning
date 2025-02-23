<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Quotation extends Model
{
    use HasUuids;

    protected $table = 'quotation';
    protected $primaryKey = 'quotation_id';

    protected $fillable = [
        'quotation_id',
        'quotation_no',
        'quotation_date',
        'quotation_status',
        'proposal_id',
        'user_id',
        'accepted_date',
        'quotation_amount'
    ];
}
