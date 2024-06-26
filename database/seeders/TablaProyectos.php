<?php

namespace Database\Seeders;

use App\Models\Empresa\EmpGrupo;
use App\Models\Empresa\Empleado;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\ProyectoCambio;
use App\Models\Sistema\Notificacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TablaProyectos extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('proyectos')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
        // ===================================================================================
        $datas = [
            ['titulo' => 'Prueba Seeder', 'objetivo' => 'Verificar la creacion de proyectos mediante seeders'],
            ['titulo' => 'Prueba Seeder', 'objetivo' => 'Verificar la creacion de proyectos mediante seeders'],

        ];
        // ===================================================================================
        $grupos = EmpGrupo::get();
        foreach ($grupos as $grupo) {
            foreach ($grupo->empresas as $empresa) {
                $lideres = $this->getEmpleados($empresa->id);
                $cantProyectos = rand(2, 6);
                if (mt_rand(1, 5000)%2==0) {
                    $presupuesto = random_int(8, 15)* 1000000;
                    $titulo = 'Prueba Seeder con presupuesto - ' . $empresa->id;
                    $objetivo = 'Verificar la creacion de proyectos mediante seeders con presupuesto - Empresa id:' . $empresa->id . ' --- Nombre de la empresa:' . $empresa->empresa;
                } else {
                    $presupuesto = 0;
                    $titulo = 'Prueba Seeder';
                    $objetivo = 'Verificar la creacion de proyectos mediante seeders - Empresa id:' . $empresa->id . ' --- Nombre de la empresa:' . $empresa->empresa;
                }
                $fecha_ini = date('2024-06-01');
                $dias_fecha = random_int(1, 5)+$cantProyectos;
                $fec_creacion = date("Y-m-d", strtotime($fecha_ini . "+ " . $dias_fecha . " days"));
                for ($i = 1; $i < $cantProyectos; $i++) {
                    $presupuesto = $presupuesto * random_int(3, 7);
                    $lider = $lideres->random();
                    $proyecto_new = Proyecto::create([
                        'empleado_id' => $lider->id,
                        'empresa_id' => $empresa->id,
                        'titulo' => $titulo,
                        'fec_creacion' => $fec_creacion,
                        'objetivo' => $objetivo,
                        'presupuesto' => $presupuesto,
                    ]);
                    $proyecto_new->miembros_proyecto()->sync([$lider->id,]);

                    ProyectoCambio::create([
                        'empleado_id' => $lider->id,
                        'proyecto_id' => $proyecto_new->id,
                        'fecha' => $fec_creacion,
                        'cambio' => 'Se crea el proyecto',
                    ]);
                    $this->crer_notificacion($lider->id,$titulo,$proyecto_new->id);
                }
            }
        }
    }

    public function getEmpleados($empresa_id)
    {
        $lideres1 = Empleado::with('cargo.area.empresa')
            ->where('estado', 1)
            ->where('lider', 1)
            ->whereHas('cargo', function ($p) use ($empresa_id) {
                $p->whereHas('area', function ($q) use ($empresa_id) {
                    $q->where('empresa_id', $empresa_id);
                });
            })->get();
        $lideres2 = Empleado::with('cargo.area.empresa')
            ->where('estado', 1)
            ->where('lider', 1)
            ->whereHas('cargo', function ($p) use ($empresa_id) {
                $p->whereHas('area', function ($q) use ($empresa_id) {
                    $q->where('empresa_id', '!=', $empresa_id);
                });
            })
            ->whereHas('empresas_tranv', function ($p) use ($empresa_id) {
                $p->where('empresa_id', $empresa_id);
            })->get();
        $lideres = $lideres1->concat($lideres2);

        return $lideres;
    }

    public function crer_notificacion($usuario_id,$titulo,$proyecto_id){
        $dia_hora = date('Y-m-d H:i:s');
        $notificacion['usuario_id'] =  $usuario_id;
        $notificacion['fec_creacion'] =  $dia_hora;
        $notificacion['titulo'] =  'Se creo un nuevo proyecto y te fue asignado ';
        $notificacion['mensaje'] =  'Se creo un nuevo proyecto  y te fue asignado -> ' . ucfirst($titulo);
        $notificacion['link'] =  route('proyectos.gestion', ['id' => $proyecto_id]);
        $notificacion['id_link'] =  $proyecto_id;
        $notificacion['tipo'] =  'proyecto';
        $notificacion['accion'] =  'creacion';
        Notificacion::create($notificacion);
    }
}
