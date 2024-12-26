<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProposalItem extends Model
{
    protected $table = 'proposal_item';
    protected $primaryKey = 'proposal_item_id';

    protected $fillable = [
        'uom',
        'item_qty',
        'unit_price',
        'sales_tax',
    ];
}
