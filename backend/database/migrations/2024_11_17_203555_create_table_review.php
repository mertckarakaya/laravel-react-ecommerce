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
        Schema::create('review', function (Blueprint $table) {
            $table->id();
            $table->uuid('guid')->unique()->nullable(false);
            $table->uuid('product_guid')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(false);
            $table->text('text')->nullable(false);
            $table->unsignedTinyInteger('rating')->nullable();
            $table->timestamps();

            $table->collation('utf8mb4_general_ci');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review');
    }
};
