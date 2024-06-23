@extends('intranet.layout.app')

@section('css_pagina')

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
        <a href="{{ route('empleados.create') }}" class="btn btn-info btn-sm btn-sombra text-center pl-5 pr-5 float-md-end">
            <i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>
            Nuevo registro
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('empleados.index')
        <div class="row">
            <div class="col-12 col-md-3 form-group" id="caja_empresas">
                <label for="empresa_id">Empresa</label>
                <select id="empresa_id" class="form-control form-control-sm" data_url="{{ route('areas.getAreas') }}">
                    <option value="">Elija empresa</option>
                    @foreach ($grupo->empresas as $empresa)
                        <option value="{{ $empresa->id }}">
                            {{ $empresa->empresa }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
        <hr>
        <div class="row d-flex justify-content-md-center">
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
        @can('areas.edit')
        <input type="hidden" id="permiso_areas_edit" value="1">
        @else
        <input type="hidden" id="permiso_areas_edit" value="0">
        @endcan

        @can('areas.destroy')
        <input type="hidden" id="permiso_areas_destroy" value="1">
        @else
        <input type="hidden" id="permiso_areas_destroy" value="0">
        @endcan
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-info boton_cerrar_modal">Cerrar Lista</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Fin Modales  -->
@endsection

@section('scripts_pagina')
    <script src="{{ asset('js/intranet/configuracion/areas/index.js') }}"></script>
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

                    const permiso_areas_edit = $('#permiso_areas_edit').val();
                    const permiso_areas_destroy = $('#permiso_areas_destroy').val();

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
                                    respuesta_html += '<td class="text-center">' + item .id + '</td>';
                                    respuesta_html += '<td class="text-center">' + item.area + '</td>';
                                    respuesta_html += '<td class="text-center">';
                                    if (item.area_id) {
                                        respuesta_html += item.area_sup.area;
                                    } else {
                                        respuesta_html += '---';
                                    }

                                    respuesta_html += '</td>';
                                    respuesta_html += '<td class="text-center">';

                                    if (item.areas.length > 0) {
                                        respuesta_html +='<button type="submit" class="btn-accion-tabla tooltipsC mostrar_dependencias text-info"';
                                        respuesta_html += 'onClick="mostrarModal(\'' +id_areas_getDependencias_fin + item.id +'\')"';
                                        respuesta_html +='title="Mostrar Dependencias" data_id ="' +item.id + '"';
                                        respuesta_html += 'data_url = "' + id_areas_getDependencias_fin + item.id + '">';
                                        respuesta_html += item.areas.length;
                                        respuesta_html += '</button>';
                                    } else {
                                        respuesta_html += '<h6 class="text-danger">---</h6>';
                                    }

                                    respuesta_html += '</td>';
                                    respuesta_html +='<td class="d-flex justify-content-evenly align-items-center">';

                                    if (permiso_areas_edit==1) {
                                        respuesta_html += '<a href="' + areas_edit_fin + item.id + '" class="btn-accion-tabla tooltipsC"';
                                        respuesta_html += 'title="Editar este registro">';
                                        respuesta_html += '<i class="fas fa-pen-square"></i>';
                                        respuesta_html += '</a>';
                                    }

                                    if (permiso_areas_destroy == 1) {
                                        respuesta_html += '<form action="' + areas_destroy_fin + item.id + '" class="d-inline form-eliminar" method="POST">';
                                        respuesta_html += '<input type="hidden" name="_token" value="{{ csrf_token() }}" autocomplete="off">';
                                        respuesta_html += '<input type="hidden" name="_method" value="delete">';
                                        respuesta_html += '<button type="submit" class="btn-accion-tabla eliminar tooltipsC" title="Eliminar este registro">';
                                        respuesta_html += '<i class="fa fa-fw fa-trash text-danger"></i>';
                                        respuesta_html += '</button>';
                                        respuesta_html += '</form>';
                                    }

                                    if (permiso_areas_edit==0 && permiso_areas_destroy == 0) {
                                        respuesta_html += '<span class="text-danger">---</span>';
                                    }
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
