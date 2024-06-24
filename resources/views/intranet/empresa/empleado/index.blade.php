@extends('intranet.layout.app')

@section('css_pagina')
    <link rel="stylesheet" type="text/css" href="{{ asset('css/intranet/general/ninja/color-switcher.min.css') }}" />
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Configuración Empleados
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item active">Empleados</li>
@endsection

@section('titulo_card')
    Listado de Empleados
@endsection

@section('botones_card')
    @can('empleados.create')
        <a href="{{ route('empleados.create') }}" class="btn btn-primary btn-sm btn-sombra text-center pl-5 pr-5 float-md-end"
            style="font-size: 0.85em;">
            <i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>
            Nuevo registro
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('empleados.index')
        <div class="row">
            @if (session('rol_principal_id') == 1)
                <div class="col-12 col-md-3 form-group">
                    <label for="emp_grupo_id">Grupo Empresarial</label>
                    <select id="emp_grupo_id" class="form-control form-control-sm"
                        data_url="{{ route('empleados.getEmpresas') }}">
                        <option value="">Elija un Grupo Empresarial</option>
                        @foreach ($grupos as $grupo)
                            <option value="{{ $grupo->id }}">{{ $grupo->grupo }}</option>
                        @endforeach
                    </select>
                </div>
            @endif
            @if (session('rol_principal_id') == 1||$user->empleado->empresas_tranv->count()>1)
                @if (session('rol_principal_id') == 1)
                    <div class="col-12 col-md-3 form-group d-none" id="caja_empresas">
                        <label class="requerido" for="empresa_id" id="label_empresa_id">Empresa</label>
                        <select id="empresa_id" class="form-control form-control-sm" data_url="{{ route('empleados.getAreas') }}">
                            <option value="">Elija grupo</option>
                        </select>
                    </div>
                @else
                    <div class="col-12 col-md-3 form-group" id="caja_empresas">
                        <label class="requerido" for="empresa_id" id="label_empresa_id">Empresa</label>
                        <select id="empresa_id" class="form-control form-control-sm" data_url="{{ route('empleados.getAreas') }}">
                            <option value="">Elija empresa</option>
                            @foreach ($user->empleado->empresas_tranv as $empresa)
                                <option value="{{ $empresa->id }}">{{ $empresa->empresa }}</option>
                            @endforeach
                        </select>
                    </div>
                @endif
            @endif
            @if (session('rol_principal_id') == 1||$user->empleado->empresas_tranv->count()>1)
                <div class="col-12 col-md-3 form-group d-none" id="caja_areas">
                    <label class="requerido" for="area_id">Área</label>
                    <select id="area_id" class="form-control form-control-sm" data_url="{{ route('empleados.getCargos') }}">
                        <option value="">Elija empresa</option>
                    </select>
                </div>
            @else
                <div class="col-12 col-md-3 form-group" id="caja_areas">
                    <label class="requerido" for="area_id">Área</label>
                    <select id="area_id" class="form-control form-control-sm" data_url="{{ route('empleados.getCargos') }}">
                        <option value="">Elija cargo</option>
                        @foreach ($user->empleado->cargo->area->empresa->areas as $area)
                            <option value="{{ $area->id }}">{{ $area->area }}</option>
                        @endforeach
                    </select>
                </div>
            @endif
            <div class="col-12 col-md-3 form-group d-none" id="caja_cargos">
                <label class="requerido" for="cargo_id">Cargo</label>
                <select id="cargo_id" class="form-control form-control-sm" data_url="{{ route('empleados.getEmpleados') }}">
                    <option value="">Elija área</option>
                </select>
            </div>
        </div>
        <hr class="d-none" id="hr_datos_generales">
        <div class="row d-none" id="row_datos_generales">
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box mini_sombra">
                    <span class="info-box-icon text-bg-primary mini_sombra shadow-sm"><i class="fas fa-user-friends"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Total de Usuarios</span>
                        <span class="info-box-number" id="id_box_usu_total">10</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box mini_sombra">
                    <span class="info-box-icon text-bg-success mini_sombra shadow-sm"><i class="fas fa-user-check"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Total usuarios activos</span>
                        <span class="info-box-number"  id="id_box_usu_activos">10</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box mini_sombra">
                    <span class="info-box-icon text-bg-info mini_sombra shadow-sm"><i class="fas fa-user-tie"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Total lideres</span>
                        <span class="info-box-number"  id="id_box_usu_lideres">10</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box mini_sombra">
                    <span class="info-box-icon text-bg-danger mini_sombra shadow-sm"><i class="fas fa-user-slash"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Total usuarios inactivos</span>
                        <span class="info-box-number"  id="id_box_usu_inactivos">10</span>
                    </div>
                </div>
            </div>
        </div>
        <hr class="d-none" id="hr_tabla">
        <div class="row" id="row_tabla">
            <div class="col-12 table-responsive">
                <input type="hidden" name="titulo_tabla" id="titulo_tabla" value="Listado de Empleados">
                <input type="hidden" id="control_dataTable" value="1">
                <input type="hidden" id="empleados_edit" data_url="{{ route('empleados.edit', ['id' => 1]) }}">
                <input type="hidden" id="empleados_activar" data_url="{{ route('empleados.activar', ['id' => 1]) }}">
                <input type="hidden" id="empleados_todos" data_url="{{ route('empleados.getEmpleados') }}">
                <table class="table table-striped table-hover table-sm tabla_data_table" id="tabla_empleados">
                    <thead id="thead_empleados">
                        <tr>
                            <th class="text-center">Id</th>
                            <th class="text-center" >Empresa</th>
                            <th class="text-center" >Area</th>
                            <th class="text-center" >Cargo</th>
                            <th class="text-center" >Identificación</th>
                            <th class="text-center" >Nombres y Apellidos</th>
                            <th class="text-center" >Correo Electrónico</th>
                            <th class="text-center" >Teléfono</th>
                            <th class="text-center" >Dirección</th>
                            <th class="text-center" >Estado</th>
                            <th class="text-center" ></td>
                        </tr>
                    </thead>
                    <tbody id="tbody_empleados">

                    </tbody>
                </table>
            </div>
        </div>
    @else
    <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-6">
            <div class="alert alert-warning alert-dismissible mini_sombra">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h5><i class="icon fas fa-exclamation-triangle"></i> Sin Acceso!</h5>
                <p style="text-align: justify">Su usuario no tiene permisos de acceso para esta vista, Comuniquese con el
                    administrador del sistema.</p>
            </div>
        </div>
    </div>
    @endcan
    @can('empleados.edit')
        <input type="hidden" id="permiso_empleados_edit" value="1">
    @else
        <input type="hidden" id="permiso_empleados_edit" value="0">
    @endcan

    @can('empleados.activar')
        <input type="hidden" id="permiso_empleados_activar" value="1">
    @else
        <input type="hidden" id="permiso_empleados_activar" value="0">
    @endcan
@endsection

@section('footer_card')
@endsection

@section('modales')
@endsection

@section('scripts_pagina')
    @include('intranet.layout.script_datatable')
    <script src="{{ asset('js/intranet/empresa/empleados/index.js') }}"></script>
@endsection
