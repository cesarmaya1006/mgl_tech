<?php

namespace App\Models\Proyectos;

use App\Models\Empresa\Empleado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Historial extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'historiales';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tareas_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    public function asignado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function documentos()
    {
        return $this->hasMany(HistorialDoc::class, 'historial_id', 'id');
    }
    //----------------------------------------------------------------------------------
}
