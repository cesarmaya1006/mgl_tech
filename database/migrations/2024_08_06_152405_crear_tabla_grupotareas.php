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
        Schema::create('grupotareas', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->unsignedBigInteger('gtarea_id');
            $table->foreign('gtarea_id', 'fk_gtarea_tarea')->references('id')->on('gtareas')->onDelete('cascade')->onUpdate('restrict');
            $table->unsignedBigInteger('tarea_id');
            $table->foreign('tarea_id', 'fk_tarea_gtarea')->references('id')->on('tareas')->onDelete('cascade')->onUpdate('restrict');
            $table->unique(['gtarea_id','tarea_id'],'cmr_unico');
            $table->integer('orden')->default(1);
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
        Schema::dropIfExists('grupotareas');
    }
};
