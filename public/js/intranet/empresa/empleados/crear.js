$(document).ready(function () {
    $("#check_4").prop("checked", true);

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
                        respuesta_html +=
                            '<option value="' +
                            item.id +
                            '">' +
                            item.empresa +
                            "</option>";
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
                var respuesta_html = "";
                if (respuesta.areasPadre.length > 0) {
                    respuesta_html += '<option value="">Elija área</option>';
                    $.each(respuesta.areasPadre, function (index, item) {
                        respuesta_html +=
                            '<option value="' +
                            item.id +
                            '">' +
                            item.area +
                            "</option>";
                    });
                    $("#area_id").html(respuesta_html);
                    $("#col_caja_areas").removeClass("d-none");
                    $("#area_id").prop("required", true);
                } else {
                    $("#area_id").html(respuesta_html);
                    $("#col_caja_areas").addClass("d-none");
                    $("#area_id").prop("required", false);
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
                var respuesta_html = "";
                if (respuesta.cargos.length > 0) {
                    respuesta_html +=
                        '<option value="">Elija un cargo</option>';
                    $.each(respuesta.cargos, function (index, item) {
                        respuesta_html +=
                            '<option value="' +
                            item.id +
                            '">' +
                            item.cargo +
                            "</option>";
                    });
                    $("#cargo_id").html(respuesta_html);
                    $("#col_caja_areas").removeClass("d-none");
                    $("#cargo_id").prop("required", true);
                } else {
                    $("#cargo_id").html(respuesta_html);
                    $("#col_caja_areas").addClass("d-none");
                    $("#cargo_id").prop("required", false);
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $("#usuario_tranv").change(function () {
        const valor = $(this).val();
        if (this.checked) {
            $("#id_tabla_transv").removeClass("d-none");
        } else {
            $("#id_tabla_transv").addClass("d-none");
            $("#body_usuario_tranv").find("input").prop("checked", false);
        }
    });
    //--------------------------------------------------------------------------
    $(".label_checkbox").change(function () {
        const valor = $(this).val();
        if (this.checked) {
            $("#label_checkbox" + valor).html("Si");
        } else {
            $("#label_checkbox" + valor).html("No");
        }
    });
});

function mostrar() {
    var archivo = document.getElementById("foto").files[0];
    var reader = new FileReader();
    if (archivo) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            document.getElementById("fotoUsuario").src = reader.result;
        };
    }
}
