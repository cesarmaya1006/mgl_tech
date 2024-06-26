<?php

namespace App\Models\Proyectos;

use App\Models\Empresa\Empleado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ComponenteCambio extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'componentes_cambios';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function componente()
    {
        return $this->belongsTo(Componente::class, 'componente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
}
