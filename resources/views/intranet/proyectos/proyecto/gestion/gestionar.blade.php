@extends('intranet.layout.app')
@section('php_funciones')
@endsection
@section('css_pagina')



@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Módulo de Proyectos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.index') }}">Proyectos</a></li>
    <li class="breadcrumb-item active">Gestión</li>
@endsection

@section('titulo_card')
    Gestión Proyecto - {{ $proyecto->titulo }}
@endsection

@section('botones_card')
    @can('proyectos.create')
        <a href="{{ route('proyectos.index') }}" type="button" class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
            <i class="fas fa-reply mr-2 ml-3"></i><span class="pr-4">Volver</span>
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('proyectos.gestion')
        <div class="row">
            <div class="col-12">
                <div class="row mb-3">
                    <div class="col-12">
                        <h6><strong>Datos de proyecto</strong></h6>
                    </div>
                </div>
                <div class="row" style="font-size: 0.9em">
                    <div class="col-12 col-md-5">
                        <div class="row">
                            <div class="col-5 text-right"><strong>Lider del proyecto:</strong></div>
                            <div class="col-7">{{ $proyecto->lider->nombres . ' ' . $proyecto->lider->apellidos }}
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-7">
                        <div class="row">
                            <div class="col-5 col-md-3 text-right"><strong>Objetivo principal:</strong></div>
                            <div class="col-7 col-md-9 text-justify">{{ $proyecto->objetivo }}</div>
                        </div>
                    </div>
                </div>
                <div class="row" style="font-size: 0.9em">
                    <div class="col-12 col-md-5">
                        <div class="row">
                            <div class="col-5 text-right"><strong>Fecha de creación:</strong></div>
                            <div class="col-7">{{ $proyecto->fec_creacion }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-7">
                        <div class="row">
                            <div class="col-5 col-md-3 text-right"><strong>Estado:</strong></div>
                            <div class="col-7 col-md-9 text-capitalize"><span
                                    class="badge {{ $proyecto->estado == 'activo' ? 'badge-success' : ($proyecto->estado == 'extendido' ? 'badge-danger' : ($proyecto->estado == 'cerrado' ? 'badge-secondary' : 'badge-info')) }} pl-4 pr-4"><strong>{{ $proyecto->estado }}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="font-size: 0.9em">
                    <div class="col-12 col-md-5">
                        <div class="row">
                            <div class="col-5 text-right"><strong>Progreso:</strong></div>
                            <div class="col-7">
                                <?php
                                switch ($proyecto->progreso) {
                                    case 0:
                                        $color = 'indigo';
                                        break;
                                    case $proyecto->progreso <= 25:
                                        $color = 'navy';
                                        break;
                                    case $proyecto->progreso <= 50:
                                        $color = 'dodgerblue';
                                        break;
                                    case $proyecto->progreso <= 75:
                                        $color = 'aquamarine';
                                        break;
                                    default:
                                        $color = 'lime';
                                        break;
                                }
                                $porcentaje1 = $proyecto->progreso;
                                $porcentaje2 = 100 - $porcentaje1;
                                $red = 0;
                                $green = ($porcentaje1 * 255) / 100;
                                $blue = ($porcentaje2 * 255) / 100;
                                ?>

                                <div class="col-8" style="color: {{ $color }}">
                                    {{ number_format($proyecto->progreso, 2, ',', '.') }} %
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-7">
                        <div class="row">
                            <div class="col-5 col-md-3 text-right"><strong>Tiempo gestión:</strong></div>
                            <div class="col-7 col-md-9">
                                <?php
                                $date1 = new DateTime($proyecto->fec_creacion);
                                $date2 = new DateTime(Date('Y-m-d'));
                                $diff = date_diff($date1, $date2);
                                $differenceFormat = '%a';
                                ?>
                                <strong>{{ $diff->format($differenceFormat) }} días</strong>
                            </div>
                        </div>
                    </div>
                </div>
                @if ($proyecto->presupuesto > 0)
                    @can('caja_presupuestos')
                        <hr>
                        <div class="row" style="font-size: 0.9em" id="caja_presupuestos">
                            <div class="col-12 col-md-4">
                                @if ($proyecto->adiciones->count() > 0)
                                    <div class="row">
                                        <div class="col-7 col-md-8 text-right"><strong>Presupuesto total del proyecto:</strong>
                                        </div>
                                        <div class="col-5 col-md-4 text-right text-md-left">
                                            {{ '$ ' . number_format($proyecto->presupuesto + $proyecto->adiciones->sum('adicion'), 2, ',', '.') }}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-7 col-md-8 text-right"><strong>Presupuesto inicial del proyecto:</strong>
                                        </div>
                                        <div class="col-5 col-md-4 text-right text-md-left">
                                            {{ '$ ' . number_format($proyecto->presupuesto, 2, ',', '.') }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-7 col-md-8 text-right"><strong>Adiciones al presupuesto del
                                                proyecto:</strong></div>
                                        <div class="col-5 col-md-4 text-right text-md-left">
                                            {{ '$ ' . number_format($proyecto->adiciones->sum('adicion'), 2, ',', '.') }}</div>
                                    </div>
                                @else
                                    <div class="row">
                                        <div class="col-7 col-md-8 text-right"><strong>Presupuesto total del proyecto:</strong>
                                        </div>
                                        <div class="col-5 col-md-4 text-right text-md-left">
                                            {{ '$ ' . number_format($proyecto->presupuesto, 2, ',', '.') }}</div>
                                    </div>
                                @endif
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="row">
                                    <div class="col-8 col-md-8 text-right"><strong>Ejecución del presupuesto:</strong></div>
                                    <div class="col-4 col-md-4">{{ '$ ' . number_format($proyecto->ejecucion, 2, ',', '.') }}</div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="row">
                                    <div class="col-8 col-md-9 text-right"><strong>Porcentaje de ejecución:</strong></div>
                                    <div class="col-4 col-md-3">{{ number_format($proyecto->porc_ejecucion, 2, ',', '.') }} %</div>
                                </div>
                            </div>
                        </div>
                    @endcan
                @endif
                @php
                    $ver_exportar_pry = false;
                @endphp
                @can('exportar_proyecto')
                    @php
                        $ver_exportar_pry = true;
                    @endphp
                @endcan
                @if (session('rol_principal_id') == 1 ||
                        $proyecto->usuario_id == session('id_usuario') ||
                        session('lider') == 1 ||
                        $ver_exportar_pry)
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <a href="{{ route('proyectos.expotar_informeproyecto', ['id' => $proyecto->id]) }}" target="_blank"
                                class="btn btn-success btn-xs btn-sombra pl-3 pr-5 float-md-end">
                                <i class="fas fa-file-download mr-3" aria-hidden="true"></i>
                                Exportar Informe
                            </a>
                            @if ($proyecto->config_usuario_id == session('id_usuario') || session('rol.id') < 4)
                                <a href="{{ route('proyectos.edit', ['id' => $proyecto->id]) }}"
                                    class="btn btn-warning btn-xs btn-sombra mr-3 pl-3 pr-5 float-md-end">
                                    <i class="fas fa-edit mr-3" aria-hidden="true"></i>
                                    Editar Proyecto
                                </a>
                            @endif
                        </div>
                    </div>
                @endif
            </div>
        </div>
        <hr>
        <div class="row" style="background-color: rgba(0, 0, 0, 0.05)">
            @can('personal_asignado_proyecto')
                <div class="col-12 col-md-6 pt-3 pl-md-2 pr-md-2">
                    <div class="card card-outline card-secondary collapsed-card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-11">
                                    <h6><strong>Personal asignado al proyecto</strong></h6>
                                </div>
                                <div class="col-1">
                                    <div class="card-tools text-end">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body table-responsive" style="display: none;font-size: 0.9em;">
                            <table class="table-hover table-sm">
                                <tbody>
                                    @foreach ($proyecto->miembros_proyecto as $usuario)
                                        <tr>
                                            <th scope="row">{{ $usuario->nombres . ' ' . $usuario->apellidos }}</th>
                                            <td class="pl-4">{{ $usuario->cargo->cargo }}</td>
                                            <td class="pl-4">
                                                {{ $usuario->cargo->area->empresa_id != $proyecto->empresa_id ? $usuario->cargo->area->empresa->nombres : '' }}
                                                {{ $usuario->id == $proyecto->lider->id ? ' * Líder del Proyecto' : '' }}
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            @endcan
            <div class="col-12 col-md-6 pt-3 pl-md-2 pr-md-2">
                <div class="card card-outline card-secondary collapsed-card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-11">
                                <h6><strong>Tareas Vencidas</strong></h6>
                            </div>
                            <div class="col-1">
                                <div class="card-tools text-end">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body table-responsive" style="display: none;font-size: 0.9em;">
                        <table class="table table-striped table-hover table-sm" id="tabla_tareas_vencidas">
                            <thead>
                                <tr>
                                    <th scope="col">Responsable</th>
                                    <th scope="col">Componente</th>
                                    <th scope="col">Nombre De La Tarea</th>
                                    <th scope="col">Fecha Límite</th>
                                    <th scope="col">Progreso</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Gestionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($proyecto->componentes as $componente)
                                    @foreach ($componente->tareas as $tarea)
                                        @if ($tarea->fec_creacion > date('Y-m-d'))
                                            @can('tareas_vec_gestion_proyecto')
                                                <tr>
                                                    <th scope="row">
                                                        {{ $tarea->empleado->nombres . ' ' . $tarea->empleado->apellidos }}</th>
                                                    <td>{{ $componente->componente }}</td>
                                                    <td>{{ $tarea->titulo }}</td>
                                                    <td>{{ $tarea->fec_limite }}</td>
                                                    <td>
                                                        <svg class="[&amp;_[path-color]]:text-default-200 [&amp;_[bar-color]]:text-destructive [&amp;_[text-color]]:fill-primary h-20 w-20" viewBox="0 0 100 100">
                                                            <circle path-color="" class="stroke-current" stroke-width="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                                                            <circle bar-color="" class=" stroke-current" stroke-width="10"
                                                                    stroke-linecap="round" cx="50" cy="50" r="40" fill="transparent"
                                                                    stroke-dasharray="{{($tarea->progreso*360)/100}}, {{($tarea->progreso*360)/100}}" stroke-dashoffset="50"
                                                                    style="transition: stroke-dashoffset 0.35s ease 0s; transform: rotate(-90deg); transform-origin: 50% 50%;">
                                                            </circle><text x="50" y="50" font-size="16" text-anchor="middle" alignment-baseline="middle" text-color="">75 %</text>
                                                        </svg>
                                                    </td>
                                                    <td class="text-danger">{{ $tarea->estado }}</td>
                                                    <td>
                                                        <a href="#" type="button" class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
                                                            <i class="fas fa-edit mr-2 ml-3"></i><span class="pr-4">Gestionar</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            @else
                                                @if ($tarea->empleado->id == session('id_usuario'))
                                                    <tr>
                                                        <th scope="row">
                                                            {{ $tarea->empleado->nombres . ' ' . $tarea->empleado->apellidos }}</th>
                                                        <td>{{ $componente->componente }}</td>
                                                        <td>{{ $tarea->titulo }}</td>
                                                        <td>{{ $tarea->fec_limite }}</td>
                                                        <td>
                                                            <svg class="[&amp;_[path-color]]:text-default-200 [&amp;_[bar-color]]:text-destructive [&amp;_[text-color]]:fill-primary h-20 w-20" viewBox="0 0 100 100">
                                                                <circle path-color="" class="stroke-current" stroke-width="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                                                                <circle bar-color="" class=" stroke-current" stroke-width="10"
                                                                        stroke-linecap="round" cx="50" cy="50" r="40" fill="transparent"
                                                                        stroke-dasharray="{{($tarea->progreso*360)/100}}, {{($tarea->progreso*360)/100}}" stroke-dashoffset="50"
                                                                        style="transition: stroke-dashoffset 0.35s ease 0s; transform: rotate(-90deg); transform-origin: 50% 50%;">
                                                                </circle><text x="50" y="50" font-size="16" text-anchor="middle" alignment-baseline="middle" text-color="">75 %</text>
                                                            </svg>
                                                        </td>
                                                        <td class="text-danger">{{ $tarea->estado }}</td>
                                                        <td>
                                                            <a href="#" type="button" class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
                                                                <i class="fas fa-edit mr-2 ml-3"></i><span class="pr-4">Gestionar</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                @endif
                                            @endcan
                                        @endif
                                    @endforeach
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row" style="background-color: rgba(0, 0, 0, 0.05)">
            <div class="col-12 card card-outline card-secondary collapsed-card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-11">
                            <div class="row">
                                <div class="col-12 col-md-7">
                                    <h6 class="card-title" style="font-size: 0.98em;"><strong>Componentes del proyecto</strong></h6>
                                </div>
                                <div class="col-12 col-md-5 text-md-right mt-2 mt-md-0">
                                    <a href="{{ route('componentes.create',['proyecto_id'=> $proyecto->id]) }}" type="button" class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
                                        <i class="fas fa-plus-circle mr-2 ml-3"></i><span class="pr-4">Nuevo componente</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="card-tools float-end">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body" style="font-size: 0.9em;">
                    @if ($proyecto->componentes->count()>0)
                    <div class="row">
                        @foreach ($proyecto->componentes as $componente)
                        <div class="col-12 col-md-4">
                            <a class="btn btn-light btn-sm pl-5 pr-5" data-bs-toggle="collapse" href="#collapse{{$componente->id}}" role="button" aria-expanded="false" aria-controls="collapseExample">
                                {{$componente->titulo}}
                            </a>
                        </div>
                    @endforeach
                </div>
                @foreach ($proyecto->componentes as $componente)
                    <div class="row">
                        <div class="col-12">
                            <div class="collapse mt-5 mini_sombra_general" style="border-top : solid 1px black;" id="collapse{{$componente->id}}">
                                <div class="card card-body">
                                    <div class="row mb-5">
                                        <div class="col-12">
                                            <h6><strong>{{$componente->titulo}}</strong></h6>
                                            @if ($proyecto->config_usuario_id==session('id_usuario')||session('rol.id')<4)
                                                <a href="{{ route('componentes.edit') }}" type="button" class="btn btn-warning btn-xs btn-sombra pl-5 pr-5 float-md-end">
                                                    <i class="fas fa-edit mr-2 ml-3"></i><span class="pr-4">Editar Componente</span>
                                                </a>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="row">
                                                <div class="col-4 text-right"><strong>Responsable:</strong></div>
                                                <div class="col-8">
                                                    {{ $componente->responsable->nombres . ' ' . $componente->responsable->apellidos }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4 text-right"><strong>Cargo:</strong></div>
                                                <div class="col-8">
                                                    {{$componente->responsable->empleado->cargo->cargo }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4 text-right"><strong>Fecha de creación:</strong></div>
                                                <div class="col-8">{{ $componente->fec_creacion }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4 text-right"><strong>Estado:</strong></div>
                                                <div class="col-8">{{ $componente->estado }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4 text-right"><strong>Impacto:</strong></div>
                                                <div class="col-8">{{ $componente->impacto }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="row">
                                                <div class="col-4 text-right"><strong>Porcentaje de avance:</strong></div>
                                                <div class="col-8">
                                                    {{ number_format(doubleval($componente->progreso), 2, ',', '.') }} %</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4 text-right"><strong>Objetivo:</strong></div>
                                                <div class="col-8">
                                                    <p class="text-justify">{{ $componente->objetivo }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @if ($proyecto->presupuesto>0)
                                    <hr>
                                    <div class="row" style="font-size: 0.9em">
                                        <div class="col-12 col-md-5">
                                            @if ($componente->adiciones->count()>0)
                                            <div class="row">
                                                <div class="col-7 col-md-5 text-right"><strong>Presupuesto total del Componente:</strong></div>
                                                <div class="col-5 col-md-7 text-right text-md-left">{{ '$ ' . number_format(($componente->presupuesto + $componente->adiciones->sum('adicion')), 2, ',', '.') }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-7 col-md-5 text-right"><strong>Presupuesto inicial del Componente:</strong></div>
                                                <div class="col-5 col-md-7 text-right text-md-left">{{ '$ ' . number_format($componente->presupuesto, 2, ',', '.') }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-7 col-md-5 text-right"><strong>Adiciones al presupuesto del Componente:</strong></div>
                                                <div class="col-5 col-md-7 text-right text-md-left">{{ '$ ' . number_format($componente->adiciones->sum('adicion'), 2, ',', '.') }}</div>
                                            </div>
                                            @else
                                            <div class="row">
                                                <div class="col-7 col-md-5 text-right"><strong>Presupuesto total del Componente:</strong></div>
                                                <div class="col-5 col-md-7 text-right text-md-left">{{ '$ ' . number_format($componente->presupuesto, 2, ',', '.') }}</div>
                                            </div>
                                            @endif
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="row">
                                                <div class="col-7 col-md-5 text-right"><strong>Ejecución del presupuesto:</strong></div>
                                                <div class="col-5 col-md-7 text-right text-md-left">{{ '$ ' . number_format($componente->ejecucion, 2, ',', '.') }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-3">
                                            <div class="row">
                                                <div class="col-7 col-md-5 text-right"><strong>Porcentaje de ejecución:</strong></div>
                                                <div class="col-5 col-md-7 text-right text-md-left">{{ number_format($componente->porc_ejecucion, 2, ',', '.') }} %</div>
                                            </div>
                                        </div>
                                    </div>
                                    @endif
                                    <hr>
                                    <div class="row mb-4 pl-4 w-100">
                                        <div class="col-12">
                                            <strong>Tareas</strong>
                                            <a href="{{route('tarea.create',['componente_id'=>$componente->id])}}" class="btn btn-success btn-xs btn-sombra text-center pl-3 pr-3 float-md-right"><i class="fas fa-plus-circle mr-2"></i> Nueva
                                                tarea</a>
                                        </div>
                                        <div class="col-12 d-flex flex-row">
                                            <div class="form-check mr-2">
                                                <input class="form-check-input" type="checkbox" value="todas" id="check_Todas" data_componente="{{$componente->id}}">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Todas
                                                </label>
                                            </div>
                                            <div class="form-check mr-2">
                                                <input class="form-check-input tablaTarea_selector" type="checkbox" value="Activa" data_id="tabla_tareas_componente_{{$componente->id}}" data_url="{{route('tarea.getapitareas',['proy_componentes_id'=>$componente->id,'estado'=>'Activa'])}}" id="check_Activas" data_componente="{{$componente->id}}" checked>
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    Activas
                                                </label>
                                            </div>
                                            <div class="form-check mr-2">
                                                <input class="form-check-input tablaTarea_selector" type="checkbox" value="Inactiva" data_id="tabla_tareas_componente_{{$componente->id}}" data_url="{{route('tarea.getapitareas',['proy_componentes_id'=>$componente->id,'estado'=>'Inactiva'])}}" id="check_Inactivas" data_componente="{{$componente->id}}">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Inactivas
                                                </label>
                                            </div>
                                                <div class="form-check mr-2">
                                                <input class="form-check-input tablaTarea_selector" type="checkbox" value="Cerrada" data_id="tabla_tareas_componente_{{$componente->id}}" data_url="{{route('tarea.getapitareas',['proy_componentes_id'=>$componente->id,'estado'=>'Cerrada'])}}" id="check_Cerradas" data_componente="{{$componente->id}}" >
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    Cerradas
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 table-responsive">
                                            <table class="table table-striped table-hover table-sm" id="tabla_tareas_componente_{{$componente->id}}">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">Id</th>
                                                        <th class="text-center" scope="col">Responsable</th>
                                                        <th class="text-center" scope="col">Titulo</th>
                                                        <th class="text-center" scope="col">Fecha de creación</th>
                                                        <th class="text-center" scope="col">Fecha límite</th>
                                                        <th class="text-center" scope="col">Progreso</th>
                                                        <th class="text-center" scope="col">Estado</th>
                                                        <th class="text-center" scope="col">Impacto</th>
                                                        <th class="text-center" scope="col">Objetivo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    @foreach ($componente->tareas->where('estado','Activa') as $tarea)
                                                    <tr>
                                                        <td>
                                                            @if ($tarea->responsable->id == session('id_usuario') || Session('lider')==1)
                                                            <a href="{{route('tarea.gestion',['id'=>$tarea->id])}}" class="btn-accion-tabla {{$tarea->responsable->id == session('id_usuario')?'text-primary':'text-secondary'}}" title="Gestionar tarea"><i class="fas fa-eye mr-2"></i></a>
                                                            @else
                                                            <i class="fas fa-eye-slash"></i>
                                                            @endif
                                                        </td>
                                                        <td>{{ ucfirst(strtolower($tarea->responsable->nombres)) . ' ' . ucfirst(strtolower($tarea->responsable->apellidos)) }}
                                                        </td>
                                                        <td>{{ $tarea->titulo }}</td>
                                                        <td class="text-center">{{ $tarea->fec_creacion }}</td>
                                                        <td class="text-center">{{ $tarea->fec_limite }}</td>
                                                        <td class="text-center">{{ $tarea->progreso }} %</td>
                                                        <td class="text-center">{{ $tarea->estado }}</td>
                                                        <td class="text-center">{{ $tarea->impacto }}</td>
                                                        <td>{{ $tarea->objetivo }}</td>
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
                    @endforeach
                    @else
                    <div class="row">
                        <div class="col-12">
                            <h6><strong>Sin Componentes</strong></h6>
                        </div>
                    </div>
                    @endif
                    <div class="row">
                        <div class="col-12">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-6">
                <div class="alert alert-warning alert-dismissible mini_sombra">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h5><i class="icon fas fa-exclamation-triangle"></i> Sin Acceso!</h5>
                    <p style="text-align: justify">Su usuario no tiene permisos de acceso para este modulo, Comuniquese con el
                        administrador del sistema.</p>
                </div>
            </div>
        </div>
    @endcan
@endsection

@section('footer_card')
@endsection

@section('modales')
@endsection

@section('scripts_pagina')
    <script src="{{ asset('js/intranet/proyectos/proyecto/gestion.js') }}"></script>
@endsection
