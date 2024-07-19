<?php

namespace App\Http\Controllers\Proyectos;

use App\Http\Controllers\Controller;
use App\Models\Empresa\Empleado;
use App\Models\Proyectos\Componente;
use App\Models\Proyectos\Historial;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\Tarea;
use App\Models\Sistema\Notificacion;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($componente_id)
    {
        $componente = Componente::FindOrFail($componente_id);
        $lider = $componente->proyecto->lider;
        $ids_empresas = [];

        if ($lider->empresas_tranv->count() > 0) {
            foreach ($lider->empresas_tranv as $empresa) {
                $ids_empresas[] = $empresa->id;
            }
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
                })->whereHas('empresas_tranv', function ($p) use ($componente) {
                    $p->where('empresa_id', $componente->proyecto->empresa_id);
                })->get();
            $empleados = $empleados1->concat($empleados2);
        } else {
            $empleados = Empleado::where('estado', 1)
                ->whereHas('cargo', function ($p) use ($componente) {
                    $p->whereHas('area', function ($q) use ($componente) {
                        $q->where('empresa_id', $componente->proyecto->empresa_id);
                    });
                })->get();
        }
        return view('intranet.proyectos.tarea.crear', compact('componente', 'empleados'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $componente = Componente::findOrFail($request['componente_id']);
        //------------------------------------------------------------------------------------------
        switch ($request['impacto']) {
            case 'Alto':
                $impacto_num = 50;
                break;
            case 'Medio-alto':
                $impacto_num = 40;
                break;
            case 'Medio':
                $impacto_num = 30;
                break;
            case 'Medio-bajo':
                $impacto_num = 20;
                break;
            default:
                $impacto_num = 10;
                break;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        $miembros[] = intval($request['empleado_id']);
        foreach ($componente->proyecto->componentes as $componente) {
            $miembros[] = $componente->empleado_id;
            if ($componente->tareas->count() > 0) {
                foreach ($componente->tareas as $tarea) {
                    $miembros[] = $tarea->empleado_id;
                }
            }
        }
        $miembros = array_unique($miembros);
        //------------------------------------------------------------------------------------------
        if (isset($request['repeticion_tarea'])) {
            if ($request['termina_radio'] == 'repeticiones') {
                $cant_repeticiones = intval($request['cant_repeticiones']);
                for ($i = 0; $i < $cant_repeticiones; $i++) {
                    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                    if ($i == 0) {
                        $fec_creacion = $request['fec_creacion'];
                        $fec_limite = $request['fec_limite'];
                    } else {
                        switch ($request['periodo_repeticion']) {
                            case 'día':
                                $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " days"));
                                $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " days"));
                                break;
                            case 'semana':
                                $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " week"));
                                $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " week"));
                                break;
                            case 'mes':
                                $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " month"));
                                $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " month"));
                                break;
                            default:
                                $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " year"));
                                $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " year"));
                                break;
                        }
                    }
                    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                    $tarea_new['componente_id'] = $request['componente_id'];
                    $tarea_new['empleado_id'] = $request['empleado_id'];
                    $tarea_new['titulo'] = $request['titulo'];
                    $tarea_new['fec_creacion'] = $fec_creacion;
                    $tarea_new['fec_limite'] = $fec_limite;
                    $tarea_new['objetivo'] = $request['objetivo'];
                    $tarea_new['impacto'] = $request['impacto'];
                    $tarea_new['impacto_num'] = $impacto_num;
                    $tarea = Tarea::create($tarea_new);
                }
            } else {
                $fec_creacion = $request['fec_creacion'];
                $fec_limite = $request['fec_limite'];
                $fec_termino_repeticion = $request['fec_termino_repeticion'];
                $i = 1;
                do {
                    $tarea_new['componente_id'] = $request['componente_id'];
                    $tarea_new['empleado_id'] = $request['empleado_id'];
                    $tarea_new['titulo'] = $request['titulo'];
                    $tarea_new['fec_creacion'] = $fec_creacion;
                    $tarea_new['fec_limite'] = $fec_limite;
                    $tarea_new['objetivo'] = $request['objetivo'];
                    $tarea_new['impacto'] = $request['impacto'];
                    $tarea_new['impacto_num'] = $impacto_num;
                    $tarea = Tarea::create($tarea_new);

                    switch ($request['periodo_repeticion']) {
                        case 'día':
                            $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " days"));
                            $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " days"));
                            break;
                        case 'semana':
                            $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " week"));
                            $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " week"));
                            break;
                        case 'mes':
                            $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " month"));
                            $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " month"));
                            break;
                        default:
                            $fec_creacion = date("Y-m-d", strtotime($request['fec_creacion'] . "+ " . $i * intval($request['num_repeticiones']) . " year"));
                            $fec_limite = date("Y-m-d", strtotime($request['fec_limite'] . "+ " . $i * intval($request['num_repeticiones']) . " year"));
                            break;
                    }
                    $i++;
                } while (strtotime($fec_creacion) > strtotime($fec_termino_repeticion));
            }
        } else {

            $tarea_new['componente_id'] = $request['componente_id'];
            $tarea_new['empleado_id'] = $request['empleado_id'];
            $tarea_new['titulo'] = $request['titulo'];
            $tarea_new['fec_creacion'] = $request['fec_creacion'];
            $tarea_new['fec_limite'] = $request['fec_limite'];
            $tarea_new['objetivo'] = $request['objetivo'];
            $tarea_new['impacto'] = $request['impacto'];
            $tarea_new['impacto_num'] = $impacto_num;

            $tarea = Tarea::create($tarea_new);
        }
        $tarea->componente->proyecto->miembros_proyecto()->sync(array_unique($miembros));
        $this->modificarprogresos(0, $tarea->id);
        //----------------------------------------------------------------------------------------------------
        $dia_hora = date('Y-m-d H:i:s');
        $notificacion['usuario_id'] =  $request['empleado_id'];
        $notificacion['fec_creacion'] =  $dia_hora;
        $notificacion['titulo'] =  'Se asigno una nueva tarea';
        $notificacion['mensaje'] =  'Se creo una nueva tarea al proyecto ' . $tarea->componente->proyecto->titulo . ' y te fue asignada -> ' . ucfirst($request['titulo']);
        $notificacion['link'] =  route('proyectos.gestion', ['id' => $tarea->componente->proyecto->id]);
        $notificacion['id_link'] =  $tarea->componente->proyecto->id;
        $notificacion['tipo'] =  'tarea';
        $notificacion['accion'] =  'creacion';
        Notificacion::create($notificacion);
        //----------------------------------------------------------------------------------------------------
        return redirect('dashboard/proyectos/gestion/' . $componente->proyecto_id)->with('mensaje', 'Tarea creada con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function subtareas_create(string $id)
    {
        $tarea = Tarea::findOrFail($id);
        $empleados = $this->getEmpleados($tarea->componente->proyecto_id);
        return view('intranet.proyectos.tarea.subTareaCrear', compact('tarea', 'empleados'));

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function subtareas_store(Request $request,string $id)
    {
        Tarea::create($request->all());
        return redirect('dashboard/tareas/gestion/' . $id)->with('mensaje', 'Sub-tarea creada con éxito');
    }

    public function subtareas_gestion(string $id){
        $tarea = Tarea::findOrFail($id);
        $empleados = $this->getEmpleados($tarea->tarea->componente->proyecto_id);
        return view('intranet.proyectos.historial.crear_subtarea', compact('tarea', 'empleados'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {

    }

    public function gestion($id,$notificacion_id  = null)
    {
        if ($notificacion_id) {
            $notificacion_update['estado'] = 0;
            Notificacion::findOrFail($notificacion_id)->update($notificacion_update);
        }
        $tarea = Tarea::findOrfail($id);
        return view('intranet.proyectos.tarea.gestion', compact('tarea'));
    }

    public function getapitareas(Request $request, $componente_id, $estado)
    {
        if ($request->ajax()) {
            if ($request['estados']!=null) {
                if (in_array("Todas", $request['estados'])) {
                    return response()->json(['tareas' => Tarea::where('componente_id', $componente_id)->with('componente')->with('empleado')->get()]);
                } else {
                    return response()->json(['tareas' => Tarea::where('componente_id', $componente_id)->whereIn('estado', $request['estados'])->with('componente')->with('empleado')->get()]);
                }
            } else {
                return response()->json(['tareas' => Tarea::where('componente_id', $componente_id)->where('estado', 'vacio')->with('componente')->with('empleado')->get()]);
            }


        } else {
            abort(404);
        }
    }

    public function modificarprogresos($progreso_request, $proy_tareas_id)
    {
        $tareaFind = Tarea::findOrFail($proy_tareas_id);
        $tarea_update['progreso'] = $progreso_request;
        $tarea_update['estado'] = 'Activa';
        Tarea::findOrFail($proy_tareas_id)->update($tarea_update);

        $sumImpacto_numTarea_Componente = $tareaFind->componente->tareas->sum('impacto_num');
        $progesoComponenete = 0;
        foreach ($tareaFind->componente->tareas as $tarea) {
            $progesoComponenete += (($tarea->impacto_num / $sumImpacto_numTarea_Componente) * intval($tarea->progreso));
        }
        $componenteUpdate['progreso'] = $progesoComponenete;
        if ($progesoComponenete>=100) {
            $componenteUpdate['estado'] = 'Completo';
        } else {
            $componenteUpdate['estado'] = 'Activo';
        }
        $componenteUpdate['estado'] = 'Activo';
        Componente::findOrFail($tareaFind->componente->id)->update($componenteUpdate);
        //--------------------------------------------------------------------------------------
        $sumImpacto_numComponente_Proyecto = $tareaFind->componente->proyecto->componentes->sum('impacto_num');
        $progesoProyecto = 0;
        foreach ($tareaFind->componente->proyecto->componentes as $componente) {
            $progesoProyecto += (($componente->impacto_num / $sumImpacto_numComponente_Proyecto) * floatval($componente->progreso));
        }
        $ProyectoUpdate['progreso'] = $progesoProyecto;
        if ($progesoComponenete>=100) {
            $ProyectoUpdate['estado'] = 'Completo';
        } else {
            $ProyectoUpdate['estado'] = 'Activo';
        }
        Proyecto::findOrFail($tareaFind->componente->proyecto_id)->update($ProyectoUpdate);
    }

    public function reasignacionTarea(Request $request){
        if ($request->ajax()) {
            Tarea::findOrFail($request['id'])->update(['empleado_id'=>$request['empleado_id']]);
            //-----------------------------------------------------------------------------------
            $tarea = Tarea::findOrfail($request['id']);
            $dia_hora = date('Y-m-d H:i:s');
            $notificacion['usuario_id'] =  $request['empleado_id'];
            $notificacion['fec_creacion'] =  $dia_hora;
            $notificacion['titulo'] =  'Te fue asignado una tarea';
            $notificacion['mensaje'] =  'Se realizo una asignacion de tarea -- Proyecto ' .$tarea->componente->proyecto->titulo. ' y te fue asignado   Tarea-> ' .ucfirst($tarea->titulo);
            $notificacion['link'] =  route('proyectos.gestion', ['id' => $tarea->componente->proyecto_id]);
            $notificacion['id_link'] =  $tarea->componente->proyecto_id;
            $notificacion['tipo'] =  'componente';
            $notificacion['accion'] =  'creacion';
            Notificacion::create($notificacion);
            //------------------------------------------------------------------------------------------
            return response()->json(['mensaje' => 'ok','respuesta' => 'Asignación correcta','tipo'=> 'success']);
        } else {
            abort(404);
        }
    }

    public function ajustePresupuestos($id){
        $tareaFind = Componente::findOrfail($id);
        $proyecto = $tareaFind->componente->proyecto;
        $sumEjecutadoProyecto = 0;
        foreach ($proyecto->componentes as $componente) {
            $sumEjecutadoComponente = 0;
            foreach ($componente->tareas as $tarea) {
                $sumEjecutadoComponente += $tarea->costo;
            }
            $presupuestoTotalComp = $componente->presupuesto + $componente->adiciones->sum('adicion');
            $componenteUpdate['ejecucion'] = $sumEjecutadoComponente;
            $componenteUpdate['porc_ejecucion'] = $sumEjecutadoComponente*100/$presupuestoTotalComp;
            $componente->update($componenteUpdate);
            $sumEjecutadoProyecto += $sumEjecutadoComponente;
        }
        $presupuestoTotalProyecto = $proyecto->presupuesto + $proyecto->adiciones()->sum('adicion');
        $proyectoUpdate['ejecucion'] = $sumEjecutadoProyecto;
        $proyectoUpdate['porc_ejecucion'] = $sumEjecutadoProyecto*100/$presupuestoTotalProyecto;
        $proyecto->update($proyectoUpdate);
    }

    public function actualizarprogresos($id){
        $tareaFind = Componente::findOrfail($id);
        $proyecto = $tareaFind->componente->proyecto;
        $progresoProyecto = 0;
        foreach ($proyecto->componentes as $componente) {
            $progresoComponente =0;
            foreach ($componente->tareas as $tarea) {
                $progresoComponente+=($tarea->impacto_num/$componente->tareas->sum('impacto_num'))*$tarea->progreso;
            }
            $componente->update(['progreso'=>$progresoComponente]);
            $progresoProyecto+=($componente->impacto_num/$proyecto->componentes->sum('impacto_num'))*$componente->progreso;
        }
        $proyecto->update(['progreso'=>$progresoProyecto]);

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
    public function getEmpleados($proyecto_id){
        $proyecto = Proyecto::findOrFail($proyecto_id);
        $lider = $proyecto->lider;
        $ids_empresas = [];

        if ($lider->empresas_tranv->count() > 0) {
            foreach ($lider->empresas_tranv as $empresa) {
                $ids_empresas[] = $empresa->id;
            }
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
                    })->whereHas('empresas_tranv', function ($p) use ($proyecto) {
                        $p->where('empresa_id', $proyecto->empresa_id);
                    })->get();
            $empleados = $empleados1->concat($empleados2);
        } else {
            $empleados = Empleado::where('estado', 1)
                    ->whereHas('cargo', function ($p) use ($proyecto) {
                        $p->whereHas('area', function ($q) use ($proyecto) {
                            $q->where('empresa_id', $proyecto->empresa_id);
                        });
                    })->get();
                }
        return $empleados;
    }

    public function getHistSubTarea(Request $request){
        if ($request->ajax()) {
            return response()->json(['historiales' => Historial::with('empleado')->with('asignado')->where('tarea_id',$request['id'])->get()]);
        } else {
            abort(404);
        }
    }
}
