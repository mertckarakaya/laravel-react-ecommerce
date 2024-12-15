<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResult;
use App\Helpers\GenericHelpers;
use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    public function create(ReviewRequest $request)
    {
        try {
            DB::beginTransaction();

            $review = new Review();
            $review->guid = GenericHelpers::GenerateGuid();
            $review->product_guid = $request->input('product_guid');
            $review->user_id = auth()->user()->id;
            $review->text = $request->input('text');
            $review->rating = $request->input('rating');
            $review->save();

            DB::commit();

            $result = new ApiResult();
            $result->data = $review->guid;
            $result->message = 'İncelemeniz başarıyla eklendi.';
            $result->status = true;
            return response()->apiJson($result, 201);
        } catch (\Exception $e) {
            DB::rollBack();

            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'İnceleme eklenirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }

    public function list()
    {
        try {
            $reviews = Review::select('guid', 'product_guid', 'user_id', 'text', 'rating', 'created_at')
                ->with('user')
                ->get();

            $result = new ApiResult();
            $result->data = $reviews;
            $result->status = true;
            $result->message = 'İncelemeler başarıyla listelendi.';
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'İncelemeler getirilirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }

    public function getByGuid($guid)
    {
        try {
            $review = Review::where('guid', $guid)
                ->with('user')
                ->first();
            if($review == null){
                $result = new ApiResult();
                $result->data = null;
                $result->status = false;
                $result->message = 'İnceleme bulunamadı.';
                return response()->apiJson($result, 404);
            }

            $result = new ApiResult();
            $result->data = $review;
            $result->status = true;
            $result->message = 'İnceleme başarıyla getirildi.';
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'İnceleme getirilirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }

    public function update(ReviewRequest $request, $guid)
    {
        try {
            DB::beginTransaction();

            $review = Review::where('guid', $guid)->first();
            if($review == null){
                $result = new ApiResult();
                $result->data = null;
                $result->status = false;
                $result->message = 'İnceleme bulunamadı.';
                return response()->apiJson($result, 404);
            }

            $review->product_guid = $request->input('product_guid');
            $review->user_id = auth()->user()->id;
            $review->text = $request->input('text');
            $review->rating = $request->input('rating');
            $review->save();

            DB::commit();

            $result = new ApiResult();
            $result->data = $review->guid;
            $result->message = 'İncelemeniz başarıyla güncellendi.';
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();

            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->message = 'İnceleme güncellenirken bir hata oluştu.';
            $result->error = $e->getMessage();
            return response()->apiJson($result, 500);
        }
    }

    public function delete($guid)
    {
        try {
            DB::beginTransaction();
            $review = Review::where('guid', $guid)
                ->first();
            if ($review == null) {
                $result = new ApiResult();
                $result->data = null;
                $result->status = false;
                $result->message = 'İnceleme bulunamadı.';
                return response()->apiJson($result, 404);
            } else {
                $review->delete();

                DB::commit();

                $result = new ApiResult();
                $result->data = $guid;
                $result->status = true;
                $result->message = 'İnceleme başarıyla silindi.';
                return response()->apiJson($result, 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();

            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'İnceleme silinirken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }

}
