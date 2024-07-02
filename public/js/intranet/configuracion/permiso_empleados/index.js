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
