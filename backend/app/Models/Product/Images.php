<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    protected $table = 'product_images';

    protected $fillable = [
        'product_guid',
        'images_path',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
