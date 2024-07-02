<?php

namespace App\Http\Controllers\Proyectos;

use App\Http\Controllers\Controller;
use App\Models\Empresa\Area;
use App\Models\Empresa\Cargo;
use App\Models\Empresa\EmpGrupo;
use App\Models\Empresa\Empleado;
use App\Models\Empresa\Empresa;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\ProyectoCambio;
use App\Models\Proyectos\ProyectoDoc;
use App\Models\Sistema\Notificacion;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use QuickChart;

class ProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (session('rol_principal_id') == 1) {
            $proyectos = Proyecto::orderBy('id')->get();
            $grupos = EmpGrupo::get();
            return view('intranet.proyectos.proyecto.index.admin.index', compact('proyectos', 'grupos'));
        } else {
            $empleado = Empleado::findOrFail(session('id_usuario'));
            return view('intranet.proyectos.proyecto.index.empleado.index',compact('empleado'));
        }
    }

    public function proyecto_empresas()
    {
        $grupos =  EmpGrupo::get();
        return view('intranet.proyectos.proyecto.index.admin.proyecto_empresas', compact('grupos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $grupos = EmpGrupo::get();
        $usuario = User::findOrFail(session('id_usuario'));
        $transversal = false;
        $lideres = Empleado::where('estado', 1)->where('lider', 1)->get();
        if (session('rol_principal_id') == 1) {
            $lideres = Empleado::where('estado', 1)->where('lider', 1)->get();
        } else {
            $empleado = Empleado::findOrFail(session('id_usuario'));
            if ($empleado->empresas_tranv->count() > 1) {
                $lideres = Empleado::where('estado', 1)->where('lider', 1)->get();
            } else {
                $lideres1 = Empleado::with('cargo.area.empresa')
                    ->where('estado', 1)
                    ->where('lider', 1)
                    ->whereHas('cargo', function ($p) use ($empleado) {
                        $p->whereHas('area', function ($q) use ($empleado) {
                            $q->where('empresa_id', $empleado->cargo->area->empresa_id);
                        });
                    })->get();

                $lideres2 = Empleado::with('cargo.area.empresa')
                    ->where('estado', 1)
                    ->where('lider', 1)
                    ->whereHas('cargo', function ($p) use ($empleado) {
                        $p->whereHas('area', function ($q) use ($empleado) {
                            $q->where('empresa_id', '!=', $empleado->cargo->area->empresa_id);
                        });
                    })->whereHas('empresas_tranv', function ($p) use ($empleado) {
                        $p->where('empresa_id', $empleado->cargo->area->empresa_id);
                    })->get();
                $lideres = $lideres1->concat($lideres2);
            }
        }
        return view('intranet.proyectos.proyecto.crear.crear', compact('grupos', 'usuario', 'transversal', 'lideres'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $presupuesto = 0;
        if (isset($request['presupuesto']) && $request['presupuesto'] != null) {
            $presupuesto = $request['presupuesto'];
        }

        $proyecto_new = Proyecto::create([
            'empleado_id' => $request['empleado_id'],
            'empresa_id' => $request['empresa_id'],
            'titulo' => $request['titulo'],
            'fec_creacion' => $request['fec_creacion'],
            'objetivo' => $request['objetivo'],
            'presupuesto' => $presupuesto,
        ]);
        $proyecto_new->miembros_proyecto()->sync([$request['empleado_id'],]);
        // - - - - - - - - - - - - - - - - - - - - - - - -
        if ($request->hasFile('docu_proyecto')) {
            $ruta = Config::get('constantes.folder_doc_proyectos');
            $ruta = trim($ruta);
            $fichero_subido = $ruta . time() . '-' . basename($_FILES['docu_proyecto']['name']);


            $archivo = $request->docu_proyecto;
            $titulo = $archivo->getClientOriginalName();
            $tipo = $archivo->getClientMimeType();
            $url = time() . '-' . basename($_FILES['docu_proyecto']['name']);
            $peso = $archivo->getSize() / 1000;
            move_uploaded_file($_FILES['docu_proyecto']['tmp_name'], $fichero_subido);
            ProyectoDoc::create([
                'proyecto_id' => $proyecto_new->id,
                'titulo' => $titulo,
                'tipo' => $tipo,
                'url' => $url,
                'peso' => $peso,
            ]);
        }
        // - - - - - - - - - - - - - - - - - - - - - - - -
        ProyectoCambio::create([
            'empleado_id' => $request['empleado_id'],
            'proyecto_id' => $proyecto_new->id,
            'fecha' => $request['fec_creacion'],
            'cambio' => 'Se crea el proyecto',
        ]);
        // - - - - - - - - - - - - - - - - - - - - - - - -
        return redirect('dashboard/proyectos')->with('mensaje', 'Proyecto creado con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $proyecto = Proyecto::findOrfail($id);
        return view('intranet.proyectos.proyecto.detalle.detalle', compact('proyecto'));
    }

    public function gestion($id, $notificacion_id = null)
    {
        if ($notificacion_id) {
            $notificacion_update['estado'] = 0;
            Notificacion::findOrFail($notificacion_id)->update($notificacion_update);
        }
        //----------------------------------------------------------------------------
        $proyecto = Proyecto::findOrFail($id);
        return view('intranet.proyectos.proyecto.gestion.gestionar', compact('proyecto'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getEmpresas(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['empresas' => Empresa::where('emp_grupo_id', $_GET['id'])->get()]);
        } else {
            abort(404);
        }
    }
    public function getEmpleados(Request $request)
    {
        if ($request->ajax()) {
            $empresa_id = $_GET['id'];
            if (session('rol_principal_id') == 1) {
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
            } else {
                $empleado = Empleado::findOrFail(session('id_usuario'));
                $lideres1 = Empleado::with('cargo.area.empresa')
                    ->where('estado', 1)
                    ->where('lider', 1)
                    ->whereHas('cargo', function ($p) use ($empresa_id) {
                        $p->whereHas('area', function ($q) use ($empresa_id) {
                            $q->where('empresa_id', $empresa_id);
                        });
                    })->get();

                if ($empleado->empresas_tranv->count() > 1) {
                    $lideres2 = Empleado::with('cargo.area.empresa')
                        ->where('estado', 1)
                        ->where('lider', 1)
                        ->whereHas('cargo', function ($p) use ($empresa_id) {
                            $p->whereHas('area', function ($q) use ($empresa_id) {
                                $q->where('empresa_id', '!=', $empresa_id);
                            });
                        })->whereHas('empresas_tranv', function ($p) use ($empresa_id) {
                            $p->where('empresa_id', $empresa_id);
                        })->get();

                    $lideres = $lideres1->concat($lideres2);
                } else {
                    $lideres = $lideres1;
                }
            }

            return response()->json(['empleados' => $lideres]);
        } else {
            abort(404);
        }
    }

    public function getproyectos(Request $request, $estado, $config_empresa_id)
    {
        if ($request->ajax()) {
            if ($estado == 'todos') {
                return response()->json(['proyectos' => Proyecto::where('empresa_id', $config_empresa_id)->with('miembros_proyecto')->with('lider')->get()]);
            } else {
                return response()->json(['proyectos' => Proyecto::where('empresa_id', $config_empresa_id)->where('estado', $estado)->with('miembros_proyecto')->with('lider')->get()]);
            }
        } else {
            abort(404);
        }
    }
    public function expotar_informeproyecto($id)
    {
        $proyecto = Proyecto::findOrFail($id);
        $usuario = User::findOrFail(session('id_usuario'));
        //----------------------------------------------------------------------------------------------
        $backgroundColor = "[";
        $s = 1;
        foreach ($proyecto->componentes as $componente) {
            $backgroundColor .= "'" . $this->randomColorRGBA($s) . "',";
            if ($s < 3) {
                $s++;
            } else {
                $s = 1;
            }
        }
        $backgroundColor = substr($backgroundColor, 0, -1);
        $backgroundColor .= "],";
        //----------------------------------------------------------------------------------------------
        $datasets = "{
            type: 'pie',
            data: {
              datasets: [
                {
                  data: [";

        foreach ($proyecto->componentes as $componente) {
            $datasets .= round((intval($componente->impacto_num) * 100) / intval($proyecto->componentes->sum('impacto_num')), 2) . ",";
        }
        $datasets = substr($datasets, 0, -1);
        $datasets .= "],
        backgroundColor: " . $backgroundColor .
            "label: 'Dataset 1',
                },
                ],
                labels: [";
        foreach ($proyecto->componentes as $componente) {
            $datasets .= "'" . substr($componente->titulo, 0, 30) . "',";
        }
        $datasets = substr($datasets, 0, -1);
        $datasets .= "],
                    },
                }";

        $chart = new QuickChart(array(
            'width' => 500,
            'height' => 300
        ));

        $chart->setConfig($datasets);

        //----------------------------------------------------------------------------------------------
        $strChartAvance = "{
            type: 'bar',
            data: {
              labels: [";

        foreach ($proyecto->componentes as $componente) {
            $strChartAvance .= "'" . substr($componente->titulo, 0, 30) . "',";
        }
        $strChartAvance = substr($strChartAvance, 0, -1);

        $strChartAvance .= "],
                  datasets: [{
                    label: 'Datos en porcentaje',
                    backgroundColor: " . $backgroundColor . "
                    data: [";
        foreach ($proyecto->componentes as $componente) {
            $strChartAvance .= $componente->progreso . ",";
        }
        $strChartAvance = substr($strChartAvance, 0, -1);
        $strChartAvance .= "]
                            }]
                        }
                    }";
        $urlChartAvance = new QuickChart(array(
            'width' => 500,
            'height' => 300
        ));
        $urlChartAvance->setConfig($strChartAvance);
        //================================================================================================
        $strlabels = "[";
        $strEjecutado = "[";
        $strTotal = "[";
        foreach ($proyecto->componentes as $componente) {
            $strlabels .= "'" . substr($componente->titulo, 0, 30) . "',";
            $strEjecutado .= $componente->ejecucion . ",";
            $strTotal .= $componente->presupuesto . ",";
        }
        $strlabels = substr($strlabels, 0, -1);
        $strlabels .= "],";

        $strEjecutado = substr($strEjecutado, 0, -1);
        $strEjecutado .= "]";

        $strTotal = substr($strTotal, 0, -1);
        $strTotal .= "]";

        $strChartresupuesto = "{
                type: 'bar',
                data: {
                  labels: " . $strlabels . "
                  datasets: [
                    {
                      label: 'Presupuesto Ejecutado',
                      backgroundColor: 'rgb(0, 220, 20)',
                      data: " . $strEjecutado . "
                    },
                    {
                      label: 'Presupuesto Total Componente',
                      backgroundColor: 'rgb(0, 175, 255)',
                      data: " . $strTotal . "
                    }
                  ],
                },
                options: {
                  title: {
                    display: true,
                    text: 'Movimientos por Componente',
                  },
                  scales: {
                    xAxes: [
                      {
                        stacked: true,
                      },
                    ],
                    yAxes: [
                      {
                        stacked: true,
                      },
                    ],
                  },
                },
              }
              ";
        //dd($strChartresupuesto);
        $urlChartPresupuesto = new QuickChart(array(
            'width' => 500,
            'height' => 300
        ));
        $urlChartPresupuesto->setConfig($strChartresupuesto);
        //================================================================================================
        //dd($chart->getUrl());

        $data = ['proyecto' => $proyecto, 'usuario' => $usuario, 'strUrlChart' => $chart->getUrl(), 'urlChartAvance' => $urlChartAvance->getUrl(), 'urlChartPresupuesto' => $urlChartPresupuesto->getUrl()];
        $pdf = Pdf::loadView('intranet.proyectos.pdf.informe_proyecto', $data);
        $pdf->setBasePath(public_path());
        return $pdf->download('Informe proyecto ' . $proyecto->titulo . '.pdf');
    }


    public function randomColorRGBA($s)
    {
        if ($s == 1) {
            $color = 'rgba(' . rand(200, 250) . ',' . rand(10, 200) . ',' . rand(10, 200) . ',0.5)'; # code...
        } elseif ($s == 2) {
            $color = 'rgba(' . rand(10, 200) . ',' . rand(200, 250) . ',' . rand(10, 200) . ',0.5)'; # code...
        } else {
            $color = 'rgba(' . rand(10, 200) . ',' . rand(10, 200) . ',' . rand(200, 250) . ',0.5)';
        }
        return $color;
    }
}
