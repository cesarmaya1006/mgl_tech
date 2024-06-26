<?php

namespace App\Models\Proyectos;

use App\Models\Empresa\Empleado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Componente extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'componentes';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function responsable()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class, 'proyecto_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function adiciones()
    {
        return $this->hasMany(ComponenteAdicion::class, 'componente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function documentos()
    {
        return $this->hasMany(ComponenteDoc::class, 'componente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function cambios()
    {
        return $this->hasMany(ComponenteCambio::class, 'componente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function tareas()
    {
        return $this->hasMany(Tarea::class, 'componente_id', 'id');
    }
    //----------------------------------------------------------------------------------
}
