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
        Schema::create('mensajes', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->unsignedBigInteger('remitente_id');
            $table->foreign('remitente_id', 'fk_usuario_remitente_mensaje')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('destinatario_id')->nullable();
            $table->foreign('destinatario_id', 'fk_usuario_destinatario_mensaje')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->dateTime('fec_creacion');
            $table->longText('mensaje');
            $table->integer('impacto')->default(1);
            $table->boolean('estado')->default(0);
            $table->boolean('borrado')->default(0);
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
        Schema::dropIfExists('mensajes');
    }
};
