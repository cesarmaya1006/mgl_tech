@extends('intranet.layout.app')

@section('css_pagina')
    <link rel="stylesheet" href="{{ asset('css/intranet/general/ninja/color-switcher.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/intranet/general/ninja/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('css/intranet/general/ninja/materialdesignicons.css') }}">
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Módulo de Proyectos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.index') }}">Proyectos</a></li>
    <li class="breadcrumb-item active">Proyectos por empresas</li>
@endsection

@section('titulo_card')
    Proyectos por empresas
@endsection

@section('botones_card')
    @can('proyectos.index')
        <a href="{{ route('proyectos.index') }}" type="button"
            class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
            <i class="fas fa-reply mr-2 ml-3"></i><span class="pr-4">Volver</span>
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('proyectos.proyecto_empresas')
        @foreach ($grupos as $grupo)
            <div class="row">
                <div class="col-12">
                    <h3>{{$grupo->grupo}}</h3>
                </div>
                @foreach ($grupo->empresas as $empresa)
                    <div class="col-12 col-md-3">
                        <div class="card card-widget widget-user-2 card-proyectos">
                            <div class="widget-user-header bg-primary bg-gradient">
                                <div class="widget-user-image">
                                    <img class="img-circle elevation-2" src="{{asset('imagenes/empresas/'.$empresa->logo)}}" alt="{{$empresa->empresa}}">
                                </div>
                                <h3 class="widget-user-username">{{$empresa->empresa}}</h3>
                                <h5 class="widget-user-desc">Email: {{$empresa->email}}</h5>
                                <h5 class="widget-user-desc">Teléfono: {{$empresa->telefono}}</h5>
                            </div>
                            <div class="card-footer p-0">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a
                                            class="nav-link {{ $empresa->proyectos->count() > 0 ? 'link_item_card':''}}"
                                            data_id = "{{$empresa->id}}"
                                            data_url = "{{route('proyectos.getproyectos', ['estado' => 'todos', 'config_empresa_id' => $empresa->id] )}}"
                                            style="cursor: pointer;">
                                            Total Proyectos <span class="float-right badge bg-dark">{{$empresa->proyectos->count()}}</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class="nav-link {{ $empresa->proyectos->where('estado','activo')->count() > 0 ? 'link_item_card':''}}"
                                            data_id = "{{$empresa->id}}"
                                            data_url = "{{route('proyectos.getproyectos', ['estado' => 'activo', 'config_empresa_id' => $empresa->id] )}}"
                                            style="cursor: pointer;">
                                            Proyectos En curso <span class="float-right badge bg-success">{{$empresa->proyectos->where('estado','activo')->count()}}</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class="nav-link {{ $empresa->proyectos->where('estado','extendido')->count() > 0 ? 'link_item_card':''}}"
                                            data_id = "{{$empresa->id}}"
                                            data_url = "{{route('proyectos.getproyectos', ['estado' => 'extendido', 'config_empresa_id' => $empresa->id] )}}"
                                            style="cursor: pointer;">
                                            Proyectos Extendidos <span class="float-right badge bg-danger">{{$empresa->proyectos->where('estado','extendido')->count()}}</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class="nav-link {{ $empresa->proyectos->where('estado','cerrado')->count() > 0 ? 'link_item_card':''}}"
                                            data_id = "{{$empresa->id}}"
                                            data_url = "{{route('proyectos.getproyectos', ['estado' => 'cerrado', 'config_empresa_id' => $empresa->id] )}}"
                                            style="cursor: pointer;">
                                            Proyectos Cerrados <span class="float-right badge bg-secondary">{{$empresa->proyectos->where('estado','cerrado')->count()}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <hr>
        @endforeach
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
<!-- Modales  -->
<div class="modal fade" id="proyectosModal" tabindex="-1" aria-labelledby="proyectosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="proyectosModalLabel">Modal title</h5>
                <button type="button" class="btn-close boton_cerrar_modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="font-size: 0.8em;">
                <table class="table table-striped table-hover table-sm display nowrap" style="width:100%" id="tabla_proyectos">
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Proyecto</th>
                            <th>Lider</th>
                            <th>Miembros de Equipo</th>
                            <th>Gestión/Días</th>
                            <th>Progreso proyecto</th>
                            <th class="text-center">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tbody_proyectos">

                    </tbody>
                </table>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-xs btn-sombra boton_cerrar_modal"><span class="pl-4 pr-4">Cerrar</span></button>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="folder_imagenes_usuario" value="{{asset('imagenes/usuarios/')}}">
<input type="hidden" id="input_getdetalleproyecto" value="{{route('proyectos.detalle',['id' => 1])}}">
<!-- Fin Modales  -->
@endsection

@section('scripts_pagina')
    @include('intranet.layout.data_table')
    <script src="{{ asset('js/intranet/proyectos/proyecto/proyecto_empresas.js') }}"></script>
@endsection
