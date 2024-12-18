<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResult;
use App\Http\Requests\UserRequests;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function list()
    {
        try {
            $users = User::select('id', 'name', 'email', 'role', 'avatar', 'updated_at')
                            ->get();

            $result = new ApiResult();
            $result->data = $users;
            $result->message = 'Kullanıcılar başarıyla listelendi.';
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = 'Kullancıları listelerken bir hata oluştu.';
            return response()->apiJson($result, 500);
        }
    }

    public function getById($id)
    {
        try {
            $user = User::select('id', 'name', 'email', 'role', 'avatar', 'updated_at')
                ->where('id', $id)
                ->first();

            $result = new ApiResult();
            $result->data = $user;
            $result->message = "$id'li kullanıcı başarıyla getirildi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = "$id'li kullanıcı bilgisini getirirken bir hata oluştu.";
            return response()->apiJson($result, 500);
        }
    }
    public function update(UserRequests $request, $id)
    {
        try {
            DB::beginTransaction();
            $user = User::find($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->role = $request->role;
            $user->avatar = $request->avatar;
            $user->save();
            DB::commit();
            $result = new ApiResult();
            $result->data = $user;
            $result->message = "$id'li kullanıcı başarıyla güncellendi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e){
            DB::rollBack();
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = "$id'li kullanıcı bilgisini güncellerken bir hata oluştu.";
            return response()->apiJson($result, 500);
        }
    }
    public function delete($id)
    {
        try{
            DB::beginTransaction();
            $user = User::find($id);
            $user->delete();

            DB::commit();
            $result = new ApiResult();
            $result->data = null;
            $result->message = "$id'li kullanıcı başarıyla silindi.";
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e){
            DB::rollBack();
            $result = new ApiResult();
            $result->data = null;
            $result->status = false;
            $result->error = $e->getMessage();
            $result->message = "$id'li kullanıcı bilgisini silerken bir hata oluştu.";
            return response()->apiJson($result, 500);
        }
    }

}
