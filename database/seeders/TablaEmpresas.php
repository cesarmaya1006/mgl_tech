<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TablaEmpresas extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('empresas')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
        // ===================================================================================
        $datas = [
            [
                'emp_grupo_id' => 1,
                'tipo_documento_id' => 6,
                'identificacion' => '100000001',
                'empresa' => 'Promoblar',
                'email' => 'masdym@gmail.com',
                'telefono' => '3509875421',
                'direccion' => 'Calle 76 # 13-02',
                'contacto' => 'Juana Suarez',
                'cargo' => 'Gerente',
                'logo' => 'empresa1.png',

            ],
            [
                'emp_grupo_id' => 1,
                'tipo_documento_id' => 6,
                'identificacion' => '100000002',
                'empresa' => 'Taller 2',
                'email' => 'masdym@gmail.com',
                'telefono' => '3201234578',
                'direccion' => 'Calle 76 # 14-03',
                'contacto' => 'Juana Suarez',
                'cargo' => 'Gerente',
                'logo' => 'empresa2.png',

            ],
            [
                'emp_grupo_id' => 2,
                'tipo_documento_id' => 6,
                'identificacion' => '100000003',
                'empresa' => 'Fabrica Software',
                'email' => 'fsoftware@gmail.com',
                'telefono' => '32065498787',
                'direccion' => 'Calle 76 # 15-04',
                'contacto' => 'Jorge Dueñas',
                'cargo' => 'Gerente Software',
                'logo' => 'empresa3.png',

            ],
            [
                'emp_grupo_id' => 2,
                'tipo_documento_id' => 6,
                'identificacion' => '100000004',
                'empresa' => 'Fuentes M & M',
                'email' => 'msoftware@gmail.com',
                'telefono' => '32065498787',
                'direccion' => 'Calle 76 # 15-04',
                'contacto' => 'Julio Cortez',
                'cargo' => 'Administrador',
                'logo' => 'empresa4.png',

            ],

            [
                'emp_grupo_id' => 2,
                'tipo_documento_id' => 6,
                'identificacion' => '100000005',
                'empresa' => 'Ventas M & M',
                'email' => 'vsoftware@gmail.com',
                'telefono' => '32065498789',
                'direccion' => 'Calle 76 # 16-05',
                'contacto' => 'Monica moya',
                'cargo' => 'Gerente',
                'logo' => 'empresa5.png',

            ],
        ];
        // ===================================================================================
        foreach ($datas as $data) {
            DB::table('empresas')->insert([
                'emp_grupo_id' => $data['emp_grupo_id'],
                'tipo_documento_id' => $data['tipo_documento_id'],
                'identificacion' => $data['identificacion'],
                'empresa' => $data['empresa'],
                'email' => $data['email'],
                'telefono' => $data['telefono'],
                'direccion' => $data['direccion'],
                'contacto' => $data['contacto'],
                'cargo' => $data['cargo'],
                'logo' => $data['logo'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
