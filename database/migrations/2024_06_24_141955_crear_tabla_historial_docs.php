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
        Schema::create('historial_docs', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->unsignedBigInteger('historial_id');
            $table->foreign('historial_id', 'fk_historial_doc')->references('id')->on('historiales')->onDelete('cascade')->onUpdate('cascade');
            $table->string('titulo', 255);
            $table->string('tipo', 50);
            $table->string('url', 255);
            $table->double('peso', 255);
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
        Schema::dropIfExists('historial_docs');
    }
};
