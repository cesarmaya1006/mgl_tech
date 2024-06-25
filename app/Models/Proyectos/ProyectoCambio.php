<?php

namespace App\Models\Proyectos;

use App\Models\Empresa\Empleado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProyectoCambio extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'proyecto_cambios';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function empleado()
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
}
