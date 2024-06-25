<?php

namespace App\Models\Empresa;

use App\Models\Config\TipoDocumento;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\ProyectoAdicion;
use App\Models\Proyectos\ProyectoCambio;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Empleado extends Model
{
    use HasFactory,Notifiable;
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
    public function empresas_tranv ()
    {
        return $this->belongsToMany(Empresa::class,'tranv_empresas','empleado_id','empresa_id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function adiciones()
    {
        return $this->hasMany(ProyectoAdicion::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function cambios_proy()
    {
        return $this->hasMany(ProyectoCambio::class, 'empleado_id', 'id');
    }
    //----------------------------------------------------------------------------------

}
