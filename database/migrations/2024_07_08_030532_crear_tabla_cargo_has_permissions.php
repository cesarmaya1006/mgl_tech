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
        Schema::create('cargo_has_permissions', function (Blueprint $table) {
            $table->unsignedBigInteger('cargo_id');
            $table->foreign('cargo_id', 'fk_cargo_permissions')->references('id')->on('cargos')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('permission_id');
            $table->foreign('permission_id', 'fk_permissions_cargos')->references('id')->on('permissions')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('estado')->default(0);
            $table->unique(['cargo_id','permission_id'],'cmr_unico_c_p');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargo_has_permissions');
    }
};
