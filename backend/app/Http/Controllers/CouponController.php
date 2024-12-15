<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResult;
use App\Helpers\GenericHelpers;
use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CouponController extends Controller
{
    public function create(CouponRequest $request)
    {
        try{
            DB::beginTransaction();
            $coupon = new Coupon();
            $coupon->guid = GenericHelpers::GenerateGuid();
            $coupon->code = $request->input('code');
            $coupon->discount_percent = $request->input('discount_percent');
            $coupon->save();

            DB::commit();

            $result = new ApiResult();
            $result->data = $coupon;
            $result->message = "Kupon başarıyla oluşturuldu.";
            $result->status = true;
            return response()->apiJson($result, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            $result = new ApiResult();
            $result->data = null;
            $result->message = "Kupon oluşturulurken bir hata oluştu.";
            $result->error = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }

    public function list()
    {
        try{
            $coupons = Coupon::all();
            $result = new ApiResult();
            $result->data = $coupons;
            $result->message = "Kuponlar başarıyla listelendi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->message = "Kuponlar listelenirken bir hata oluştu.";
            $result->error = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }

    public function getByGuid($guid)
    {
        try{
            $coupon = Coupon::where('guid', $guid)->first();
            if($coupon == null){
                $result = new ApiResult();
                $result->data = null;
                $result->message = "Kupon bulunamadı.";
                $result->status = false;
                return response()->apiJson($result, 404);
            }

            $result = new ApiResult();
            $result->data = $coupon;
            $result->message = "Kupon başarıyla getirildi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->message = "Kupon getirilirken bir hata oluştu.";
            $result->error = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }

    public function update(CouponRequest $request, $guid)
    {
        try{
            DB::beginTransaction();
            $coupon = Coupon::where('guid', $guid)->first();
            if($coupon == null){
                $result = new ApiResult();
                $result->data = null;
                $result->message = "Kupon bulunamadı.";
                $result->status = false;
                return response()->apiJson($result, 404);
            }
            $coupon->code = $request->input('code');
            $coupon->discount_percent = $request->input('discount_percent');
            $coupon->save();

            DB::commit();

            $result = new ApiResult();
            $result->data = $coupon;
            $result->message = "Kupon başarıyla güncellendi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            $result = new ApiResult();
            $result->data = null;
            $result->message = "Kupon güncellenirken bir hata oluştu.";
            $result->error = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }

    public function delete($guid)
    {
        try{
            $coupon = Coupon::where('guid', $guid)->first();
            if($coupon == null){
                $result = new ApiResult();
                $result->data = null;
                $result->message = "Kupon bulunamadı.";
                $result->status = false;
                return response()->apiJson($result, 404);
            }
            $coupon->delete();
            $result = new ApiResult();
            $result->data = null;
            $result->message = "Kupon başarıyla silindi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->message = "Kupon silinirken bir hata oluştu.";
            $result->error = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }

    public function getByCode($code)
    {
        try {
            $coupon = Coupon::where('code', $code)->first();
            if($coupon == null){
                $result = new ApiResult();
                $result->data = null;
                $result->message = "Kupon bulunamadı.";
                $result->status = false;
                return response()->apiJson($result, 404);
            }

            $result = new ApiResult();
            $result->data = $coupon;
            $result->message = "Kupon başarıyla getirildi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->message = "Kupon getirilirken bir hata oluştu.";
            $result->error = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }
}
