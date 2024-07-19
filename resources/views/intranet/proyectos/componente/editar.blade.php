@extends('intranet.layout.app')

@section('css_pagina')
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Módulo de Proyectos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.index') }}">Proyectos</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.gestion', ['id' => $proyecto->id]) }}">Gestión Proyecto</a></li>
    <li class="breadcrumb-item active">Editar Componente</li>
@endsection

@section('titulo_card')
    <i class="fa fa-edit mr-3" aria-hidden="true"></i> Editar Componente
@endsection

@section('botones_card')
    <a href="{{ route('proyectos.gestion', ['id' => $componente->proyecto->id]) }}" class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
        <i class="fas fa-reply mr-2 ml-2"></i><span class="mr-3">Volver</span>
    </a>
@endsection

@section('cuerpo')
    @can('componentes.edit')
        <div class="row d-flex justify-content-center">
            <form class="col-12 form-horizontal" action="{{route('componentes.update',['id' => $componente->id])}}" method="POST" autocomplete="off"
                enctype="multipart/form-data">
                @csrf
                @method('put')
                @include('intranet.proyectos.componente.form')
                <div class="row mt-3">
                    <div class="col-12 col-md-6 mb-4 mb-md-0 d-grid gap-2 d-md-block ">
                        <button type="submit" class="btn btn-primary btn-xs btn-sombra"
                            style="font-size: 0.8em;"><span class="pr-5 pl-5">Actualizar Componente</span></button>
                    </div>
                </div>
            </form>
        </div>
        @if ($componente->tareas->count()> 0)
        <hr>
            <div class="row">
                <div class="col-12 col-md-3"><h6>Cantidad de tareas: <strong>{{$componente->tareas->count()}}</strong></h6></div>
                <div class="col-12 col-md-3 mt-2 mt-md-0">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="1" id="checkReasigancion">
                        <label class="form-check-label" for="checkReasigancion"><strong>Reasignación</strong></label>
                    </div>
                </div>
            </div>
            <div class="row d-flex flex-row mt-3 cajas_reasignacion">
                <div class="col-12 col-md-5 form-group">
                    <label class="requerido" for="empleado_id">Asignación Masiva (Todas las Tareas)</label>
                    <select id="reasignacion_comp_{{$componente->id}}"
                        name="empleado_id"
                        class="form-control form-control-sm reasignacion_componente_masivo"
                        data_url="{{route('componentes.reasignacionComponenteMasivo')}}"
                        data_componente="{{$componente->id}}">
                        <option value="">Elija un Empleado</option>
                        @foreach ($empleados as $empleado)
                            <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}} {{$componente->empresa_id != $empleado->cargo->area_empresa_id?' - *'. $empleado->cargo->area->empresa->empresa:''}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <br class="cajas_reasignacion">
            <div class="container-fluid cajas_reasignacion">
                <div class="row info-box bg-light">
                    <div class="col-12 table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col">Tarea</th>
                                    <th class="text-center" scope="col">Asignación Actual</th>
                                    <th class="text-center" scope="col">Nueva Asignación</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($componente->tareas as $tarea)
                                    <tr>
                                        <th scope="row" style="white-space:nowrap;">{{$tarea->titulo}}</th>
                                        <td style="text-align: center;vertical-align: middle;white-space:nowrap;min-width: 250px;">
                                            <div class="form-group">
                                                <span class="form-control form-control-sm text-left" id="empleado_asignado_tarea_{{$tarea->id}}">{{$tarea->empleado->nombres . ' ' . $tarea->empleado->apellidos}}</span>
                                            </div>
                                        </td>
                                        <td style="text-align: center;vertical-align: middle;white-space:nowrap;min-width: 250px;">
                                            <div class="form-group">
                                                <select id="reasignacion_tarea_{{$tarea->id}}"
                                                        name="empleado_id"
                                                        class="form-control form-control-sm reasignacio_tarea"
                                                        data_url="{{route('tareas.reasignacionTarea')}}"
                                                        data_tarea="{{$tarea->id}}">
                                                    <option value="">Elija un Empleado</option>
                                                    @foreach ($empleados as $empleado)
                                                        <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}} {{$componente->empresa_id != $empleado->cargo->area_empresa_id?' - *'. $empleado->cargo->area->empresa->empresa:''}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        @endif
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
<script src="{{ asset('js/intranet/proyectos/componente/editar.js') }}"></script>
@endsection
