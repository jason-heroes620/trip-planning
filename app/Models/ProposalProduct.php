<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProposalProduct extends Model
{
    protected $table = 'proposal_product';
    protected $primaryKey = 'proposal_product_id';

    protected $fillable = [
        'proposal_id',
        'product_id',
    ];

    public $timestamps = false;
}
