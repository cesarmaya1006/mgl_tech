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
    <li class="breadcrumb-item active">Proyectos</li>
@endsection

@section('titulo_card')
    Proyectos
@endsection

@section('botones_card')
    @can('proyectos.create')
        <a href="{{ route('proyectos.create') }}" type="button"
            class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
            <i class="ico ico-left fa fa-home mr-3 ml-2"></i>Nuevo proyecto
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('proyectos.index')
        <div class="row p-1">
            <div class="col-12 col-md-4 text-white rounded mini_sombra" style="background-color: rgb(64, 36, 221);">
                <div class="caja_textos row m-3 m-md-2">
                    <div class="col-12">
                        <h4>¡Bienvenido de nuevo</h4>
                        <h4>{{ session('nombres_completos') }}!</h4>
                    </div>
                    <div class="col-12 mt-2 mt-md-5 mb-4">
                        <div class="row">
                            <div class="col-7 col-md-5 rounded mr-md-3 mb-2 mb-md-0" style="background-color: rgba(255, 255, 255, 0.6)">
                                <div class="row text-black">
                                    <div class="col-12">
                                        <span>Tareas Activas</span>
                                    </div>
                                    <div class="col-12 text-center">
                                        <h4><strong>0</strong></h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7 col-md-5 rounded" style="background-color: rgba(255, 255, 255, 0.6)">
                                <div class="row text-black">
                                    <div class="col-12">
                                        <span>Tareas Vencidas</s>
                                    </div>
                                    <div class="col-12 text-center">
                                        <h4><strong>0</strong></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="{{ asset('imagenes/sistema/admin.webp') }}" alt="" style="position: absolute;right: 5px;bottom: 10px; max-height: 80%;width: auto;">
            </div>
            <div class="col-12 col-md-8">
                <div class="row p-1 d-flex align-items-center">
                    <div class="col-12 col-md-4 p-2">
                        <a href="#" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>150</h3>
                                <p>Grupos Empresariales</p>
                            </div>
                            <div class="icon text-cyan">
                                <i class="fas fa-industry"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col-12 col-md-4 p-2">
                        <a href="#" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>150</h3>
                                <p>Empresas</p>
                            </div>
                            <div class="icon text-dark">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col-12 col-md-4 p-2">
                        <a href="#" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>150</h3>
                                <p>Usuarios</p>
                            </div>
                            <div class="icon text-success">
                                <i class="fas fa-users"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="row p-1 d-flex align-items-center">
                    <div class="col-12 col-md-4 p-2">
                        <a href="#" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>150</h3>
                                <p>Proyectos Activos</p>
                            </div>
                            <div class="icon text-info">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col-12 col-md-4 p-2">
                        <a href="#" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>150</h3>
                                <p>Proyectos Terminados</p>
                            </div>
                            <div class="icon text-warning">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col-12 col-md-4 p-2">
                        <a href="#" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>150</h3>
                                <p>Total Proyectos</p>
                            </div>
                            <div class="icon text-teal">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row d-flex justify-content-evenly">
            @foreach ($grupos as $grupo)
                <div class="col-12 text-center mt-3 mb-2">
                    <h3>{{$grupo->grupo}}</h3>
                </div>
                @foreach ($grupo->empresas as $empresa)
                    <div class="card col-12 col-md-5">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 d-flex justify-content-center">
                                    <img src="{{asset('imagenes/empresas/'.$empresa->logo)}}" class="img-fluid" style="max-width: 100px;">
                                </div>
                                <div class="col-12 d-flex justify-content-center">
                                    <h4><strong>{{$empresa->empresa}}</strong></h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Cantidad de Usuarios</th>
                                                @php
                                                    $empleados_act = 0;
                                                    $empleados_inac = 0;
                                                    foreach ($empresa->areas as $area) {
                                                        foreach ($area->cargos as $cargo) {
                                                            foreach ($cargo->empleados as $empleado) {
                                                                if ($empleado->estado) {
                                                                    $empleados_act++;
                                                                } else {
                                                                    $empleados_inac++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                @endphp
                                                <td>Activos:</td>
                                                <td class="text-right">{{$empleados_act}}</td>
                                                <td>Inactivos:</td>
                                                <td class="text-right">{{$empleados_inac}}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cantidad de Proyectos</th>
                                                <td>Activos:</td>
                                                <td class="text-right">{{$empresa->proyectos->where('estado',1)->count()}}</td>
                                                <td>Inactivos:</td>
                                                <td class="text-right">{{$empresa->proyectos->where('estado',0)->count()}}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Estadística de tareas</th>
                                                <td>Activas:</td>
                                                <td class="text-right">0</td>
                                                <td>Vencidas:</td>
                                                <td class="text-right">0</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total Documentos</th>
                                                <td colspan="4" class="text-center">50</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Uso de espacio en el servidor</th>
                                                <td colspan="4" class="text-center">150Mb</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
                <hr>
            @endforeach
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
    <script src="{{ asset('js/intranet/proyectos/proyecto/index.js') }}"></script>
@endsection
