<?php

namespace App\Http\Controllers\Proyectos;

use App\Http\Controllers\Controller;
use App\Models\Empresa\Area;
use App\Models\Empresa\Cargo;
use App\Models\Empresa\EmpGrupo;
use App\Models\Empresa\Empleado;
use App\Models\Empresa\Empresa;
use App\Models\Proyectos\Proyecto;
use App\Models\User;
use Illuminate\Http\Request;

class ProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $proyectos = Proyecto::orderBy('id')->get();
        return view('intranet.proyectos.proyecto.index', compact('proyectos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $grupos = EmpGrupo::get();
        $usuario = User::findOrFail(session('id_usuario'));
        $transversal = false;
        if (session('rol_principal_id')== 1) {
            $lideres = Empleado::where('estado', 1)->where('lider', 1)->get();
        } else {
            $lideres = Empleado::where('cargo.area.empresa_id', $usuario->empleado->cargo->area->empresa_id)->where('estado', 1)->where('lider', 1)->get();
            if ($usuario->empleado->empresas_tranv->count() > 1) {
                $transversal = true;
                $lideres2 = Empleado::where('estado', 1)->where('lider', 1)->whereHas('empresas_tranv', function ($q) use ($usuario) {
                    $q->where('empresa_id', $usuario->empresas_tranv->empresa_id);
                })->get();
                $lideres = $lideres->concat($lideres2);
            }
        }
        return view('intranet.proyectos.proyecto.crear',compact('grupos','usuario','transversal','lideres'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
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
    public function destroy(string $id)
    {
        //
    }

    public function getEmpresas(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['empresas' => Empresa::where('emp_grupo_id', $_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }
    public function getEmpleados(Request $request)
    {
        if ($request->ajax()) {

            //$lideres1 = Empleado::with('cargo.area.empresa')->where('cargo.area.empresa_id', $_GET['id'])->where('estado', 1)->where('lider', 1)->get();
            $lideres1 = Empleado::where('cargo.area.empresa_id', $_GET['id'])->where('estado', 1)->where('lider', 1)->get();
            dd($lideres1->toArray());
            $lideres2 = Empleado::with('cargo.area.empresa')->where('cargo.area.empresa_id', '!=', $_GET['id'])->where('estado', 1)->where('lider', 1)->whereHas('empresas_tranv', function ($q) use ($request) {
                $q->where('empresa_id', $_GET['id']);
            })->get();
            $empleados = $lideres1->concat($lideres2);

            return response()->json(['empleados' => $empleados]);
        } else {
            abort(404);
        }
    }
}
