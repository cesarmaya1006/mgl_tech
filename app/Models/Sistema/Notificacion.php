<?php

namespace App\Models\Sistema;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Notificacion extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'notificaciones';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
}
