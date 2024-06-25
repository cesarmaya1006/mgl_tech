$(document).ready(function () {
    $("#emp_grupo_id").on("change", function () {
        cargar_id_grupo();
    });
    //--------------------------------------------------------------------------
    $("#empresa_id").on("change", function () {
        cargar_id_empresa();

    });
    //--------------------------------------------------------------------------
    $("#area_id").on("change", function () {
        cargar_id_area();

    });
    //--------------------------------------------------------------------------
    $("#cargo_id").on("change", function () {
        cargar_id_cargo();

    });
    //--------------------------------------------------------------------------
});
function llenar_tabla_empleados(data,filtro) {
    var respuesta_thead_html = "";
    var respuesta_tabla_html = "";
   // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    const permiso_empleados_edit = $("#permiso_empleados_edit").val();
    const permiso_empleados_activar = $("#permiso_empleados_activar").val();
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    var empleados_edit_ini = $("#empleados_edit").attr("data_url");
    empleados_edit_ini = empleados_edit_ini.substring(
        0,
        empleados_edit_ini.length - 1
    );
    const empleados_edit_fin = empleados_edit_ini;
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    respuesta_thead_html += "<tr>";
    respuesta_thead_html += '<th class="text-center">Id</th>';
    if (filtro =='grupo') {
        respuesta_thead_html += '<th class="text-center" >Empresa</th>';
        respuesta_thead_html += '<th class="text-center" >Area</th>';
        respuesta_thead_html += '<th class="text-center" >Cargo</th>';

    }else if(filtro =='empresa'){
        respuesta_thead_html += '<th class="text-center" >Area</th>';
        respuesta_thead_html += '<th class="text-center" >Cargo</th>';
    }else if(filtro =='area'){
        respuesta_thead_html += '<th class="text-center" >Cargo</th>';
    }
    respuesta_thead_html += '<th class="text-center" >Identificación</th>';
    respuesta_thead_html += '<th class="text-center" >Nombres y Apellidos</th>';
    respuesta_thead_html += '<th class="text-center" >Correo Electrónico</th>';
    respuesta_thead_html += '<th class="text-center" >Teléfono</th>';
    respuesta_thead_html += '<th class="text-center" >Dirección</th>';
    respuesta_thead_html += '<th class="text-center" >Estado</th>';
    respuesta_thead_html += '<th class="text-center" >Lider</th>';
    respuesta_thead_html += '<th class="text-center" ></td>';
    respuesta_thead_html += "</tr>";
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    $('#tabla_empleados').dataTable().fnDestroy();
    $('#thead_empleados').html(respuesta_thead_html);
    respuesta_tabla_html = "";
    $('#tbody_empleados').html(respuesta_tabla_html);
    asignarDataTableEmpl();
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    if (filtro =='grupo') {
        $.each(data, function (index, empresa) {
            $.each(empresa.areas, function (index, area) {
                $.each(area.cargos, function (index, cargo) {
                    $.each(cargo.empleados, function (index, empleado) {
                        respuesta_tabla_html += "<tr>";
                        respuesta_tabla_html += '<td class="text-center">' + empleado.id + "</td>";
                        respuesta_tabla_html += '<td>' + empresa.empresa + "</td>";
                        respuesta_tabla_html += '<td>' + area.area + "</td>";
                        respuesta_tabla_html += '<td>' + cargo.cargo + "</td>";
                        respuesta_tabla_html += '<td >' + empleado.tipo_docu.abreb_id + " " + empleado.identificacion + "</td>";
                        respuesta_tabla_html += '<td >' + empleado.nombres + " " + empleado.apellidos + "</td>";
                        respuesta_tabla_html += '<td >' + empleado.usuario.email + "</td>";
                        respuesta_tabla_html += '<td >' + empleado.telefono + "</td>";
                        respuesta_tabla_html += '<td >' + empleado.direccion + "</td>";
                        if (empleado.estado == 1) {
                            estado_bg = "success";
                            estado = "Activo";
                        } else {
                            estado_bg = "gray";
                            estado = "Inactivo";
                        }
                        respuesta_tabla_html += '<td class="text-center"><span class="btn-xs pl-3 pr-3 text-center bg-' + estado_bg + ' rounded">' + estado + "</span></td>";
                        if (empleado.lider == 1) {
                            lider = "Si";
                            lider_bg = "success";
                        } else {
                            lider = "No";
                            lider_bg = "danger";
                        }
                        respuesta_tabla_html += '<td class="text-center text-'+lider_bg+'">' + lider + "</td>";
                        respuesta_tabla_html += '<td class="d-flex justify-content-evenly align-cargos-center">';
                        if (permiso_empleados_edit == 1) {
                            respuesta_tabla_html += '<a href="' + empleados_edit_fin + empleado.id + '" class="btn-accion-tabla tooltipsC"';
                            respuesta_tabla_html += 'title="Editar este registro">';
                            respuesta_tabla_html += '<i class="fas fa-pen-square"></i>';
                            respuesta_tabla_html += "</a>";
                        } else {
                            respuesta_tabla_html += '<span class="text-danger">---</span>';
                        }
                        respuesta_tabla_html += "</td>";
                        respuesta_tabla_html += "</tr>";
                    });
                });
            });
        });
    }else if(filtro =='empresa'){
        $.each(data, function (index, area) {
            $.each(area.cargos, function (index, cargo) {
                $.each(cargo.empleados, function (index, empleado) {
                    respuesta_tabla_html += "<tr>";
                    respuesta_tabla_html += '<td class="text-center">' + empleado.id + "</td>";
                    respuesta_tabla_html += '<td>' + area.area + "</td>";
                    respuesta_tabla_html += '<td>' + cargo.cargo + "</td>";
                    respuesta_tabla_html += '<td >' + empleado.tipo_docu.abreb_id + " " + empleado.identificacion + "</td>";
                    respuesta_tabla_html += '<td >' + empleado.nombres + " " + empleado.apellidos + "</td>";
                    respuesta_tabla_html += '<td >' + empleado.usuario.email + "</td>";
                    respuesta_tabla_html += '<td >' + empleado.telefono + "</td>";
                    respuesta_tabla_html += '<td >' + empleado.direccion + "</td>";
                    if (empleado.estado == 1) {
                        estado_bg = "success";
                        estado = "Activo";
                    } else {
                        estado_bg = "gray";
                        estado = "Inactivo";
                    }
                    respuesta_tabla_html += '<td class="text-center"><span class="btn-xs pl-3 pr-3 text-center bg-' + estado_bg + ' rounded">' + estado + "</span></td>";
                    if (empleado.lider == 1) {
                        lider = "Si";
                        lider_bg = "success";
                    } else {
                        lider = "No";
                        lider_bg = "danger";
                    }
                    respuesta_tabla_html += '<td class="text-center text-'+lider_bg+'">' + lider + "</td>";
                    respuesta_tabla_html += '<td class="d-flex justify-content-evenly align-cargos-center">';
                    if (permiso_empleados_edit == 1) {
                        respuesta_tabla_html += '<a href="' + empleados_edit_fin + empleado.id + '" class="btn-accion-tabla tooltipsC"';
                        respuesta_tabla_html += 'title="Editar este registro">';
                        respuesta_tabla_html += '<i class="fas fa-pen-square"></i>';
                        respuesta_tabla_html += "</a>";
                    } else {
                        respuesta_tabla_html += '<span class="text-danger">---</span>';
                    }
                    respuesta_tabla_html += "</td>";
                    respuesta_tabla_html += "</tr>";
                });
            });
        });
    } else if(filtro =='area'){
        $.each(data, function (index, cargo) {
            console.log('area');
            $.each(cargo.empleados, function (index, empleado) {
                respuesta_tabla_html += "<tr>";
                respuesta_tabla_html += '<td class="text-center">' + empleado.id + "</td>";
                respuesta_tabla_html += '<td>' + cargo.cargo + "</td>";
                respuesta_tabla_html += '<td >' + empleado.tipo_docu.abreb_id + " " + empleado.identificacion + "</td>";
                respuesta_tabla_html += '<td >' + empleado.nombres + " " + empleado.apellidos + "</td>";
                respuesta_tabla_html += '<td >' + empleado.usuario.email + "</td>";
                respuesta_tabla_html += '<td >' + empleado.telefono + "</td>";
                respuesta_tabla_html += '<td >' + empleado.direccion + "</td>";
                if (empleado.estado == 1) {
                    estado_bg = "success";
                    estado = "Activo";
                } else {
                    estado_bg = "gray";
                    estado = "Inactivo";
                }
                respuesta_tabla_html += '<td class="text-center"><span class="btn-xs pl-3 pr-3 text-center bg-' + estado_bg + ' rounded">' + estado + "</span></td>";
                if (empleado.lider == 1) {
                    lider = "Si";
                    lider_bg = "success";
                } else {
                    lider = "No";
                    lider_bg = "danger";
                }
                respuesta_tabla_html += '<td class="text-center text-'+lider_bg+'">' + lider + "</td>";
                respuesta_tabla_html += '<td class="d-flex justify-content-evenly align-cargos-center">';
                if (permiso_empleados_edit == 1) {
                    respuesta_tabla_html += '<a href="' + empleados_edit_fin + empleado.id + '" class="btn-accion-tabla tooltipsC"';
                    respuesta_tabla_html += 'title="Editar este registro">';
                    respuesta_tabla_html += '<i class="fas fa-pen-square"></i>';
                    respuesta_tabla_html += "</a>";
                } else {
                    respuesta_tabla_html += '<span class="text-danger">---</span>';
                }
                respuesta_tabla_html += "</td>";
                respuesta_tabla_html += "</tr>";
            });
        });
    } else {
        $.each(data, function (index, empleado) {
            respuesta_tabla_html += "<tr>";
            respuesta_tabla_html += '<td class="text-center">' + empleado.id + "</td>";
            respuesta_tabla_html += '<td >' + empleado.tipo_docu.abreb_id + " " + empleado.identificacion + "</td>";
            respuesta_tabla_html += '<td >' + empleado.nombres + " " + empleado.apellidos + "</td>";
            respuesta_tabla_html += '<td >' + empleado.usuario.email + "</td>";
            respuesta_tabla_html += '<td >' + empleado.telefono + "</td>";
            respuesta_tabla_html += '<td >' + empleado.direccion + "</td>";
            if (empleado.estado == 1) {
                estado_bg = "success";
                estado = "Activo";
            } else {
                estado_bg = "gray";
                estado = "Inactivo";
            }
            respuesta_tabla_html += '<td class="text-center"><span class="btn-xs pl-3 pr-3 text-center bg-' + estado_bg + ' rounded">' + estado + "</span></td>";
            if (empleado.lider == 1) {
                lider = "Si";
                lider_bg = "success";
            } else {
                lider = "No";
                lider_bg = "danger";
            }
            respuesta_tabla_html += '<td class="text-center text-'+lider_bg+'">' + lider + "</td>";
            respuesta_tabla_html += '<td class="d-flex justify-content-evenly align-cargos-center">';
            if (permiso_empleados_edit == 1) {
                respuesta_tabla_html += '<a href="' + empleados_edit_fin + empleado.id + '" class="btn-accion-tabla tooltipsC"';
                respuesta_tabla_html += 'title="Editar este registro">';
                respuesta_tabla_html += '<i class="fas fa-pen-square"></i>';
                respuesta_tabla_html += "</a>";
            } else {
                respuesta_tabla_html += '<span class="text-danger">---</span>';
            }
            respuesta_tabla_html += "</td>";
            respuesta_tabla_html += "</tr>";
        });
    }
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    $('#tabla_empleados').dataTable().fnDestroy();
    $('#thead_empleados').html(respuesta_thead_html);
    $('#tbody_empleados').html(respuesta_tabla_html);
    asignarDataTableEmpl();
}

