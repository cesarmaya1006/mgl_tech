<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dashboard(Request $request)
    {
        $usuario = User::with('roles')->findOrFail(session('id_usuario'));
        $roles = session('roles');
        $roles = substr($roles, 0, -1);
        $roles = substr($roles, 1);
        $roles = str_replace('"','', $roles);
        $roles = explode(',',$roles);
        if ($usuario->empleado && $usuario->empleado->estado == 0) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('/')->with(['errores' => 'Usuario Deshabilitado']);
        }else{
            //dd($usuario->toArray());
            return view('dashboard',compact('roles'));
        }
    }

    public function profile()
    {
        return view('intranet.infojet.profile');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/')->with(['errors' => 'Usuario Deshabilitado']);
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
}
