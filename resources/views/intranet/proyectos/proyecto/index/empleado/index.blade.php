@extends('intranet.layout.app')

@section('css_pagina')

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
                                <div class="row bg-primary rounded">
                                    <div class="col-12">
                                        <span>Tareas Activas</span>
                                    </div>
                                    <div class="col-12 text-center">
                                        <h4><strong>{{$empleado->tareas->where('progreso','<=',100)->where('estado','!=','Inactiva')->count()}}</strong></h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7 col-md-5 rounded" style="background-color: rgba(255, 255, 255, 0.6)">
                                <div class="row bg-danger rounded">
                                    <div class="col-12">
                                        <span>Tareas Vencidas</s>
                                    </div>
                                    <div class="col-12 text-center">
                                        <h4><strong>{{$empleado->tareas->where('progreso','<=',100)->where('fec_limite','>',date('Y-m-d'))->count()}}</strong></h4>
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
                    @if (session('rol_principal_id')==3)
                        @if (session('transversal'))
                            <div class="col-12 col-md-4 p-2">
                                <a class="small-box bg-light mini_sombra" style="text-decoration: none;">
                                    <div class="inner">
                                        <h3>{{$empleado->empresas_tranv->count()}}</h3>
                                        <p>Empresas Tranversales</p>
                                    </div>
                                    <div class="icon text-cyan">
                                        <i class="fas fa-building"></i>
                                    </div>
                                </a>
                            </div>
                        @endif
                        @php
                            $usuarios_activ = 0;
                            $usuarios_inact = 0;
                            if (session('transversal')) {
                                foreach ($empleado->empresas_tranv as $empresa) {
                                    foreach ($empresa->areas as $area) {
                                        foreach ($area->cargos as $cargo) {
                                            $usuarios_activ+= $cargo->empleados->where('estado',1)->count();
                                            $usuarios_inact+= $cargo->empleados->where('estado',0)->count();
                                        }
                                    }
                                }
                            } else {
                                foreach ($empleado->cargo->area->empresa as $area) {
                                    foreach ($area->cargos as $cargo) {
                                        $usuarios_activ+= $cargo->empleados->where('estado',1)->count();
                                        $usuarios_inact+= $cargo->empleados->where('estado',0)->count();
                                    }
                                }
                            }
                        @endphp
                        <div class="col-12 col-md-4 p-2">
                            <a href="{{route('empleados.index')}}" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                                <div class="inner">
                                    <h3>{{$usuarios_activ}}</h3>
                                    <p>Usuarios Activos</p>
                                </div>
                                <div class="icon text-success">
                                    <i class="fas fa-users"></i>
                                </div>
                            </a>
                        </div>
                        <div class="col-12 col-md-4 p-2">
                            <a href="{{route('empleados.index')}}" class="small-box bg-light mini_sombra" style="text-decoration: none;">
                                <div class="inner">
                                    <h3>{{$usuarios_inact}}</h3>
                                    <p>Usuarios Inactivos</p>
                                </div>
                                <div class="icon text-success">
                                    <i class="fas fa-users"></i>
                                </div>
                            </a>
                        </div>
                    @endif
                </div>
                <div class="row p-1 d-flex align-items-center">
                    <div class="col-12 col-md-4 p-2">
                        <div class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>{{$empleado->miembro_proyectos->where('estado','Activo')->count()}}</h3>
                                <p>Proyectos Activos</p>
                            </div>
                            <div class="icon text-info">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 p-2">
                        <div class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>{{$empleado->miembro_proyectos->where('estado','Terminado')->count()}}</h3>
                                <p>Proyectos Terminados</p>
                            </div>
                            <div class="icon text-warning">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 p-2">
                        <div class="small-box bg-light mini_sombra" style="text-decoration: none;">
                            <div class="inner">
                                <h3>{{$empleado->proyectos->where('estado','Activo')->count()}}</h3>
                                <p>Lider Proyectos</p>
                            </div>
                            <div class="icon text-teal">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row d-flex justify-content-evenly">
            <div class="col-12 text-center mt-3">
                <h3>{{$empleado->cargo->area->empresa->grupo->grupo}}</h3>
            </div>
            <div class="col-12">
                <hr>
            </div>
            @if (session('transversal'))
                @foreach ($empleado->empresas_tranv as $empresa)
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
                                    <table class="table table-hover table-sm ">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Email:</th>
                                                <td colspan="2" >{{$empresa->email}}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Teléfono:</th>
                                                <td colspan="2" >{{$empresa->telefono}}</td>
                                            </tr>
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
                                                $cantDocumentos =0;
                                                $PesoDocus =0;
                                            @endphp
                                            @foreach ($empresa->proyectos as $proyecto)
                                                @php
                                                    $cantDocumentos+= $proyecto->documentos->count();
                                                    $PesoDocus+= $proyecto->documentos->sum('peso');
                                                @endphp
                                                @foreach ($proyecto->componentes as $componente)
                                                    @php
                                                        $tareasActivas = $componente->tareas->where('estado','Activa')->count();
                                                        $tareasVencidas = $componente->tareas->where('fec_limite','>=', date('Y-m-d'))->count();
                                                        $cantDocumentos+= $componente->documentos->count();
                                                        $PesoDocus+= $componente->documentos->sum('peso');
                                                    @endphp
                                                    @foreach ($componente->tareas as $tarea)
                                                        @foreach ($tarea->historiales as $historial)
                                                            @php
                                                                $cantDocumentos+= $historial->documentos->count();
                                                                $PesoDocus+= $historial->documentos->sum('peso');
                                                            @endphp
                                                        @endforeach
                                                        @foreach ($tarea->subtareas as $subtarea)
                                                            @foreach ($subtarea->historiales as $historial)
                                                                @php
                                                                    $cantDocumentos+= $historial->documentos->count();
                                                                    $PesoDocus+= $historial->documentos->sum('peso');
                                                                @endphp
                                                            @endforeach
                                                        @endforeach
                                                    @endforeach
                                                @endforeach
                                            @endforeach
                                            <tr>
                                                <th scope="row">Cantidad de Usuarios</th>
                                                <td class="align-middle pl-2 pr-2" style="min-width: 100px;">Activos:<span class="float-end badge bg-primary">{{$empleados_act}}</span></td>
                                                <td class="align-middle pl-2 pr-2" style="min-width: 100px;">Inactivos:<span class="float-end badge bg-secondary">{{$empleados_inac}}</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="align-middle">Cantidad de Proyectos</th>
                                                <td class="align-middle pl-2 pr-2 d-grid gap-2 {{ $empresa->proyectos->where('estado', 'Activo')->count() > 0 ? 'ver_modal_proyectos':''}}"
                                                    style="cursor: pointer;"
                                                    data_id = "{{$empresa->id}}"
                                                    data_url = "{{route('proyectos.getproyectos', ['estado' => 'todos', 'config_empresa_id' => $empresa->id] )}}">
                                                    @if ($empresa->proyectos->where('estado', 'Activo')->count() > 0)
                                                        <button class="btn btn-outline-primary btn-xs"> Activos:<span class="float-end badge bg-primary mt-1 ml-1">{{$empresa->proyectos->where('estado', 'Activo')->count()}}</span></button>
                                                    @else
                                                    Activos:<span class="float-end badge bg-primary mt-1">{{$empresa->proyectos->where('estado', 'Activo')->count()}}</span>
                                                    @endif

                                                </td>
                                                <td class="align-middle pl-2 pr-2">Inactivos:<span class="float-end badge bg-secondary">{{$empresa->proyectos->where('estado', 'Inactivo')->count() +$empresa->proyectos->where('progreso', 100)->count()}}</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Estadística de tareas</th>
                                                <td class="align-middle pl-2 pr-2">Activos:<span class="float-end badge bg-primary">{{$tareasActivas}}</span></td>
                                                <td class="align-middle pl-2 pr-2">Inactivos:<span class="float-end badge bg-danger">{{$tareasVencidas}}</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total Documentos:</th>
                                                <td colspan="2" class="align-middle text-center"><span class="badge bg-success">{{$cantDocumentos}}</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Uso de espacio en el servidor:</th>
                                                <td colspan="2" class="align-middle text-center"><span class="badge bg-warning">{{number_format(($PesoDocus/1000),3,',','.')}} Mb</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @else
                <div class="card col-12 col-md-5">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                                <img src="{{asset('imagenes/empresas/'.$empleado->cargo->area->empresa->logo)}}" class="img-fluid" style="max-width: 100px;">
                            </div>
                            <div class="col-12 d-flex justify-content-center">
                                <h4><strong>{{$empleado->cargo->area->empresa->empresa}}</strong></h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 table-responsive">
                                <table class="table table-hover table-sm ">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Email:</th>
                                            <td colspan="2" >{{$empleado->cargo->area->empresa->email}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Teléfono:</th>
                                            <td colspan="2" >{{$empleado->cargo->area->empresa->telefono}}</td>
                                        </tr>
                                        @php
                                            $empleados_act = 0;
                                            $empleados_inac = 0;
                                            foreach ($empleado->cargo->area->empresa->areas as $area) {
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
                                            $cantDocumentos =0;
                                            $PesoDocus =0;
                                        @endphp
                                        @foreach ($empleado->cargo->area->empresa->proyectos as $proyecto)
                                            @php
                                                $cantDocumentos+= $proyecto->documentos->count();
                                                $PesoDocus+= $proyecto->documentos->sum('peso');
                                            @endphp
                                            @foreach ($proyecto->componentes as $componente)
                                                @php
                                                    $tareasActivas = $componente->tareas->where('estado','Activa')->count();
                                                    $tareasVencidas = $componente->tareas->where('fec_limite','>=', date('Y-m-d'))->count();
                                                    $cantDocumentos+= $componente->documentos->count();
                                                    $PesoDocus+= $componente->documentos->sum('peso');
                                                @endphp
                                                @foreach ($componente->tareas as $tarea)
                                                    @foreach ($tarea->historiales as $historial)
                                                        @php
                                                            $cantDocumentos+= $historial->documentos->count();
                                                            $PesoDocus+= $historial->documentos->sum('peso');
                                                        @endphp
                                                    @endforeach
                                                    @foreach ($tarea->subtareas as $subtarea)
                                                        @foreach ($subtarea->historiales as $historial)
                                                            @php
                                                                $cantDocumentos+= $historial->documentos->count();
                                                                $PesoDocus+= $historial->documentos->sum('peso');
                                                            @endphp
                                                        @endforeach
                                                    @endforeach
                                                @endforeach
                                            @endforeach
                                        @endforeach
                                        <tr>
                                            <th scope="row">Cantidad de Usuarios</th>
                                            <td class="align-middle pl-2 pr-2" style="min-width: 100px;">Activos:<span class="float-end badge bg-primary">{{$empleados_act}}</span></td>
                                            <td class="align-middle pl-2 pr-2" style="min-width: 100px;">Inactivos:<span class="float-end badge bg-secondary">{{$empleados_inac}}</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="align-middle">Cantidad de Proyectos</th>
                                            <td class="align-middle pl-2 pr-2 d-grid gap-2 {{ $empleado->cargo->area->empresa->proyectos->where('estado', 'Activo')->count() > 0 ? 'ver_modal_proyectos':''}}"
                                                style="cursor: pointer;"
                                                data_id = "{{$empleado->cargo->area->empresa->id}}"
                                                data_url = "{{route('proyectos.getproyectos', ['estado' => 'todos', 'config_empresa_id' => $empleado->cargo->area->empresa->id] )}}">
                                                @if ($empleado->cargo->area->empresa->proyectos->where('estado', 'Activo')->count() > 0)
                                                    <button class="btn btn-outline-primary btn-xs"> Activos:<span class="float-end badge bg-primary mt-1 ml-1">{{$empleado->cargo->area->empresa->proyectos->where('estado', 'Activo')->count()}}</span></button>
                                                @else
                                                Activos:<span class="float-end badge bg-primary mt-1">{{$empleado->cargo->area->empresa->proyectos->where('estado', 'Activo')->count()}}</span>
                                                @endif

                                            </td>
                                            <td class="align-middle pl-2 pr-2">Inactivos:<span class="float-end badge bg-secondary">{{$empleado->cargo->area->empresa->proyectos->where('estado', 'Inactivo')->count() +$empleado->cargo->area->empresa->proyectos->where('progreso', 100)->count()}}</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Estadística de tareas</th>
                                            <td class="align-middle pl-2 pr-2">Activos:<span class="float-end badge bg-primary">{{$tareasActivas}}</span></td>
                                            <td class="align-middle pl-2 pr-2">Inactivos:<span class="float-end badge bg-danger">{{$tareasVencidas}}</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Documentos:</th>
                                            <td colspan="2" class="align-middle text-center"><span class="badge bg-success">{{$cantDocumentos}}</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Uso de espacio en el servidor:</th>
                                            <td colspan="2" class="align-middle text-center"><span class="badge bg-warning">{{number_format(($PesoDocus/1000),3,',','.')}} Mb</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            @endif
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
<!-- Modal proyectos empresas  -->
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
<!-- Fin Modal proyectos empresas  -->
@endsection

@section('scripts_pagina')
@include('intranet.layout.data_table')
<script src="{{ asset('js/intranet/proyectos/proyecto/index.js') }}"></script>
@endsection
