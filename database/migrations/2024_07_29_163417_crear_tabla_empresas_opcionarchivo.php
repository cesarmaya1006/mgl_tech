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
        Schema::create('empresas_opcionarchivo', function (Blueprint $table) {
            $table->unsignedBigInteger('opcionarchivo_id');
            $table->foreign('opcionarchivo_id', 'fk_opcionarchivo_empresa')->references('id')->on('opcionarchivo')->onDelete('cascade')->onUpdate('restrict');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id', 'fk_empresa_opcionarchivo')->references('id')->on('empresas')->onDelete('cascade')->onUpdate('restrict');
            $table->unique(['opcionarchivo_id','empresa_id'],'cmr_unico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas_opcionarchivo');
    }
};
