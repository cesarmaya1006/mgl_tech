$(document).ready(function() {
    // ===========================================================================
    $('#pais').on('change', function(event) {
        const id = $(this).val();
        console.log(id);
        if (id != 44) {
            $('#caja_departamento').addClass('d-none');
        } else {
            $('#caja_departamento').removeClass('d-none');
        }
    });
    //==========================================================================
    $('.departamentos').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();

        var data = {
            "id": id,
        };
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {
                console.log(respuesta);
                respuesta_html = '';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['municipio'] + '</option>';
                });
                $('#municipio_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================

    $('input[type=radio][name=discapasidad]').on('change', function() {
        switch ($(this).val()) {
            case 'si':
                $('#tipodiscapacidadcaja').removeClass('d-none');
                break;
            case 'no':
                $('#tipodiscapacidadcaja').addClass('d-none');
                break;
        }
    });
    //==========================================================================
    $("#boton_continuar").on('click', function() {
        $('#registro_ini').addClass('d-none');
        $('#registro_fin').removeClass('d-none');
    });

    //==========================================================================
    $(".lcapital").keyup(function(evt) {


        var palabra = $(this).val();
        //Si el valor es nulo o undefined salimos
        if (!$(this).val()) return;
        // almacenamos la mayuscula
        var mayuscula = palabra.substring(0, 1).toUpperCase();
        //si la palabra tiene más de una letra almacenamos las minúsculas
        if (palabra.length > 0) {
            var minuscula = palabra.substring(1).toLowerCase();
        }
        //escribimos la palabra con la primera letra mayuscula
        $(this).val(mayuscula.concat(minuscula));
    });

    //===================================================================================

    $('.direccion_parte').on('change', function(event) {
        var html_d = '';
        html_d += $('#dir1').val();
        if ($('#dir2').val() != null) {
            html_d += ' ';
            html_d += $('#dir2').val();
        }

        if ($('#dir3').val() != null) {
            html_d += ' ';
            html_d += $('#dir3').val();
        }


        if ($('#dir4').val() != null) {
            html_d += ' ';
            html_d += $('#dir4').val();
        }

        if ($('#dir5').val() != null) {
            html_d += ' ';
            html_d += $('#dir5').val();
        }

        if ($('#dir6').val() != null) {
            html_d += ' ';
            html_d += $('#dir6').val();
        }

        if ($('#dir7').val() != null) {
            html_d += ' No. ';
            html_d += $('#dir7').val();
        }

        if ($('#dir8').val() != null) {
            html_d += ' ';
            html_d += $('#dir8').val();
        }

        if ($('#dir9').val() != null) {
            html_d += ' - ';
            html_d += $('#dir9').val();
        }

        if ($('#dir10').val() != null) {
            html_d += ' ';
            html_d += $('#dir10').val();
        }

        $('#direccion_completa').html(html_d);

    });

    //==========================================================================
    $("#agregar_dir_fomulario").on('click', function() {
        var direccion_completa = $('#direccion_completa').html();
        $('#direccion').val(direccion_completa);

    });
    //==========================================================================

});