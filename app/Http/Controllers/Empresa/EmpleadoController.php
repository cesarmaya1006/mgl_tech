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
use App\Models\Proyectos\Componente;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\Tarea;
use App\Models\Sistema\Notificacion;
use App\Models\User;
use DateTime;
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
        return view('intranet.empresa.empleado.index', compact('grupos', 'user'));
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
        return view('intranet.empresa.empleado.crear', compact('grupos', 'usuario', 'transversal', 'tiposdocu', 'roles'));
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
            if ($request['lider'] == '1') {
                $lider = 1;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $mgl = 0;
        if (isset($request['mgl'])) {
            if ($request['mgl'] == '1') {
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
            $usuario_new->syncPermissions(['proyectos.create', 'proyectos.edit', 'proyectos.detalle', 'proyectos.gestion']);
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
        $empleados = $this->getEmpleadosByempleado($empleado_edit->id);
        $lideres =  $this->getLideresByempleado($empleado_edit->id);
        return view('intranet.empresa.empleado.editar', compact('grupos', 'usuario', 'transversal', 'tiposdocu', 'roles', 'empleado_edit','empleados','lideres'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ValidaUsuario $request, string $id)
    {
        //dd($request->all());
        $nombres_array = explode(' ', ucwords(strtolower($request['nombres'])));
        $apellidos_array = explode(' ', ucwords(strtolower($request['apellidos'])));
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
            if ($usuario_editar->empleado->foto != 'usuario-inicial.jpg') {
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
            if ($request['lider'] == '1') {
                $lider = 1;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $mgl = 0;
        if (isset($request['mgl'])) {
            if ($request['mgl'] == '1') {
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
            $usuario_editar->revokePermissionTo(['proyectos.create', 'proyectos.edit', 'proyectos.detalle', 'proyectos.gestion']);
            $usuario_editar->givePermissionTo(['proyectos.create', 'proyectos.edit', 'proyectos.detalle', 'proyectos.gestion']);
        }

        if (isset($request['empresa_id'])) {
            $usuario_editar->givePermissionTo(['proyectos.create', 'proyectos.edit', 'proyectos.detalle', 'proyectos.gestion']);
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

    public function setCambioLiderProyecto(Request $request)
    {
        if ($request->ajax()) {
            $proyecto = Proyecto::findOrFail($request['proyecto_id']);
            $proyecto->update(['empleado_id' => $request['empleado_id']]);
            //-----------------------------------------------------------------------------------
            $proyecto = Proyecto::findOrfail($request['proyecto_id']);
            $dia_hora = date('Y-m-d H:i:s');
            $notificacion['usuario_id'] =  $request['empleado_id'];
            $notificacion['fec_creacion'] =  $dia_hora;
            $notificacion['titulo'] =  'Se te asigno un proyecto';
            $notificacion['mensaje'] =  'El Proyecto: ' .$proyecto->titulo. ' te fue asignado';
            $notificacion['link'] =  route('proyectos.gestion', ['id' => $proyecto->id]);
            $notificacion['id_link'] =  $proyecto->id;
            $notificacion['tipo'] =  'componente';
            $notificacion['accion'] =  'creacion';
            Notificacion::create($notificacion);
            //------------------------------------------------------------------------------------------
            //------------------------------------------------------------------------------------------
            return response()->json(['mensaje' => 'ok','respuesta' => 'Asignación correcta','tipo'=> 'success']);
            //------------------------------------------------------------------------------------------
        } else {
            abort(404);
        }
    }

    public function setCambioRespComponente(Request $request)
    {
        if ($request->ajax()) {
            $componente = Componente::findOrFail($request['componente_id']);
            $componente->update(['empleado_id' => $request['empleado_id']]);
            //------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------
            $componente = Proyecto::findOrfail($request['componente_id']);
            $dia_hora = date('Y-m-d H:i:s');
            $notificacion['usuario_id'] =  $request['empleado_id'];
            $notificacion['fec_creacion'] =  $dia_hora;
            $notificacion['titulo'] =  'Se te asigno un componente';
            $notificacion['mensaje'] =  'El Componente: ' .$componente->titulo. ' te fue asignado';
            $notificacion['link'] =  route('proyectos.gestion', ['id' => $componente->proyecto_id]);
            $notificacion['id_link'] =  $componente->proyecto_id;
            $notificacion['tipo'] =  'componente';
            $notificacion['accion'] =  'creacion';
            Notificacion::create($notificacion);
            //------------------------------------------------------------------------------------------
            return response()->json(['mensaje' => 'ok','respuesta' => 'Asignación correcta','tipo'=> 'success']);
            //------------------------------------------------------------------------------------------
        } else {
            abort(404);
        }
    }

    public function setCambioRespTarea(Request $request)
    {
        if ($request->ajax()) {
            $tarea = Tarea::findOrFail($request['tarea_id']);
            $tarea->update(['empleado_id' => $request['empleado_id']]);
            //------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------
            $tarea = Proyecto::findOrfail($request['tarea_id']);
            $dia_hora = date('Y-m-d H:i:s');
            $notificacion['usuario_id'] =  $request['empleado_id'];
            $notificacion['fec_creacion'] =  $dia_hora;
            $notificacion['titulo'] =  'Se te asigno una tarea';
            $notificacion['mensaje'] =  'La tarea: ' .$tarea->titulo. ' te fue asignada';
            $notificacion['link'] =  route('proyectos.gestion', ['id' => $tarea->componente->proyecto_id]);
            $notificacion['id_link'] =  $tarea->componente->proyecto_id;
            $notificacion['tipo'] =  'componente';
            $notificacion['accion'] =  'creacion';
            Notificacion::create($notificacion);
            //------------------------------------------------------------------------------------------
            return response()->json(['mensaje' => 'ok','respuesta' => 'Asignación correcta','tipo'=> 'success']);
            //------------------------------------------------------------------------------------------
        } else {
            abort(404);
        }
    }

    public function setDeshabilitarEmpleado(Request $request)
    {
        if ($request->ajax()) {
            $empleadoFind = Empleado::findOrFail($request['empleado_id']);
            $empleadoFind->update(['estado' => $request['data_estado']]);
            if ($request['data_estado']== 0) {
                return response()->json(['mensaje' => 'wa','respuesta' => 'Usuario deshabilitado','tipo'=> 'warning']);
            } else {
                return response()->json(['mensaje' => 'su','respuesta' => 'Usuario habilitado','tipo'=> 'success']);
            }
        } else {
            abort(404);
        }
    }

    public function setCambioGeneralResponsabilidades(Request $request)
    {
        if ($request->ajax()) {
            $empleado_find = Empleado::findOrFail($request['empleado_old_id']);
            if ($empleado_find->proyectos->count() > 0) {
                foreach ($empleado_find->proyectos as $proyecto) {
                    $proyecto->update(['empleado_id' => $request['empleado_new_id']]);
                    //-----------------------------------------------------------------------------------
                    $dia_hora = date('Y-m-d H:i:s');
                    $notificacion['usuario_id'] =  $request['empleado_new_id'];
                    $notificacion['fec_creacion'] =  $dia_hora;
                    $notificacion['titulo'] =  'Se te asigno un proyecto';
                    $notificacion['mensaje'] =  'El Proyecto: ' .$proyecto->titulo. ' te fue asignado';
                    $notificacion['link'] =  route('proyectos.gestion', ['id' => $proyecto->id]);
                    $notificacion['id_link'] =  $proyecto->id;
                    $notificacion['tipo'] =  'componente';
                    $notificacion['accion'] =  'creacion';
                    Notificacion::create($notificacion);
                    //------------------------------------------------------------------------------------------
                }
            }
            if ($empleado_find->componentes->count() > 0) {
                foreach ($empleado_find->componentes as $componente) {
                    $componente->update(['empleado_id' => $request['empleado_new_id']]);
                    //-----------------------------------------------------------------------------------
                    $dia_hora = date('Y-m-d H:i:s');
                    $notificacion['usuario_id'] =  $request['empleado_new_id'];
                    $notificacion['fec_creacion'] =  $dia_hora;
                    $notificacion['titulo'] =  'Se te asigno un componente';
                    $notificacion['mensaje'] =  'El Componente: ' .$componente->titulo. ' te fue asignado';
                    $notificacion['link'] =  route('proyectos.gestion', ['id' => $componente->proyecto_id]);
                    $notificacion['id_link'] =  $componente->proyecto_id;
                    $notificacion['tipo'] =  'componente';
                    $notificacion['accion'] =  'creacion';
                    Notificacion::create($notificacion);
                    //------------------------------------------------------------------------------------------
                }
            }
            if ($empleado_find->tareas->count() > 0) {
                foreach ($empleado_find->tareas as $tarea) {
                    $tarea->update(['empleado_id' => $request['empleado_new_id']]);
                    //-----------------------------------------------------------------------------------
                    $dia_hora = date('Y-m-d H:i:s');
                    $notificacion['usuario_id'] =  $request['empleado_new_id'];
                    $notificacion['fec_creacion'] =  $dia_hora;
                    $notificacion['titulo'] =  'Se te asigno una tarea';
                    $notificacion['mensaje'] =  'La tarea: ' .$tarea->titulo. ' te fue asignada';
                    $notificacion['link'] =  route('proyectos.gestion', ['id' => $tarea->componente->proyecto_id]);
                    $notificacion['id_link'] =  $tarea->componente->proyecto_id;
                    $notificacion['tipo'] =  'componente';
                    $notificacion['accion'] =  'creacion';
                    Notificacion::create($notificacion);
                    //------------------------------------------------------------------------------------------
                }
            }
            //------------------------------------------------------------------------------------------
            return response()->json(['mensaje' => 'ok','respuesta' => 'Asignación correcta','tipo'=> 'success']);
            //------------------------------------------------------------------------------------------

        } else {
            abort(404);
        }
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

    public function getproyectos(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['proyectos' => Proyecto::where('estado', 'Activo')->with('miembros_proyecto')->with('lider')->whereHas('miembros_proyecto', function ($q) use ($request) {
                $q->where('empleado_id', $request['empleado_id']);
            })->get()]);
        } else {
            abort(404);
        }
    }

    public function getproyectosLider(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['proyectos' => Proyecto::where('empleado_id', $request['empleado_id'])->where('estado', 'Activo')->with('miembros_proyecto')->with('lider')->get()]);
        } else {
            abort(404);
        }
    }

    public function getTareas(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['tareas' => Tarea::where('estado', 'Activa')->where('empleado_id', $request['empleado_id'])->get()]);
        } else {
            abort(404);
        }
    }

    public function getTareasVencidas(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['tareas' => Tarea::where('estado', 'Activa')->where('empleado_id', $request['empleado_id'])->where('fec_limite', '<', date('Y-m-d'))->get()]);
        } else {
            abort(404);
        }
    }

    public function getProyectosGraficosLider(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['proyectos' => Proyecto::with('componentes')->with('componentes.tareas')->where('estado', 'Activo')->where('empleado_id', $request['id_usuario'])->get()]);
        } else {
            abort(404);
        }
    }

    public function calendar_empleado(Request $request)
    {
        if ($request->ajax()) {
            $empleado = Empleado::findOrFail(session('id_usuario'));
            $array_events_calendario = [];
            foreach ($empleado->tareas->where('estado', 'Activa')->where('progreso', '<', 100) as $tarea) {
                //-------------------------------------------------
                $date1 = new DateTime($tarea->fec_creacion);
                $date2 = new DateTime($tarea->fec_limite);
                $diff = date_diff($date1, $date2);
                $differenceFormat = '%a';
                $diasTotalTarea = $diff->format($differenceFormat);
                if ($diasTotalTarea == 0) {
                    $diasTotalTarea = 1;
                }
                //-------------------------------------------------
                $date1 = new DateTime($tarea->fec_creacion);
                $date2 = new DateTime(date('Y-m-d'));
                $diff = date_diff($date1, $date2);
                $differenceFormat = '%a';
                $diasGestionTarea = $diff->format($differenceFormat);
                //---------------------------------------------------
                $porcVenc = ($diasGestionTarea * 100) / $diasTotalTarea;
                if ($tarea->fec_limite < date('Y-m-d')) {
                    $backgroundColor = 'rgba(255, 0, 0, 0.8)';
                } else {
                    if ($porcVenc > 80 || $diasTotalTarea - $diasGestionTarea < 3) {
                        $backgroundColor = 'rgba(255, 180, 0, 0.8)';
                    } else {
                        $backgroundColor = 'rgba(0, 200, 250, 0.8)';
                    }
                }
                $array_events_calendario[] = [
                    'title' => utf8_encode($tarea->titulo),
                    'start' => $tarea->fec_creacion,
                    'end' => $tarea->fec_limite,
                    'url' => route('tareas.gestion', ['id' => $tarea->id]),
                    'backgroundColor' =>  $backgroundColor,
                    'borderColor' => 'rgb(0,0,0)',
                ];
            }

            return response()->json(['array_events_calendario' => $array_events_calendario]);
        } else {
            abort(404);
        }
    }

    public function calendar_empleado_proy(Request $request)
    {
        if ($request->ajax()) {
            $proyecto = Proyecto::findOrFail($request['id']);
            $array_events_calendario = [];
            foreach ($proyecto->componentes as $componente) {
                foreach ($componente->tareas->where('estado', 'Activa')->where('progreso', '<', 100) as $tarea) {
                    //-------------------------------------------------
                    $date1 = new DateTime($tarea->fec_creacion);
                    $date2 = new DateTime($tarea->fec_limite);
                    $diff = date_diff($date1, $date2);
                    $differenceFormat = '%a';
                    $diasTotalTarea = $diff->format($differenceFormat);
                    if ($diasTotalTarea == 0) {
                        $diasTotalTarea = 1;
                    }
                    //-------------------------------------------------
                    $date1 = new DateTime($tarea->fec_creacion);
                    $date2 = new DateTime(date('Y-m-d'));
                    $diff = date_diff($date1, $date2);
                    $differenceFormat = '%a';
                    $diasGestionTarea = $diff->format($differenceFormat);
                    //---------------------------------------------------
                    $porcVenc = ($diasGestionTarea * 100) / $diasTotalTarea;
                    if ($tarea->fec_limite < date('Y-m-d')) {
                        $backgroundColor = 'rgba(255, 0, 0, 0.8)';
                    } else {
                        if ($porcVenc > 80 || $diasTotalTarea - $diasGestionTarea < 3) {
                            $backgroundColor = 'rgba(255, 180, 0, 0.8)';
                        } else {
                            $backgroundColor = 'rgba(0, 200, 250, 0.8)';
                        }
                    }
                    $array_events_calendario[] = [
                        'title' => utf8_encode($tarea->titulo),
                        'start' => $tarea->fec_creacion,
                        'end' => $tarea->fec_limite,
                        'url' => route('tareas.gestion', ['id' => $tarea->id]),
                        'backgroundColor' =>  $backgroundColor,
                        'borderColor' => 'rgb(0,0,0)',
                    ];
                }
            }
            return response()->json(['array_events_calendario' => $array_events_calendario]);
        } else {
            abort(404);
        }
    }

    public function getEmpleadosByempleado($empleado_id){
        $empleadoFind = Empleado::findOrFail($empleado_id);
        $ids_empresas = $empleadoFind->cargo->area->empresa->grupo->empresas->pluck('id');
        $empleados1 = Empleado::where('estado', 1)
                        ->whereHas('cargo', function ($p) use ($ids_empresas) {
                            $p->whereHas('area', function ($q) use ($ids_empresas) {
                                $q->whereIn('empresa_id', $ids_empresas);
                            });
                        })->get();
        $empleados2 = Empleado::where('estado', 1)
                        ->whereHas('cargo', function ($p) use ($ids_empresas) {
                            $p->whereHas('area', function ($q) use ($ids_empresas) {
                                $q->whereNotIn('empresa_id', $ids_empresas);
                            });
                        })->whereHas('empresas_tranv', function ($p) use ($empleadoFind) {
                            $p->where('empresa_id', $empleadoFind->cargo->area->empresa_id);
                        })->get();
        $empleados = $empleados1->concat($empleados2);

        return $empleados;
    }

    public function getLideresByempleado($empleado_id){
        $empleadoFind = Empleado::findOrFail($empleado_id);
        $ids_empresas = $empleadoFind->cargo->area->empresa->grupo->empresas->pluck('id');
        $lideres1 = Empleado::where('estado', 1)->where('lider',1)
                        ->whereHas('cargo', function ($p) use ($ids_empresas) {
                            $p->whereHas('area', function ($q) use ($ids_empresas) {
                                $q->whereIn('empresa_id', $ids_empresas);
                            });
                        })->get();
        $lideres2 = Empleado::where('estado', 1)->where('lider',1)
                        ->whereHas('cargo', function ($p) use ($ids_empresas) {
                            $p->whereHas('area', function ($q) use ($ids_empresas) {
                                $q->whereNotIn('empresa_id', $ids_empresas);
                            });
                        })->whereHas('empresas_tranv', function ($p) use ($empleadoFind) {
                            $p->where('empresa_id', $empleadoFind->cargo->area->empresa_id);
                        })->get();
        $lideres = $lideres1->concat($lideres2);

        return $lideres;
    }

    public function ajusteMiembrosProyecto($id){
        $tareaFind = Tarea::findOrfail($id);
        $idMiembros = [];
        $idMiembros[] = $tareaFind->componente->proyecto->empleado_id;
        foreach ($tareaFind->componente->proyecto->componentes as $componente) {
            $idMiembros[] = $componente->empleado_id;
            foreach ($componente->tareas as $tarea) {
                $idMiembros[] = $tarea->empleado_id;
            }
        }
        $idMiembros = array_unique($idMiembros);
        $tareaFind->componente->proyecto->miembros_proyecto()->sync($idMiembros);
    }
}
