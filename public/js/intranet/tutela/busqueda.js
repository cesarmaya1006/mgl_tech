$(document).ready(function() {
    // ===========================================================================
    $('#tipoBusqueda').on('change', function(event) {
        const id = $(this).val();
        if (id == 'Número de radicado') {
            $('#cajaRadicado').removeClass('d-none');

            $('#cajaNombres').addClass('d-none');
            $('#cajaDocumento').addClass('d-none');
        } else if (id == 'Nombre o apellido del accionante') {
            $('#cajaNombres').removeClass('d-none');

            $('#cajaRadicado').addClass('d-none');
            $('#cajaDocumento').addClass('d-none');
        } else {
            $('#cajaDocumento').removeClass('d-none');

            $('#cajaRadicado').addClass('d-none');
            $('#cajaNombres').addClass('d-none');
        }
    });
    // ===========================================================================
    $('#botonBuscar').click(function() {
        const url_t = $(this).attr('data_url');
        const primer = url_t.search('/f');
        const servidor = url_t.substring(0, primer);
        const dirDetalles = servidor + '/funcionario/consulta/detalles_tutelas/'
        const tipoBusqueda = $('#tipoBusqueda').val();
        if (tipoBusqueda == 'Número de radicado') {
            const numRadicado = $('#numRadicado').val();

            var data = {
                "tipoBusqueda": tipoBusqueda,
                "numRadicado": numRadicado,
            };
        } else if (tipoBusqueda == 'Nombre o apellido del accionante') {
            const nombreApellidos = $('#nombreApellidos').val();

            var data = {
                "tipoBusqueda": tipoBusqueda,
                "nombreApellidos": nombreApellidos,
            };
        } else {
            const tipoDoc = $('#tipoDoc').val();
            const numDocumento = $('#numDocumento').val();

            var data = {
                "tipoBusqueda": tipoBusqueda,
                "tipoDoc": tipoDoc,
                "numDocumento": numDocumento,
            };
        }
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {
                respuesta_html = '';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<tr>';
                    respuesta_html += '<td><a href="' + dirDetalles + item['id'] + '" class="btn-accion-tabla tooltipsC text-info" title="Editar"><i class="fas fa-eye" aria-hidden="true"></i></a></td>';
                    respuesta_html += '<td>' + item['radicado'] + '</td>';
                    respuesta_html += '<td>' + item['accions'][0]['nombres_accion'] + ' ' + item['accions'][0]['apellidos_accion'] + '</td>';
                    respuesta_html += '<td>' + item['accions'][0]['tipos_docu_accion']['tipo_id'] + '</td>';
                    respuesta_html += '<td>' + item['accions'][0]['numero_documento_accion'] + '</td>';
                    respuesta_html += '<td>' + item['fecha_notificacion'] + '</td>';
                    respuesta_html += '<td style="white-space:nowrap">' + item['juzgado'] + '</td>';
                    respuesta_html += '<td class="text-center">';
                    if (item['dias_termino'] != null) {
                        respuesta_html += item['dias_termino'] + ' dias';
                    }
                    /*if (item['horas_termino'] != null) {
                        respuesta_html += item['horas_termino'] + ' horas';
                    }*/
                    respuesta_html += '</td>';
                    respuesta_html += '</tr>';

                });
                $('#contenidoTabla').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //================================

});
