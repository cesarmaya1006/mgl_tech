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
                console.log(respuesta);
                var respuesta_html = "";
                var respuesta_thead = '';
                var respuesta_tbody = '';
                if (respuesta.areas.length > 0) {
                    respuesta_html += '<option value="Todas">Todas las áreas</option>';
                    respuesta_thead +='<tr><th scope="col"><h5><strong>Permisos / Cargos</strong></h5></th>';
                    var cantColumnas = 1;
                    $.each(respuesta.areas, function (index, item) {
                        cantColumnas += item.cargos.length;
                    });
                    respuesta_tbody +='<tr><th colspan="'+ cantColumnas +'" scope="row" class="text-center table-secondary"><h6><strong>Módulo Proyectos</strong></h6></th></tr>';

                    respuesta_tbody +='<tr><th scope="row">Vista Principal</th>';
                    $.each(respuesta.areas, function (index, item) {
                        respuesta_html +='<option value="' + item.id + '">' + item.area + "</option>";
                        $.each(item.cargos, function (index, cargo) {
                            $.each(cargo.cargos_permisos, function (index, permiso) {
                                if (permiso.name == 'proyectos.index') {
                                    if (permiso.pivot.estado==0) {
                                        respuesta_tbody +='<td class="text-center">';
                                        respuesta_tbody +='<div class="form-check form-switch">';
                                        respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="0" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '">';
                                        respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">No</label>';
                                        respuesta_tbody +='</div>';
                                        respuesta_tbody +='</td>';
                                    } else {
                                        respuesta_tbody +='<td class="text-center">';
                                        respuesta_tbody +='<div class="form-check form-switch">';
                                        respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="1" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '" checked>';
                                        respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">Si</label>';
                                        respuesta_tbody +='</div>';
                                        respuesta_tbody +='</td>';
                                    }
                                }
                            });
                            respuesta_thead += '<th scope="col" class="text-center">'+ cargo.cargo+'</th>';
                        });
                    });
                    respuesta_thead += '</tr>';
                    respuesta_tbody += '</tr>';

                    // ----------------------------------------------------------------------------------------------------------------------
                    respuesta_tbody +='<tr><th scope="row">Crear Proyectos</th>';
                    $.each(respuesta.areas, function (index, item) {
                        $.each(item.cargos, function (index, cargo) {
                            $.each(cargo.cargos_permisos, function (index, permiso) {
                                if (permiso.name == 'proyectos.create') {
                                    if (permiso.pivot.estado==0) {
                                        respuesta_tbody +='<td class="text-center">';
                                        respuesta_tbody +='<div class="form-check form-switch">';
                                        respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="0" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '">';
                                        respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">No</label>';
                                        respuesta_tbody +='</div>';
                                        respuesta_tbody +='</td>';
                                    } else {
                                        respuesta_tbody +='<td class="text-center">';
                                        respuesta_tbody +='<div class="form-check form-switch">';
                                        respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="1" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '" checked>';
                                        respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">Si</label>';
                                        respuesta_tbody +='</div>';
                                        respuesta_tbody +='</td>';
                                    }
                                }
                            });
                        });
                    });
                    respuesta_tbody += '</tr>';
                    // -----------------------------------------------------------------------------------------------------------------------------
                    respuesta_tbody +='<tr><th scope="row">Ver datos empresas</th>';
                    $.each(respuesta.areas, function (index, item) {
                        $.each(item.cargos, function (index, cargo) {
                            $.each(cargo.cargos_permisos, function (index, permiso) {
                                if (permiso.name == 'proyectos.ver_datos_empresa') {
                                    if (permiso.pivot.estado==0) {
                                        respuesta_tbody +='<td class="text-center">';
                                        respuesta_tbody +='<div class="form-check form-switch">';
                                        respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="0" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '">';
                                        respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">No</label>';
                                        respuesta_tbody +='</div>';
                                        respuesta_tbody +='</td>';
                                    } else {
                                        respuesta_tbody +='<td class="text-center">';
                                        respuesta_tbody +='<div class="form-check form-switch">';
                                        respuesta_tbody +='<input class="form-check-input" onclick="getCambioCargo(' + permiso.pivot.estado +',' + cargo.id +',' + permiso.id +')" type="checkbox" value="1" id="flexSwitchCheck_' + cargo.id + '_' + permiso.id + '" data_cargo="' + cargo.id + '" data_permiso="' + permiso.id + '" checked>';
                                        respuesta_tbody +='<label class="form-check-label" id="label_Check_'+cargo.id+'_'+permiso.id+'" for="flexSwitchCheck_'+cargo.id+'_'+permiso.id+'">Si</label>';
                                        respuesta_tbody +='</div>';
                                        respuesta_tbody +='</td>';
                                    }
                                }
                            });
                        });
                    });
                    respuesta_tbody += '</tr>';
                    // -----------------------------------------------------------------------------------------------------------------------------




                    $("#area_id").html(respuesta_html);
                    $("#thead_permisos").html(respuesta_thead);
                    $("#tbody_permisos").html(respuesta_tbody);
                    $('#caja_area_cargo').removeClass('d-none');
                }else{
                    respuesta_html += '<option value="">Elija una empresa</option>';
                    $("#area_id").html(respuesta_html);
                    $('#caja_area_cargo').addClass('d-none');
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $("#area_id").on("change", function () {
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
                if (respuesta.cargos.length > 0) {
                   console.log(respuesta.cargos);
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------

});

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
            console.log(estado_check);
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
