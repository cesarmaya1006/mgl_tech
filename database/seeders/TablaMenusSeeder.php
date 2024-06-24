<?php

namespace Database\Seeders;

use App\Models\Config\Menu;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TablaMenusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('menus')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('menu_rol')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('menu_empresas')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        // ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ==========
        $menus = [
            //Menu Inicio
            ['nombre' => 'Dashboard', 'menu_id' => null, 'url' => 'dashboard', 'orden' => '1', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
            //Menu configuración 2
            [
                'nombre' => 'Configuración Sistema', 'menu_id' => null, 'url' => '#', 'orden' => '2', 'icono' => 'fas fa-cogs',
                'Array_1' => [
                    //Menu menu
                    ['nombre' => 'Menús', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/menu', 'orden' => '1',  'icono' => 'fas fa-list-ul', 'Array_1' => []],
                    //Menu Roles
                    ['nombre' => 'Roles', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/rol', 'orden' => '2',  'icono' => 'fas fa-users', 'Array_1' => []],
                    //Menu Menu_Roles
                    ['nombre' => 'Menú - Roles', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/permisos_menus_rol', 'orden' => '2',  'icono' => 'fas fa-chalkboard-teacher', 'Array_1' => []],
                    //Menu Menu_Empresas
                    ['nombre' => 'Menú - Empresas', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/permisos_menus_empresas', 'orden' => '2',  'icono' => 'fas fa-grip-horizontal', 'Array_1' => []],
                    //Menu permisos
                    ['nombre' => 'Permisos', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/permiso_rutas', 'orden' => '2',  'icono' => 'fas fa-check-square', 'Array_1' => []],
                    //Menu permisos-rol
                    ['nombre' => 'Permisos - Roles', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/permisos_rol', 'orden' => '2',  'icono' => 'fas fa-user-shield', 'Array_1' => []],
                    //Menu Grupo Empresas
                    ['nombre' => 'Grupo Empresas', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/grupo_empresas', 'orden' => '2',  'icono' => 'fas fa-industry', 'Array_1' => []],
                    //Menu Empresas
                    ['nombre' => 'Empresas', 'menu_id' => '2',  'url' => 'dashboard/configuracion_sis/empresas', 'orden' => '2',  'icono' => 'fas fa-building', 'Array_1' => []],

                ],
            ],
            [
                'nombre' => 'Configuración', 'menu_id' => null, 'url' => '#', 'orden' => '3', 'icono' => 'fas fa-cogs',
                'Array_1' => [
                    //Menu organigrama
                    [
                        'nombre' => 'Organigrama', 'menu_id' => '2',  'url' => '#', 'orden' => '1',  'icono' => 'fas fa-sitemap',
                        'Array_1' => [
                            //Menu Areas
                            ['nombre' => 'Áreas', 'menu_id' => '2',  'url' => 'dashboard/configuracion/areas', 'orden' => '1',  'icono' => 'fas fa-project-diagram', 'Array_1' => []],
                            //Menu Roles
                            ['nombre' => 'Cargos', 'menu_id' => '2',  'url' => 'dashboard/configuracion/cargos', 'orden' => '2',  'icono' => 'fas fa-user-tie', 'Array_1' => []],
                            //Menu Roles
                            ['nombre' => 'Empleados', 'menu_id' => '2',  'url' => 'dashboard/configuracion/empleados', 'orden' => '2',  'icono' => 'fas fa-users', 'Array_1' => []],
                            //Menu Roles
                            ['nombre' => 'Permisos Empleados', 'menu_id' => '2',  'url' => 'dashboard/configuracion/empleados_permisos', 'orden' => '2',  'icono' => 'fas fa-user-shield', 'Array_1' => []],

                        ]
                    ],

                ],
            ],
            //Menu Modulo Juridico
            [
                'nombre' => 'Módulo Jurídico', 'menu_id' => null, 'url' => '#', 'orden' => '3', 'icono' => 'fas fa-balance-scale',
                'Array_1' => [
                    //Menu Parametrizacion Juridico
                    [
                        'nombre' => 'Parametrización', 'url' => '#', 'icono' => 'fas fa-indent',
                        'Array_1' => [
                            //Param  Juzgados
                            [
                                'nombre' => 'Parámetros Juzgados', 'url' => '#', 'icono' => 'fas fa-balance-scale',
                                'Array_1' => [
                                    //Param  jurisdiccion juzgados
                                    ['nombre' => 'Jurisdiccion Juzgados', 'url' => 'dashboard/modulo-juridico/param-juzgados/jurisdiccion-juzgados', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  jurisdiccion juzgados
                                    ['nombre' => 'Departamentos Juzgados', 'url' => 'dashboard/modulo-juridico/param-juzgados/departamentos-juzgados', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  jurisdiccion juzgados
                                    ['nombre' => 'Distritos Juzgados', 'url' => 'dashboard/modulo-juridico/param-juzgados/distritos-juzgados', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  jurisdiccion juzgados
                                    ['nombre' => 'Circuitos Juzgados', 'url' => 'dashboard/modulo-juridico/param-juzgados/circuitos-juzgados', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  jurisdiccion juzgados
                                    ['nombre' => 'Municipios Juzgados', 'url' => 'dashboard/modulo-juridico/param-juzgados/circuitos-juzgados', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  jurisdiccion juzgados
                                    ['nombre' => 'Juzgados', 'url' => 'dashboard/modulo-juridico/param-juzgados/juzgados', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                ],
                            ],
                            //Param  Procesos
                            [
                                'nombre' => 'Parámetros Procesos', 'url' => '#', 'icono' => 'fas fa-copy',
                                'Array_1' => [
                                    //Param  jurisdiccion juzgados
                                    ['nombre' => 'Tipos de Procesos', 'url' => 'dashboard/modulo-juridico/param-procesos/tipos-procesos', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  Papel Cliente
                                    ['nombre' => 'Papel Cliente', 'url' => 'dashboard/modulo-juridico/param-procesos/papel-cliente', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  Estado Procesos
                                    ['nombre' => 'Estado Procesos', 'url' => 'dashboard/modulo-juridico/param-procesos/estado-procesos', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  Etapa Procesos
                                    ['nombre' => 'Etapa Procesos', 'url' => 'dashboard/modulo-juridico/param-procesos/etapa-procesos', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  Riesgo Perdida Procesos
                                    ['nombre' => 'Riesgo Perdida Procesos', 'url' => 'dashboard/modulo-juridico/param-procesos/riesgo-procesos', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  Sentidos de Fallo Procesos
                                    ['nombre' => 'Sentidos de Fallo Procesos', 'url' => 'dashboard/modulo-juridico/param-procesos/sentido-fallo-procesos', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                    //Param  Terminación Anormal Procesos
                                    ['nombre' => 'Terminación Anormal Procesos', 'url' => 'dashboard/modulo-juridico/param-procesos/terminacion-anormal-procesos', 'icono' => 'mdi mdi-view-dashboard', 'Array_1' => []],
                                ],
                            ],
                        ],
                    ],
                    // Procesos
                    [
                        'nombre' => 'Procesos', 'url' => 'dashboard/modulo-juridico/procesos', 'icono' => 'fas fa-gavel', 'Array_1' => []
                    ]

                ],
            ],
            // Modulo archivo
            ['nombre' => 'Módulo Archivo', 'menu_id' => null, 'url' => 'dashboard/modulo-archivo', 'icono' => 'far fa-folder-open', 'Array_1' => []],
            // Modulo proyectos
            ['nombre' => 'Módulo proyectos', 'menu_id' => null, 'url' => 'dashboard/proyectos', 'icono' => 'fas fa-project-diagram', 'Array_1' => []],
            // Modulo archivo
            ['nombre' => 'Noticias', 'menu_id' => null, 'url' => 'dashboard/noticias', 'icono' => 'fas fa-newspaper', 'Array_1' => []],
            // Modulo archivo
            ['nombre' => 'Diagnósticos Legales', 'menu_id' => null, 'url' => 'dashboard/diagnosticos', 'icono' => 'fas fa-chart-line', 'Array_1' => []],
            // Modulo archivo
            ['nombre' => 'Consultas / Solicitudes', 'menu_id' => null, 'url' => 'dashboard/solicitudes', 'icono' => 'far fa-hand-paper', 'Array_1' => []],
        ];
        // ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ==========
        $x = 0;
        foreach ($menus as $menu) {
            $x++;
            $menu_new = Menu::create([
                'menu_id' => $menu['menu_id'],
                'nombre' => utf8_encode(utf8_decode($menu['nombre'])),
                'url' => $menu['url'],
                'orden' => $x,
                'icono' => $menu['icono'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            if (count($menu['Array_1']) > 0) {
                $this->sub_menu($menu['Array_1'], $menu_new->id);
            }
        }
        // ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ==========
        // -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --
        $menus = Menu::get();
        // -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --
        foreach ($menus as $menu) {
            DB::table('menu_rol')->insert(['menu_id' => $menu->id, 'rol_id' => 1,]);
        }
        // -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --
        DB::table('menu_rol')->insert(['menu_id' => 1, 'rol_id' => 2,]);
        for ($i = 17; $i < 34; $i++) {
            DB::table('menu_rol')->insert(['menu_id' => $i, 'rol_id' => 2,]);
        }
        // -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --
        DB::table('menu_rol')->insert(['menu_id' => 1, 'rol_id' => 3,]);
        DB::table('menu_empresas')->insert(['menu_id' => 1, 'empresa_id' => 3,]);
        for ($i = 11; $i < 17; $i++) {
            DB::table('menu_rol')->insert(['menu_id' => $i, 'rol_id' => 3,]);
            DB::table('menu_empresas')->insert(['menu_id' => $i, 'empresa_id' => 3,]);
        }
        // -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --
        DB::table('menu_rol')->insert(['menu_id' => 1, 'rol_id' => 4,]);
        DB::table('menu_rol')->insert(['menu_id' => 17, 'rol_id' => 4,]);

        for ($i = 34; $i < 40; $i++) {
            DB::table('menu_rol')->insert(['menu_id' => $i, 'rol_id' => 4,]);
            DB::table('menu_empresas')->insert(['menu_id' => $i, 'empresa_id' => 3,]);
        }
        // -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --


    }
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    public function sub_menu($Array_1, $x)
    {
        $y = 0;
        foreach ($Array_1 as $sub_menu_array) {
            $y++;
            $sub_menu = Menu::create([
                'menu_id' => $x,
                'nombre' => utf8_encode(utf8_decode($sub_menu_array['nombre'])),
                'url' => $sub_menu_array['url'],
                'orden' => $y,
                'icono' => $sub_menu_array['icono'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            if (count($sub_menu_array['Array_1']) > 0) {
                $this->sub_menu($sub_menu_array['Array_1'], $sub_menu->id);
            }
        }
    }
}
