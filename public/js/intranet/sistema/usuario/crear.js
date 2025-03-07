$(document).ready(function() {
    //----------------------------------------------------------------------
    $('#rol_id_form').on('change', function(event) {
        const id = $(this).val();
        if (id==5) {
            $('.formFuncionariosCrear').removeClass('d-none');
            $('.formUsuariosCrear').addClass('d-none');
            //------------------------------------------------
            $('#departamento_id').prop('required',true);
            $('#municipio_id').prop('required',true);
            $('#sede_id').prop('required',true);
            $('#area_id').prop('required',true);
            $('#nivel_id').prop('required',true);
            $('#cargo_id').prop('required',true);
            $('#docutipos_id').prop('required',true);
            $('#identificacion').prop('required',true);
            $('#nombre1').prop('required',true);
            $('#nombre2').prop('required',true);
            $('#apellido1').prop('required',true);
            $('#apellido2').prop('required',true);
            $('#fecha_nacimiento').prop('required',true);
            $('#genero').prop('required',true);
            $('#email').prop('required',true);
            $('#telefono_celu').prop('required',true);
            $('#direccion').prop('required',true);
            $('#password').prop('required',true);
            $('#re_password').prop('required',true);
            //------------------------------------------------
        } else {
            $('.formUsuariosCrear').removeClass('d-none');
            $('.formFuncionariosCrear').addClass('d-none');
            //------------------------------------------------
            $('#departamento_id').removeAttr('required');
            $('#municipio_id').removeAttr('required');
            $('#sede_id').removeAttr('required');
            $('#area_id').removeAttr('required');
            $('#nivel_id').removeAttr('required');
            $('#cargo_id').removeAttr('required');
            $('#docutipos_id').removeAttr('required');
            $('#identificacion').removeAttr('required');
            $('#nombre1').removeAttr('required');
            $('#nombre2').removeAttr('required');
            $('#apellido1').removeAttr('required');
            $('#apellido2').removeAttr('required');
            $('#fecha_nacimiento').removeAttr('required');
            $('#genero').removeAttr('required');
            $('#email').removeAttr('required');
            $('#telefono_celu').removeAttr('required');
            $('#direccion').removeAttr('required');
            $('#password').removeAttr('required');
            $('#re_password').removeAttr('required');
            //------------------------------------------------
        }
    });
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    $('#departamento_id').on('change', function(event) {
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
                if (respuesta.municipios.length > 0) {
                    respuesta_html += '<option value="">Elija un Municipio</option>';
                    $.each(respuesta.municipios, function (index, item) {
                        respuesta_html += '<option value="' + item.id + '">' + item.municipio + "</option>";
                    });
                    $("#municipio_id").html(respuesta_html);
                }
            },
            error: function () {},
        });

    });
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    $('#municipio_id').on('change', function(event) {
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
                if (respuesta.sedes.length > 0) {
                    respuesta_html += '<option value="">Elija una Sede</option>';
                    $.each(respuesta.sedes, function (index, item) {
                        respuesta_html += '<option value="' + item.id + '">' + item.nombre + "</option>";
                    });
                    $("#sede_id").html(respuesta_html);
                }
            },
            error: function () {},
        });

    });
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    $('#area_id').on('change', function(event) {
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
                if (respuesta.niveles.length > 0) {
                    respuesta_html += '<option value="">Elija un Nivel</option>';
                    $.each(respuesta.niveles, function (index, item) {
                        respuesta_html += '<option value="' + item.id + '">' + item.nivel + "</option>";
                    });
                    $("#nivel_id").html(respuesta_html);
                }
            },
            error: function () {},
        });

    });
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    $('#nivel_id').on('change', function(event) {
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
                    respuesta_html += '<option value="">Elija un Cargo</option>';
                    $.each(respuesta.cargos, function (index, item) {
                        respuesta_html += '<option value="' + item.id + '">' + item.cargo + "</option>";
                    });
                    $("#cargo_id").html(respuesta_html);
                }
            },
            error: function () {},
        });

    });
    //----------------------------------------------------------------------

});
