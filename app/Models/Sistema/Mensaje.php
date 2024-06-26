<?php

namespace App\Models\Sistema;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Mensaje extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'mensajes';
    protected $guarded = [];
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function remitente()
    {
        return $this->belongsTo(User::class, 'remitente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function destinatario()
    {
        return $this->belongsTo(User::class, 'destinatario_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
}
