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
        Schema::create('tareas', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->unsignedBigInteger('tarea_id')->nullable();
            $table->foreign('tarea_id', 'fk_tareas_tarea')->references('id')->on('tareas')->onDelete('restrict')->onUpdate('restrict');
            $table->unsignedBigInteger('componente_id')->nullable();
            $table->foreign('componente_id', 'fk_componente_tarea')->references('id')->on('componentes')->onDelete('restrict')->onUpdate('restrict');
            $table->unsignedBigInteger('empleado_id');
            $table->foreign('empleado_id', 'fk_empleado_tarea')->references('id')->on('empleados')->onDelete('restrict')->onUpdate('restrict');
            $table->string('titulo');
            $table->date('fec_creacion');
            $table->date('fec_limite');
            $table->date('fec_finalizacion')->nullable();
            $table->longText('objetivo');
            $table->double('progreso')->default(0);
            $table->string('estado', 20)->default('Activa');
            $table->string('impacto', 10)->nullable();
            $table->integer('impacto_num')->default(0)->nullable();
            $table->double('costo')->default(0)->nullable();
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
        Schema::dropIfExists('tareas');
    }
};
