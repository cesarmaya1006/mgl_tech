@extends('intranet.layout.app')

@section('css_pagina')

@endsection

@section('titulo_pagina')
    <i class="fas fa-user-shield mr-3" aria-hidden="true"></i> Módulo de Permisos Empleados
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item active">Permisos-Empleados</li>
@endsection

@section('titulo_card')
    <i class="fas fa-user-shield mr-3" aria-hidden="true"></i> Permisos Acceso Modulos
@endsection

@section('botones_card')

@endsection

@section('cuerpo')
<div class="row">
    <div class="col-12">{{session('rol_principal')}}</div>
</div>
@can('permisoscargos.index')
    <div class="row">
        @if (session('rol_principal_id')==1 || session('transversal'))
            @if (session('rol_principal_id')==1)
                <div class="col-12 col-md-3 form-group">
                    <label for="emp_grupo_id">Grupo Empresarial</label>
                    <select id="emp_grupo_id" class="form-control form-control-sm"
                        data_url="{{ route('grupo_empresas.getEmpresas') }}">
                        <option value="">Elija un Grupo Empresarial</option>
                        @foreach ($grupos as $grupo)
                            <option value="{{ $grupo->id }}">{{ $grupo->grupo }}</option>
                        @endforeach
                    </select>
                </div>
            @endif
            <div class="col-12 col-md-3 form-group" id="caja_empresas">
                <label for="empresa_id">Empresa</label>
                <select id="empresa_id" class="form-control form-control-sm" data_url="{{ route('permisoscargos.getAreas') }}">
                    @if (session('rol_principal_id')==1)
                        <option value="">Elija grupo</option>
                    @else
                        <option value="">Elija empresa</option>
                        @foreach ($grupos as $grupo)
                            @foreach ($grupo->empresas->whereIn('id',$usuario->empleado->empresas_tranv->pluck('id')) as $empresa)
                                <option value="{{$empresa->id}}">{{$empresa->empresa}}</option>
                            @endforeach
                        @endforeach
                    @endif
                </select>
            </div>
        @endif
        <div class="col-12 col-md-3 form-group" id="caja_areas">
            <label for="area_id">Área</label>
            <select id="area_id" class="form-control form-control-sm" data_url="{{ route('permisoscargos.getCargos') }}">
                @if (session('rol_principal_id')==1 || session('transversal'))
                    <option value="">Elija Empresa</option>
                @else
                    <option value="">Elija Área</option>
                    @foreach ($grupos as $grupo)
                        @foreach ($grupo->empresas as $empresa)
                            @foreach ($empresa->areas->where('empresa_id',session('empresa_id')) as $area)
                                <option value="{{$area->id}}">{{$area->area}}</option>
                            @endforeach
                        @endforeach
                    @endforeach
                @endif
            </select>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-12 table-responsive">
            <table class="table table-striped table-hover table-bordered border-dark table-sm nowrap" style="width:100%" id="tabla_permisos_cargos">
                <thead id="thead_permisos">
                    <tr>
                        <th scope="col"><h5><strong>Permisos / Cargos</strong></h5></th>
                    </tr>
                </thead>
                <tbody id="tbody_permisos">
                </tbody>
            </table>
        </div>
    </div>
    <!-- ---------------------------------------------------------------------- -->
    <input type="hidden" id="route_permisoscargos_getCambioCargo" data_url="{{route('permisoscargos.getCambioCargo')}}">
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
<input type="hidden" id="getEmpleadosCargos" data_url="{{route('permisoscargos.getEmpleadosCargos')}}">
<input type="hidden" id="setCambiopermisoEmpleado" data_url="{{route('permisoscargos.setCambiopermisoEmpleado')}}">
<!-- Modal -->
<div class="modal fade" id="excepcionesModal" tabindex="-1" aria-labelledby="excepcionesModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="excepcionesModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body table-responsive">
                <table class="table table-striped table-hover table-bordered border-dark table-sm nowrap" style="width:100%" id="tabla_permisos_empleados">
                    <thead>
                        <tr>
                            <th scope="col">Empleado</th>
                            <th scope="col">Permiso</th>
                        </tr>
                    </thead>
                    <tbody id="tabla_permisos_empleados_tbody">
                        <tr>
                            <th scope="row"></th>
                            <td>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
<script src="{{asset('js/intranet/configuracion/permiso_empleados/index.js')}}"></script>
@endsection
