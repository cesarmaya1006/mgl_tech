<?php

namespace App\Models\Empresa;

use App\Models\Config\TipoDocumento;
use App\Models\Proyectos\Proyecto;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Empresa extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'empresas';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function tipo_docu()
    {
        return $this->belongsTo(TipoDocumento::class, 'tipo_documento_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function grupo()
    {
        return $this->belongsTo(EmpGrupo::class, 'emp_grupo_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function areas()
    {
        return $this->hasMany(Area::class, 'empresa_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'empresa_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    public function opcionesarchivo ()
    {
        return $this->belongsToMany(OpcionArchivo::class,'empresas_opcionarchivo','empresa_id','opcionarchivo_id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
}