function asignarDataTableEmpl() {
    $('#tabla_empleados').DataTable({
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
            sInfoEmpty:
                "Mostrando resultados del 0 al 0 de un total de 0 registros",
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

function cargar_id_grupo(){
    const data_url = $('#emp_grupo_id').attr("data_url");
        const id = $('#emp_grupo_id').val();
        var data = {
            id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                //==============================================================
                var respuesta_html = "";
                if (respuesta.empresas.length > 0) {
                    $("#hr_datos_generales").removeClass("d-none");
                    $("#row_datos_generales").removeClass("d-none");

                    respuesta_html += '<option value="">Elija empresa</option>';
                    $.each(respuesta.empresas, function (index, item) {
                        respuesta_html +=
                            '<option value="' +
                            item.id +
                            '">' +
                            item.empresa +
                            "</option>";
                    });
                    $("#empresa_id").html(respuesta_html);
                    $("#caja_empresas").removeClass("d-none");
                } else {
                    $("#hr_datos_generales").addClass("d-none");
                    $("#row_datos_generales").addClass("d-none");
                    $("#empresa_id").html(respuesta_html);
                    $("#caja_empresas").addClass("d-none");
                }
                //==============================================================
                var empleadosTotal = 0;
                var empleadosActivos = 0;
                var empleadosLideres = 0;
                var empleadosIncativos = 0;
                if (respuesta.empresas.length > 0) {
                    $.each(respuesta.empresas, function (index, empresa) {
                        $.each(empresa.areas, function (index, area) {
                            $.each(area.cargos, function (index, cargo) {
                                $.each(
                                    cargo.empleados,
                                    function (index, empleado) {
                                        empleadosTotal++;
                                        if (empleado.estado == 1) {
                                            empleadosActivos++;
                                        } else {
                                            empleadosIncativos++;
                                        }
                                        if (empleado.lider == 1) {
                                            empleadosLideres++;
                                        }
                                    }
                                );
                            });
                        });
                    });
                    llenar_tabla_empleados(respuesta.empresas,'grupo');
                    $("#id_box_usu_total").html(empleadosTotal);
                    $("#id_box_usu_activos").html(empleadosActivos);
                    $("#id_box_usu_lideres").html(empleadosLideres);
                    $("#id_box_usu_inactivos").html(empleadosIncativos);
                }
            },
            error: function () {},
        });
}
function cargar_id_empresa(){
    const data_url = $('#empresa_id').attr("data_url");
    const id = $('#empresa_id').val();
    var data = {
        id: id,
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            //==============================================================
            var respuesta_html = "";
            if (respuesta.areas.length > 0) {
                $("#hr_datos_generales").removeClass("d-none");
                $("#row_datos_generales").removeClass("d-none");

                respuesta_html += '<option value="">Elija área</option>';
                $.each(respuesta.areas, function (index, item) {
                    respuesta_html += '<option value="' + item.id + '">' + item.area + "</option>";
                });
                $("#area_id").html(respuesta_html);
                $("#caja_areas").removeClass("d-none");
            } else {
                $("#area_id").html(respuesta_html);
                $("#caja_areas").addClass("d-none");
                // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
                cargar_id_grupo();
                // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
            }
            //==============================================================
            var empleadosTotal = 0;
            var empleadosActivos = 0;
            var empleadosLideres = 0;
            var empleadosIncativos = 0;
            if (respuesta.areas.length > 0) {
                $.each(respuesta.areas, function (index, area) {
                    $.each(area.cargos, function (index, cargo) {
                        $.each(
                            cargo.empleados,
                            function (index, empleado) {
                                empleadosTotal++;
                                if (empleado.estado == 1) {
                                    empleadosActivos++;
                                } else {
                                    empleadosIncativos++;
                                }
                                if (empleado.lider == 1) {
                                    empleadosLideres++;
                                }
                            }
                        );
                    });
                });
                llenar_tabla_empleados(respuesta.areas,'empresa');
                $("#id_box_usu_total").html(empleadosTotal);
                $("#id_box_usu_activos").html(empleadosActivos);
                $("#id_box_usu_lideres").html(empleadosLideres);
                $("#id_box_usu_inactivos").html(empleadosIncativos);
            }
        },
        error: function () {},
    });
}
function cargar_id_area(){
    const data_url = $('#area_id').attr("data_url");
    const id = $('#area_id').val();
    var data = {
        id: id,
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            //==============================================================
            var respuesta_html = "";
            if (respuesta.cargos.length > 0) {
                $("#hr_datos_generales").removeClass("d-none");
                $("#row_datos_generales").removeClass("d-none");

                respuesta_html += '<option value="">Elija cargo</option>';
                $.each(respuesta.cargos, function (index, item) {
                    respuesta_html += '<option value="' + item.id + '">' + item.cargo + "</option>";
                });
                $("#cargo_id").html(respuesta_html);
                $("#caja_cargos").removeClass("d-none");
            } else {
                $("#cargo_id").html(respuesta_html);
                $("#caja_cargos").addClass("d-none");
                // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
                cargar_id_empresa();
                // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
            }
            //==============================================================
            var empleadosTotal = 0;
            var empleadosActivos = 0;
            var empleadosLideres = 0;
            var empleadosIncativos = 0;
            if (respuesta.cargos.length > 0) {
                $.each(respuesta.cargos, function (index, cargo) {
                    $.each(cargo.empleados,function (index, empleado) {
                            empleadosTotal++;
                            if (empleado.estado == 1) {
                                empleadosActivos++;
                            } else {
                                empleadosIncativos++;
                            }
                            if (empleado.lider == 1) {
                                empleadosLideres++;
                            }
                        }
                    );
                });
                llenar_tabla_empleados(respuesta.cargos,'area');
                $("#id_box_usu_total").html(empleadosTotal);
                $("#id_box_usu_activos").html(empleadosActivos);
                $("#id_box_usu_lideres").html(empleadosLideres);
                $("#id_box_usu_inactivos").html(empleadosIncativos);
            }
        },
        error: function () {},
    });
}

