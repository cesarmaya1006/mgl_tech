@extends('intranet.layout.app')

@section('css_pagina')
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap5.min.css" />
@endsection

@section('titulo_pagina')
    <i class="fas fa-user-tie mr-3" aria-hidden="true"></i> Configuración Cargos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item active">Cargos</li>
@endsection

@section('titulo_card')
    @if (session('rol_principal_id')== 1)
        Listado de Cargos por Empresas
    @else
        Listado de Cargos
    @endif
@endsection

@section('botones_card')
    @can('cargos.create')
        <a href="{{ route('cargos.create') }}" class="btn btn-info btn-sm btn-sombra text-center pl-5 pr-5 float-md-end">
            <i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>
            Nuevo registro
        </a>
    @endcan
@endsection

@section('cuerpo')
@can('cargos.index')
    <div class="row">
        @if (session('rol_principal_id')== 1)
            <div class="col-12 col-md-3 form-group">
                <label for="emp_grupo_id">Grupo Empresarial</label>
                <select id="emp_grupo_id" class="form-control form-control-sm" data_url="{{ route('grupo_empresas.getEmpresas') }}">
                    <option value="">Elija un Grupo Empresarial</option>
                    @foreach ($grupos as $grupo)
                        <option value="{{ $grupo->id }}">
                            {{ $grupo->grupo }}
                        </option>
                    @endforeach
                </select>
            </div>
        @endif
        <div class="col-12 col-md-3 form-group" id="caja_empresas">
            <label for="empresa_id">Empresa</label>
            <select id="empresa_id" class="form-control form-control-sm" data_url="{{ route('cargos.getAreas') }}">
                <option value="">{{session('rol_principal_id')== 1?'Elija un Grupo Empresarial':'Elija empresa'}}</option>
                @if (isset($grupo))
                    @foreach ($grupo->empresas as $empresa)
                        <option value="{{ $empresa->id }}">{{ $empresa->empresa }}</option>
                    @endforeach
                @endif
            </select>
        </div>
        <div class="col-12 col-md-3 form-group" id="caja_empresas">
            <label for="area_id">Área</label>
            <select id="area_id" class="form-control form-control-sm" data_url="{{ route('cargos.getCargos') }}">
                <option value="">Elija una empresa</option>
            </select>
        </div>
    </div>
    <hr>
    <div class="row d-flex justify-content-md-center">
        <input type="hidden" name="titulo_tabla" id="titulo_tabla" value="Listado de Cargos">
        <input type="hidden" id="control_dataTable" value="1">
        <input type="hidden" id="cargos_edit" data_url="{{ route('cargos.edit', ['id' => 1]) }}">
        <input type="hidden" id="cargos_destroy" data_url="{{ route('cargos.destroy', ['id' => 1]) }}">
        <input type="hidden" id="cargos_todos" data_url="{{ route('cargos.getCargosTodos') }}">
        @csrf @method('delete')
        <div class="col-12 col-md-8 table-responsive">
            <table class="table display table-striped table-hover table-sm tabla-borrando tabla_data_table" id="tablaCargos">
                <thead>
                    <tr>
                        <th class="text-center">Id</th>
                        <th class="text-center">Area</th>
                        <th class="text-center">Cargo</th>
                        <td></td>
                    </tr>
                </thead>
                <tbody id="tbody_cargos">

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
    @can('cargos.edit')
    <input type="hidden" id="permiso_cargos_edit" value="1">
    @else
    <input type="hidden" id="permiso_cargos_edit" value="0">
    @endcan

    @can('cargos.destroy')
    <input type="hidden" id="permiso_cargos_destroy" value="1">
    @else
    <input type="hidden" id="permiso_cargos_destroy" value="0">
    @endcan
@endsection

@section('footer_card')
@endsection

@section('modales')
    <!-- Modales  -->

    <!-- Fin Modales  -->
@endsection

