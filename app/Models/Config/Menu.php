<?php

namespace App\Models\Config;

use App\Models\Empresa\Empresa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Models\Role;

class Menu extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'menus';
    protected $guarded = [];

    //---------------------------------------------------------------
    public function roles_menu ()
    {
        return $this->belongsToMany(Role::class,'menu_rol','menu_id','rol_id');
    }
    //---------------------------------------------------------------
    //---------------------------------------------------------------
    public function empresas_menu ()
    {
        return $this->belongsToMany(Empresa::class,'menu_empresas','menu_id','empresa_id');
    }
    //---------------------------------------------------------------
    public function getHijos($padres, $line)
    {
        $children = [];
        foreach ($padres as $line1) {
            if ($line['id'] == $line1['menu_id']) {
                $children = array_merge($children, [array_merge($line1, ['submenu' => $this->getHijos($padres, $line1)])]);
            }
        }
        return $children;
    }
    public function getPadres($front)
    {
        $usuario = User::with('roles')->findOrFail(session('id_usuario'));
        $ids =[];

        foreach ($usuario->roles as $rol) {
            $ids[] = $rol->id;
        }

        if ($front) {
            if (in_array(1, $ids,true)) {

                return $this->whereHas('roles_menu', function ($query) use($ids) {
                    $query->whereIn('rol_id', $ids)->orderby('menu_id');
                })->orderby('menu_id')
                    ->orderby('orden')
                    ->get()
                    ->toArray();
            } else {

                $id_empresa = $usuario->empleado->cargo->area->empresa_id;
                return $this->whereHas('roles_menu', function ($query) use($ids) {
                    $query->whereIn('rol_id', $ids)->orderby('menu_id');
                })->whereHas('empresas_menu', function ($query2) use($id_empresa) {
                    $query2->where('empresa_id', $id_empresa)->orderby('menu_id');
                })->orderby('menu_id')
                  ->orderby('orden')
                  ->get()
                  ->toArray();

            }
        } else {
            return $this->orderby('menu_id')
                ->orderby('orden')
                ->get()
                ->toArray();
        }
    }
    public static function getMenu($front = false)
    {
        $menus = new Menu();
        $padres = $menus->getPadres($front);
        $menuAll = [];
        foreach ($padres as $line) {
            if ($line['menu_id'] != 0)
                break;
            $item = [array_merge($line, ['submenu' => $menus->getHijos($padres, $line)])];
            $menuAll = array_merge($menuAll, $item);
        }
        return $menuAll;
    }
    public function guardarOrden($menu)
    {
        $menus = json_decode($menu);
        foreach ($menus as $var => $value) {
            $this->where('id', $value->id)->update(['menu_id' => 0, 'orden' => $var + 1]);
            if (!empty($value->children)) {
                foreach ($value->children as $key => $vchild) {
                    $update_id = $vchild->id;
                    $parent_id = $value->id;
                    $this->where('id', $update_id)->update(['menu_id' => $parent_id, 'orden' => $key + 1]);
                    if (!empty($vchild->children)) {
                        foreach ($vchild->children as $key => $vchild1) {
                            $update_id = $vchild1->id;
                            $parent_id = $vchild->id;
                            $this->where('id', $update_id)->update(['menu_id' => $parent_id, 'orden' => $key + 1]);
                            if (!empty($vchild1->children)) {
                                foreach ($vchild1->children as $key => $vchild2) {
                                    $update_id = $vchild2->id;
                                    $parent_id = $vchild1->id;
                                    $this->where('id', $update_id)->update(['menu_id' => $parent_id, 'orden' => $key + 1]);
                                    if (!empty($vchild2->children)) {
                                        foreach ($vchild2->children as $key => $vchild3) {
                                            $update_id = $vchild3->id;
                                            $parent_id = $vchild2->id;
                                            $this->where('id', $update_id)->update(['menu_id' => $parent_id, 'orden' => $key + 1]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
