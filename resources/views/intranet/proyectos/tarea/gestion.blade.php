@extends('intranet.layout.app')

@section('css_pagina')
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Módulo de Proyectos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.index') }}">Proyectos</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.gestion', ['id' => $tarea->componente->proyecto->id]) }}">Gestión
            Proyecto</a></li>
    <li class="breadcrumb-item active">Gestionar Tarea</li>
@endsection

@section('titulo_card')
    <i class="fas fa-magic mr-3" aria-hidden="true"></i> Gestión Tarea - {{ $tarea->titulo }}
@endsection

@section('botones_card')
    <a href="{{ route('proyectos.gestion', ['id' => $tarea->componente->proyecto->id]) }}"
        class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
        <i class="fas fa-reply mr-4 ml-2"></i><span class="mr-md-5">Volver</span>
    </a>
@endsection

@section('cuerpo')
    <div class="row">
        <div class="col-12">
            <div class="accordion accordion-flush acordeon_empresa acordeon_empresa-md" id="accordionDatosProyecto">
                @if (session('rol_principal_id') == 1 ||
                    auth()->user()->hasPermissionTo('tareas_gestion_ver_datos_proy')||
                    $tarea->componente->proyecto->empleado_id == session('id_usuario'))
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingProyecto">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseProyecto" aria-expanded="false" aria-controls="flush-collapseProyecto">
                                <strong>Proyecto:	{{$tarea->componente->proyecto->titulo}}</strong>
                            </button>
                        </h2>
                        <div id="flush-collapseProyecto" class="accordion-collapse collapse" aria-labelledby="flush-headingProyecto" data-bs-parent="#accordionDatosProyecto">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Lider del proyecto:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->proyecto->lider->nombres . ' ' . $tarea->componente->proyecto->lider->apellidos}}</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Fecha de creación:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->proyecto->fec_creacion}}</p></div>
                                    @php
                                        $date1 = new DateTime($tarea->componente->proyecto->fec_creacion);
                                        $date2 = new DateTime(Date('Y-m-d'));
                                        $diff = date_diff($date1, $date2);
                                        $differenceFormat = '%a';
                                    @endphp
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Días de gestión:</strong><p class="text-capitalize" style="text-align: justify;">{{ $diff->format($differenceFormat) }} días</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Procentaje de avance:</strong><p class="text-capitalize" style="text-align: justify;">{{number_format($tarea->componente->proyecto->progreso,2)}} %</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Total de componentes:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->proyecto->componentes->count()}}</p></div>
                                    @php
                                        $num_tareas =0;
                                        foreach ($tarea->componente->proyecto->componentes as $componente) {
                                            $num_tareas += $componente->tareas->count();
                                        }
                                    @endphp
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Total de tareas:</strong><p class="text-capitalize" style="text-align: justify;">{{$num_tareas}}</p></div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-6 d-flex flex-column flex-md-row"><strong class="mr-3">Objetivo:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->proyecto->objetivo}}</p></div>
                                    <div class="col-12 col-md-6 d-flex flex-column flex-md-row">
                                        <strong class="mr-3">Personal asignado:</strong>
                                        <div>
                                            <div class="row">
                                                <div class="col-12 table-responsive">
                                                    <table class="table table-hover table-sm table-borderless">
                                                        <tbody>
                                                            @foreach ($tarea->componente->proyecto->miembros_proyecto as $empleado)
                                                                <tr style="line-height: 10px;max-height: 10px;height: 10px;">
                                                                    <td colspan="2">{{$empleado->nombres . ' ' . $empleado->apellidos}}</td>
                                                                </tr>
                                                                <tr style="line-height: 10px;max-height: 10px;height: 10px;">
                                                                    <td colspan="2" style="font-size: 0.9em;"><strong>{{$empleado->cargo->cargo}}</strong></td>
                                                                </tr>
                                                                @if ($empleado->cargo->area->empresa_id!=$tarea->componente->proyecto->empresa_id)
                                                                    <tr style="line-height: 10px;max-height: 10px;height: 10px;">
                                                                        <td style="font-size: 0.9em;">Empresa:</td>
                                                                        <td style="font-size: 0.9em;">{{$empleado->cargo->area->empresa->empresa}}</td>
                                                                    </tr>
                                                                @endif
                                                                <tr>
                                                                    <td colspan="2"></td>
                                                                </tr>
                                                            @endforeach
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @if ($tarea->componente->proyecto->presupuesto > 0 &&
                                    (session('rol_principal_id') == 1 ||
                                    $tarea->componente->proyecto->empleado_id == session('id_usuario') ||
                                    auth()->user()->hasPermissionTo('tareas_gestion_ver_presupuesto_proyecto')
                                    ))
                                    <hr>
                                    <div class="row tarea_gestpresup_proy-md">
                                        <div class="col-12 col-md-4">
                                            <div class="row">
                                                <div class="col-7 col-md-8 text-md-right"><strong>Presupuesto del Proyecto:</strong></div>
                                                <div class="col-5 col-md-4 text-right text-md-left">{{ '$ ' . number_format($tarea->componente->proyecto->presupuesto + $tarea->componente->proyecto->adiciones->sum('adicion'), 2, ',', '.') }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="row">
                                                <div class="col-7 col-md-8 text-md-right"><strong>Ejecución del presupuesto:</strong></div>
                                                <div class="col-5 col-md-4 text-right text-md-left">{{ '$ ' . number_format($tarea->componente->proyecto->ejecucion, 2, ',', '.') }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="row">
                                                <div class="col-7 col-md-8 text-md-right"><strong>Porcentaje de ejecución:</strong></div>
                                                <div class="col-5 col-md-4 text-right text-md-left">{{ number_format($tarea->componente->proyecto->porc_ejecucion, 2, ',', '.') }} %</div>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                @endif
                @if (session('rol_principal_id') == 1 ||auth()->user()->hasPermissionTo('tareas_gestion_ver_datos_comp')||$tarea->componente->proyecto->empleado_id == session('id_usuario')||$tarea->componente->empleado_id == session('id_usuario'))
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingComponente">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseComponente" aria-expanded="false" aria-controls="flush-collapseComponente">
                                <strong>Componente:	{{$tarea->componente->titulo}}</strong>
                            </button>
                        </h2>
                        <div id="flush-collapseComponente" class="accordion-collapse collapse" aria-labelledby="flush-headingComponente" data-bs-parent="#accordionDatosComponente">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-12 col-md-4 d-flex flex-row"><strong class="mr-3">Responsable del componente:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->responsable->nombres . ' ' . $tarea->componente->responsable->apellidos}}</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Fecha de creación:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->fec_creacion}}</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Procentaje de avance:</strong><p class="text-capitalize" style="text-align: justify;">{{number_format($tarea->componente->progreso,2)}} %</p></div>
                                    @php
                                        $date1 = new DateTime($tarea->componente->fec_creacion);
                                        $date2 = new DateTime(Date('Y-m-d'));
                                        $diff = date_diff($date1, $date2);
                                        $differenceFormat = '%a';
                                    @endphp
                                    <div class="col-12 col-md-2 d-flex flex-row"><strong class="mr-3">Días de gestión:</strong><p class="text-capitalize" style="text-align: justify;">{{ $diff->format($differenceFormat) }} días</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Total de tareas:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->tareas->count();}}</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Impacto en el proyecto:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->impacto}}</p></div>
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Estado del componente:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->componente->estado}}</p></div>
                                    <div class="col-12 d-flex flex-row"><p style="text-align: justify;"><strong class="mr-3">Objetivo del componente:</strong>{{$tarea->componente->objetivo}}</p></div>
                                </div>
                                @if ($tarea->componente->proyecto->presupuesto > 0 &&
                                (session('rol_principal_id') == 1 ||
                                $tarea->componente->proyecto->empleado_id == session('id_usuario') ||
                                auth()->user()->hasPermissionTo('tareas_gestion_ver_presupuesto_componente')
                                ))
                                    <hr>
                                    <div class="row tarea_gestpresup_proy-md">
                                        <div class="col-12 col-md-4">
                                            <div class="row">
                                                <div class="col-7 col-md-8 text-md-right"><strong>Presupuesto del Componente:</strong></div>
                                                <div class="col-5 col-md-4 text-right text-md-left">{{ '$ ' . number_format($tarea->componente->presupuesto + $tarea->componente->adiciones->sum('adicion'), 2, ',', '.') }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="row">
                                                <div class="col-7 col-md-8 text-md-right"><strong>Ejecución del presupuesto:</strong></div>
                                                <div class="col-5 col-md-4 text-right text-md-left">{{ '$ ' . number_format($tarea->componente->ejecucion, 2, ',', '.') }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="row">
                                                <div class="col-7 col-md-8 text-md-right"><strong>Porcentaje de ejecución:</strong></div>
                                                <div class="col-5 col-md-4 text-right text-md-left">{{ number_format($tarea->componente->porc_ejecucion, 2, ',', '.') }} %</div>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                @endif
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTarea">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTarea" aria-expanded="true" aria-controls="flush-collapseTarea">
                            <strong>Tarea:	{{$tarea->titulo}}</strong>
                        </button>
                    </h2>
                    <div id="flush-collapseTarea" class="accordion-collapse collapse show" aria-labelledby="flush-headingTarea" data-bs-parent="#accordionDatosTarea">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Responsable de la tarea:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->empleado->nombres . ' ' . $tarea->empleado->apellidos}}</p></div>
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Fecha de creación:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->fec_creacion}}</p></div>
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Fecha límite:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->fec_limite}}</p></div>
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Procentaje de avance:</strong><p class="text-capitalize" style="text-align: justify;">{{number_format($tarea->progreso,2)}} %</p></div>
                                @php
                                    $date1 = new DateTime($tarea->fec_creacion);
                                    $date2 = new DateTime(Date('Y-m-d'));
                                    $diff = date_diff($date1, $date2);
                                    $differenceFormat = '%a';
                                @endphp
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Días de gestión:</strong><p class="text-capitalize" style="text-align: justify;">{{ $diff->format($differenceFormat) }} días</p></div>
                                @php
                                    $porc_comp_proy = ($tarea->componente->impacto_num*100)/ $tarea->componente->proyecto->componentes->sum('impacto_num');
                                    $porc_tarea_comp = ($tarea->impacto_num*100)/ $tarea->componente->tareas->sum('impacto_num');
                                    $impacto_proyecto = ($porc_tarea_comp/100)*$porc_comp_proy;
                                @endphp
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Impacto en el proyecto :</strong><p class="text-capitalize" style="text-align: justify;">{{round($impacto_proyecto,2)}} %</p></div>
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Impacto en el componente:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->impacto}}</p></div>
                                <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Estado de la tarea:</strong><p class="text-capitalize" style="text-align: justify;">{{$tarea->estado}}</p></div>
                                @if ($tarea->componente->presupuesto > 0)
                                    <div class="col-12 col-md-3 d-flex flex-row"><strong class="mr-3">Costo total de la tarea:</strong><p class="text-capitalize" style="text-align: justify;">$ {{ number_format($tarea->costo,2)}}</p></div>
                                @endif
                                <div class="col-12 d-flex flex-row"><p style="text-align: justify;"><strong class="mr-3">Objetivo de la tarea:</strong>{{$tarea->objetivo}}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('footer_card')
@endsection

@section('modales')
@endsection

@section('scripts_pagina')
    <script src="{{ asset('js/intranet/proyectos/tareas/gestion.js') }}"></script>
@endsection
