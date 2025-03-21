<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLiked extends Model
{

    protected $table = 'user_liked';
    protected $primaryKey = 'user_liked_id';

    protected $fillable = [
        'user_id',
        'product_id',
    ];
}
