$(document).ready(function() {
    //========================================================================================
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
                respuesta_html = '';
                respuesta_html += '<option value="">--Seleccione--</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['municipio'] + '</option>';
                });
                $('#sede_id').html('<option value="">--Seleccione--</option>');
                $('#municipio_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //========================================================================================
    //========================================================================================
    $('#municipio_id').on('change', function(event) {
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
                respuesta_html = '';
                respuesta_html += '<option value="">--Seleccione--</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['nombre'] + '</option>';
                });
                $('#sede_id').html(respuesta_html);
            },
            error: function() {

            }
        });
    });
    //========================================================================================

});