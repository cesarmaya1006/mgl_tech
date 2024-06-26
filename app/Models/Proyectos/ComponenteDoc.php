<?php

namespace App\Models\Proyectos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ComponenteDoc extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'componentes_docs';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function componente()
    {
        return $this->belongsTo(Componente::class, 'componente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================

}
