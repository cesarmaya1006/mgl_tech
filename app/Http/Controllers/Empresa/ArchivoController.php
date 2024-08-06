<?php

namespace App\Http\Controllers\Empresa;

use App\Http\Controllers\Controller;
use App\Models\Empresa\Empleado;
use App\Models\Empresa\OpcionArchivo;
use App\Models\User;
use Illuminate\Http\Request;

class ArchivoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuario = User::with('roles')->findOrFail(session('id_usuario'));
        if ($usuario->hasRole('Super Administrador')) {
            $opciones = OpcionArchivo::get();
        } else {
            $opciones = $this->getOpcionesIdsEmpresas($usuario->id);
        }
        return view('intranet.empresa.archivo.index.index', compact('opciones'));
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

    public function getOpcionesIdsEmpresas($empleado_id)
    {
        $empleadoFind = Empleado::findOrFail($empleado_id);
        $ids_empresas = [];
        if ($empleadoFind->empresas_tranv->count() > 0) {
            foreach ($empleadoFind->empresas_tranv as $empresa) {
                $ids_empresas[] = $empresa->id;
            }
        } else {
            $ids_empresas[] = $empleadoFind->cargo->area->empresa_id;
        }

        return OpcionArchivo::whereHas('empresas', function ($q) use ($ids_empresas) {
            $q->whereIn('empresa_id', $ids_empresas);
        })->get();
    }
}
