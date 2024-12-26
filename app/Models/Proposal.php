<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    protected $table = 'proposal';
    protected $primaryKey = 'proposal_id';

    protected $fillable = [
        'proposal_name',
        'proposal_date',
        'quotation_id',
        'additional_price',
        'qty_student',
        'qty_teacher',
        'proposal_status',
        'proposal_version'
    ];
}
