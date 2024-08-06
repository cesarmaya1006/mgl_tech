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
        $rol1 = Role::create(['name' => 'Super Administrador']);
        $rol2 = Role::create(['name' => 'Administrador']);
        $rol3 = Role::create(['name' => 'Administrador Empresa']);
        $rol4 = Role::create(['name' => 'Empleado']);

        Permission::create(['name' => 'dashboard'])->syncRoles([$rol1, $rol2, $rol3, $rol4]);

        Permission::create(['name' => 'menu.index'])->syncRoles([$rol1]);
        Permission::create(['name' => 'rol.index'])->syncRoles([$rol1]);

        Permission::create(['name' => 'menu.rol.index'])->syncRoles([$rol1]);
        Permission::create(['name' => 'menu.rol.store'])->syncRoles([$rol1]);

        Permission::create(['name' => 'permisos_menus_empresas.index'])->syncRoles([$rol1]);
        Permission::create(['name' => 'permisos_menus_empresas.store'])->syncRoles([$rol1]);

        Permission::create(['name' => 'permiso_rutas.index'])->syncRoles([$rol1]);

        Permission::create(['name' => 'permisos_rol.index'])->syncRoles([$rol1]);
        Permission::create(['name' => 'permisos_rol.store'])->syncRoles([$rol1]);
        Permission::create(['name' => 'permisos_rol.excepciones'])->syncRoles([$rol1]);
        Permission::create(['name' => 'permisos_rol.store_excepciones'])->syncRoles([$rol1]);

        Permission::create(['name' => 'grupo_empresas.index'])->syncRoles([$rol1]);
        Permission::create(['name' => 'grupo_empresas.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'grupo_empresas.edit'])->syncRoles([$rol1]);
        Permission::create(['name' => 'grupo_empresas.destroy'])->syncRoles([$rol1]);

        Permission::create(['name' => 'empresa.index'])->syncRoles([$rol1]);
        Permission::create(['name' => 'empresa.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'empresa.edit'])->syncRoles([$rol1]);
        Permission::create(['name' => 'empresa.destroy'])->syncRoles([$rol1]);
        //permisos Sin rutas
        Permission::create(['name' => 'layout.header.control-sidebar'])->syncRoles([$rol1]);

        Permission::create(['name' => 'areas.index'])->syncRoles([$rol1]);
        Permission::create(['name' => 'areas.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'areas.edit'])->syncRoles([$rol1]);
        Permission::create(['name' => 'areas.destroy'])->syncRoles([$rol1]);

        Permission::create(['name' => 'cargos.index'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'cargos.create'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'cargos.edit'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'cargos.destroy'])->syncRoles([$rol1, $rol3]);

        Permission::create(['name' => 'empleados.index'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'empleados.create'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'empleados.edit'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'empleados.destroy'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'empleados.activar'])->syncRoles([$rol1, $rol3]);

        // Permisos proyectos
        Permission::create(['name' => 'proyectos.index'])->syncRoles([$rol1, $rol4]);
        Permission::create(['name' => 'proyectos.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'proyectos.edit'])->syncRoles([$rol1]);
        Permission::create(['name' => 'proyectos.destroy'])->syncRoles([$rol1]);
        Permission::create(['name' => 'proyectos.detalle'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'proyectos.gestion'])->syncRoles([$rol1]);
        Permission::create(['name' => 'proyectos.proyecto_empresas'])->syncRoles([$rol1]);
        //---------------------------------------------------------------------------------------------
        //vistas
        Permission::create(['name' => 'proyectos.ver_datos_empresa'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'proyectos.ver_estadistica_tareas'])->syncRoles([$rol1, $rol3]);
        Permission::create(['name' => 'proyectos.ver_calendario_tareas'])->syncRoles([$rol1, $rol3]);
        //---------------------------------------------------------------------------------------------
        Permission::create(['name' => 'caja_presupuestos'])->syncRoles([$rol1]);
        Permission::create(['name' => 'exportar_proyecto'])->syncRoles([$rol1]);
        Permission::create(['name' => 'personal_asignado_proyecto'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas_vec_gestion_proyecto'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas_vec_gestion_proyecto_todas'])->syncRoles([$rol1]);

        // Permisos componentes
        Permission::create(['name' => 'componentes.index'])->syncRoles([$rol1, $rol4]);
        Permission::create(['name' => 'componentes.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'componentes.edit'])->syncRoles([$rol1]);
        Permission::create(['name' => 'componentes.destroy'])->syncRoles([$rol1]);
        //---------------------------------------------------------------------------------------------
        Permission::create(['name' => 'gestion_ver_componentes_info'])->syncRoles([$rol1]);
        Permission::create(['name' => 'ver_presupuesto_componentes'])->syncRoles([$rol1]);
        Permission::create(['name' => 'ver_presupuesto_proyecto'])->syncRoles([$rol1]);
        Permission::create(['name' => 'ver_tareas_componentes'])->syncRoles([$rol1]);
        // - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - *  - * -

        // Permisos Tareas
        Permission::create(['name' => 'tareas.index'])->syncRoles([$rol1, $rol4]);
        Permission::create(['name' => 'tareas.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas.edit'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas.destroy'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas.gestion'])->syncRoles([$rol1]);
        //---------------------------------------------------------------------------------------------
        Permission::create(['name' => 'ver_tareas'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas_vencidas'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas_gestion_ver_datos_proy'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas_gestion_ver_presupuesto_proyecto'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas_gestion_ver_presupuesto_componente'])->syncRoles([$rol1]);
        Permission::create(['name' => 'tareas_gestion_ver_datos_comp'])->syncRoles([$rol1]);
        // Permisos historial
        Permission::create(['name' => 'historiales.index'])->syncRoles([$rol1, $rol4]);
        Permission::create(['name' => 'historiales.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'historiales.edit'])->syncRoles([$rol1]);
        Permission::create(['name' => 'historiales.destroy'])->syncRoles([$rol1]);
        Permission::create(['name' => 'historiales.gestion'])->syncRoles([$rol1]);
        //---------------------------------------------------------------------------------------------
        // Permisos Subtareas
        Permission::create(['name' => 'subtareas.create'])->syncRoles([$rol1]);
        Permission::create(['name' => 'subtareas.gestion'])->syncRoles([$rol1]);
        //---------------------------------------------------------------------------------------------
        // Permisos Premisos Empleados
        Permission::create(['name' => 'permisoscargos.index'])->syncRoles([$rol1, $rol3]);
        //---------------------------------------------------------------------------------------------
        // ===================================================================================
        //Permisos Archivo
        Permission::create(['name' => 'archivo-modulo.index', 'nombre' => 'Módulo Archivo Index'])->syncRoles([$rol1]);
        //permisos archivo Accesos
        //-------------------------------------------------------------------------------------
        // Permisos Hojas de vida
        Permission::create(['name' => 'hojas_vida.index', 'nombre' => 'Hojas de Vida Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Manuales de funcion
        Permission::create(['name' => 'manuales.index', 'nombre' => 'Manuales de funciones Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Soportes de Afiliación
        Permission::create(['name' => 'soportes_afiliacion.index', 'nombre' => 'Soportes de Afiliación Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Documentos contractuales
        Permission::create(['name' => 'documentos_contractuales.index', 'nombre' => 'Documentos contractuales Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Situaciones laborales generales
        Permission::create(['name' => 'sit_lab_gen.index', 'nombre' => 'Situaciones laborales generales Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Historias clínicas ocupacionales
        Permission::create(['name' => 'histclinicasocup.index', 'nombre' => 'Historias clínicas ocupacionales Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Entrega de dotación, elementos de trabajo y de protección
        Permission::create(['name' => 'dotaciones.index', 'nombre' => 'Entrega de dotación, elementos de trabajo y de protección Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Proceso disciplinario, faltas y sanciones
        Permission::create(['name' => 'proceso_discip.index', 'nombre' => 'Proceso disciplinario, faltas y sanciones Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Evaluaciones de desempeño
        Permission::create(['name' => 'evaluacion_desemp.index', 'nombre' => 'Evaluaciones de desempeño Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Vacaciones y licencias
        Permission::create(['name' => 'vacaciones.index', 'nombre' => 'Vacaciones y licencias Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Documentos de Retiro
        Permission::create(['name' => 'doc_retiro.index', 'nombre' => 'Documentos de Retiro Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Capacitaciones y certificaciones
        Permission::create(['name' => 'capacitacion.index', 'nombre' => 'Capacitaciones y certificaciones Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Políticas, Reglamentos y otros
        Permission::create(['name' => 'politica.index', 'nombre' => 'Políticas, Reglamentos y otros Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Diagnósticos Legales
        Permission::create(['name' => 'diagnosticos.index', 'nombre' => 'Diagnósticos Legales Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Gestión de Clientes
        Permission::create(['name' => 'cliente.index', 'nombre' => 'Gestión de Clientes Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Gestión de Proveedores
        Permission::create(['name' => 'proveedores.index', 'nombre' => 'Gestión de Proveedores Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // Permisos Permisos Archivo
        Permission::create(['name' => 'permisosarchivo.index', 'nombre' => 'Permisos Archivo Index'])->syncRoles([$rol1]);
        //-------------------------------------------------------------------------------------
        // ===================================================================================
    }
}
