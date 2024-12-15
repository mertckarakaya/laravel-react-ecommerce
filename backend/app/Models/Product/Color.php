<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $table = 'product_color';

    protected $fillable = [
        'guid',
        'product_guid',
        'hex_code',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
