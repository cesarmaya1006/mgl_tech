$(document).ready(function () {
    //--------------------------------------------------------------------------
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
                var respuesta_html = "";
                if (respuesta.empresas.length > 0) {
                    respuesta_html += '<option value="">Elija empresa</option>';
                    $.each(respuesta.empresas, function (index, item) {
                        respuesta_html += '<option value="' + item.id + '">' + item.empresa + "</option>";
                    });
                    $("#empresa_id").html(respuesta_html);
                    $("#caja_empresas").removeClass("d-none");
                    $("#label_empresa_id").addClass("requerido");
                } else {
                    $("#empresa_id").html(respuesta_html);
                    $("#caja_empresas").addClass("d-none");
                    $("#label_empresa_id").removeClass("requerido");
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
                if (respuesta.empleados.length > 0) {
                    respuesta_html += '<option value="">Elija Líder</option>';
                    $.each(respuesta.empleados, function (index, item) {
                        respuesta_html += '<option value="' + item.id + '">' + item.nombres + ' ' + item.apellidos + '   --   cargo : ' + item.cargo.cargo + "</option>";
                    });
                    $("#empleado_id").html(respuesta_html);
                    $("#empleado_id").prop("required", true);
                } else {
                    $("#empleado_id").html(respuesta_html);
                    $("#empleado_id").prop("required", false);
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------

});
