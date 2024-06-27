$(document).ready(function () {
    asignarDataTable_ajax(".tabla_tareas_componente",5,"portrait","Legal","listado de tareas",true);

    $(".check_tabla_tarea").change(function () {
        var arrayChecks = [];
        const valor_esta = $(this).val();
        const data_componente_id = $(this).attr("data_componente_id");
        const tabla_tareas_componente = "#tabla_tareas_componente_" + data_componente_id;
        const id_tbody = '#tbody_' + data_componente_id;

        if (valor_esta == "Todas") {
            $("#check_Activas").prop("checked", false);
            $("#check_Inactivas").prop("checked", false);
            $("#check_Cerradas").prop("checked", false);
            arrayChecks = [$(this).val()];
        } else {
            $(".check_tabla_tarea").each(function () {
                if (this.checked) {
                    if ($(this).val() != "Todas") {
                        $("#check_Todas").prop("checked", false);
                        arrayChecks.push($(this).val());
                    }
                }
            });
        }
        // - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - - * - -
        const data_url = $(this).attr("data_url");
        const estados = arrayChecks;
        const data_permiso_ver_tareas = $(this).attr('data_permiso_ver_tareas');
        var data = {
            estados: estados,
        };
        if (this.checked) {
            $.ajax({
                url: data_url,
                type: "GET",
                data: data,
                success: function (respuesta) {
                    llenar_tabla_empleados(respuesta.tareas,tabla_tareas_componente,data_permiso_ver_tareas,id_tbody);
                },
                error: function () {},
            });

        }else{
            var tareas =[];
            llenar_tabla_empleados(tareas,tabla_tareas_componente,data_permiso_ver_tareas,id_tbody);
        }
    });
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
});

function llenar_tabla_empleados(data,tabla,data_permiso_ver_tareas,id_tbody) {
    var table = new DataTable(tabla);
    table.destroy();
    var respuesta_tbody_html = '';
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    var url_temp_tareas_gestion = $("#id_tareas_gestion_url").attr("data_url");
    url_temp_tareas_gestion = url_temp_tareas_gestion.substring(0,url_temp_tareas_gestion.length - 1);
    const tareas_gestion_url = url_temp_tareas_gestion;
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    $.each(data, function (index, tarea) {
        respuesta_tbody_html+='<tr>';
        respuesta_tbody_html+='<td class="text-center">';
        if (data_permiso_ver_tareas) {
            respuesta_tbody_html+='<a href="' + tareas_gestion_url + tarea.id + '" class="btn-accion-tabla text-primary" title="Gestionar tarea"><i class="fas fa-eye mr-2"></i></a>';
        }else{
            respuesta_tbody_html+='<span class="btn-accion-tabla text-primary" title="Gestionar tarea"><i class="fas fa-eye-slash"></i></span>';
        }
        respuesta_tbody_html+='</td>';

        var nombres = tarea.empleado.nombres.split(" ");
        var apellidos = tarea.empleado.apellidos.split(" ");
        var nombre_completo = '';
        $.each(nombres, function (index, nombre) {
            nombre_completo += nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()  + ' ';
        });
        $.each(apellidos, function (index, apellido) {
            nombre_completo += apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase()  + ' ';
        });
        nombre_completo = nombre_completo.substring(0,nombre_completo.length - 1);

        respuesta_tbody_html+='<td style="white-space:nowrap;">' + nombre_completo + '</td>';
        respuesta_tbody_html+='<td style="white-space:nowrap;">' + tarea.titulo + '</td>';
        respuesta_tbody_html+='<td class="text-center" style="white-space:nowrap;">' + tarea.fec_creacion + '</td>';
        respuesta_tbody_html+='<td class="text-center" style="white-space:nowrap;">' + tarea.fec_limite + '</td>';

        var progreso = '<span>' + tarea.progreso +' %</span>';
        progreso +='<div class="progress"><div class="progress-bar" role="progressbar" style="width: ' + tarea.progreso +' %;" aria-valuenow="' + tarea.progreso +'" aria-valuemin="0" aria-valuemax="100"></div></div>';
        respuesta_tbody_html+='<td class="text-center" style="white-space:nowrap;">' + progreso + '</td>';

        var bg_estado ='';
        switch (tarea.estado) {
            case 'Activa':
                bg_estado = 'success';
                break;
            case 'Completa':
                bg_estado = 'success';
                break;
            default:
                bg_estado = 'danger';
        }
        respuesta_tbody_html+='<td class="text-center" style="white-space:nowrap;"><span class="bg-' + bg_estado + ' pl-3 pr-3 " style="font-size: 0.85em;">' + tarea.estado + '</span></td>';
        respuesta_tbody_html+='<td class="text-center" style="white-space:nowrap;">' + tarea.impacto + '</td>';
        respuesta_tbody_html+='<td class="text-wrap" style="width: 600px;">' + tarea.objetivo + '</td>';
        respuesta_tbody_html+='</tr>';
    });
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    $(id_tbody).html(respuesta_tbody_html);
    asignarDataTable_ajax(tabla,5,"portrait","Legal","listado de tareas",true);

}

