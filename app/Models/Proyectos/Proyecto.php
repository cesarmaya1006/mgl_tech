<?php

namespace App\Models\Proyectos;

use App\Models\Empresa\Empleado;
use App\Models\Empresa\Empresa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Proyecto extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'proyectos';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function lider()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function miembros_proyecto ()
    {
        return $this->belongsToMany(Empleado::class,'proyecto_miembros','proyecto_id','empleado_id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function documentos()
    {
        return $this->hasMany(ProyectoDoc::class, 'proyecto_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function adiciones()
    {
        return $this->hasMany(ProyectoAdicion::class, 'proyecto_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function cambios_proy()
    {
        return $this->hasMany(ProyectoCambio::class, 'proyecto_id', 'id');
    }
    //----------------------------------------------------------------------------------

}
