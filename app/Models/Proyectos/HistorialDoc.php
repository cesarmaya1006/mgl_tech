<?php

namespace App\Models\Proyectos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class HistorialDoc extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'historial_docs';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function historial()
    {
        return $this->belongsTo(Historial::class, 'historial_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
}
