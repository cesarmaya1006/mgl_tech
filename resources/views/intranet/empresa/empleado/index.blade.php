@extends('intranet.layout.app')

@section('css_pagina')
    <link rel="stylesheet" type="text/css" href="{{asset('css/intranet/general/ninja/color-switcher.min.css')}}" />
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
        <a href="{{ route('empleados.create') }}" class="btn btn-primary btn-sm btn-sombra text-center pl-5 pr-5 float-md-end" style="font-size: 0.85em;">
            <i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>
            Nuevo registro
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('empleados.index')
        @if (session('rol_principal_id') == 1)
            <div class="row">
                <div class="col-12">
                    <div class="form-check form-check-inline radio info">
                        <input class="form-check-input" type="radio" name="tipo_vista" id="vista1" value="general" checked>
                        <label class="form-check-label" for="vista1">Vista general</label>
                    </div>
                    <div class="form-check form-check-inline radio info">
                        <input class="form-check-input" type="radio" name="tipo_vista" id="vista2" value="filtrado">
                        <label class="form-check-label" for="vista2">Filtrar</label>
                    </div>
                </div>
            </div>
            <div class="row">
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
            </div>
            <div class="row">

            </div>
        @endif
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
        <input type="hidden" id="permiso_cargos_edit" value="1">
    @else
        <input type="hidden" id="permiso_cargos_edit" value="0">
    @endcan

    @can('empleados.destroy')
        <input type="hidden" id="permiso_cargos_destroy" value="1">
    @else
        <input type="hidden" id="permiso_cargos_destroy" value="0">
    @endcan
@endsection

@section('footer_card')
@endsection

@section('modales')

@endsection

@section('scripts_pagina')
    <script src="{{ asset('js/intranet/empresa/empleados/index.js') }}"></script>
    @include('intranet.layout.script_datatable')
@endsection
