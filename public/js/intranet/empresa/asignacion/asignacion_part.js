$(document).ready(function() {
    //Pintar y ocultar
    //------------------------------------------------------------
    //Comprobacion de checks para saber asignaciones

    //------------------------------------------------------------
    $("#adquisicionCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#adquisicion_p_s').removeClass('d-none');
            $('#adquisicion').prop('required', true);
        } else {
            $('#adquisicion_p_s').addClass('d-none');
            $('#adquisicion').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#motivoCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#motivo_pqr').removeClass('d-none');
            $('#motivo_id').prop('required', true);
        } else {
            $('#motivo_pqr').addClass('d-none');
            $('#sub_motivo_pqr').removeClass('d-none');
            $('#sub_motivo_pqr').addClass('d-none');
            $('#subMotivoCheck').prop('checked', false);
            $('#motivo_id').prop('required', false);
            $('#motivo_sub_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#subMotivoCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#sub_motivo_pqr').removeClass('d-none');
            $('#motivo_pqr').removeClass('d-none');
            $('#motivoCheck').prop('checked', true);
            $('#motivo_id').prop('required', true);
            $('#motivo_sub_id').prop('required', true);
        } else {
            $('#sub_motivo_pqr').addClass('d-none');
            $('#motivo_sub_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#categoriasCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#categorias').removeClass('d-none');
            $('#categoria_id').prop('required', true);
        } else {
            $('#categorias').addClass('d-none');
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
            $('#servicios').addClass('d-none');
            $('#productosCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#referenciasCheck').prop('checked', false);
            $('#categoria_id').prop('required', false);
            $('#producto_id').prop('required', false);
            $('#marca_id').prop('required', false);
            $('#referencia_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#productosCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#categorias').removeClass('d-none');
            $('#productos').removeClass('d-none');
            $('#categoriasCheck').prop('checked', true);
            $('#categoria_id').prop('required', true);
            $('#producto_id').prop('required', true);
        } else {
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
            $('#servicios').addClass('d-none');
            $('#marcasCheck').prop('checked', false);
            $('#referenciasCheck').prop('checked', false);
            $('#producto_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#marcasCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#categorias').removeClass('d-none');
            $('#productos').removeClass('d-none');
            $('#marcas').removeClass('d-none');
            $('#categoriasCheck').prop('checked', true);
            $('#productosCheck').prop('checked', true);
            $('#categoria_id').prop('required', true);
            $('#producto_id').prop('required', true);
            $('#marca_id').prop('required', true);
        } else {
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
            $('#servicios').addClass('d-none');
            $('#referenciasCheck').prop('checked', false);
            $('#marca_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#referenciasCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#categorias').removeClass('d-none');
            $('#productos').removeClass('d-none');
            $('#marcas').removeClass('d-none');
            $('#referencias').removeClass('d-none');
            $('#servicios').addClass('d-none');
            $('#categoriasCheck').prop('checked', true);
            $('#productosCheck').prop('checked', true);
            $('#marcasCheck').prop('checked', true);
            $('#categoria_id').prop('required', true);
            $('#producto_id').prop('required', true);
            $('#marca_id').prop('required', true);
            $('#referencia_id').prop('required', true);
        } else {
            $('#referencias').addClass('d-none');
            $('#referencia_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#palabrasCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#palabrasClave').removeClass('d-none');
            $('#palabra1').prop('required', true);

        } else {
            $('#palabrasClave').addClass('d-none');
            $('#palabra1').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#serviciosCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#servicios').removeClass('d-none');
            $('#categorias').addClass('d-none');
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
            $('#categoriasCheck').prop('checked', false);
            $('#productosCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#referenciasCheck').prop('checked', false);
            $('#categoria_id').prop('required', false);
            $('#producto_id').prop('required', false);
            $('#marca_id').prop('required', false);
            $('#referencia_id').prop('required', false);
            $('#servicio_id').prop('required', true);
        } else {
            $('#servicios').addClass('d-none');
            $('#servicio_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $('#prodserv').on('change', function(event) {
        if ($(this).val() == 'Servicio') {
            $('#cajaserviciosCheck').removeClass('d-none');
            $('#cajacategoriasCheck').addClass('d-none');
            $('#cajaproductosCheck').addClass('d-none');
            $('#cajamarcasCheck').addClass('d-none');
            $('#cajareferenciasCheck').addClass('d-none');
            $('#categorias').addClass('d-none');
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
            $('#servicios').addClass('d-none');
            $('#categoriasCheck').prop('checked', false);
            $('#productosCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#referenciasCheck').prop('checked', false);
            $('#serviciosCheck').prop('checked', false);
            // - - - - - - - - - - - - - - - - -  - - - - - - -
            $('#servicio_id').prop('required', false);
            $('#categoria_id').prop('required', false);
            $('#producto_id').prop('required', false);
            $('#marca_id').prop('required', false);
            $('#referencia_id').prop('required', false);
        } else {
            $('#cajaserviciosCheck').addClass('d-none');
            $('#cajacategoriasCheck').removeClass('d-none');
            $('#cajaproductosCheck').removeClass('d-none');
            $('#cajamarcasCheck').removeClass('d-none');
            $('#cajareferenciasCheck').removeClass('d-none');
            $('#servicios').addClass('d-none');
            $('#serviciosCheck').prop('checked', false);
            $('#categoriasCheck').prop('checked', false);
            $('#productosCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#referenciasCheck').prop('checked', false);
            // - - - - - - - - - - - - - - - - -  - - - - - - -
            $('#servicio_id').prop('required', false);
            $('#categoria_id').prop('required', false);
            $('#producto_id').prop('required', false);
            $('#marca_id').prop('required', false);
            $('#referencia_id').prop('required', false);
        }
    });
    //==========================================================================
    $('#tipo_pqr_id').on('change', function(event) {
        if ($(this).val() < 4) {
            $('#ajustesAsignacion').removeClass('d-none');
        } else {
            $('#ajustesAsignacion').addClass('d-none');
        }
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

                respuesta_html = '<option value="">---Seleccione---</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['motivo'] + '</option>';
                });
                $('#motivo_id').html(respuesta_html);
                $('#motivo_sub_id').html('<option value="">---Seleccione un motivo---</option>');
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#motivo_id').on('change', function(event) {
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
                respuesta_html = '<option value="">---Seleccione---</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['sub_motivo'] + '</option>';
                });
                $('#motivo_sub_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#categoria_id').on('change', function(event) {
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
                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Elija primero una categoria</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['producto'] + '</option>';
                });
                $('#producto_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#producto_id').on('change', function(event) {
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
                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Elija primero un producto</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['marca'] + '</option>';
                });
                $('#marca_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#marca_id').on('change', function(event) {
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

                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Elija primero una marca</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['referencia'] + '</option>';
                });
                $('#referencia_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#departamento_id').on('change', function(event) {
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
                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Elija primero un departamento</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['municipio'] + '</option>';
                });
                $('#municipio_id').html(respuesta_html);
                respuesta_html = '<option value="">Elija primero un municipio</option>';
                $('#sede_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
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

                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Municipio sin sedes</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['nombre'] + '</option>';
                });
                $('#sede_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#sede_id').on('change', function(event) {
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

                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Sede sin funcionarios asignados</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['cargo'] + '</option>';
                });
                $('#cargo_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $(".tabla-data").on('submit', '.form-eliminar', function() {
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
