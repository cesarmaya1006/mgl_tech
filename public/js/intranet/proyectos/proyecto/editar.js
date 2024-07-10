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
});
