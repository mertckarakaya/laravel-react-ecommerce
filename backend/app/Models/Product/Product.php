<?php

namespace App\Models\Product;

use App\Models\Category;
use App\Models\Review;
use App\Models\Product\Color;
use App\Models\Product\Size;
use App\Models\Product\Images;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    protected $fillable = [
        'guid',
        'category_guid',
        'name',
        'description',
        'current_price',
        'discount_price',
    ];

    public function colors()
    {
        return $this->hasMany(Color::class, 'product_guid', 'guid')
            ->select('product_guid','guid', 'hex_code');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'product_guid', 'guid')
            ->with('user')
            ->select('product_guid','guid','user_id',  'text', 'rating');
    }

    public function sizes()
    {
        return $this->hasMany(Size::class, 'product_guid', 'guid')
            ->select('product_guid','guid', 'size');
    }

    public function images()
    {
        return $this->hasMany(Images::class, 'product_guid', 'guid')
            ->select('product_guid','guid', 'image_path');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_guid', 'guid')
            ->select('guid', 'name');
    }
}