@section('scripts_pagina')
    <script src="{{ asset('js/intranet/configuracion/cargos/index.js') }}"></script>
    @include('intranet.layout.script_datatable')
    <script>
        function asignarDataTable() {
            $("#tablaCargos").DataTable({
                lengthMenu: [10, 15, 25, 50, 75, 100],
                pageLength: 15,
                dom: "lBfrtip",
                buttons: [
                    "excel",
                    {
                        extend: "pdfHtml5",
                        orientation: "landscape",
                        pageSize: "Legal",
                        title: $("#titulo_tabla").val(),
                    },
                ],
                language: {
                    sProcessing: "Procesando...",
                    sLengthMenu: "Mostrar _MENU_ resultados",
                    sZeroRecords: "No se encontraron resultados",
                    sEmptyTable: "Ningún dato disponible en esta tabla",
                    sInfo: "Mostrando resultados _START_-_END_ de  _TOTAL_",
                    sInfoEmpty: "Mostrando resultados del 0 al 0 de un total de 0 registros",
                    sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                    sSearch: "Buscar:",
                    sLoadingRecords: "Cargando...",
                    oPaginate: {
                        sFirst: "Primero",
                        sLast: "Último",
                        sNext: "Siguiente",
                        sPrevious: "Anterior",
                    },
                },
            });
        }
        function llenarTablaCargos(cargos){
            $("#tablaCargos").dataTable().fnDestroy();
            respuesta_tabla_html = '';

            var cargos_edit_ini = $('#cargos_edit').attr("data_url");
            cargos_edit_ini = cargos_edit_ini.substring(0, cargos_edit_ini.length - 1);
            const cargos_edit_fin = cargos_edit_ini;

            var cargos_destroy_ini = $('#cargos_destroy').attr("data_url");
            cargos_destroy_ini = cargos_destroy_ini.substring(0,cargos_destroy_ini.length - 1);
            const cargos_destroy_fin = cargos_destroy_ini;

            const permiso_cargos_edit = $('#permiso_cargos_edit').val();
            const permiso_cargos_destroy = $('#permiso_cargos_destroy').val();
            //================================================================================
            $.each(cargos, function(index, cargo) {
                respuesta_tabla_html += '<tr>';
                respuesta_tabla_html += '<td class="text-center">' + cargo .id + '</td>';
                respuesta_tabla_html += '<td class="text-center">' + cargo.area.area + '</td>';
                respuesta_tabla_html += '<td class="text-center">' + cargo.cargo + '</td>';
                respuesta_tabla_html +='<td class="d-flex justify-content-evenly align-cargos-center">';
                if (permiso_cargos_edit==1) {
                    respuesta_tabla_html += '<a href="' + cargos_edit_fin + cargo.id + '" class="btn-accion-tabla tooltipsC"';
                    respuesta_tabla_html += 'title="Editar este registro">';
                    respuesta_tabla_html += '<i class="fas fa-pen-square"></i>';
                    respuesta_tabla_html += '</a>';
                }
                if (permiso_cargos_destroy == 1) {
                    respuesta_tabla_html += '<form action="' + cargos_destroy_fin + cargo.id + '" class="d-inline form-eliminar" method="POST">';
                    respuesta_tabla_html += '<input type="hidden" name="_token" value="{{ csrf_token() }}" autocomplete="off">';
                    respuesta_tabla_html += '<input type="hidden" name="_method" value="delete">';
                    respuesta_tabla_html += '<button type="submit" class="btn-accion-tabla eliminar tooltipsC" title="Eliminar este registro">';
                    respuesta_tabla_html += '<i class="fa fa-fw fa-trash text-danger"></i>';
                    respuesta_tabla_html += '</button>';
                    respuesta_tabla_html += '</form>';
                }
                if (permiso_cargos_edit==0 && permiso_cargos_destroy == 0) {
                    respuesta_tabla_html += '<span class="text-danger">---</span>';
                }
                respuesta_tabla_html += '</td>';
                respuesta_tabla_html += '</tr>';
            });
            //================================================================================
            $("#tbody_cargos").html(respuesta_tabla_html);
            asignarDataTable();
        }
        function llenarTablaCargos_emp(cargos){
            respuesta_tabla_html = '';

            var cargos_edit_ini = $('#cargos_edit').attr("data_url");
            cargos_edit_ini = cargos_edit_ini.substring(0, cargos_edit_ini.length - 1);
            const cargos_edit_fin = cargos_edit_ini;

            var cargos_destroy_ini = $('#cargos_destroy').attr("data_url");
            cargos_destroy_ini = cargos_destroy_ini.substring(0,cargos_destroy_ini.length - 1);
            const cargos_destroy_fin = cargos_destroy_ini;

            const permiso_cargos_edit = $('#permiso_cargos_edit').val();
            const permiso_cargos_destroy = $('#permiso_cargos_destroy').val();
            //================================================================================
            $.each(cargos, function(index, cargo) {
                respuesta_tabla_html += '<tr>';
                respuesta_tabla_html += '<td class="text-center">' + cargo .id + '</td>';
                respuesta_tabla_html += '<td class="text-center">' + cargo.area.area + '</td>';
                respuesta_tabla_html += '<td class="text-center">' + cargo.cargo + '</td>';
                respuesta_tabla_html +='<td class="d-flex justify-content-evenly align-cargos-center">';
                if (permiso_cargos_edit==1) {
                    respuesta_tabla_html += '<a href="' + cargos_edit_fin + cargo.id + '" class="btn-accion-tabla tooltipsC"';
                    respuesta_tabla_html += 'title="Editar este registro">';
                    respuesta_tabla_html += '<i class="fas fa-pen-square"></i>';
                    respuesta_tabla_html += '</a>';
                }
                if (permiso_cargos_destroy == 1) {
                    respuesta_tabla_html += '<form action="' + cargos_destroy_fin + cargo.id + '" class="d-inline form-eliminar" method="POST">';
                    respuesta_tabla_html += '<input type="hidden" name="_token" value="{{ csrf_token() }}" autocomplete="off">';
                    respuesta_tabla_html += '<input type="hidden" name="_method" value="delete">';
                    respuesta_tabla_html += '<button type="submit" class="btn-accion-tabla eliminar tooltipsC" title="Eliminar este registro">';
                    respuesta_tabla_html += '<i class="fa fa-fw fa-trash text-danger"></i>';
                    respuesta_tabla_html += '</button>';
                    respuesta_tabla_html += '</form>';
                }
                if (permiso_cargos_edit==0 && permiso_cargos_destroy == 0) {
                    respuesta_tabla_html += '<span class="text-danger">---</span>';
                }
                respuesta_tabla_html += '</td>';
                respuesta_tabla_html += '</tr>';
            });
            //================================================================================
            return respuesta_tabla_html;
        }

    </script>
@endsection
