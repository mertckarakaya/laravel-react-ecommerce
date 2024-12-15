<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $table = 'product_size';

    protected $fillable = [
        'guid',
        'product_guid',
        'size',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
