<?php

namespace App\Http\Controllers\Empresa;

use App\Http\Controllers\Controller;
use App\Models\Empresa\Area;
use App\Models\Empresa\Cargo;
use App\Models\Empresa\EmpGrupo;
use App\Models\Empresa\Empleado;
use App\Models\User;
use Illuminate\Http\Request;

class PermisoEmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grupos = EmpGrupo::get();
        $usuario = User::findOrFail(session('id_usuario'));
        $empleadoPrueba = Empleado::findOrFail(3);
        return view('intranet.config.permiso_empleados.index',compact('grupos','usuario','empleadoPrueba'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

    public function getAreas(Request $request){
        if ($request->ajax()) {
            return response()->json(['areas' => Area::where('empresa_id',$_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }
    public function getCargos(Request $request){
        if ($request->ajax()) {
            return response()->json(['cargos' => Cargo::where('area_id',$_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }
}
