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
        Schema::create('componentes', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->unsignedBigInteger('proyecto_id');
            $table->foreign('proyecto_id', 'fk_proyecto_componentes')->references('id')->on('proyectos')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('empleado_id');
            $table->foreign('empleado_id', 'fk_empleado_componente')->references('id')->on('empleados')->onDelete('cascade')->onUpdate('cascade');
            $table->string('titulo', 255);
            $table->date('fec_creacion');
            $table->longText('objetivo');
            $table->string('estado', 20)->default('Activo');
            $table->string('impacto', 10);
            $table->integer('impacto_num')->default(0);
            $table->double('progreso')->default(0);
            $table->double('presupuesto')->default(0);
            $table->double('ejecucion')->default(0);
            $table->double('porc_ejecucion')->default(0);
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
        Schema::dropIfExists('componentes');
    }
};
