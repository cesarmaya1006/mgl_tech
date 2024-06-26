<?php

namespace App\Http\Controllers\Empresa;

use App\Http\Controllers\Controller;
use App\Http\Requests\Empresa\Usuario\ValidaUsuario;
use App\Models\Config\TipoDocumento;
use App\Models\Empresa\Area;
use App\Models\Empresa\Cargo;
use App\Models\Empresa\EmpGrupo;
use App\Models\Empresa\Empleado;
use App\Models\Empresa\Empresa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Intervention\Image\Laravel\Facades\Image;
use Spatie\Permission\Models\Role;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $grupos = EmpGrupo::get();
        $user = User::findOrFail(session('id_usuario'));
        //dd($user->hasPermissionTo('empleados.index'));
        return view('intranet.empresa.empleado.index', compact('grupos','user'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $grupos = EmpGrupo::get();
        $usuario = User::findOrFail(session('id_usuario'));
        $transversal = false;
        $tiposdocu = TipoDocumento::get();
        $roles = Role::get();
        if (session('rol_principal_id') > 2) {
            if ($usuario->empleado->empresas_tranv->count() > 1) {
                $transversal = true;
            }
        }
        return view('intranet.empresa.empleado.crear', compact('grupos', 'usuario', 'transversal', 'tiposdocu','roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ValidaUsuario $request)
    {
        $usuario_new = User::create([
            'name' => ucwords(strtolower($request['nombres'])) . ' ' . ucwords(strtolower($request['apellidos'])),
            'email' => strtolower($request['email']),
            'password' => bcrypt(utf8_encode($request['identificacion'])),
        ])->syncRoles($request['roles']);

        $nombrefoto = 'usuario-inicial.jpg';
        // - - - - - - - - - - - - - - - - - - - - - - - -
        if ($request->hasFile('foto')) {
            $ruta = Config::get('constantes.folder_img_usuarios');
            $ruta = trim($ruta);

            $foto = $request->foto;
            $imagen_foto = Image::read($foto);
            $nombrefoto = time() . $foto->getClientOriginalName();
            $imagen_foto->resize(400, 500);
            $imagen_foto->save($ruta . $nombrefoto, 100);
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $lider = 0;
        if (isset($request['lider'])) {
            if ($request['lider']== '1') {
                $lider = 1;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $mgl = 0;
        if (isset($request['mgl'])) {
            if ($request['mgl']== '1') {
                $mgl = 1;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $empleado_new = Empleado::create([
            'id' => $usuario_new->id,
            'cargo_id' => $request['cargo_id'],
            'tipo_documento_id' => $request['tipo_documento_id'],
            'identificacion' => $request['identificacion'],
            'nombres' => ucwords(strtolower($request['nombres'])),
            'apellidos' => ucwords(strtolower($request['apellidos'])),
            'telefono' => $request['telefono'],
            'direccion' => $request['direccion'],
            'foto' => $nombrefoto,
            'lider' => $lider,
            'mgl' => $mgl,
        ]);

        if ($lider) {
            $usuario_new->syncPermissions(['proyectos.create','proyectos.edit','proyectos.detalle','proyectos.gestion']);
        }

        if (isset($request['empresa_id'])) {
            $empleado_new->empresas_tranv()->sync($request['empresa_id']);
        }

        return redirect('dashboard/configuracion/empleados')->with('mensaje', 'Empleado creado con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $grupos = EmpGrupo::get();
        $usuario = User::findOrFail(session('id_usuario'));
        $transversal = false;
        $tiposdocu = TipoDocumento::get();
        $roles = Role::get();
        $empleado_edit = Empleado::findOrFail($id);
        if (session('rol_principal_id') > 2) {
            if ($usuario->empleado->empresas_tranv->count() > 1) {
                $transversal = true;
            }
        }

        return view('intranet.empresa.empleado.editar', compact('grupos', 'usuario', 'transversal', 'tiposdocu','roles','empleado_edit'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ValidaUsuario $request, string $id)
    {
        //dd($request->all());
        $nombres_array = explode(' ',ucwords(strtolower($request['nombres'])));
        $apellidos_array = explode(' ',ucwords(strtolower($request['apellidos'])));
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $usuario_editar = User::findOrFail($id);
        $usuario_editar->update([
            'name' => ucwords(strtolower($nombres_array[0])) . ' ' . ucwords(strtolower($apellidos_array[0])),
            'email' => strtolower($request['email']),
        ]);
        $usuario_editar->syncRoles($request['roles']);
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $nombrefoto = $usuario_editar->empleado->foto;
        if ($request->hasFile('foto')) {
            $ruta = Config::get('constantes.folder_img_usuarios');
            $ruta = trim($ruta);
            if ($usuario_editar->empleado->foto !='usuario-inicial.jpg') {
                unlink($ruta . $usuario_editar->empleado->foto);
            }
            $foto = $request->foto;
            $imagen_foto = Image::read($foto);
            $nombrefoto = time() . $foto->getClientOriginalName();
            $imagen_foto->resize(400, 500);
            $imagen_foto->save($ruta . $nombrefoto, 100);
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $lider = 0;
        if (isset($request['lider'])) {
            if ($request['lider']== '1') {
                $lider = 1;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $mgl = 0;
        if (isset($request['mgl'])) {
            if ($request['mgl']== '1') {
                $mgl = 1;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $usuario_editar->empleado->update([
            'cargo_id' => $request['cargo_id'],
            'tipo_documento_id' => $request['tipo_documento_id'],
            'identificacion' => $request['identificacion'],
            'nombres' => ucwords(strtolower($request['nombres'])),
            'apellidos' => ucwords(strtolower($request['apellidos'])),
            'telefono' => $request['telefono'],
            'direccion' => $request['direccion'],
            'foto' => $nombrefoto,
            'lider' => $lider,
            'mgl' => $mgl,
        ]);

        if ($lider) {
            $usuario_editar->revokePermissionTo(['proyectos.create','proyectos.edit','proyectos.detalle','proyectos.gestion']);
            $usuario_editar->givePermissionTo(['proyectos.create','proyectos.edit','proyectos.detalle','proyectos.gestion']);
        }

        if (isset($request['empresa_id'])) {
            $usuario_editar->givePermissionTo(['proyectos.create','proyectos.edit','proyectos.detalle','proyectos.gestion']);
        }

        return redirect('dashboard/configuracion/empleados')->with('mensaje', 'Empleado actualizado con éxito');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function getEmpresas(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['empresas' => Empresa::with('areas')
                                                                ->with('areas.cargos')
                                                                ->with('areas.cargos.empleados')
                                                                ->with('areas.cargos.empleados.tipo_docu')
                                                                ->with('areas.cargos.empleados.empresas_tranv')
                                                                ->with('areas.cargos.empleados.usuario')
                                                                ->where('emp_grupo_id', $_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }

    public function getAreas(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['areas' => Area::with('cargos')
                                                                ->with('cargos.empleados')
                                                                ->with('cargos.empleados.tipo_docu')
                                                                ->with('cargos.empleados.empresas_tranv')
                                                                ->with('cargos.empleados.usuario')
                                                                ->where('empresa_id', $_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }

    public function getCargos(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['cargos' => Cargo::with('empleados')
                                                                ->with('empleados.tipo_docu')
                                                                ->with('empleados.empresas_tranv')
                                                                ->with('empleados.usuario')
                                                                ->where('area_id', $_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }

    public function getEmpleados(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['empleados' => Empleado::with('tipo_docu')
                                                                ->with('empresas_tranv')
                                                                ->with('usuario')
                                                                ->where('cargo_id', $_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }

}
