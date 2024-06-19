@extends('intranet.layout.app')

@section('css_pagina')
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap5.min.css" />
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Configuración Áreas
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item active">Áreas</li>
@endsection

@section('titulo_card')
    Listado de Areas
@endsection

@section('botones_card')
    @can('areas.create')
        <a href="{{ route('areas.create') }}" class="btn btn-primary btn-sm btn-mini_sombra text-center pl-5 pr-5 float-md-end">
            <i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>
            Nuevo registro
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('areas.index')
        <div class="row">
            <div class="col-12 col-md-3 form-group">
                <label for="emp_grupo_id">Grupo Empresarial</label>
                <select id="emp_grupo_id" class="form-control form-control-sm"
                    data_url="{{ route('grupo_empresas.getEmpresas') }}">
                    <option value="">Elija un Grupo Empresarial</option>
                    @foreach ($grupos as $grupo)
                        <option value="{{ $grupo->id }}">
                            {{ $grupo->grupo }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-12 col-md-3 form-group d-none" id="caja_empresas">
                <label for="empresa_id">Empresa</label>
                <select id="empresa_id" class="form-control form-control-sm" data_url="{{ route('areas.getAreas') }}">
                    <option value="">Elija grupo</option>
                </select>
            </div>
        </div>
        <hr>
        <div class="row" id="caja_tabla_areas">
            <input type="hidden" name="titulo_tabla" id="titulo_tabla" value="Listado de Áreas">
            <input type="hidden" id="control_dataTable" value="1">
            <input type="hidden" id="areas_edit" data_url="{{ route('areas.edit', ['id' => 1]) }}">
            <input type="hidden" id="areas_destroy" data_url="{{ route('areas.destroy', ['id' => 1]) }}">
            <input type="hidden" id="id_areas_getDependencias" data_url = "{{ route('areas.getDependencias', ['id' => 1]) }}">
            @csrf @method('delete')
            <div class="col-12 table-responsive">
                <table class="table display table-striped table-hover table-sm  tabla-borrando tabla_data_table"
                    id="tablaAreas">
                    <thead>
                        <tr>
                            <th class="text-center">Id</th>
                            <th class="text-center">Area</th>
                            <th class="text-center">Area Superior</th>
                            <th class="text-center">Dependencias</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody id="tbody_areas">

                    </tbody>
                </table>
            </div>
        </div>
    @else
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-6">
                <div class="alert alert-warning alert-dismissible">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h5><i class="icon fas fa-exclamation-triangle"></i> Sin Acceso!</h5>
                    <p style="text-align: justify">Su usuario no tiene permisos de acceso para esta vista, Comuniquese con el
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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Listado de dependencias</h5>
                </div>
                <div class="modal-body">
                </div>
            </div>
        </div>
    </div>
    <!-- Fin Modales  -->
@endsection

@section('scripts_pagina')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.2/moment.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.8/js/dataTables.js"></script>
    <script src="{{ asset('js/intranet/configuracion/areas/index_admin.js') }}"></script>
    @include('intranet.layout.script_datatable')
    <script>
        $(document).ready(function() {
            // - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * -
            $("#empresa_id").on("change", function() {
                console.log($(this).val());
                $("#tablaAreas").dataTable().fnDestroy();
                respuesta_html = '';
                $("#tbody_areas").html(respuesta_html);
                asignarDataTable();


                const data_url = $(this).attr("data_url");
                const id = $(this).val();
                var data = {
                    id: id,
                };
                const data_url_data = data_url + '?id=' + id;

                if ($(this).val() != '') {

                    var grupo_empresas_edit_ini = $('#areas_edit').attr("data_url");
                    grupo_empresas_edit_ini = grupo_empresas_edit_ini.substring(0, grupo_empresas_edit_ini
                        .length - 1);
                    const areas_edit_fin = grupo_empresas_edit_ini;

                    var grupo_empresas_destroy_ini = $('#areas_destroy').attr("data_url");
                    grupo_empresas_destroy_ini = grupo_empresas_destroy_ini.substring(0,
                        grupo_empresas_destroy_ini.length - 1);
                    const areas_destroy_fin = grupo_empresas_destroy_ini;

                    var id_areas_getDependencias_ini = $('#id_areas_getDependencias').attr("data_url");
                    id_areas_getDependencias_ini = id_areas_getDependencias_ini.substring(0,
                        id_areas_getDependencias_ini.length - 1);
                    const id_areas_getDependencias_fin = id_areas_getDependencias_ini;

                    $.ajax({
                        url: data_url,
                        type: "GET",
                        data: data,
                        success: function(respuesta) {
                            console.log(respuesta);
                            respuesta_html = '';
                            if (respuesta.areasPadre.length > 0) {
                                $("#tablaAreas").dataTable().fnDestroy();
                                respuesta_html = '';
                                $.each(respuesta.areasPadre, function(index, item) {

                                    respuesta_html += '<tr>';
                                    respuesta_html += '<td class="text-center">' + item
                                        .id + '</td>';
                                    respuesta_html += '<td class="text-center">' + item
                                        .area + '</td>';
                                    respuesta_html += '<td class="text-center">';
                                    if (item.area_id) {
                                        respuesta_html += item.area_sup.area;
                                    } else {
                                        respuesta_html += '---';
                                    }

                                    respuesta_html += '</td>';
                                    respuesta_html += '<td class="text-center">';


                                    if (item.areas.length > 0) {
                                        respuesta_html +=
                                            '<button type="submit" class="btn-accion-tabla tooltipsC mostrar_dependencias text-info"';
                                        respuesta_html += 'onClick="mostrarModal(\'' +
                                            id_areas_getDependencias_fin + item.id +
                                            '\')"';
                                        respuesta_html +=
                                            'title="Mostrar Dependencias" data_id ="' +
                                            item.id + '"';
                                        respuesta_html += 'data_url = "' +
                                            id_areas_getDependencias_fin + item.id +
                                            '">';
                                        respuesta_html += item.areas.length;
                                        respuesta_html += '</button>';
                                    } else {
                                        respuesta_html +=
                                            '<h6 class="text-danger">---</h6>';
                                    }

                                    respuesta_html += '</td>';
                                    respuesta_html +=
                                        '<td class="d-flex justify-content-evenly align-items-center">';
                                    respuesta_html += '<a href="' + areas_edit_fin +
                                        item.id +
                                        '" class="btn-accion-tabla tooltipsC"';
                                    respuesta_html += 'title="Editar este registro">';
                                    respuesta_html +=
                                        '<i class="fas fa-pen-square"></i>';
                                    respuesta_html += '</a>';

                                    respuesta_html += '<form action="' +
                                        areas_destroy_fin + item.id +
                                        '" class="d-inline form-eliminar" method="POST">';
                                    respuesta_html +=
                                        '<input type="hidden" name="_token" value="{{ csrf_token() }}" autocomplete="off">';
                                    respuesta_html +=
                                        '<input type="hidden" name="_method" value="delete">';
                                    respuesta_html +=
                                        '<button type="submit" class="btn-accion-tabla eliminar tooltipsC" title="Eliminar este registro">';
                                    respuesta_html +=
                                        '<i class="fa fa-fw fa-trash text-danger"></i>';
                                    respuesta_html += '</button>';
                                    respuesta_html += '</form>';
                                    respuesta_html += '</td>';
                                    respuesta_html += '</tr>';
                                });

                                $("#tbody_areas").html(respuesta_html);
                                asignarDataTable();

                            }
                        },
                        error: function() {},
                    });

                }

            });
            // - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * -
        });

        function asignarDataTable() {
            $("#tablaAreas").DataTable({
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
    </script>
@endsection
