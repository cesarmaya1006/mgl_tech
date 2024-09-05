@extends('intranet.layout.app')

@section('css_pagina')
<!-- fullCalendar -->
<link rel="stylesheet" href="{{asset('lte/plugins/fullcalendar/main.css')}}">
<style>
    .parent {
   float: left;
   margin-left: 5px;
   height: 200px;
   width: 200px;
   border: 3px solid black
 }
 .child {
   height: 50px;
   width: 50px;
   background-color: khaki;
 }
</style>
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
                                <div class="row bg-primary rounded ver_tareas" style="cursor: pointer;" data_id="{{session('id_usuario')}}" data_url="{{route('empleados.getTareas')}}" data_titulo="Tareas Activas">
                                    <div class="col-12">
                                        <span>Tareas Activas</span>
                                    </div>
                                    <div class="col-12 text-center">
                                        <h4><strong>{{$empleado->tareas->where('progreso','<=',100)->where('estado','!=','Inactiva')->count()}}</strong></h4>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" id="val_count_tareas_activas" value="{{$empleado->tareas->where('progreso','<=',100)->where('estado','!=','Inactiva')->count()}}">
                            <input type="hidden" id="val_count_tareas_vencidas" value="{{$empleado->tareas->where('progreso','<=',100)->where('fec_limite','>',date('Y-m-d'))->count()}}">
                            <div class="col-7 col-md-5 rounded" style="background-color: rgba(255, 255, 255, 0.6)">
                                <div class="row bg-danger rounded ver_tareas" style="cursor: pointer;" data_id="{{session('id_usuario')}}" data_url="{{route('empleados.getTareasVencidas')}}" data_titulo="Tareas Vencidas">
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
                                        <p style="font-size: 0.95em;">Empresas Tranversales</p>
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
                                    <p style="font-size: 0.95em;">Usuarios Activos</p>
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
                                    <p style="font-size: 0.95em;">Usuarios Inactivos</p>
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
                        <div class="small-box bg-light mini_sombra ver_proyectos" id="proyectos_lider" style="cursor: pointer;" data_id="{{session('id_usuario')}}" data_url="{{route('empleados.getproyectosLider')}}">
                            <div class="inner">
                                <h3>{{$empleado->proyectos->where('estado','Activo')->count()}}</h3>
                                <p style="font-size: 0.95em;">Lider Proyectos</p>
                            </div>
                            <div class="icon text-teal">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 p-2">
                        <div class="small-box bg-light mini_sombra ver_proyectos" id="proyectos_activos" style="cursor: pointer;" data_id="{{session('id_usuario')}}" data_url="{{route('empleados.getproyectos')}}">
                            <div class="inner">
                                <h3>{{$empleado->miembro_proyectos->where('estado','Activo')->count()}}</h3>
                                <p style="font-size: 0.95em;">Proyectos Activos</p>
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
                                <p style="font-size: 0.95em;">Proyectos Terminados</p>
                            </div>
                            <div class="icon text-warning">
                                <i class="fas fa-bezier-curve"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>

        <div class="row d-flex justify-content-evenly">
            <div class="col-12">
                <div class="accordion accordion-flush" id="accordionFlushProyectos">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <strong>Grupos tareas</strong>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <button type="button" class="btn btn-primary btn-xs mini_sombra"
                                                id="btngruposTareasModal"
                                                data_destroy =" {{route('tareas.destroyTareasEmpleadoGrupos',['id'=>0])}}"
                                                data-bs-toggle="modal"
                                                data-bs-target="#gruposTareasModal">
                                            Editar Grupos
                                        </button>
                                    </div>
                                    <hr>
                                    <div class="col-12 mt-3">
                                        <div class="row p-md-3">
                                            <div class="col-12 col-md-3">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <h5 class="card-title">Tareas Sin Asignar a grupo</h5>
                                                            </div>
                                                            <div class="col-12">
                                                                <div class="card">
                                                                    <ul class="list-group list-group-flush ulPadre" data_ULID="0" style="min-height: 30px;border: 1px solid black">
                                                                        @foreach ($empleado->tareas as $tarea)
                                                                            @if ($tarea->grupo()->count() == 0)
                                                                                <li class="list-group-item itemMove {{$tarea->progreso<30?'bg-danger':($tarea->progreso<60?'bg-warning':($tarea->progreso<99?'bg-primary':'bg-success'))}}" data_url="{{route('tareas.reasignacionGrupoTarea')}}" data_ID="{{$tarea->id}}" draggable="true" >{{$tarea->titulo}}</li>
                                                                            @endif
                                                                        @endforeach
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @foreach ($empleado->gtareas as $grupo)
                                                <div class="col-12 col-md-3">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <h5 class="card-title">{{$grupo->grupo}}</h5>
                                                                </div>
                                                                <div class="col-12">
                                                                    <div class="card">
                                                                        <ul class="list-group list-group-flush ulPadre" data_ULID="{{$grupo->id}}" style="min-height: 30px;border: 1px solid black">
                                                                            @foreach ($grupo->tareas as $tarea)
                                                                                <li class="list-group-item itemMove {{$tarea->progreso<30?'bg-danger':($tarea->progreso<60?'bg-warning':($tarea->progreso<99?'bg-primary':'bg-success'))}}" data_url="{{route('tareas.reasignacionGrupoTarea')}}" data_ID="{{$tarea->id}}" draggable="true" >{{$tarea->titulo}}</li>
                                                                            @endforeach
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @can('proyectos.ver_datos_empresa')
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingGrupo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseGrupo" aria-expanded="false" aria-controls="flush-collapseGrupo">
                                <h6>Información <strong>{{$empleado->cargo->area->empresa->grupo->grupo}}</strong></h6>
                            </button>
                        </h2>
                        <div id="flush-collapseGrupo" class="accordion-collapse collapse" aria-labelledby="flush-headingGrupo" data-bs-parent="#accordionFlushProyectos">
                            <div class="accordion-body">
                                @if (session('transversal'))
                                    <div class="row d-flex justify-content-evenly">
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
                                                                                foreach ($cargo->empleados as $empleado_for) {
                                                                                    if ($empleado_for->estado) {
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
                                                                            data_url = "{{route('proyectos.getproyectos', ['estado' => 'Activo', 'config_empresa_id' => $empresa->id] )}}">
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
                                    </div>
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
                                                                        foreach ($cargo->empleados as $empleado_for) {
                                                                            if ($empleado_for->estado) {
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
                                                                    data_url = "{{route('proyectos.getproyectos', ['estado' => 'Activo', 'config_empresa_id' => $empleado->cargo->area->empresa->id] )}}">
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
                        </div>
                        </div>
                    @endcan
                    @can('proyectos.ver_estadistica_tareas')
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingestadisticas">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseestadisticas" aria-expanded="false" aria-controls="flush-collapseestadisticas">
                                    <h6><strong>Estadísticas</strong></h6>
                                </button>
                            </h2>
                            <div id="flush-collapseestadisticas" class="accordion-collapse collapse" aria-labelledby="flush-headingestadisticas" data-bs-parent="#accordionFlushProyectos">
                                <div class="accordion-body">
                                    <div class="row">
                                        @php
                                            $tamañoGraficos = 350;
                                        @endphp
                                        @if ($empleado->proyectos->where('estado','Activo')->where('progreso','<','100')->count()>0)
                                            <div class="col-12 col-md-6">
                                                <div id="tareasProyectosLider" style="height:{{$tamañoGraficos}}px;"></div>
                                            </div>
                                        @endif
                                        <div class="col-12 col-md-6 p-3">
                                            <div id="container" style="height:{{$tamañoGraficos}}px;"></div>
                                        </div>
                                        <div class="col-12 col-md-6"></div>
                                        <div class="col-12 col-md-6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endcan
                    @if (auth()->user()->hasPermissionTo('proyectos.ver_calendario_tareas') &&
                        $empleado->tareas->where('estado','Activa')->where(''))
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingCalendario">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseCalendario" aria-expanded="false" aria-controls="flush-collapseCalendario">
                                    <h6><strong>Calendario Tareas</strong></h6>
                                </button>
                            </h2>
                            <div id="flush-collapseCalendario" class="accordion-collapse" aria-labelledby="flush-headingCalendario" data-bs-parent="#accordionFlushProyectos">
                                <div class="accordion-body">
                                    <div class="row">
                                        <div class="col-12 mb-4">
                                            <div class="row">
                                                <div class="col-12 col-md-4">
                                                    <div class="container-fluid">
                                                        <p><span class="badge pl-4 pr-4 mr-5" style="background-color: rgba(0, 200, 250, 0.8);color: transparent; min-width: 25px; ">..........</span> Tarea Vigentes</p>
                                                        <p><span class="badge pl-4 pr-4 mr-5" style="background-color: rgba(255, 180, 0, 0.8);color: transparent; min-width: 25px; ">..........</span> Tareas próxima a vencer</p>
                                                        <p><span class="badge pl-4 pr-4 mr-5" style="background-color: rgba(255, 0, 0, 0.8);color: transparent; min-width: 25px; ">..........</span> Tarea Vencida</p>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-8">
                                                    @if ($empleado->proyectos->where('estado','Activo')->count() > 0)
                                                    <div class="row">
                                                        <div class="col-12 col-md-4">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="tareasTipo" id="flexRadioMisTareas" value="mias" checked>
                                                                <label class="form-check-label" for="flexRadioMisTareas">Mis Tareas</label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="tareasTipo" id="flexRadiotareasProyectos" value="proyectos">
                                                                <label class="form-check-label" for="flexRadiotareasProyectos">Tareas por proyecto (Lider)</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-12 col-md-8 form-group d-none" id="selectProyectosCaja">
                                                            <label class="requerido" for="proyecto_id">Lider del Proyecto</label>
                                                            <select id="proyecto_id" class="form-control form-control-sm" data_url="{{route('empleados.calendar_empleado_proy')}}" required>
                                                                <option value="">Elija un proyecto</option>
                                                                @foreach ($empleado->proyectos as $proyecto)
                                                                    <option value="{{$proyecto->id}}">{{$proyecto->titulo}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <!-- THE CALENDAR -->
                                            <div id="calendar"></div>
                                            <input type="hidden" id="array_events_calendario" data_url="{{route('empleados.calendar_empleado')}}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
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
<!-- Modal proyectos empresas  -->
<div class="modal fade" id="proyectosModal" tabindex="-1" aria-labelledby="proyectosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="proyectosModalLabel">Proyectos</h5>
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
                <button type="button" class="btn btn-primary btn-xs btn-sombra boton_cerrar_modal" data-bs-dismiss="modal"><span class="pl-4 pr-4">Cerrar</span></button>
            </div>
        </div>
    </div>
</div>
<!-- Modal tareas Vencidas  -->
<!-- Modal -->
<div class="modal fade" id="tareasModal" tabindex="-1" aria-labelledby="tareasModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tareasModalLabel">Tareas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-striped table-hover table-sm nowrap" style="width:100%" id="tabla_tareas">
            <thead>
                <tr>
                    <th class="width70"></th>
                    <th scope="col">Id</th>
                    <th scope="col">Titulo</th>
                    <th class="text-center" scope="col">Fecha de creación</th>
                    <th class="text-center" scope="col">Fecha límite</th>
                    <th class="text-center" scope="col">Progreso</th>
                    <th class="text-center" scope="col">Estado</th>
                </tr>
            </thead>
            <tbody id="tbody_tareas">

            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
<input type="hidden" id="ruta_tareas_gestion" data_url="{{ route('tareas.gestion', ['id' => 1]) }}">
<input type="hidden" id="folder_imagenes_usuario" value="{{asset('imagenes/usuarios/')}}">
<input type="hidden" id="input_getdetalleproyecto" value="{{route('proyectos.detalle',['id' => 1])}}">
<input type="hidden" id="id_usuario" value="{{session('id_usuario')}}" data_url_proyLider="{{route('empleados.getProyectosGraficosLider')}}">
<input type="hidden" id="empleados_calendar_empleado" data_url="{{route('empleados.calendar_empleado')}}" >
<!-- Fin Modal proyectos empresas  -->
<!-- Modal crear grupos tareas  -->
<input type="hidden" id="getTareasEmpleadoGrupos" data_url="{{route('tareas.getTareasEmpleadoGrupos')}}">
<div class="modal fade" id="gruposTareasModal" tabindex="-1" aria-labelledby="gruposTareasModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="gruposTareasModalLabel">Grupos Tareas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="bodyTareasEmpleadoGrupos">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <h5>Nuevo Grupo</h5>
                            </div>
                            <form class="col-12 form-horizontal" id="formNuevoGrupo" action="{{ route('tareas.createEmplGrupoTareas',['empleado_id' => session('id_usuario')]) }}" method="POST" autocomplete="off" enctype="multipart/form-data">
                                @csrf
                                @method('post')
                                <div class="row">
                                    <div class="col-12 form-group">
                                        <label class="requerido" for="grupo">Nombre del Grupo</label>
                                        <input type="text" class="form-control form-control-sm" name="grupo" id="grupo" required>
                                    </div>
                                    <div class="col-12 form-group">
                                        <label class="requerido" for="fecha_ini">Fecha Inicial</label>
                                        <input type="date" class="form-control form-control-sm" min="{{date('Y-m-d')}}" value="{{date('Y-m-d')}}" name="fecha_ini" id="fecha_ini" required>
                                    </div>
                                    <div class="col-12 form-group">
                                        <label class="requerido" for="fecha_fin">Fecha Final</label>
                                        <input type="date" class="form-control form-control-sm" min="{{date('Y-m-d')}}" value="{{date('Y-m-d')}}" name="fecha_fin" id="fecha_fin" required>
                                    </div>
                                    <div class="col-12 d-grid gap-2 d-md-block d-flex align-self-center">
                                        <button type="submit" class="btn btn-primary btn-xs mini_sombra pl-sm-3 pr-sm-3" style="font-size: 0.7em;">Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-12">
                        <hr>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <h6>Grupos Actuales</h6>
                            </div>
                            <div class="col-12 table-responsive">
                                <form action="{{ route('tareas.destroyTareasEmpleadoGrupos', ['id' => 0]) }}"
                                    class="d-inline" method="POST" id="formDestroyTareasEmpleadoGrupos">
                                    @csrf @method('delete')
                                </form>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Grupo</th>
                                            <th scope="col">Fecha Incial</th>
                                            <th scope="col">Fecha Limite</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyGruposEmpleados">
                                        <tr>
                                            <th scope="row"></th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="cerrarModalAny('gruposTareasModal')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
<!-- Fin crear grupos tareas  -->
@endsection

@section('scripts_pagina')



@include('intranet.layout.data_table')
<script src="{{asset('js/intranet/general/ninja/highcharts.js')}}"></script>
<script src="{{asset('js/intranet/general/ninja/highcharts-3d.js')}}"></script>
<script src="{{ asset('lte/plugins/moment/moment.min.js') }}"></script>
<script src="{{ asset('lte/plugins/fullcalendar/main.js') }}"></script>
<script src='{{ asset('lte/plugins/fullcalendar/locales/es.js') }}'></script>
<script src="{{ asset('js/intranet/proyectos/proyecto/index_emp.js') }}"></script>
@endsection
