$(document).ready(function () {
    $("#emp_grupo_id").on("change", function () {
        const data_url = $(this).attr("data_url");
        const id = $(this).val();
        var data = {
            id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                if (respuesta.empresas.length > 0) {
                    var respuesta_html = "";
                    respuesta_html += '<option value="">Elija empresa</option>';
                    $.each(respuesta.empresas, function (index, item) {
                        respuesta_html +='<option value="' + item.id + '">' + item.empresa + "</option>";
                    });
                    $("#empresa_id").html(respuesta_html);
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $("#empresa_id").on("change", function () {
        const data_url = $(this).attr("data_url");
        const id = $(this).val();
        var data = {
            id: id,
        };
        $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            var respuesta_html = "";
            if (respuesta.areas.length > 0) {
                respuesta_html += '<option value="Todas">Todas las áreas</option>';
                $.each(respuesta.areas, function (index, item) {
                    respuesta_html +='<option value="' + item.id + '">' + item.area + "</option>";
                });
                $("#area_id").html(respuesta_html);
            }else{
                respuesta_html += '<option value="">Elija una empresa</option>';
                $("#area_id").html(respuesta_html);
                $('#caja_area_cargo').addClass('d-none');
            }
        },
        error: function () {},
    });
        llenarTablaPermisos(data_url,data);
    });
    //--------------------------------------------------------------------------
    $("#area_id").on("change", function () {
        const data_url = $(this).attr("data_url");
        const id = $(this).val();
        var data = {
            id: id,
        };
        llenarTablaPermisos(data_url,data);
    });
    //--------------------------------------------------------------------------
});

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function getCambioCargo(estado,cargo_id,permiso_id){
    const data_url = $('#route_permisoscargos_getCambioCargo').attr("data_url");
    const estado_check = estado;
    var data = {
        estado: estado,
        cargo_id: cargo_id,
        permiso_id: permiso_id,
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            if (estado_check==0) {
                $('#flexSwitchCheck_' + cargo_id + '_' + permiso_id).prop('checked', true);
                $('#flexSwitchCheck_' + cargo_id + '_' + permiso_id).val(1);
                $('#flexSwitchCheck_' + cargo_id + '_' + permiso_id).attr("onclick","getCambioCargo(1,"+cargo_id+","+permiso_id+")");
                $('#label_Check_' + cargo_id + '_' + permiso_id).html('Si');
            } else {
                $('#flexSwitchCheck_' + cargo_id + '_' + permiso_id).prop('checked', false);
                $('#flexSwitchCheck_' + cargo_id + '_' + permiso_id).val(0);
                $('#flexSwitchCheck_' + cargo_id + '_' + permiso_id).attr("onclick","getCambioCargo(0,"+cargo_id+","+permiso_id+")");
                $('#label_Check_' + cargo_id + '_' + permiso_id).html('No');
            }
            Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
        },
        error: function () {},
    });
}
function llenarTablaPermisos(data_url,data){
    //--------------------------------------------------------------------------
    var modulos_tep = [
        {'tituloModulo':'Proyectos','titulos':
            [
                {'subTituloModulo':'Panel Principal','titulosPermisos':
                    [
                        {'tr': 'Vista Principal','permiso': 'proyectos.index'},
                        {'tr': 'Crear Proyectos','permiso': 'proyectos.create'},
                        {'tr': 'Ver Datos Empresas','permiso': 'proyectos.ver_datos_empresa' },
                        {'tr': 'Ver Estadísticas Tareas','permiso': 'proyectos.ver_estadistica_tareas' },
                        {'tr': 'Ver Calendario tareas','permiso': 'proyectos.ver_calendario_tareas' },
                    ]
                },
                {'subTituloModulo':'Detalle Proyecto','titulosPermisos':
                    [
                        {'tr': 'Ver Detalles Proyecto','permiso': 'proyectos.detalle' },
                        {'tr': 'Ver Presupuesto Proyecto','permiso':'caja_presupuestos'}
                    ]
                },
                {'subTituloModulo':'Gestión Proyecto','titulosPermisos':
                    [
                        {'tr': 'Ver gestión de Proyecto','permiso': 'proyectos.gestion'},
                        {'tr': 'Exportar Informe Proyecto','permiso': 'exportar_proyecto'},
                        {'tr': 'Editar Proyecto','permiso': 'proyectos.edit'},
                        {'tr': 'Ver Personal Asignado al Proyecto','permiso': 'personal_asignado_proyecto'},
                        {'tr': 'Ver tareas Vencidas Gestión de Proyecto','permiso': 'tareas_vec_gestion_proyecto'},
                        {'tr': 'Ver todas las tareas vencidas Gestión de Proyecto','permiso': 'tareas_vec_gestion_proyecto_todas'},
                        {'tr': 'Crear Componentes','permiso': 'componentes.create'},
                        {'tr': 'Editar Componentes','permiso': 'componentes.edit'},
                        {'tr': 'Ver información componente - gestión','permiso': 'gestion_ver_componentes_info'},
                        {'tr': 'Ver presupuesto componente - gestión','permiso': 'ver_presupuesto_componentes'},
                        {'tr': 'Crear tareas - gestión','permiso': 'tareas.create'},
                        {'tr': 'Ver tareas - gestión','permiso': 'ver_tareas_componentes'},
                        {'tr': 'Gestionar Tareas - gestión','permiso': 'tareas.gestion'}
                    ]
                }
            ]
        }
    ];
    const modulos = modulos_tep;
    //--------------------------------------------------------------------------
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            var respuesta_thead = '';
            if (respuesta.areas.length > 0) {
                respuesta_thead +='<tr><th scope="col"><h6><strong>Permisos / Cargos</strong></h6></th>';
                var cantColumnas = 1;
                $.each(respuesta.areas, function (index, item) {
                    cantColumnas += item.cargos.length;
                });
                $.each(respuesta.areas, function (index, item) {
                    $.each(item.cargos, function (index, cargo) {
                        respuesta_thead += '<th scope="col" class="text-center pl-3 pr-3" style="white-space:nowrap;min-width: 220px;">'+ cargo.cargo+'</th>';
                    });
                });
                respuesta_thead += '</tr>';
                // ----------------------------------------------------------------------------------------------------------------------
                var respuesta_tbody = '';
                $.each(modulos, function (index , modulo){
                    $.each(modulo.titulos, function (index , titulo){
                        $.each(titulo.titulosPermisos, function (index , titulosPermiso){
                            respuesta_tbody +='<tr>';
                            respuesta_tbody +='<th scope="row" style="white-space:nowrap">' + modulo.tituloModulo + ' - ' + titulo.subTituloModulo + ' - ' + titulosPermiso['tr'] + '</th>';
                            $.each(respuesta.areas, function (index, area) {
                                $.each(area.cargos, function (index, cargo) {
                                    $.each(cargo.cargos_permisos, function (index, permiso) {
                                        if (permiso.name == titulosPermiso['permiso']) {
                                            if (permiso.pivot.estado==0) {
                                                respuesta_tbody +='<td class="text-center" style="white-space:nowrap;min-width: 220px;">';
                                                respuesta_tbody +='<div class="row">';
                                                respuesta_tbody +='<div class="col-12 col-md-6 pl-md-1 pr-md-1 mb-1 mb-md-0">';
                                                respuesta_tbody +='<div class="form-check form-switch">';
                                                respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="0" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '">';
                                                respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">No</label>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='<div class="col-12 col-md-6 pl-md-1 pr-md-1 mb-1 mb-md-0">';
                                                respuesta_tbody +='<button type="button" class="btn btn-outline-primary btn-sm pl-2 pr-2 btn_empleados_permisos" onclick="modalPermisosEmpleados(' + cargo.id +',' + permiso.id +',\'' + modulo.tituloModulo + ' - ' + titulo.subTituloModulo + ' - ' + titulosPermiso['tr'] + '\')" data-bs-toggle="modal" data-bs-target="#excepcionesModal">Excepciones</button>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='</td>';
                                            } else {
                                                respuesta_tbody +='<td class="text-center" style="white-space:nowrap;min-width: 220px;">';
                                                respuesta_tbody +='<div class="row">';
                                                respuesta_tbody +='<div class="col-12 col-md-6 pl-md-1 pr-md-1 mb-1 mb-md-0">';
                                                respuesta_tbody +='<div class="form-check form-switch">';
                                                respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="1" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '" checked>';
                                                respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">Si</label>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='<div class="col-12 col-md-6 pl-md-1 pr-md-1 mb-1 mb-md-0">';
                                                respuesta_tbody +='<button type="button" class="btn btn-outline-primary btn-sm pl-2 pr-2 btn_empleados_permisos" onclick="modalPermisosEmpleados(' + cargo.id +',' + permiso.id +',\'' + modulo.tituloModulo + ' - ' + titulo.subTituloModulo + ' - ' + titulosPermiso['tr'] + '\')" data-bs-toggle="modal" data-bs-target="#excepcionesModal">Excepciones</button>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='</div>';
                                                respuesta_tbody +='</td>';
                                            }
                                        }
                                    });
                                });
                            });
                            respuesta_tbody +='</tr>';
                        });
                    });
                });
                // ----------------------------------------------------------------------------------------------------------------------
                var table = new DataTable('#tabla_permisos_cargos');
                table.destroy();
                $("#thead_permisos").html(respuesta_thead);
                $("#tbody_permisos").html(respuesta_tbody);
                $('#caja_area_cargo').removeClass('d-none');
                asignarDataTable_ajax('#tabla_permisos_cargos',10,"portrait","Legal","listado de tareas",false);
            }
        },
        error: function () {},
    });
}

