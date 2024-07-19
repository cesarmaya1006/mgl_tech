<?php

namespace App\Http\Controllers\Proyectos;

use App\Http\Controllers\Controller;
use App\Models\Empresa\Empleado;
use App\Models\Proyectos\Componente;
use App\Models\Proyectos\ComponenteAdicion;
use App\Models\Proyectos\ComponenteCambio;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\Tarea;
use App\Models\Sistema\Notificacion;
use Illuminate\Http\Request;

class ComponenteController extends Controller
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
    public function create($proyecto_id)
    {
        $proyecto = Proyecto::FindOrFail($proyecto_id);
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
        return view('intranet.proyectos.componente.crear', compact('proyecto', 'empleados'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $proyecto_id)
    {
        $proyecto = Proyecto::findOrFail($proyecto_id);
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
        $request['impacto_num'] = $impacto_num;
        $componente = Componente::create($request->all());
        //-----------------------------------------------------------------------------------
        $componente->proyecto->miembros_proyecto()->attach($request['empleado_id']);
        //-----------------------------------------------------------------------------------
        $dia_hora = date('Y-m-d H:i:s');
        $notificacion['usuario_id'] =  $request['empleado_id'];
        $notificacion['fec_creacion'] =  $dia_hora;
        $notificacion['titulo'] =  'Se creo un nuevo componente y te fue asignado ';
        $notificacion['mensaje'] =  'Se creo una nuevo componente al proyecto ' .$componente->proyecto->titulo. ' y te fue asignado -> ' .ucfirst($request['titulo']);
        $notificacion['link'] =  route('proyectos.gestion', ['id' => $proyecto_id]);
        $notificacion['id_link'] =  $proyecto_id;
        $notificacion['tipo'] =  'componente';
        $notificacion['accion'] =  'creacion';
        Notificacion::create($notificacion);
        //------------------------------------------------------------------------------------------
        // - - - - - - - - - - - - - - - - - - - - - - - -
        ComponenteCambio::create([
            'empleado_id' => $request['empleado_id'],
            'componente_id' => $componente->id,
            'fecha' => $request['fec_creacion'],
            'cambio' => 'Se crea nuevo componente',
        ]);
        // - - - - - - - - - - - - - - - - - - - - - - - -
        return redirect('dashboard/proyectos/gestion/'.$proyecto_id)->with('mensaje', 'Componente creado con éxito');

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
        $componente = Componente::findOrFail($id);
        $proyecto = $componente->proyecto;
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
        return view('intranet.proyectos.componente.editar',compact('componente','proyecto','empleados'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $componente = Componente::findOrFail($id);
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
        $componenteUpdate['fec_creacion'] = $request['fec_creacion'];
        $componenteUpdate['proyecto_id'] = $request['proyecto_id'];
        $componenteUpdate['empleado_id'] = $request['empleado_id'];
        $componenteUpdate['titulo'] = $request['titulo'];
        $componenteUpdate['impacto'] = $request['impacto'];
        $componenteUpdate['objetivo'] = $request['objetivo'];
        $componenteUpdate['impacto_num'] = $request['impacto_num'];

        $componenteUpdate['impacto_num'] = $impacto_num;
        $adicion = doubleval($request['adicion']);


        if ($adicion != 0) {
            $adicionNew['empleado_id'] = $request['empleado_id'];
            $adicionNew['componente_id'] = $componente->id;
            $adicionNew['adicion'] = $adicion;
            $adicionNew['fecha'] = date('Y-m-d');
            $adicionNew['justificacion'] = $request['justificacion'];
            ComponenteAdicion::create($adicionNew);
        }
        $componente->update($componenteUpdate);
        // - - - - - - - - - - - - - - - - - - - - - - - -
        $this->ajusteMiembrosProyecto($id);
        $this->actualizarprogresos($id);
        $this->ajustePresupuestos($id);
        // - - - - - - - - - - - - - - - - - - - - - - - -
        //-----------------------------------------------------------------------------------
        $dia_hora = date('Y-m-d H:i:s');
        $notificacion['usuario_id'] =  $request['empleado_id'];
        $notificacion['fec_creacion'] =  $dia_hora;
        $notificacion['titulo'] =  'Componente Actualizado';
        $notificacion['mensaje'] =  'Se realizo una actualización de componente -- Proyecto ' .$componente->proyecto->titulo. ' y te fue asignado   Componente-> ' .ucfirst($componente->titulo);
        $notificacion['link'] =  route('proyectos.gestion', ['id' => $componente->proyecto_id]);
        $notificacion['id_link'] =  $componente->proyecto_id;
        $notificacion['tipo'] =  'componente';
        $notificacion['accion'] =  'creacion';
        Notificacion::create($notificacion);
        //------------------------------------------------------------------------------------------
        return redirect('dashboard/proyectos/gestion/'.$componente->proyecto_id)->with('mensaje', 'Componente actualizado con éxito');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function reasignacionComponente(Request $request){
        if ($request->ajax()) {
            Componente::findOrFail($request['id'])->update(['empleado_id'=>$request['empleado_id']]);
            //-----------------------------------------------------------------------------------
            $componente = Componente::findOrfail($request['id']);
            $miembrosProyecto = $componente->proyecto->miembros_proyecto()->pluck('id');
            //-----------------------------------------------------------------------------------
            $this->ajusteMiembrosProyecto($request['id']);
            $this->actualizarprogresos($request['id']);
            $this->ajustePresupuestos($request['id']);
        // - - - - - - - - - - - - - - - - - - - - - - - -
            //-----------------------------------------------------------------------------------
            $dia_hora = date('Y-m-d H:i:s');
            $notificacion['usuario_id'] =  $request['empleado_id'];
            $notificacion['fec_creacion'] =  $dia_hora;
            $notificacion['titulo'] =  'Te fue asignado un componente';
            $notificacion['mensaje'] =  'Se realizo una asignacion de componente -- Proyecto ' .$componente->proyecto->titulo. ' y te fue asignado   Componente-> ' .ucfirst($componente->titulo);
            $notificacion['link'] =  route('proyectos.gestion', ['id' => $componente->proyecto_id]);
            $notificacion['id_link'] =  $componente->proyecto_id;
            $notificacion['tipo'] =  'componente';
            $notificacion['accion'] =  'creacion';
            Notificacion::create($notificacion);
            //------------------------------------------------------------------------------------------
            return response()->json(['mensaje' => 'ok','respuesta' => 'Asignación correcta','tipo'=> 'success']);
        } else {
            abort(404);
        }
    }

    public function reasignacionComponenteMasivo(Request $request){
        if ($request->ajax()) {
            $componente = Componente::with('tareas')->findOrfail($request['id']);
            Componente::findOrFail($request['id'])->update(['empleado_id'=>$request['empleado_id']]);
            //-----------------------------------------------------------------------------------
            $this->ajusteMiembrosProyecto($request['id']);
            //-----------------------------------------------------------------------------------
            $dia_hora = date('Y-m-d H:i:s');
            $notificacion['usuario_id'] =  $request['empleado_id'];
            $notificacion['fec_creacion'] =  $dia_hora;
            $notificacion['titulo'] =  'Te fue asignado un componente';
            $notificacion['mensaje'] =  'Se realizo una asignacion de componente -- Proyecto ' .$componente->proyecto->titulo. ' y te fue asignado   Componente-> ' .ucfirst($componente->titulo);
            $notificacion['link'] =  route('proyectos.gestion', ['id' => $componente->proyecto_id]);
            $notificacion['id_link'] =  $componente->proyecto_id;
            $notificacion['tipo'] =  'componente';
            $notificacion['accion'] =  'creacion';
            Notificacion::create($notificacion);
            //------------------------------------------------------------------------------------------
            foreach ($componente->tareas as $tarea) {
                Tarea::findOrFail($tarea->id)->update(['empleado_id'=>$request['empleado_id']]);
                //-----------------------------------------------------------------------------------
                $tarea = Tarea::findOrfail($tarea->id);
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
            }
            $this->ajusteMiembrosProyecto($request['id']);
            //------------------------------------------------------------------------------------------
            return response()->json(['componente' => $componente,'mensaje' => 'ok','respuesta' => 'Asignación correcta','tipo'=> 'success']);
        } else {
            abort(404);
        }
    }
    public function ajustePresupuestos($id){
        $componenteFind = Componente::findOrfail($id);
        $proyecto = $componenteFind->proyecto;
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
        $componenteFind = Componente::findOrfail($id);
        $proyecto = $componenteFind->proyecto;
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
        $componente_ini = Componente::findOrFail($id);
        $idMiembros = [];
        $idMiembros[] = $componente_ini->proyecto->empleado_id;
        foreach ($componente_ini->proyecto->componentes as $componente) {
            $idMiembros[] = $componente->empleado_id;
            foreach ($componente->tareas as $tarea) {
                $idMiembros[] = $tarea->empleado_id;
            }
        }
        $idMiembros = array_unique($idMiembros);
        $componente_ini->proyecto->miembros_proyecto()->sync($idMiembros);
    }
}
