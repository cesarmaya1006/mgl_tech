<?php

namespace App\Models\Empresa;

use App\Models\Config\TipoDocumento;
use App\Models\Proyectos\Componente;
use App\Models\Proyectos\ComponenteAdicion;
use App\Models\Proyectos\ComponenteCambio;
use App\Models\Proyectos\GTareas;
use App\Models\Proyectos\Historial;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\ProyectoAdicion;
use App\Models\Proyectos\ProyectoCambio;
use App\Models\Proyectos\Tarea;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Empleado extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'empleados';
    protected $guarded = [];

    //==================================================================================
    //----------------------------------------------------------------------------------
    public function tipo_docu()
    {
        return $this->belongsTo(TipoDocumento::class, 'tipo_documento_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function usuario()
    {
        return $this->hasOne(User::class, 'id');
    }
    //----------------------------------------------------------------------------------
    public function cargo()
    {
        return $this->belongsTo(Cargo::class, 'cargo_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function empresas_tranv()
    {
        return $this->belongsToMany(Empresa::class, 'tranv_empresas', 'empleado_id', 'empresa_id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function miembro_proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'proyecto_miembros', 'empleado_id', 'proyecto_id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function adiciones_proy()
    {
        return $this->hasMany(ProyectoAdicion::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function cambios_proy()
    {
        return $this->hasMany(ProyectoCambio::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function componentes()
    {
        return $this->hasMany(Componente::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function adiciones_comp()
    {
        return $this->hasMany(ComponenteAdicion::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function cambios_comp()
    {
        return $this->hasMany(ComponenteCambio::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function tareas()
    {
        return $this->hasMany(Tarea::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    public function historiales()
    {
        return $this->hasMany(Historial::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    public function historiales_asig()
    {
        return $this->hasMany(Tarea::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    public function gtareas()
    {
        return $this->hasMany(GTareas::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
}
