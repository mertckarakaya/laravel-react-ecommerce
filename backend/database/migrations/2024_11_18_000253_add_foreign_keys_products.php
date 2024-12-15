<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('review', function (Blueprint $table) {
            $table->foreign('product_guid')
                ->references('guid')
                ->on('product')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });

        Schema::table('product_color', function (Blueprint $table) {
            $table->foreign('product_guid')
                ->references('guid')
                ->on('product')
                ->onDelete('cascade');
        });

        Schema::table('product_size', function (Blueprint $table) {
            $table->foreign('product_guid')
                ->references('guid')
                ->on('product')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('review', function (Blueprint $table) {
            $table->dropForeign(['product_guid']);
            $table->dropForeign(['user_id']);
        });

        Schema::table('product_color', function (Blueprint $table) {
            $table->dropForeign(['product_guid']);
        });

        Schema::table('product_size', function (Blueprint $table) {
            $table->dropForeign(['product_guid']);
        });
    }
};
