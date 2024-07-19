@extends('intranet.layout.app')

@section('css_pagina')
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Configuración Usuarios
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('empleados.index') }}">Usuarios</a></li>
    <li class="breadcrumb-item active">Usuarios - Editar</li>
@endsection

@section('titulo_card')
    <i class="fa fa-edit mr-3" aria-hidden="true"></i> Editar Usuario
@endsection

@section('botones_card')
    <a href="{{route('empleados.index')}}" class="btn btn-success btn-sm mini_sombra pl-5 pr-5 float-md-end" style="font-size: 0.8em;">
        <i class="fas fa-reply mr-2"></i>
        Volver
    </a>
@endsection

@section('cuerpo')
<div class="row d-flex justify-content-center">
    <form class="col-12 form-horizontal" action="{{ route('empleados.update',['id'=>$empleado_edit]) }}" method="POST" autocomplete="off" enctype="multipart/form-data">
        @csrf
        @method('put')
        @include('intranet.empresa.empleado.form')
        <div class="row mt-5">
            <div class="col-12 col-md-6 mb-4 mb-md-0 d-grid gap-2 d-md-block ">
                <button type="submit" class="btn btn-primary btn-xs mini_sombra pl-sm-5 pr-sm-5" style="font-size: 0.8em;">Actualizar</button>
            </div>
            @if (isset($empleado_edit))
                <div class="col-12 col-md-6 mb-4 mb-md-0 d-grid gap-2 d-md-block ">
                    <span class="btn btn-{{$empleado_edit->estado == 1?'warning':'secondary'}} btn-xs mini_sombra pl-sm-5 pr-sm-5 float-end"
                          style="font-size: 0.8em; cursor: pointer;"
                          id="boton_desactivar"
                          data_estado="{{$empleado_edit->estado}}"
                          data_id="{{$empleado_edit->id}}"
                          data_url="{{route('empleados.getResponsabilidadesTotal')}}"
                          data_url_des ="{{route('empleados.setDeshabilitarEmpleado')}}"
                          data_unidades="{{$empleado_edit->proyectos->where('estado','Activo')->count()+
                                           $empleado_edit->componentes->where('estado','Activo')->count()+
                                           $empleado_edit->tareas->where('estado','Activa')->where('componente_id','!=',null)->count()+
                                           $empleado_edit->tareas->where('estado','Activa')->where('tarea_id','!=',null)->count()}}">{{$empleado_edit->estado == 1?'Desactivar':'Activar'}}</span>
                </div>
            @endif
        </div>
    </form>
</div>
@endsection

@section('footer_card')
@endsection

