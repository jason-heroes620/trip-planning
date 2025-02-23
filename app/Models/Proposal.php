<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasUuids;

    protected $table = 'proposal';
    protected $primaryKey = 'proposal_id';

    protected $fillable = [
        'proposal_id',
        'user_id',
        'proposal_name',
        'proposal_date',
        'quotation_id',
        'additional_price',
        'qty_student',
        'qty_teacher',
        'travel_duration',
        'travel_distance',
        'proposal_status',
        'proposal_version',
        'travel_duration',
        'travel_distance'
    ];
}
