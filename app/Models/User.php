<?php

namespace App\Models;

use App\Models\Empresa\Empleado;
use App\Models\Sistema\Mensaje;
use App\Models\Sistema\Notificacion;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Session;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'id');
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //==================================================================================
    //----------------------------------------------------------------------------------
    public function notificaciones()
    {
        return $this->belongsTo(Notificacion::class, 'usuario_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function mensajes_remitente()
    {
        return $this->belongsTo(Mensaje::class, 'remitente_id', 'id');
    }
    //----------------------------------------------------------------------------------
    public function mensajes_destinatario()
    {
        return $this->belongsTo(Mensaje::class, 'destinatario_id', 'id');
    }
    //----------------------------------------------------------------------------------
    //==================================================================================
    public function setSession()
    {
        $roles = $this->getRoleNames();
        $roles = substr($roles, 0, -1);
        $roles = substr($roles, 1);
        $roles = str_replace('"','', $roles);
        //$roles = explode(',',$roles);
        $roles = $this->roles;
        $transversal = false;
        $transversales = [];
        if ($this->empleado) {
            $nombres_completos = $this->empleado->nombres . ' ' . $this->empleado->apellidos;
            if ($roles[0]['id']==3 && $this->empleado->empresas_tranv->count()>0) {
                $transversal = true;
            }
        }else{
            $nombres_completos = $this->name;
        }
        Session::put([
            'id_usuario' => $this->id,
            'nombres_completos' => $nombres_completos,
            'rol_principal' => $roles[0]['name'],
            'rol_principal_id' => $roles[0]['id'],
            'roles' => $roles,
            'cant_notificaciones' => Notificacion::where('usuario_id',$this->id)->count(),
        ]);
        if ($this->empleado) {
            Session::put([
            'cargo_id' => $this->empleado->cargo->cargo,
            'empresa_id' => $this->empleado->cargo->area->empresa->id,
            'emp_grupo_id' => $this->empleado->cargo->area->empresa->emp_grupo_id,
            'transversal' => $transversal,
            'transversales' => $transversales,
            'mgl' => $this->empleado->mgl?1:0,
            ]);
        }
    }
    //==========================================================================================
}
