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
    <div class="row">
        <div class="col-12">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="historiales-tab" data-bs-toggle="tab" data-bs-target="#historiales" type="button" role="tab" aria-controls="historiales" aria-selected="true">Historiales</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="sub_tareas-tab" data-bs-toggle="tab" data-bs-target="#sub_tareas" type="button" role="tab" aria-controls="sub_tareas" aria-selected="false">Sub - Tareas</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="historiales" role="tabpanel" aria-labelledby="historiales-tab">
                    <div class="row">
                        <div class="col-12 mb-3 d-grid gap-2 d-md-block pt-md-2 pr-md-2">
                            @if (session('rol_principal_id') == 1 ||
                                 auth()->user()->hasPermissionTo('historiales.create')||
                                 $tarea->componente->proyecto->empleado_id == session('id_usuario')||
                                 $tarea->componente->empleado_id == session('id_usuario'))
                                 <a href="{{route('historiales.create',['id'=>$tarea->id])}}" class="btn btn-success btn-xs btn-sombra text-center pl-3 pr-3 float-md-end mt-3 mt-md-0" style="font-size: 0.9em;">
                                    <i class="fas fa-plus-circle mr-2"></i>
                                    Nuevo historial
                                </a>
                            @endif
                        </div>
                        <div class="col-12 table-responsive">
                            <table class="table table-striped table-hover table-sm w-100 nowrap tabla_data_table_inicial" style="width:100%" id="tablas_gestion_historiales">
                                <thead class="thead-light w-100">
                                    <tr style="width: 100%">
                                        <td>id</td>
                                        <td>Titulo</td>
                                        <td>Fecha</td>
                                        <td>Usuario historial</td>
                                        <td>Usuario asignado</td>
                                        <td>Avance Progresivo</td>
                                        @if ($tarea->componente->presupuesto > 0)
                                        <td>Costo</td>
                                        @endif
                                        <td>Resumen</td>
                                        <td></td>
                                        <td>Documentos</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($tarea->historiales as $historial)
                                        <tr>
                                            <td>{{ $historial->id }}</td>
                                            <td class="text-left">{{ $historial->titulo }}</td>
                                            <td>{{ $historial->fecha }}</td>
                                            <td class="text-left">{{ $historial->empleado->nombres . ' ' . $historial->empleado->apellidos }}</td>
                                            <td class="text-left">{{ $historial->asignado->nombres . ' ' . $historial->asignado->apellidos }}</td>
                                            <td class="text-center">{{ $historial->progreso }} %</td>
                                            @if ($tarea->componente->presupuesto > 0)
                                                <td class="text-right"> $ {{ number_format($historial->costo , 2) }}</td>
                                            @endif
                                            <td width="25%" class="text-left text-wrap">{{ $historial->resumen }}</td>
                                            <td>
                                                <a href="#"class="btn btn-accion-tabla btn-xs text-success btn_new_doc_hist"
                                                   data-toggle="modal" data-target="#docHistorialNew"
                                                   data_id = "{{ $historial->id }}"
                                                   data_cajaid="caja_doc_hist_{{ $historial->id }}">
                                                    <i class="fas fa-file-upload" aria-hidden="true"></i>
                                                </a>
                                            </td>
                                            <td class="d-flex flex-column" id="caja_doc_hist_{{ $historial->id }}">
                                                @foreach ($historial->documentos as $documento)
                                                    <span><a href="{{ asset('documentos/folder_doc_historial/' . $documento->url) }}"target="_blank">{{ $documento->titulo }}</a></span>
                                                @endforeach
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="sub_tareas" role="tabpanel" aria-labelledby="sub_tareas-tab">
                    <div class="row">
                        <div class="col-12 mb-3 d-grid gap-2 d-md-block pt-md-2 pr-md-2">
                            @if (session('rol_principal_id') == 1 ||
                                 auth()->user()->hasPermissionTo('subtareas.create')||
                                 $tarea->componente->proyecto->empleado_id == session('id_usuario')||
                                 $tarea->componente->empleado_id == session('id_usuario'))
                                 <a href="{{route('subtareas.create',['id'=>$tarea->id])}}" class="btn btn-success btn-xs btn-sombra text-center pl-3 pr-3 float-md-end mt-3 mt-md-0 ml-md-4" style="font-size: 0.9em;">
                                    <i class="fas fa-plus-circle mr-2"></i>
                                    Crear Subtarea
                                </a>
                            @endif
                        </div>
                        <div class="col-12 table-responsive">
                            <table class="table table-striped table-hover table-sm tabla_data_table_inicial" style="width: 100%;">
                                <thead class="thead-light">
                                    <tr>
                                        <td></td>
                                        <td style="white-space:nowrap;">Título</td>
                                        <td style="white-space:nowrap;">Fecha Inicial</td>
                                        <td style="white-space:nowrap;">Fecha Límite</td>
                                        <td style="white-space:nowrap;">Estado</td>
                                        <td style="white-space:nowrap;">Usuario Asignado</td>
                                        <td style="white-space:nowrap;">Objetivo</td>
                                        <td style="white-space:nowrap;">Historiales</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($tarea->subtareas as $subtarea)
                                        <tr class="{{$subtarea->progreso < 100?'table-info':'table-success'}}">
                                            <td>
                                                <a href="{{route('subtareas.gestion',['id' => $subtarea->id])}}" class="btn btn-outline-primary btn-xs pl-3 pr-3" style="white-space:nowrap;">Gestionar la sub-tarea</a>
                                            </td>
                                            <td class="text-left" style="white-space:nowrap;">{{ $subtarea->titulo }}</td>
                                            <td style="white-space:nowrap;">{{ $subtarea->fec_creacion }}</td>
                                            <td style="white-space:nowrap;">{{ $subtarea->fec_limite }}</td>
                                            <td style="white-space:nowrap;">{{ $subtarea->progreso < 100?$subtarea->estado:'Completada' }}</td>
                                            <td class="text-left" style="white-space:nowrap;">{{ $subtarea->empleado->nombres . ' ' . $subtarea->empleado->apellidos }}</td>
                                            <td width="25%" class="text-left text-wrap" style="min-width: 250px; max-width: 350px;;">{{ $subtarea->objetivo }}</td>
                                            <td>
                                                @if ($subtarea->historiales->count()>0)
                                                    <button type="button" style="white-space:nowrap;"
                                                        class="btn btn-primary btn-xs verHistSubTareas"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#historialSubTareasNew"
                                                        data_url="{{route('subtareas.getHistSubTarea')}}"
                                                        data_id="{{$subtarea->id}}">
                                                            Ver Historiales
                                                    </button>
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="ruta_docs_histotiales" data_url="{{ asset('documentos/folder_doc_historial/') }}">
@endsection

