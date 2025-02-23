<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ProposalProductPrice extends Model
{
    protected $table = 'proposal_product_price';
    protected $primaryKey = 'product_price_id';

    protected $fillable = [
        'proposal_product_id',
        'uom',
        'attribute',
        'unit_price',
        'qty',
        'sales_tax',
    ];

    public $timestamps = false;
}
