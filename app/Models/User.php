<?php

namespace App\Models;

use App\Models\Empresa\Empleado;
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
    /*public function roles()
    {
        return $this->belongsToMany(Role::class, 'config_usuario_rol', 'config_usuario_id', 'config_rol_id')->withPivot('estado');
    }*/
    //----------------------------------------------------------------------------------
    //==================================================================================
    //==================================================================================
    public function setSession()
    {
        $roles = $this->getRoleNames();
        $roles = substr($roles, 0, -1);
        $roles = substr($roles, 1);
        $roles = str_replace('"','', $roles);
        //$roles = explode(',',$roles);
        $roles = $this->roles;
        if ($this->empleado) {
            $nombres_completos = $this->empleado->nombres . ' ' . $this->empleado->apellidos;
        }else{
            $nombres_completos = $this->name;
        }
        Session::put([
            'id_usuario' => $this->id,
            'nombres_completos' => $nombres_completos,
            'rol_principal' => $roles[0]['name'],
            'rol_principal_id' => $roles[0]['id'],
            'roles' => $roles,
            /*
            'config_empresa_id' => $this->config_empresa_id,
            'config_tipo_documento_id' => $this->config_tipo_documento_id,
            'identificacion' => $this->identificacion,
            'nombres' => $this->nombres,
            'apellidos' => $this->apellidos,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'direccion' => $this->direccion,
            'estado' => $this->estado,
            'foto' => $this->foto,
            'lider' => $this->lider,
            'rol' => $rol,*/
        ]);
        /*
        Session::put([
            'cant_notificaciones' => Notificacion::where('config_usuario_id',5)->count(),
        ]);

        if ($this->empleado) {
            Session::put([
            'empresa_cargo_id' => $this->empleado->cargo->cargo,
            'mgl' => $this->empleado->mgl?1:0,
            ]);
        }
        if ($this->empresa) {
            Session::put([
                'empresa' => $this->empresa->nombres,
            ]);
        }
        if ($this->config_empresa_id!=null) {
            $apariencia = ConfigApariencia::where('config_empresa_id',$this->config_empresa_id)->first();
        } else {
            $apariencia = ConfigApariencia::findOrFail(1);
        }
        Session::put([
            'apariencia' => $apariencia,
        ]);*/

    }
    //==========================================================================================
}
