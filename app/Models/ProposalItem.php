<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProposalItem extends Model
{
    protected $table = 'proposal_item';
    protected $primaryKey = 'proposal_item_id';
    public $timestamps = false;
    protected $fillable = [
        'proposal_item_id',
        'proposal_id',
        'item_id',
        'uom',
        'item_qty',
        'unit_price',
        'sales_tax',
    ];
}
