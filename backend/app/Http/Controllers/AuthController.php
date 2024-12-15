<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResult;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function register(RegisterRequest $request) : JsonResponse
    {
        try {
            $user = new User();
            $user->name = $request->input('username');
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));
            $user->avatar = "https://i.pravatar.cc/300?img=" . rand(0, 70);
            $user->save();

            $token = $user->createToken('authToken', ['*'], Carbon::now()->addDay(5))->plainTextToken;

            $result = new ApiResult();
            $result->data = [
                'user' => $user->makeHidden('password'),
                'token' => $token
            ];
            $result->message = 'Kullanıcı başarıyla oluşturuldu.';
            $result->status = true;
            return response()->json($result, 201);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->message = $e->getMessage();
            $result->status = false;
            return response()->json($result, 500);
        }
    }

    public function login(LoginRequest $request) : JsonResponse
    {
        try {
            $credentials = $request->only('email', 'password');
            if (auth()->attempt($credentials)) {
                $user = auth()->user();
                if ($user->tokens()->where('name', 'authToken')->exists()) {
                    $token = $user->tokens()->where('name', 'authToken')->first();
                    if ($token->expires_at && $token->expires_at->isPast()) {
                        $token->delete();
                    } else {
                        $result = new ApiResult();
                        $result->data = null;
                        $result->message = 'Kullanıcı zaten giriş yapmış.';
                        $result->status = false;
                        return response()->apiJson($result, 400);
                    }
                }
                $token = $user->createToken('authToken', ['*'], Carbon::now()->addDay(5))->plainTextToken;

                $result = new ApiResult();
                $result->data = [
                    'user' => $user,
                    'token' => $token
                ];
                $result->message = 'Giriş başarılı.';
                $result->status = true;
                return response()->apiJson($result, 200);
            } else {
                $result = new ApiResult();
                $result->data = null;
                $result->message = 'E-posta adresi veya şifre hatalı.';
                $result->status = false;
                return response()->apiJson($result, 400);
            }
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->message = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }
    public function logout() : JsonResponse
    {
        try {
            auth()->user()->currentAccessToken()->delete();

            $result = new ApiResult();
            $result->data = null;
            $result->message = 'Çıkış başarılı.';
            $result->status = true;
            return response()->apiJson($result, 200);
        } catch (\Exception $e) {
            $result = new ApiResult();
            $result->data = null;
            $result->message = $e->getMessage();
            $result->status = false;
            return response()->apiJson($result, 500);
        }
    }
}
