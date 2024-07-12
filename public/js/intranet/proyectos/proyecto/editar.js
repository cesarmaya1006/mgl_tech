$(document).ready(function () {
    $("#caja_reasignaciones").addClass("d-none");
    $("#checkReasigancion").change(function () {
        if (this.checked) {
            $("#caja_reasignaciones").removeClass("d-none");
        } else {
            $("#caja_reasignaciones").addClass("d-none");
        }
    });
    //--------------------------------------------------------------------------
    $(".reasignacion_componente").on("change", function () {
        const data_url = $(this).attr("data_url");
        const componente_id = $(this).attr('data_componente');
        const texto = $('option:selected',this).text();
        const id = $(this).val();
        var data = {
            id: componente_id,
            empleado_id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                if (respuesta.mensaje=='ok') {
                    $('#empleado_asignado_comp_' + componente_id).html(texto);
                }
                Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $(".reasignacion_componente_masivo").on("change", function () {
        const data_url = $(this).attr("data_url");
        const componente_id = $(this).attr('data_componente');
        const texto = $('option:selected',this).text();
        const id = $(this).val();
        var data = {
            id: componente_id,
            empleado_id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                if (respuesta.mensaje=='ok') {
                    $('#empleado_asignado_comp_' + componente_id).html(texto);
                    $.each(respuesta.componente.tareas, function (index, tarea) {
                        $('#empleado_asignado_tarea_' + tarea.id).html(texto);
                    });
                }
                Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $(".reasignacio_tarea").on("change", function () {
        const data_url = $(this).attr("data_url");
        const tarea_id = $(this).attr('data_tarea');
        const texto = $('option:selected',this).text();
        const id = $(this).val();
        var data = {
            id: tarea_id,
            empleado_id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                if (respuesta.mensaje=='ok') {
                    $('#empleado_asignado_tarea_' + tarea_id).html(texto);
                }
                Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
            },
            error: function () {},
        });
    });
});
