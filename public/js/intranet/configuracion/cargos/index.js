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
        vaciarTabla();

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
                respuesta_tabla_html_fin = '';
                $("#tablaCargos").dataTable().fnDestroy();
                if (respuesta.areas.length > 0) {
                    var respuesta_html = "";
                    respuesta_html += '<option value="Todos">Todos los cargos</option>';
                    $.each(respuesta.areas, function (index, item) {
                        respuesta_html +='<option value="' + item.id + '">' + item.area + "</option>";
                        //================================================================================
                        respuesta_tabla_html_fin += llenarTablaCargos_emp(item.cargos);
                        //================================================================================
                    });
                    $("#tbody_cargos").html(respuesta_tabla_html_fin);
                    asignarDataTable();
                    $("#area_id").html(respuesta_html);
                }else{
                    respuesta_html += '<option value="">Elija una empresa</option>';
                    $("#area_id").html(respuesta_html);
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $("#area_id").on("change", function() {
        vaciarTabla();
        const id_ini = $(this).val();
        var data_url_ini = '';
        var data_id_ini = '';
        if (id_ini=='Todos') {
            data_url_ini = $('#cargos_todos').attr("data_url");
            data_id_ini = $('#empresa_id').val();
        } else {
            data_url_ini = $(this).attr("data_url");
            data_id_ini = $(this).val();
        }
        const data_url = data_url_ini;
        const id = data_id_ini;

        var data = {
            id: id,
        };

        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function(respuesta) {
                if (respuesta.cargos.length > 0) {
                    llenarTablaCargos(respuesta.cargos);
                }
            },
            error: function() {},
        });
    });

});
function vaciarTabla(){
    respuesta_tabla_html = '';
    $("#tablaCargos").dataTable().fnDestroy();
    $("#tbody_cargos").html(respuesta_tabla_html);
    asignarDataTable();
};
