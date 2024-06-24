<?php

namespace Database\Seeders;

use App\Models\Empresa\Empleado;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class TablaUsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('users')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('empleados')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('tranv_empresas')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');



        $roles = Role::get();
        $usuario1 = User::create([
            'name' => 'Cesar Maya',
            'email' => 'cesarmaya1006@gmail.com',
            'password' => bcrypt('123456789')
        ])->syncRoles($roles);

        $usuario2 = User::create([
            'name' => 'Daniel Lopez',
            'email' => 'dlopez@gmail.com',
            'password' => bcrypt('123456789')
        ])->syncRoles(['Super Administrador','Administrador']);

        $usuario3 = User::create([
            'name' => 'Monica Moya',
            'email' => 'mmoya@gmail.com',
            'password' => bcrypt('123456789')
        ])->syncRoles(['Administrador Empresa','Empleado']);

        $empleado1 = Empleado::create([
            'id' => $usuario3->id,
            'cargo_id' => 11,
            'tipo_documento_id'=> 1,
            'identificacion'=> '52369258',
            'nombres'=>'Monica Cecilia',
            'apellidos'=>'Moya Molano',
            'telefono'=>'3157778899',
            'direccion'=>'Cond Mirasol Casa A9',
            'foto' => 'usuario-inicial.jpg',
            'lider' => 1
        ]);
        DB::table('tranv_empresas')->insert(['empleado_id' => 3,'empresa_id' => 3,'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
        DB::table('tranv_empresas')->insert(['empleado_id' => 3,'empresa_id' => 4,'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
        DB::table('tranv_empresas')->insert(['empleado_id' => 3,'empresa_id' => 5,'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);

    }
}
