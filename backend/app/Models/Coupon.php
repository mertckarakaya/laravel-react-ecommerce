<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $table = 'coupon';
    protected $fillable = ['guid', 'code', 'discount_percent'];
    protected $hidden = ['id', 'created_at', 'updated_at'];
    protected $casts = [
        'discount_percent' => 'integer'
    ];
}
