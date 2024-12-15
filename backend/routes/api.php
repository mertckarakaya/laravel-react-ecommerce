<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

    //Auth Routes
    Route::prefix('auth')->group(function (){
        Route::controller(AuthController::class)->group(function (){
            Route::post('/register', 'register');
            Route::post('/login', 'login')->name('login');
            Route::post('/logout', 'logout')->middleware('auth:sanctum');
        });
    });

    Route::middleware('auth:sanctum')->group(function (){
        //Category Routes
        Route::prefix('categories')->group(function (){
            Route::controller(CategoryController::class)->group(function (){
                Route::post('/create', 'create');
                Route::get('/', 'list');
                Route::get('/{guid}', 'getByGuid');
                Route::put('/update/{guid}', 'update');
                Route::delete('/delete/{guid}', 'delete');
            });
        });

        //Product Routes
        Route::prefix('products')->group(function (){
            Route::controller(ProductController::class)->group(function (){
                Route::post('/create', 'create');
                Route::get('/', 'list');
                Route::get('/{guid}', 'getByGuid');
                Route::put('/update/{guid}', 'update');
                Route::delete('/delete/{guid}', 'delete');
            });
        });

        //Review Routes
        Route::prefix('reviews')->group(function (){
            Route::controller(ReviewController::class)->group(function (){
                Route::post('/create', 'create');
                Route::get('/', 'list');
                Route::get('/{guid}', 'getByGuid');
                Route::put('/update/{guid}', 'update');
                Route::delete('/delete/{guid}', 'delete');
            });
        });

        //Coupon Routes
        Route::prefix('coupons')->group(function (){
            Route::controller(CouponController::class)->group(function (){
                Route::post('/create', 'create');
                Route::get('/', 'list');
                Route::get('/{guid}', 'getByGuid');
                Route::put('/update/{guid}', 'update');
                Route::delete('/delete/{guid}', 'delete');

                Route::get('/get-by-code/{code}', 'getByCode');
            });
        });
    });










