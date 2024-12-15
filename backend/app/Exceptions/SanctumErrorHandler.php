<?php

namespace App\Exceptions;

use App\Helpers\ApiResult;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SanctumErrorHandler
{
    public function handle(Exception $exception, Request $request): JsonResponse
    {
        $result = new ApiResult();
        $result->data = null;
        $result->message = $exception->getMessage();
        $result->status = false;

        $status = 500;

        if ($exception instanceof AuthenticationException) {
            $status = 401;
            $result->message = 'Kimlik doğrulama başarısız. Lütfen giriş yapın.';
        }elseif ($exception instanceof TokenMismatchException) {
            $status = 419;
            $result->message = 'Token geçersiz veya süresi dolmuş. Lütfen tekrar giriş yapın.';
        }

        return response()->apiJson($result, $status);
    }

    public function render($request, Exception $exception): JsonResponse
    {
        return $this->handle($exception, $request);
    }
}