@section('modales')
<!-- Modal tareas  componentes y proytectos -->
<div class="modal fade" id="modalTCP_Empleado" tabindex="-1" aria-labelledby="modalTCP_EmpleadoLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTCP_EmpleadoLabel">Unidades Asignadas al Empleado</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            @php
                $reponsabilidades_activas = $empleado_edit->proyectos->where('estado','Activo')->count()+
                                           $empleado_edit->componentes->where('estado','Activo')->count()+
                                           $empleado_edit->tareas->where('estado','Activa')->where('componente_id','!=',null)->count()+
                                           $empleado_edit->tareas->where('estado','Activa')->where('tarea_id','!=',null)->count();
            @endphp
            <input type="hidden" id="reponsabilidades_activas" value="{{$reponsabilidades_activas}}">
            <div class="row">
                <div class="col-12 col-md-8 form-group">
                    <label class="requerido" for="emp_grupo_id">Asignación Masiva Responsabilidades</label>
                    <select data_url="{{route('empleados.setCambioGeneralResponsabilidades')}}"
                            data_id ="{{$empleado_edit->id}}"
                            class="form-control form-control-sm setCambioGeneralResponsabilidades">
                        <option value="">Elija un Lider</option>
                        @foreach ($lideres as $empleado)
                        <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <hr>
            <hr>
            @if ($empleado_edit->proyectos->where('estado','Activo')->count() > 0)
                <div class="row">
                    <div class="col-12"><h6>Proyectos Asignados Líder ({{$empleado_edit->proyectos->where('estado','Activo')->count()}})</h6></div>
                    <div class="col-12 table-responsive">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ID</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">TITULO PROYECTO</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">FECHA DE CREACIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">DIAS DE GESTIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">PROGRESO</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ASIGNACIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($empleado_edit->proyectos->where('estado','Activo') as $proyecto)
                                    <tr>
                                        <td class="align-middle text-center">{{$proyecto->id}}</td>
                                        <td class="align-middle" style="white-space:nowrap;">{{$proyecto->titulo}}</td>
                                        <td class="align-middle text-center">{{$proyecto->fec_creacion}}</td>
                                        @php
                                            $date1 = new DateTime($proyecto->fec_creacion);
                                            $date2 = new DateTime(Date('Y-m-d'));
                                            $diff = date_diff($date1, $date2);
                                            $differenceFormat = '%a';
                                        @endphp
                                        <td class="align-middle text-center">{{ $diff->format($differenceFormat) }} días</td>
                                        <td class="align-middle text-end">{{$proyecto->progreso}} %</td>
                                        <td class="form-group" style="min-width: 200px;">
                                            <select data_url="{{route('empleados.setCambioLiderProyecto')}}"
                                                    data_id ="{{$proyecto->id}}"
                                                    class="form-control form-control-sm setCambioLiderProyecto">
                                                <option value="">Elija un Lider</option>
                                                @foreach ($lideres as $empleado)
                                                <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}}</option>
                                                @endforeach
                                            </select>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr>
            @endif
            @if ($empleado_edit->componentes->where('estado','Activo')->count() > 0)
                <div class="row">
                    <div class="col-12"><h6>Componentes Asignados ({{$empleado_edit->componentes->where('estado','Activo')->count()}})</h6></div>
                    <div class="col-12 table-responsive">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ID</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">TITULO COMPONENTE</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">FECHA DE CREACIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">DIAS DE GESTIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">PROGRESO</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ASIGNACIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($empleado_edit->componentes->where('estado','Activo') as $componente)
                                    <tr>
                                        <td class="align-middle text-center">{{$componente->id}}</td>
                                        <td class="align-middle" style="white-space:nowrap;">{{$componente->titulo}}</td>
                                        <td class="align-middle text-center">{{$componente->fec_creacion}}</td>
                                        @php
                                            $date1 = new DateTime($componente->fec_creacion);
                                            $date2 = new DateTime(Date('Y-m-d'));
                                            $diff = date_diff($date1, $date2);
                                            $differenceFormat = '%a';
                                        @endphp
                                        <td class="align-middle text-center">{{ $diff->format($differenceFormat) }} días</td>
                                        <td class="align-middle text-end">{{$componente->progreso}} %</td>
                                        <td class="form-group" style="min-width: 200px;">
                                            <select data_url="{{route('empleados.setCambioRespComponente')}}"
                                                    data_id ="{{$componente->id}}"
                                                    id="empleado_id" name="empleado_id" class="form-control form-control-sm setCambioRespComponente" required>
                                                <option value="">Elija un Responsable</option>
                                                @foreach ($empleados as $empleado)
                                                <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}}</option>
                                                @endforeach
                                            </select>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr>
            @endif
            @if ($empleado_edit->tareas->where('estado','Activa')->where('componente_id','!=',null)->count() > 0)
                <div class="row">
                    <div class="col-12"><h6>Tareas Asignadas ({{$empleado_edit->tareas->where('estado','Activa')->where('componente_id','!=',null)->count()}})</h6></div>
                    <div class="col-12 table-responsive">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ID</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">TITULO TAREA</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">FECHA DE CREACIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">DIAS DE GESTIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">PROGRESO</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ASIGNACIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($empleado_edit->tareas->where('estado','Activa')->where('componente_id','!=',null) as $tarea)
                                    <tr>
                                        <td class="align-middle text-center">{{$tarea->id}}</td>
                                        <td class="align-middle" style="white-space:nowrap;">{{$tarea->titulo}}</td>
                                        <td class="align-middle text-center">{{$tarea->fec_creacion}}</td>
                                        @php
                                            $date1 = new DateTime($tarea->fec_creacion);
                                            $date2 = new DateTime(Date('Y-m-d'));
                                            $diff = date_diff($date1, $date2);
                                            $differenceFormat = '%a';
                                        @endphp
                                        <td class="align-middle text-center">{{ $diff->format($differenceFormat) }} días</td>
                                        <td class="align-middle text-end">{{$tarea->progreso}} %</td>
                                        <td class="form-group" style="min-width: 200px;">
                                            <select data_url="{{route('empleados.setCambioRespTarea')}}"
                                                    data_id ="{{$tarea->id}}"
                                                    id="empleado_id" name="empleado_id" class="form-control form-control-sm setCambioRespTarea" required>
                                                <option value="">Elija un Responsable</option>
                                                @foreach ($empleados as $empleado)
                                                <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}}</option>
                                                @endforeach
                                            </select>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr>
            @endif
            @if ($empleado_edit->tareas->where('estado','Activa')->where('tarea_id','!=',null)->count() > 0)
                <div class="row">
                    <div class="col-12"><h6>Sub - Tareas Asignadas ({{$empleado_edit->tareas->where('estado','Activa')->where('tarea_id','!=',null)->count()}})</h6></div>
                    <div class="col-12 table-responsive">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ID</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">TITULO TAREA</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">FECHA DE CREACIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">DIAS DE GESTIÓN</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">PROGRESO</th>
                                    <th class="text-center" scope="col" style="white-space:nowrap;">ASIGNACIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($empleado_edit->tareas->where('estado','Activa')->where('tarea_id','!=',null) as $tarea)
                                    <tr>
                                        <td class="align-middle text-center">{{$tarea->id}}</td>
                                        <td class="align-middle" style="white-space:nowrap;">{{$tarea->titulo}}</td>
                                        <td class="align-middle text-center">{{$tarea->fec_creacion}}</td>
                                        @php
                                            $date1 = new DateTime($tarea->fec_creacion);
                                            $date2 = new DateTime(Date('Y-m-d'));
                                            $diff = date_diff($date1, $date2);
                                            $differenceFormat = '%a';
                                        @endphp
                                        <td class="align-middle text-center">{{ $diff->format($differenceFormat) }} días</td>
                                        <td class="align-middle text-end">{{$tarea->progreso}} %</td>
                                        <td class="form-group" style="min-width: 200px;">
                                            <select data_url="{{route('empleados.setCambioRespTarea')}}"
                                                    data_id ="{{$tarea->id}}"
                                                    id="empleado_id" name="empleado_id" class="form-control form-control-sm setCambioRespTarea" required>
                                                <option value="">Elija un Responsable</option>
                                                @foreach ($empleados as $empleado)
                                                <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}}</option>
                                                @endforeach
                                            </select>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr>
            @endif
          </div>
        </div>
        <div class="modal-footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="d-grid gap-2 col-12 col-md-6 mx-auto">
                        <button type="button" id="botonDesactivar" class="btn btn-warning btn-sm pl-5 pr-5" disabled
                            data_estado="{{$empleado_edit->estado}}"
                            data_id="{{$empleado_edit->id}}"
                            data_url_des ="{{route('empleados.setDeshabilitarEmpleado')}}">Desactivar</button>
                    </div>
                    <div class="d-grid gap-2 col-12 col-md-6 mx-auto mt-3 mt-md-0">
                        <button type="button" class="btn btn-secondary btn-sm pl-5 pr-5" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
@endsection

@section('scripts_pagina')
<script src="{{ asset('js/intranet/empresa/empleados/editar.js') }}"></script>
@endsection
