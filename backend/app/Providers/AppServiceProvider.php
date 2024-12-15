<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Bu ayar ile Response->json() functionunu Response->api() olarak kullanabiliriz.
         * Bu fonksiyon ile Türkçe karakterlerin dönüşlerinde bozulma yaşamayız.
         */
        Response::macro('apiJson', function ($value, $status = 200, array $headers = [], $options = 0) {
            $options |= JSON_UNESCAPED_UNICODE;
            return response()->json($value, $status, $headers, $options);
        });
    }
}
