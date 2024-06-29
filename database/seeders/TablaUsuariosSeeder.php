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
        ])->syncRoles('Super Administrador');
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        $usuario2 = User::create([
            'name' => 'Daniel Lopez',
            'email' => 'dlopez@gmail.com',
            'password' => bcrypt('123456789')
        ])->syncRoles(['Administrador']);
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        $usuario3 = User::create([
            'name' => 'Monica Moya',
            'email' => 'mmoya@gmail.com',
            'password' => bcrypt('123456789')
        ])->syncRoles(['Administrador Empresa', 'Empleado']);

        $empleado1 = Empleado::create([
            'id' => $usuario3->id,
            'cargo_id' => 11,
            'tipo_documento_id' => 1,
            'identificacion' => '52369258',
            'nombres' => 'Monica Cecilia',
            'apellidos' => 'Moya Molano',
            'telefono' => '3157778899',
            'direccion' => 'Cond Mirasol Casa A9',
            'foto' => 'usuario-inicial.jpg',
            'lider' => 1
        ]);

        DB::table('tranv_empresas')->insert(['empleado_id' => 3, 'empresa_id' => 3, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
        DB::table('tranv_empresas')->insert(['empleado_id' => 3, 'empresa_id' => 4, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
        DB::table('tranv_empresas')->insert(['empleado_id' => 3, 'empresa_id' => 5, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        $empleados = [
            ['usuario' => 'natalia.garzon', 'telefono' => '1073516926','cargo' => 1,'direccion' => 'Cond Mirasol Casa A1','lider' => 1],
            ['usuario' => 'ronald.delgado', 'telefono' => '1073516926','cargo' => 2,'direccion' => 'Cond Mirasol Casa A2','lider' => 1],
            ['usuario' => 'sergio.callejas', 'telefono' => '1073516926','cargo' => 3,'direccion' => 'Cond Mirasol Casa A3','lider' => 0],
            ['usuario' => 'freddy.muñoz', 'telefono' => '1073516926','cargo' => 4,'direccion' => 'Cond Mirasol Casa A4','lider' => 0],
            ['usuario' => 'eliana.baiter', 'telefono' => '1073516926','cargo' => 6,'direccion' => 'Cond Mirasol Casa A5','lider' => 1],
            ['usuario' => 'alison.guaqueta', 'telefono' => '1073516926','cargo' => 7,'direccion' => 'Cond Mirasol Casa A6','lider' => 1],
            ['usuario' => 'karen.heredia', 'telefono' => '1073516926','cargo' => 8,'direccion' => 'Cond Mirasol Casa A7','lider' => 1],
            ['usuario' => 'ruth.villegas', 'telefono' => '1073516926','cargo' => 9,'direccion' => 'Cond Mirasol Casa A8','lider' => 0],
            ['usuario' => 'sonia.laverde', 'telefono' => '1073516926','cargo' => 11,'direccion' => 'Cond Mirasol Casa A9','lider' => 1],
            ['usuario' => 'erika.umaña', 'telefono' => '1073516926','cargo' => 12,'direccion' => 'Cond Mirasol Casa A10','lider' => 0],
            ['usuario' => 'claudia.romero', 'telefono' => '1073516926','cargo' => 13,'direccion' => 'Cond Mirasol Casa A11','lider' => 0],
            ['usuario' => 'virgilio.rativa', 'telefono' => '1073516926','cargo' => 14,'direccion' => 'Cond Mirasol Casa A12','lider' => 0],
            ['usuario' => 'diana.peña', 'telefono' => '1073516926','cargo' => 16,'direccion' => 'Cond Mirasol Casa A13','lider' => 1],
            ['usuario' => 'gladys.mendoza', 'telefono' => '1073516926','cargo' => 17,'direccion' => 'Cond Mirasol Casa A14','lider' => 1],
            ['usuario' => 'mariela.bello', 'telefono' => '1073516926','cargo' => 18,'direccion' => 'Cond Mirasol Casa A15','lider' => 0],
            ['usuario' => 'johanna.ramirez', 'telefono' => '1073516926','cargo' => 19,'direccion' => 'Cond Mirasol Casa A16','lider' => 0],
            ['usuario' => 'gilberto.parra', 'telefono' => '1073516926','cargo' => 21,'direccion' => 'Cond Mirasol Casa A17','lider' => 1],
            ['usuario' => 'tania.vargas', 'telefono' => '1073516926','cargo' => 22,'direccion' => 'Cond Mirasol Casa A18','lider' => 0],
            ['usuario' => 'dirley.laverde', 'telefono' => '1073516926','cargo' => 23,'direccion' => 'Cond Mirasol Casa A19','lider' => 0],
            ['usuario' => 'michael.guanume', 'telefono' => '1073516926','cargo' => 24,'direccion' => 'Cond Mirasol Casa A20','lider' => 0],
            ['usuario' => 'carlos.castillo', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A21','lider' => 0],
            ['usuario' => 'alejandro.aguja', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A22','lider' => 0],
            ['usuario' => 'alida.lopez', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A23','lider' => 0],
            ['usuario' => 'leidy.urbano', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A24','lider' => 0],
            ['usuario' => 'estefania.sanchez', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A25','lider' => 0],
            ['usuario' => 'benjamin.hastamorir', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A26','lider' => 0],
            ['usuario' => 'claudia.cabra', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A27','lider' => 0],
            ['usuario' => 'romulo.vargas', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A28','lider' => 0],
            ['usuario' => 'juan.rozo', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A29','lider' => 0],
            ['usuario' => 'wigsthon.osorio', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A30','lider' => 0],
            ['usuario' => 'maria.sierra', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A31','lider' => 0],
            ['usuario' => 'elisa.torres', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A32','lider' => 0],
            ['usuario' => 'juan.zamora', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A33','lider' => 0],
            ['usuario' => 'luz.pita', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A34','lider' => 0],
            ['usuario' => 'dennys.nauza', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A35','lider' => 0],
            ['usuario' => 'omar.marquez', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A36','lider' => 0],
            ['usuario' => 'maria.martinez', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A37','lider' => 0],
            ['usuario' => 'carmen.hernandez', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A38','lider' => 0],
            ['usuario' => 'carolina.morato', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A39','lider' => 0],
            ['usuario' => 'derly.bonilla', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A40','lider' => 0],
            ['usuario' => 'johanna.garcia', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A41','lider' => 0],
            ['usuario' => 'natalia.rodriguez', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A42','lider' => 0],
            ['usuario' => 'sebastian.mejia', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A43','lider' => 0],
            ['usuario' => 'angelica.portuguez', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A44','lider' => 0],
            ['usuario' => 'maria.torres', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A45','lider' => 0],
            ['usuario' => 'darin.beltran', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A46','lider' => 0],
            ['usuario' => 'marlon.angarita', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A47','lider' => 0],
            ['usuario' => 'dora.diaz', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A48','lider' => 0],
            ['usuario' => 'julio.buitrago', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A49','lider' => 0],
            ['usuario' => 'fredy.diaz', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A50','lider' => 0],
            ['usuario' => 'evelio.rozo', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A51','lider' => 0],
            ['usuario' => 'luis.naranjo', 'telefono' => '1073516926','cargo' => 20,'direccion' => 'Cond Mirasol Casa A52','lider' => 0],
            ['usuario' => 'orlando.camelo', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A53','lider' => 0],
            ['usuario' => 'yeisson.fuquen', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A54','lider' => 0],
            ['usuario' => 'esneda.lopez', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A55','lider' => 0],
            ['usuario' => 'luz.rodriguez', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A56','lider' => 0],
            ['usuario' => 'claudia.salas', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A57','lider' => 0],
            ['usuario' => 'flor.torres', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A58','lider' => 0],
            ['usuario' => 'paula.reyes', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A59','lider' => 0],
            ['usuario' => 'cristian.vargas', 'telefono' => '1073516926','cargo' => 25,'direccion' => 'Cond Mirasol Casa A60','lider' => 0],
            ['usuario' => 'jose.quintero', 'telefono' => '1073516926','cargo' => 5,'direccion' => 'Cond Mirasol Casa A61','lider' => 0],
            ['usuario' => 'diana.valbuena', 'telefono' => '1073516926','cargo' => 10,'direccion' => 'Cond Mirasol Casa A62','lider' => 0],
            ['usuario' => 'sandra.cruz', 'telefono' => '1073516926','cargo' => 15,'direccion' => 'Cond Mirasol Casa A63','lider' => 0],

        ];
        $identificacion = 11111110;
        foreach ($empleados as $empleado) {
            $identificacion++;
            $names = explode(".", $empleado['usuario']);
            $usuario_array = User::create([
                'name' => ucfirst($names[0]) . ' ' . ucfirst($names[1]),
                'email' => $empleado['usuario'].'@gmail.com',
                'password' => bcrypt($identificacion)
            ]);
            $usuario_array->syncRoles(['Empleado']);
            if ($empleado['lider']==1) {
                $usuario_array->syncPermissions(['proyectos.create','proyectos.edit','proyectos.detalle','proyectos.gestion','caja_presupuestos']);
            }
            $empleado_array = Empleado::create([
                'id' => $usuario_array->id,
                'cargo_id' => $empleado['cargo'],
                'tipo_documento_id' => 1,
                'identificacion' => $identificacion,
                'nombres' => ucfirst($names[0]),
                'apellidos' => ucfirst($names[1]),
                'telefono' => $empleado['telefono'],
                'direccion' => $empleado['direccion'],
                'foto' => 'usuario-inicial.jpg',
                'lider' => $empleado['lider']
            ]);
            $num_rand = rand(1, 100);
            if ($num_rand < 51) {
                DB::table('tranv_empresas')->insert(['empleado_id' => $empleado_array->id, 'empresa_id' => 3, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
                DB::table('tranv_empresas')->insert(['empleado_id' => $empleado_array->id, 'empresa_id' => 4, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
                DB::table('tranv_empresas')->insert(['empleado_id' => $empleado_array->id, 'empresa_id' => 5, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'),]);
            }
        }
    }
}
































































