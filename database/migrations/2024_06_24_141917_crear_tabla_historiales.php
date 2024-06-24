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
        Schema::create('historiales', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->unsignedBigInteger('tarea_id');
            $table->foreign('tarea_id', 'fk_tarea_historial')->references('id')->on('tareas')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('empleado_id');
            $table->foreign('empleado_id', 'fk_empleado_historial')->references('id')->on('empleados')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('usuarioasignado_id');
            $table->foreign('usuarioasignado_id', 'fk_usuarioasignado_tarea')->references('id')->on('empleados')->onDelete('cascade')->onUpdate('cascade');
            $table->string('titulo', 255);
            $table->dateTime('fecha');
            $table->longText('resumen');
            $table->bigInteger('progreso')->default(0);
            $table->double('costo')->default(0);
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
        Schema::dropIfExists('historiales');
    }
};
