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
        Schema::create('opcionarchivo', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->string('titulo', 255);
            $table->longText('contenido');
            $table->string('imagen', 255);
            $table->string('url', 255)->nullable();
            $table->timestamps();
            $table->charset = 'utf8';
            $table->collation = 'utf8_spanish_ci';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opcionarchivo');
    }
};
