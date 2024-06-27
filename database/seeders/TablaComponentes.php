<?php

namespace Database\Seeders;

use App\Models\Empresa\Empleado;
use App\Models\Proyectos\Componente;
use App\Models\Proyectos\ComponenteCambio;
use App\Models\Proyectos\Proyecto;
use App\Models\Sistema\Notificacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TablaComponentes extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('componentes')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
        // ===================================================================================
        $proyectos = Proyecto::get();
        foreach ($proyectos as $proyecto) {
            // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
            #financiero
            $presupuesto_proyecto = 0;
            $presupuesto_proyecto_asignado = 0;
            if ($proyecto->presupuesto > 0) {
                $proyPresupuesto = true;
                $presupuesto_proyecto = $proyecto->presupuesto * (rand(80, 90) / 100);
            } else {
                $proyPresupuesto = false;
            }
            #Lider
            $lider = $proyecto->lider;
            #Empleados
            $ids_empresas = [];
            if ($lider->empresas_tranv->count() > 0) {
                foreach ($lider->empresas_tranv as $empresa) {
                    $ids_empresas[] = $empresa->id;
                }
                $empleados1 = Empleado::where('estado', 1)
                    ->whereHas('cargo', function ($p) use ($ids_empresas) {
                        $p->whereHas('area', function ($q) use ($ids_empresas) {
                            $q->whereIn('empresa_id', $ids_empresas);
                        });
                    })->get();
                $empleados2 = Empleado::where('estado', 1)
                    ->whereHas('cargo', function ($p) use ($ids_empresas) {
                        $p->whereHas('area', function ($q) use ($ids_empresas) {
                            $q->whereNotIn('empresa_id', $ids_empresas);
                        });
                    })->whereHas('empresas_tranv', function ($p) use ($proyecto) {
                        $p->where('empresa_id', $proyecto->empresa_id);
                    })->get();
                $empleados = $empleados1->concat($empleados2);
            } else {
                $empleados = Empleado::where('estado', 1)
                    ->whereHas('cargo', function ($p) use ($proyecto) {
                        $p->whereHas('area', function ($q) use ($proyecto) {
                            $q->where('empresa_id', $proyecto->empresa_id);
                        });
                    })->get();
            }
            // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
            #cant de componentes
            $tiempo1 = microtime(true);
            $valor_letras = strval($tiempo1);
            $cantComponentes = intval(substr($valor_letras, -1));
            //------------------------------------------------------------------------------------
            for ($i = 0; $i < $cantComponentes; $i++) {
                # impacto numerico
                $time_start = microtime(true);
                usleep(rand(50, 150));
                $valor_letras = strval($time_start);
                $arrayLetras = explode('.', $valor_letras);
                if (isset($arrayLetras[1])) {
                    $valor1 = intval(substr($arrayLetras[1], -2));
                } else {
                    $valor1 = 1;
                }

                if ($valor1 >= 0 && $valor1 <= 9 || $valor1 >= 50 && $valor1 <= 59) {
                    $impacto_num = 1;
                } else if ($valor1 >= 10 && $valor1 <= 19 || $valor1 >= 60 && $valor1 <= 69) {
                    $impacto_num = 2;
                } else if ($valor1 >= 20 && $valor1 <= 29 || $valor1 >= 70 && $valor1 <= 79) {
                    $impacto_num = 3;
                } else if ($valor1 >= 30 && $valor1 <= 39 || $valor1 >= 80 && $valor1 <= 89) {
                    $impacto_num = 4;
                } else {
                    $impacto_num = 5;
                }
                //------------------------------------------------------------------------------------
                #impacto
                switch ($impacto_num) {
                    case 5:
                        $impacto = 'Alto';
                        break;
                    case 4:
                        $impacto = 'Medio-alto';
                        break;
                    case 3:
                        $impacto = 'Medio';
                        break;
                    case 2:
                        $impacto = 'Medio-bajo';
                        break;
                    default:
                        $impacto = 'Bajo';
                        break;
                }
                // ------------------------------------------------------------------------------
                #titulo presupuesto
                if ($proyPresupuesto) {
                    if ($i == ($cantComponentes - 1)) {
                        $presupuesto = $presupuesto_proyecto - $presupuesto_proyecto_asignado;
                    } else {
                        $presupuesto = round(rand(5, 30) * 0.01 * ($presupuesto_proyecto - $presupuesto_proyecto_asignado));
                    }
                    $presupuesto_proyecto_asignado += $presupuesto;
                    $titulo = 'Prueba de componente calibración presupuestos Proyecto ' . $proyecto->id . ' Comp -' . $i . ' presupuesto: $ ' . number_format($presupuesto, 2);
                    $objetivo = 'Verificar el manejo de los presupuesto del componente ' . $i . 'asociados al valor de presupuesto : $ ' .  number_format($presupuesto, 2);
                } else {
                    $titulo = 'Prueba de componente Proyecto ' . $proyecto->id . ' Comp -' . $i;
                    $objetivo = 'Verificar seeders componente --> Proyecto ' . $proyecto->id . ' Comp -' . $i . ' sin presupuesto';
                    $presupuesto = 0;
                }
                #Fecha de Creacion
                $fec_creacion = date("Y-m-d", strtotime($proyecto->fec_creacion . "+ " . rand(1, 5) . " days"));
                $empleado = $empleados->random();
                // +++++++++++++++++++++++++++++++++++++++++++++++++++++
                #crear Comopnente
                $componente = Componente::create([
                    'proyecto_id' => $proyecto->id,
                    'empleado_id' => $empleado->id,
                    'titulo' => $titulo,
                    'fec_creacion' => $fec_creacion,
                    'objetivo' => $objetivo,
                    'impacto' => $impacto,
                    'impacto_num' => $impacto_num,
                    'presupuesto' => $presupuesto
                ]);
                $componente->proyecto->miembros_proyecto()->attach($empleado->id);
                // - - - - - - - - - - - - - - - - - - - - - - - -
                ComponenteCambio::create([
                    'empleado_id' => $empleado->id,
                    'componente_id' => $componente->id,
                    'fecha' => $fec_creacion,
                    'cambio' => 'Se crea nuevo componente',
                ]);
                // - - - - - - - - - - - - - - - - - - - - - - - -
                //-----------------------------------------------------------------------------------
                $dia_hora = date('Y-m-d H:i:s');
                $notificacion['usuario_id'] =  $empleado->id;
                $notificacion['fec_creacion'] =  $dia_hora;
                $notificacion['titulo'] =  'Se creo un nuevo componente y te fue asignado ';
                $notificacion['mensaje'] =  'Se creo una nuevo componente al proyecto ' . $componente->proyecto->titulo . ' y te fue asignado -> ' . ucfirst($titulo);
                $notificacion['link'] =  route('proyectos.gestion', ['id' => $proyecto->id]);
                $notificacion['id_link'] =  $proyecto->id;
                $notificacion['tipo'] =  'componente';
                $notificacion['accion'] =  'creacion';
                Notificacion::create($notificacion);
                //------------------------------------------------------------------------------------------

                // +++++++++++++++++++++++++++++++++++++++++++++++++++++
            }
        }
    }
}
