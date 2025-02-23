<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProposalTotal extends Model
{
    protected $table = 'proposal_total';
    protected $primaryKey = 'proposal_total_id';
    public $timestamps = false;

    protected $fillable = [
        'proposal_id',
        'code',
        'title',
        'value',
        'sort_order',
    ];
}
