<?php

namespace App\Models\Empresa;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class OpcionArchivo extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'opcionarchivo';
    protected $guarded = [];
    //==================================================================================
    //==================================================================================
    public function empresas ()
    {
        return $this->belongsToMany(Empresa::class,'empresas_opcionarchivo','opcionarchivo_id','empresa_id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
}
