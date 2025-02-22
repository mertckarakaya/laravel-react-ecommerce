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
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->uuid('guid')->unique()->nullable(false);
            $table->uuid('category_guid');

            $table->string('name')->nullable(false);
            $table->text('description')->nullable();
            $table->string('current_price')->nullable(false);
            $table->string('discount_price')->nullable(false);
            $table->timestamps();

            $table->collation('utf8mb4_general_ci');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