@section('footer_card')
@endsection

@section('modales')
<!-- Modal -->
<div class="modal fade" id="docHistorialNew" tabindex="-1" role="dialog" aria-labelledby="docHistorialNewLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="docHistorialNewLabel">Añadir Documento al historial</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form class="modal-body form-horizontal" id="form_historiales_store" action="{{route('historiales.guardar_doc_hist')}}" method="POST" autocomplete="off" enctype="multipart/form-data">
                @csrf
                @method('post')
                <div class="row">
                    <div class="col-12 form-group">
                        <label for="docu_historial">Documento Adjunto</label>
                        <input type="hidden" id="historial_id" name="historial_id" required>
                        <input type="file" class="form-control form-control-sm" name="docu_historial" id="docu_historial" aria-describedby="helpId" required>
                        <small id="helpId" class="form-text text-muted">Tamaño maximo 20Mb</small>
                    </div>
                </div>
            </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="guardarArchivos">Guardar</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal histroriales subtareas -->
<div class="modal fade" id="historialSubTareasNew" tabindex="-1" role="dialog" aria-labelledby="historialSubTareasNewLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="historialSubTareasNewLabel">Historial Sub - Tarea</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 table-responsive">
                        <table class="table table-striped table-hover table-sm" id="tablas_gestion_historiales_subTarea">
                            <thead class="thead-light">
                                <tr>
                                    <td style="white-space:nowrap;">id</td>
                                    <td style="white-space:nowrap;min-width: 200px;">Titulo</td>
                                    <td style="min-width: 150px;">Fecha</td>
                                    <td style="white-space:nowrap;">Usuario historial</td>
                                    <td style="white-space:nowrap;">Usuario asignado</td>
                                    <td style="white-space:nowrap;">Avance Progresivo</td>
                                    <td style="white-space:nowrap;min-width: 500px;">Resumen</td>
                                </tr>
                            </thead>
                            <tbody id="tbodyHistSubTareas">
                                <tr>
                                    <td>id</td>
                                    <td style="white-space:nowrap;">Titulo</td>
                                    <td style="min-width: 250px;">Fecha</td>
                                    <td>Usuario historial</td>
                                    <td>Usuario asignado</td>
                                    <td>Avance Progresivo</td>
                                    <td style="min-width: 500px;">Resumen</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts_pagina')
    @include('intranet.layout.data_table')
    <script src="{{ asset('js/intranet/proyectos/tareas/gestion.js') }}"></script>
@endsection
