<?php

namespace App\Models\Proyectos;

use App\Models\Empresa\Empleado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Tarea extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'tareas';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tareas_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function componente()
    {
        return $this->belongsTo(Componente::class, 'componente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function subtareas()
    {
        return $this->hasMany(Tarea::class, 'tarea_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function historiales()
    {
        return $this->hasMany(Historial::class, 'tarea_id', 'id');
    }
    //----------------------------------------------------------------------------------

}