function cargar_id_cargo(){
    const data_url = $('#cargo_id').attr("data_url");
    const id = $('#cargo_id').val();
    var data = {
        id: id,
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            //==============================================================
            var respuesta_html = "";
            if (respuesta.empleados.length > 0) {
                $("#hr_datos_generales").removeClass("d-none");
                $("#row_datos_generales").removeClass("d-none");
            } else {
                // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
                cargar_id_area();
                // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
            }
            //==============================================================
            var empleadosTotal = 0;
            var empleadosActivos = 0;
            var empleadosLideres = 0;
            var empleadosIncativos = 0;
            if (respuesta.empleados.length > 0) {
                $.each(respuesta.empleados, function (index, empleado) {
                    empleadosTotal++;
                    if (empleado.estado == 1) {
                        empleadosActivos++;
                    } else {
                        empleadosIncativos++;
                    }
                    if (empleado.lider == 1) {
                        empleadosLideres++;
                    }
                });
                llenar_tabla_empleados(respuesta.empleados,'cargo');
                $("#id_box_usu_total").html(empleadosTotal);
                $("#id_box_usu_activos").html(empleadosActivos);
                $("#id_box_usu_lideres").html(empleadosLideres);
                $("#id_box_usu_inactivos").html(empleadosIncativos);
            }
        },
        error: function () {},
    });
}