function modalPermisosEmpleados(cargo_id,permiso_id,tituloPermiso){
    const data_url = $('#getEmpleadosCargos').attr("data_url");
    var data = {
        cargo_id: cargo_id,
        permiso_id : permiso_id
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            html_body ='';
            if (respuesta.empleados.length < 10) {
                $('.modal-dialog').removeClass('modal-dialog-scrollable')
            } else {
                $('.modal-dialog').addClass('modal-dialog-scrollable')
            }
            $('#excepcionesModalLabel').html(tituloPermiso);
            $.each(respuesta.empleados, function (index, empleado) {
                    html_body +='<tr>';
                    html_body +='<th scope="row">' + empleado.nombres + ' ' + empleado.apellidos + '</th>';
                    html_body +='<td>';
                    html_body +='<div class="form-check form-switch">';
                    var permission_user = false;
                    $.each(empleado.usuario.permissions, function (index, permission) {
                        if (permission.id == permiso_id ) {
                            permission_user = true;

                        }
                    });
                    if (permission_user) {
                        html_body +='<input class="form-check-input" onClick="cambioPermisoEmpleado(' + empleado.id + ',' + permiso_id + ')" type="checkbox" id="checkUser_' + empleado.id + '" checked>';
                        html_body +='<label class="form-check-label"  id="label_checkUser_' + empleado.id + '" for="checkUser_' + empleado.id + '">Si</label>';
                    } else {
                        html_body +='<input class="form-check-input" onClick="cambioPermisoEmpleado(' + empleado.id + ',' + permiso_id + ')" type="checkbox" id="checkUser_' + empleado.id + '">';
                        html_body +='<label class="form-check-label"  id="label_checkUser_' + empleado.id + '" for="checkUser_' + empleado.id + '">No</label>';
                    }
                    html_body +='</div>';
                    html_body +='</td>';
                    html_body +='</tr>';
            });
            var table = new DataTable('#tabla_permisos_empleados');
            table.destroy();
            $('#tabla_permisos_empleados_tbody').html(html_body);
            asignarDataTable_ajax('#tabla_permisos_empleados',10,"portrait","Legal","listado de tareas",false);
        },
        error: function () {},
    });
}
function  cambioPermisoEmpleado(id_empleado,id_permission){
    const data_url = $('#setCambiopermisoEmpleado').attr("data_url");
    var data = {
        id_empleado: id_empleado,
        id_permission : id_permission
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            if (respuesta.mensaje=='ok') {
                $('#checkUser_' + id_empleado).prop('checked', true);
                $('#checkUser_' + id_empleado).val(1);
                $('#label_checkUser_' + id_empleado).html('Si');
            } else {
                $('#checkUser_' + id_empleado).prop('checked', false);
                $('#checkUser_' + id_empleado).val(0);
                $('#label_checkUser_' + id_empleado).html('No');
            }
            Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
        },
        error: function () {},
    });
}
