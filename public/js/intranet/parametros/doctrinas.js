$(document).ready(function() {
    $(function() {
        $('[data-toggle="popover-hover"]').popover({
            trigger: 'hover',
        })
    })
    const modalAutorInst = new bootstrap.Modal(document.getElementById('modalAutorInst'));
    $('#nuevoAutorInst').click(function() {
        modalAutorInst.show();
    });
    $('#crearAutorInst').click(function() {
            modalAutorInst.hide();
            const url_t = $(this).attr('data_url');
            const institucion = $('#institucion').val();
            var data = {
                "institucion": institucion,
            };
            if (institucion != '') {
                $.ajax({
                    url: url_t,
                    type: 'GET',
                    data: data,
                    success: function(respuesta) {
                        respuesta_html = '<option value="">---Seleccione---</option>';
                        $.each(respuesta, function(index, item) {
                            if (item['institucion'] == institucion) {
                                respuesta_html += '<option value="' + item['id'] + '" selected>' + item['institucion'] + '</option>';
                            } else {
                                respuesta_html += '<option value="' + item['id'] + '">' + item['institucion'] + '</option>';
                            }
                        });
                        $('#wikuautorinstitu_id').html(respuesta_html);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Autor Cargado con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function() {

                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se cargo el Autor',
                    text: 'Al parecer olvido escribir el nombre del autor'
                })
            }
        })
        //-*-*-*
    const modalAutor = new bootstrap.Modal(document.getElementById('modalAutor'));
    $('#nuevoAutor').click(function() {
        modalAutor.show();
    });
    $('#crearAutor').click(function() {
            modalAutor.hide();
            const url_t = $(this).attr('data_url');
            const nombre1 = $('#nombre1').val();
            const nombre2 = $('#nombre2').val();
            const apellido1 = $('#apellido1').val();
            const apellido2 = $('#apellido2').val();
            var data = {
                "nombre1": nombre1,
                "nombre2": nombre2,
                "apellido1": apellido1,
                "apellido2": apellido2,
            };
            if (nombre1 != '' && apellido1 != '') {
                $.ajax({
                    url: url_t,
                    type: 'GET',
                    data: data,
                    success: function(respuesta) {
                        respuesta_html = '<option value="">---Seleccione---</option>';
                        $.each(respuesta, function(index, item) {
                            var nombrecompleto = item['nombre1'];
                            if (item['nombre2'] != null) {
                                nombrecompleto += ' ' + item['nombre2'];
                            }
                            nombrecompleto += ' ' + item['apellido1'];
                            if (item['apellido2'] != null) {
                                nombrecompleto += ' ' + item['apellido2'];
                            }
                            if (item['nombre1'] == nombre1 && item['apellido1'] == apellido1) {

                                respuesta_html += '<option value="' + item['id'] + '" selected>' + nombrecompleto + '</option>';
                            } else {
                                respuesta_html += '<option value="' + item['id'] + '">' + nombrecompleto + '</option>';
                            }
                        });
                        $('#wikuautores_id').html(respuesta_html);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Autor Cargado con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function() {

                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Fantan Datos',
                    text: 'Debe digitar almenos un mobre y apellidos del autor'
                })
            }
        })
        //==========================================================================
    $('input[type=radio][name=autortipo]').change(function() {
        if (this.value == 'checkinstitucion') {
            $('#cajaautorpersona').addClass('d-none');
            $('#wikuautores_id').removeAttr('required');
            $('#cajainstitucion').removeClass('d-none');
            $('#wikuautorinstitu_id').prop('required', true);

        } else {
            $('#cajainstitucion').addClass('d-none');
            $('#wikuautorinstitu_id').removeAttr('required');
            $('#cajaautorpersona').removeClass('d-none');
            $('#wikuautores_id').prop('required', true);


        }
    });
    //==========================================================================
    $("#tabla-data").on('submit', '.form-eliminar', function() {
        event.preventDefault();
        const form = $(this);
        swal({
            title: '¿Está seguro que desea eliminar el registro?',
            text: "Esta acción no se puede deshacer!",
            icon: 'warning',
            buttons: {
                cancel: "Cancelar",
                confirm: "Aceptar"
            },
        }).then((value) => {
            if (value) {
                ajaxRequest(form);
            }
        });
    });

    function ajaxRequest(form) {
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            success: function(respuesta) {
                if (respuesta.mensaje == "ok") {
                    form.parents('tr').remove();
                    Sistema.notificaciones('El registro fue eliminado correctamente', 'Sistema', 'success');
                } else {
                    Sistema.notificaciones('El registro no pudo ser eliminado, hay recursos usandolo', 'Sistema', 'error');
                }
            },
            error: function() {

            }
        });
    }
});