<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResult;
use App\Helpers\GenericHelpers;
use App\Http\Requests\ProductRequest;
use App\Models\Product\Product;
use App\Models\Product\Color;
use App\Models\Product\Size;
use App\Models\Product\Images;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function create(ProductRequest $request) : JsonResponse
    {
        try {
            DB::beginTransaction();

            $productGuid = GenericHelpers::GenerateGuid();
            $product = new Product();
            $product->guid = $productGuid;
            $product->category_guid = $request->input('category_guid');
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->current_price = $request->input('current_price');
            $product->discount_price = $request->input('discount_price');
            $product->save();

            $colors = $request->input('colors');
            foreach ($colors as $color) {
                $colorModel = new Color();
                $colorModel->guid = GenericHelpers::GenerateGuid();
                $colorModel->product_guid = $productGuid;
                $colorModel->hex_code = $color;
                $colorModel->save();
            }
            $sizes = $request->input('sizes');
            foreach ($sizes as $size) {
                $sizeModel = new Size();
                $sizeModel->guid = GenericHelpers::GenerateGuid();
                $sizeModel->product_guid = $productGuid;
                $sizeModel->size = $size;
                $sizeModel->save();
            }
            $images = $request->input('images');
            foreach ($images as $image) {
                $imageModel = new Images();
                $imageModel->guid = GenericHelpers::GenerateGuid();
                $imageModel->product_guid = $productGuid;
                $imageModel->image_path = $image;
                $imageModel->save();
            }

            DB::commit();

            $result = new ApiResult();
            $result->data = $product->guid;
            $result->status = true;
            $result->message = 'Ürün başarıyla oluşturuldu.';
            return response()->apiJson($result, 201);
        } catch (\Exception $e) {
            DB::rollBack();

            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'Ürün oluşturulurken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }

    public function list()
    {
        try{
            $products = Product::select('guid', 'name', 'description', 'current_price', 'discount_price')
                ->with(['colors', 'sizes', 'images', 'reviews.user'])
                ->get();

            $result = new ApiResult();
            $result->data = $products;
            $result->status = true;
            $result->message = 'Ürün başarıyla getirildi.';
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'Ürünler getirilirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }
    public function getByGuid($guid)
    {
        try {
            $product = Product::select('guid', 'name', 'description', 'current_price', 'discount_price')
                ->where('guid', $guid)
                ->with('colors', 'sizes', 'images', 'reviews')
                ->first();

            if ($product == null) {
                $result = new ApiResult();
                $result->data = null;
                $result->status = false;
                $result->message = 'Ürün bulunamadı.';
                return response()->apiJson($result, 404);
            } else {
                $result = new ApiResult();
                $result->data = $product;
                $result->status = true;
                $result->message = 'Ürün başarıyla getirildi.';
                return response()->apiJson($result, 200);
            }
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'Ürün getirilirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }
    public function update($guid)
    {
        try {
            DB::beginTransaction();

            $updateProduct = Product::where('guid', $guid)
                ->first();
            if ($updateProduct == null) {
                $result = new ApiResult();
                $result->data = null;
                $result->status = false;
                $result->message = 'Ürün bulunamadı.';
                return response()->apiJson($result, 404);
            } else {
                $updateProduct->category_guid = request('category_guid');
                $updateProduct->name = request('name');
                $updateProduct->description = request('description');
                $updateProduct->current_price = request('current_price');
                $updateProduct->discount_price = request('discount_price');
                $updateProduct->save();

                $colors = request('colors');
                Color::where('product_guid', $guid)->delete();
                foreach ($colors as $color) {
                    $colorModel = new Color();
                    $colorModel->guid = GenericHelpers::GenerateGuid();
                    $colorModel->product_guid = $guid;
                    $colorModel->hex_code = $color;
                    $colorModel->save();
                }

                $sizes = request('sizes');
                Size::where('product_guid', $guid)->delete();
                foreach ($sizes as $size) {
                    $sizeModel = new Size();
                    $sizeModel->guid = GenericHelpers::GenerateGuid();
                    $sizeModel->product_guid = $guid;
                    $sizeModel->size = $size;
                    $sizeModel->save();
                }

                $images = request('images');
                Images::where('product_guid', $guid)->delete();
                foreach ($images as $image) {
                    $imageModel = new Images();
                    $imageModel->guid = GenericHelpers::GenerateGuid();
                    $imageModel->product_guid = $guid;
                    $imageModel->image_path = $image;
                    $imageModel->save();
                }

                DB::commit();

                $result = new ApiResult();
                $result->data = $updateProduct->guid;
                $result->status = true;
                $result->message = 'Ürün başarıyla güncellendi.';
                return response()->apiJson($result, 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();

            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'Ürün güncellenirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }
    public function delete($guid)
    {
        try {
            DB::beginTransaction();
            $deleteProduct = Product::where('guid', $guid)
                ->first();
            if ($deleteProduct == null) {
                $result = new ApiResult();
                $result->data = null;
                $result->status = false;
                $result->message = 'Ürün bulunamadı.';
                return response()->apiJson($result, 404);
            } else {
                $productName = $deleteProduct->name;
                $deleteProduct->delete();

                DB::commit();

                $result = new ApiResult();
                $result->data = $productName;
                $result->status = true;
                $result->message = 'Ürün başarıyla silindi.';
                return response()->apiJson($result, 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();

            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'Ürün silinirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }
}
