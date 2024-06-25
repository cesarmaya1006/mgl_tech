<?php

namespace App\Models\Proyectos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProyectoDoc extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'proyecto_docs';
    protected $guarded = [];
    //----------------------------------------------------------------------------------
    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class, 'proyecto_id', 'id');
    }
    //----------------------------------------------------------------------------------
}
