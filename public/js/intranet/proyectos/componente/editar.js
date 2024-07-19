$(document).ready(function () {
    $('.cajas_reasignacion').addClass('d-none');
    $("#checkReasigancion").change(function () {

        if (this.checked) {
            $(".cajas_reasignacion").removeClass("d-none");
        } else {
            $(".cajas_reasignacion").addClass("d-none");
        }
    });


    $("#adicion").on("input", function () {
        if (parseFloat($(this).val()) < 0) {
            $(this).addClass("text-danger");
            $(this).removeClass("text-primary");
            if (parseFloat($(this).val()) < parseFloat($("#presupuesto_total_componente").val()) * -1 ) {
                Sistema.notificaciones(
                    "El valor de decremento del presupuesto no puede superar los  " +
                        parseFloat(
                            $("#presupuesto_total_componente").val()
                        ).toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                        }),
                    "Sistema",
                    "error"
                );
                $(this).val($("#presupuesto_total_componente").val() * -1);
            }
            $('#justificacion').attr('required',true).parent().children('label').addClass('requerido');
            } else {
            if (parseFloat($(this).val()) > 0) {
                $(this).removeClass("text-danger");
                $(this).addClass("text-primary");
                if (parseFloat($(this).val()) >parseFloat($("#disponible_componentes").val())) {
                    Sistema.notificaciones(
                        "El valor no puede superar " +
                            parseFloat(
                                $("#disponible_componentes").val()
                            ).toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                            }),
                        "Sistema",
                        "error"
                    );
                    $(this).val($("#disponible_componentes").val());
                }
                $('#justificacion').attr('required',true).parent().children('label').addClass('requerido');
                } else {
                $('#justificacion').attr('required',false).parent().children('label').removeClass('requerido');
                if (parseFloat($(this).val()) == 0) {
                    $(this).removeClass("text-primary");
                    $(this).removeClass("text-danger");
                } else {
                    $(this).val(0);
                    $(this).removeClass("text-primary");
                    $(this).removeClass("text-danger");
                }
            }
        }
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
    //--------------------------------------------------------------------------
});
