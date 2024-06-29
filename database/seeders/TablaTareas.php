<?php

namespace Database\Seeders;

use App\Models\Empresa\Empleado;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\Tarea;
use App\Models\Sistema\Notificacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TablaTareas extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('tareas')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
        // ===================================================================================
        $proyectos = Proyecto::get();
        $lorem = collect([
            'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
            'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer.',
            'Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable.',
            'El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.',
            'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto.',
            'Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.',
        ]);
        foreach ($proyectos as $proyecto) {
            foreach ($proyecto->componentes as $componente) {
                $proyecto = $componente->proyecto;
                $componente_id = $componente->id;
                $lider = $componente->proyecto->lider;
                // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
                #empleado_id
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
                $empleado = $empleados->random();
                $empleado_id = $empleado->id;
                // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
                //------------------------------------------------------------------------------------
                #cant de componentes
                $tiempo1 = microtime(true);
                $valor_letras = strval($tiempo1);
                $cantTareas = intval(substr($valor_letras, -1));
                //------------------------------------------------------------------------------------
                // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
                for ($i = 0; $i < $cantTareas; $i++) {
                    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
                    $titulo = 'Tarea de prueba Proyecto: '. $proyecto->id . ' Componente:' . $componente->id . ' -- Tarea : '. $i;
                    // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
                    #Fecha de Creacion
                    $fec_creacion = date("Y-m-d", strtotime($componente->proyecto->fec_creacion . "+ " . rand(1, 5) . " days"));
                    $fec_limite = date("Y-m-d", strtotime($fec_creacion . "+ " . rand(4, 30) . " days"));
                    // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
                    #Objetivo
                    $objetivo = '';
                    // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
                    #impacto impacto_num
                    //------------------------------------------------------------------------------------
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
                    // = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * = = * =
                    $tarea = Tarea::create([
                        'componente_id' => $componente_id,
                        'empleado_id' => $empleado_id,
                        'titulo' => $titulo,
                        'fec_creacion' => $fec_creacion,
                        'fec_limite' => $fec_limite,
                        'objetivo' => $lorem ->random(),
                        'impacto' => $impacto,
                        'impacto_num' => $impacto_num
                    ]);
                    //-----------------------------------------------------------------------------------
                    $dia_hora = date('Y-m-d H:i:s');
                    $notificacion['usuario_id'] =  $empleado->id;
                    $notificacion['fec_creacion'] =  $dia_hora;
                    $notificacion['titulo'] =  'Se creo una nueva tarea y te fue asignada ';
                    $notificacion['mensaje'] =  'Se creo una nueva tarea al proyecto ' . $componente->proyecto->titulo . ' --- Componenete: ' . $componente->titulo . ' y te fue asignado -> ' . ucfirst($titulo);
                    $notificacion['link'] =  route('proyectos.gestion', ['id' => $proyecto->id]);
                    $notificacion['id_link'] =  $proyecto->id;
                    $notificacion['tipo'] =  'tarea';
                    $notificacion['accion'] =  'creacion';
                    Notificacion::create($notificacion);
                    //------------------------------------------------------------------------------------------
                }
            }
        }
    }
}
