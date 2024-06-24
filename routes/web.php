<?php

use App\Http\Controllers\Config\MenuController;
use App\Http\Controllers\Config\MenuEmpresaController;
use App\Http\Controllers\Config\MenuRolController;
use App\Http\Controllers\Config\PageController;
use App\Http\Controllers\Config\PermisoController;
use App\Http\Controllers\Config\PermisoRolController;
use App\Http\Controllers\Config\RolController;
use App\Http\Controllers\Empresa\AreaController;
use App\Http\Controllers\Empresa\CargoController;
use App\Http\Controllers\Empresa\EmpGrupoController;
use App\Http\Controllers\Empresa\EmpleadoController;
use App\Http\Controllers\Empresa\EmpresaController;
use App\Http\Controllers\Proyectos\ProyectoController;
use App\Http\Middleware\AdminEmp;
use App\Http\Middleware\Empleado;
use App\Http\Middleware\SuperAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::prefix('dashboard')->middleware(['auth:sanctum', config('jetstream.auth_session'),])->group(function () {
    Route::get('', [PageController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [PageController::class, 'profile'])->name('profile');
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //Middleware Super admin
    Route::prefix('configuracion_sis')->middleware(SuperAdmin::class)->group(function () {
        // Ruta Administrador del Sistema Menus
        // ------------------------------------------------------------------------------------
        Route::controller(MenuController::class)->prefix('menu')->group(function () {
            Route::get('', 'index')->name('menu.index');
            Route::get('crear', 'create')->name('menu.create');
            Route::get('editar/{id}', 'edit')->name('menu.edit');
            Route::post('guardar', 'store')->name('menu.store');
            Route::put('actualizar/{id}', 'update')->name('menu.update');
            Route::get('eliminar/{id}', 'destroy')->name('menu.destroy');
            Route::get('guardar-orden', 'guardarOrden')->name('menu.ordenar');
        });
        // ------------------------------------------------------------------------------------
        // Ruta Administrador del Sistema Roles
        Route::controller(RolController::class)->prefix('rol')->group(function () {
            Route::get('', 'index')->name('rol.index');
            Route::get('crear', 'create')->name('rol.create');
            Route::get('editar/{id}', 'edit')->name('rol.edit');
            Route::post('guardar', 'store')->name('rol.store');
            Route::put('actualizar/{id}', 'update')->name('rol.update');
            Route::delete('eliminar/{id}', 'destroy')->name('rol.destroy');
        });
        // ----------------------------------------------------------------------------------------
        /* Ruta Administrador del Sistema Menu Rol*/
        Route::controller(MenuRolController::class)->prefix('permisos_menus_rol')->group(function () {
            Route::get('', 'index')->name('menu.rol.index');
            Route::post('guardar', 'store')->name('menu.rol.store');
        });
        // ----------------------------------------------------------------------------------------
        /* Ruta Administrador del Sistema Menu Empresas*/
        Route::controller(MenuEmpresaController::class)->prefix('permisos_menus_empresas')->group(function () {
            Route::get('', 'index')->name('permisos_menus_empresas.index');
            Route::post('guardar', 'store')->name('permisos_menus_empresas.store');
        });
        // ------------------------------------------------------------------------------------
        // Ruta Administrador del Sistema Roles
        Route::controller(PermisoController::class)->prefix('permiso_rutas')->group(function () {
            Route::get('', 'index')->name('permiso_rutas.index');
        });
        // ----------------------------------------------------------------------------------------
        /* Ruta Administrador del Sistema Menu Rol*/
        Route::controller(PermisoRolController::class)->prefix('permisos_rol')->group(function () {
            Route::get('', 'index')->name('permisos_rol.index');
            Route::post('guardar', 'store')->name('permisos_rol.store');
            Route::get('excepciones/{permission_id}/{role_id}', 'excepciones')->name('permisos_rol.excepciones');
            Route::post('guardar_excepciones', 'store_excepciones')->name('permisos_rol.store_excepciones');
        });
        // ----------------------------------------------------------------------------------------
        // Ruta Administrador Grupo Empresas
        // ------------------------------------------------------------------------------------
        Route::controller(EmpGrupoController::class)->prefix('grupo_empresas')->group(function () {
            Route::get('', 'index')->name('grupo_empresas.index');
            Route::get('crear', 'create')->name('grupo_empresas.create');
            Route::get('editar/{id}', 'edit')->name('grupo_empresas.edit');
            Route::post('guardar', 'store')->name('grupo_empresas.store');
            Route::put('actualizar/{id}', 'update')->name('grupo_empresas.update');
            Route::delete('eliminar/{id}', 'destroy')->name('grupo_empresas.destroy');
            Route::get('activar/{id}', 'activar')->name('grupo_empresas.activar');
            Route::get('getEmpresas', 'getEmpresas')->name('grupo_empresas.getEmpresas');
        });
        // ------------------------------------------------------------------------------------
        // ------------------------------------------------------------------------------------
        // Ruta Administrador del Empresa
        // ------------------------------------------------------------------------------------
        Route::controller(EmpresaController::class)->prefix('empresas')->group(function () {
            Route::get('', 'index')->name('empresa.index');
            Route::get('getEmpresas', 'getEmpresas')->name('empresa.getEmpresas');
            Route::get('crear', 'create')->name('empresa.create');
            Route::get('editar/{id}', 'edit')->name('empresa.edit');
            Route::post('guardar', 'store')->name('empresa.store');
            Route::put('actualizar/{id}', 'update')->name('empresa.update');
            Route::delete('eliminar/{id}', 'destroy')->name('empresa.destroy');
            Route::get('activar/{id}', 'activar')->name('empresa.activar');
        });
        // ----------------------------------------------------------------------------------------
    });
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Route::prefix('configuracion')->middleware(AdminEmp::class)->group(function () {
        // ------------------------------------------------------------------------------------
        // Ruta Administrador del Sistema Areas
        Route::controller(AreaController::class)->prefix('areas')->group(function () {
            Route::get('', 'index')->name('areas.index');
            Route::get('crear', 'create')->name('areas.create');
            Route::get('editar/{id}', 'edit')->name('areas.edit');
            Route::post('guardar', 'store')->name('areas.store');
            Route::put('actualizar/{id}', 'update')->name('areas.update');
            Route::delete('eliminar/{id}', 'destroy')->name('areas.destroy');
            Route::get('getDependencias/{id}', 'getDependencias')->name('areas.getDependencias');
            Route::get('getAreas', 'getAreas')->name('areas.getAreas');
        });
        // ------------------------------------------------------------------------------------
        // Ruta Administrador del Sistema Cargos
        Route::controller(CargoController::class)->prefix('cargos')->group(function () {
            Route::get('', 'index')->name('cargos.index');
            Route::get('crear', 'create')->name('cargos.create');
            Route::get('editar/{id}', 'edit')->name('cargos.edit');
            Route::post('guardar', 'store')->name('cargos.store');
            Route::put('actualizar/{id}', 'update')->name('cargos.update');
            Route::delete('eliminar/{id}', 'destroy')->name('cargos.destroy');
            Route::get('getCargos', 'getCargos')->name('cargos.getCargos');
            Route::get('getCargosTodos', 'getCargosTodos')->name('cargos.getCargosTodos');
            Route::get('getAreas', 'getAreas')->name('cargos.getAreas');
        });
        // ----------------------------------------------------------------------------------------
        // Ruta Administrador del Sistema Empleados
        Route::controller(EmpleadoController::class)->prefix('empleados')->group(function () {
            Route::get('', 'index')->name('empleados.index');
            Route::get('crear', 'create')->name('empleados.create');
            Route::get('editar/{id}', 'edit')->name('empleados.edit');
            Route::post('guardar', 'store')->name('empleados.store');
            Route::put('actualizar/{id}', 'update')->name('empleados.update');
            Route::delete('eliminar/{id}', 'destroy')->name('empleados.destroy');
            Route::put('activar/{id}', 'activar')->name('empleados.activar');
            Route::get('getCargos', 'getCargos')->name('empleados.getCargos');
            // *--* *--* *--* *--* *--* *--* *--* *--* *--* *--* *--* *--* *--* *--* *--* *--* *--*
            Route::get('getEmpresas', 'getEmpresas')->name('empleados.getEmpresas');
            Route::get('getAreas', 'getAreas')->name('empleados.getAreas');
            Route::get('getCargos', 'getCargos')->name('empleados.getCargos');
            Route::get('getEmpleados', 'getEmpleados')->name('empleados.getEmpleados');

        });
        // ----------------------------------------------------------------------------------------

    });
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Route::middleware(Empleado::class)->group(function (){
        // ------------------------------------------------------------------------------------
        // Ruta Administrador del Sistema Areas
        Route::controller(ProyectoController::class)->prefix('proyectos')->group(function () {
            Route::get('', 'index')->name('proyectos.index');
            Route::get('crear', 'create')->name('proyectos.create');
            Route::get('editar/{id}', 'edit')->name('proyectos.edit');
            Route::post('guardar', 'store')->name('proyectos.store');
            Route::put('actualizar/{id}', 'update')->name('proyectos.update');
            Route::delete('eliminar/{id}', 'destroy')->name('proyectos.destroy');
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            Route::get('getEmpresas', 'getEmpresas')->name('proyectos.getEmpresas');
            Route::get('getAreas', 'getAreas')->name('proyectos.getAreas');
            Route::get('getCargos', 'getCargos')->name('proyectos.getCargos');
            Route::get('getEmpleados', 'getEmpleados')->name('proyectos.getEmpleados');
        });
        // ------------------------------------------------------------------------------------
    });
});
