<?php

namespace App\Models\Proyectos;

use App\Models\Empresa\Empleado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class GTareas extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'gtareas';
    protected $guarded = [];
    //----------------------------------------------------------------------------------
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    public function tareas()
    {
        return $this->belongsToMany(Tarea::class, 'grupotareas', 'gtarea_id', 'tarea_id');
    }
    //----------------------------------------------------------------------------------
}
