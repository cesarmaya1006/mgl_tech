<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TablaRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('roles')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
        // ===================================================================================
        $rol1 = Role::create(['name'=>'Super Administrador']);
        $rol2 = Role::create(['name'=>'Administrador']);
        $rol3 = Role::create(['name'=>'Administrador Empresa']);
        $rol4 = Role::create(['name'=>'Empleado']);

        Permission::create(['name'=>'dashboard'])->syncRoles([$rol1,$rol2,$rol3,$rol4]);

        Permission::create(['name'=>'menu.index'])->syncRoles([$rol1]);
        Permission::create(['name'=>'rol.index'])->syncRoles([$rol1]);

        Permission::create(['name'=>'menu.rol.index'])->syncRoles([$rol1]);
        Permission::create(['name'=>'menu.rol.store'])->syncRoles([$rol1]);

        Permission::create(['name'=>'permisos_menus_empresas.index'])->syncRoles([$rol1]);
        Permission::create(['name'=>'permisos_menus_empresas.store'])->syncRoles([$rol1]);

        Permission::create(['name'=>'permiso_rutas.index'])->syncRoles([$rol1]);

        Permission::create(['name'=>'permisos_rol.index'])->syncRoles([$rol1]);
        Permission::create(['name'=>'permisos_rol.store'])->syncRoles([$rol1]);
        Permission::create(['name'=>'permisos_rol.excepciones'])->syncRoles([$rol1]);
        Permission::create(['name'=>'permisos_rol.store_excepciones'])->syncRoles([$rol1]);

        Permission::create(['name'=>'grupo_empresas.index'])->syncRoles([$rol1]);
        Permission::create(['name'=>'grupo_empresas.create'])->syncRoles([$rol1]);
        Permission::create(['name'=>'grupo_empresas.edit'])->syncRoles([$rol1]);
        Permission::create(['name'=>'grupo_empresas.destroy'])->syncRoles([$rol1]);

        Permission::create(['name'=>'empresa.index'])->syncRoles([$rol1]);
        Permission::create(['name'=>'empresa.create'])->syncRoles([$rol1]);
        Permission::create(['name'=>'empresa.edit'])->syncRoles([$rol1]);
        Permission::create(['name'=>'empresa.destroy'])->syncRoles([$rol1]);
        //permisos Sin rutas
        Permission::create(['name'=>'layout.header.control-sidebar'])->syncRoles([$rol1]);

        Permission::create(['name'=>'areas.index'])->syncRoles([$rol1]);
        Permission::create(['name'=>'areas.create'])->syncRoles([$rol1]);
        Permission::create(['name'=>'areas.edit'])->syncRoles([$rol1]);
        Permission::create(['name'=>'areas.destroy'])->syncRoles([$rol1]);

        Permission::create(['name'=>'cargos.index'])->syncRoles([$rol1,$rol3]);
        Permission::create(['name'=>'cargos.create'])->syncRoles([$rol1,$rol3]);
        Permission::create(['name'=>'cargos.edit'])->syncRoles([$rol1,$rol3]);
        Permission::create(['name'=>'cargos.destroy'])->syncRoles([$rol1,$rol3]);

        Permission::create(['name'=>'empleados.index'])->syncRoles([$rol1,$rol3]);
        Permission::create(['name'=>'empleados.create'])->syncRoles([$rol1,$rol3]);
        Permission::create(['name'=>'empleados.edit'])->syncRoles([$rol1,$rol3]);
        Permission::create(['name'=>'empleados.destroy'])->syncRoles([$rol1,$rol3]);
        Permission::create(['name'=>'empleados.activar'])->syncRoles([$rol1,$rol3]);

        // Permisos proyectos
        Permission::create(['name'=>'proyectos.index'])->syncRoles([$rol1,$rol4]);
        Permission::create(['name'=>'proyectos.create'])->syncRoles([$rol1,$rol4]);
        Permission::create(['name'=>'proyectos.edit'])->syncRoles([$rol1,$rol4]);
        Permission::create(['name'=>'proyectos.destroy'])->syncRoles([$rol1,$rol4]);

    }
}
