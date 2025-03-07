$(document).ready(function() {
    //==========================================================================
    $('#tipo_p_q_r_id').on('change', function(event) {
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
    //------------------------------------------------------------------------------------------------------------------------
    $("#tipopqrCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#tipo_pqr').removeClass('d-none');
            $('#tipo_pqr').prop('required', true);
        } else {
            $('#tipo_pqr').addClass('d-none');
            $('#tipo_pqr').prop('required', false);
            $('#motivo_pqr').addClass('d-none');
            $('#sub_motivo_pqr').removeClass('d-none');
            $('#sub_motivo_pqr').addClass('d-none');
            $('#motivoCheck').prop('checked', false);
            $('#subMotivoCheck').prop('checked', false);
            $('#motivo_id').prop('required', false);
            $('#motivo_sub_id').prop('required', false);
        }
    });
    //------------------------------------------------------------------------------------------------------------------------
    $("#motivoCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#tipo_pqr').removeClass('d-none');
            $('#tipo_pqr').prop('required', true);
            $('#tipopqrCheck').prop('checked', true);
            $('#motivo_pqr').removeClass('d-none');
            $('#motivo_id').prop('required', true);
        } else {
            $('#motivo_pqr').addClass('d-none');
            $('#sub_motivo_pqr').addClass('d-none');
            $('#subMotivoCheck').prop('checked', false);
            $('#motivo_id').prop('required', false);
            $('#motivo_sub_id').prop('required', false);
        }
    });
    //------------------------------------------------------------------------------------------------------------------------
    $("#subMotivoCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#tipo_pqr').removeClass('d-none');
            $('#tipo_pqr').prop('required', true);
            $('#tipopqrCheck').prop('checked', true);
            $('#motivo_pqr').removeClass('d-none');
            $('#motivo_id').prop('required', true);
            $('#motivoCheck').prop('checked', true);
            $('#sub_motivo_pqr').removeClass('d-none');
            $('#motivo_sub_id').prop('required', true);
        } else {
            $('#sub_motivo_pqr').addClass('d-none');
            $('#motivo_sub_id').prop('required', false);
        }
    });
    //------------------------------------------------------------------------------------------------------------------------
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
    //------------------------------------------------------------
    $("#categoriasCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#categorias').removeClass('d-none');
            $('#categoria_id').prop('required', true);
            $('#servicios').addClass('d-none');
            $('#servicio_id').prop('required', false);
            $('#serviciosCheck').prop('checked', false);

        } else {
            $('#categorias').addClass('d-none');
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
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
            $('#categoria_id').prop('required', true);
            $('#servicios').addClass('d-none');
            $('#servicio_id').prop('required', false);
            $('#serviciosCheck').prop('checked', false);
            $('#productos').removeClass('d-none');
            $('#producto_id').prop('required', true);
            $('#categoriasCheck').prop('checked', true);
        } else {
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
            $('#productosCheck').prop('checked', false);
            $('#marcasCheck').prop('checked', false);
            $('#referenciasCheck').prop('checked', false);
            $('#producto_id').prop('required', false);
            $('#marca_id').prop('required', false);
            $('#referencia_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#marcasCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#categorias').removeClass('d-none');
            $('#categoria_id').prop('required', true);
            $('#categoriasCheck').prop('checked', true);
            $('#servicios').addClass('d-none');
            $('#servicio_id').prop('required', false);
            $('#serviciosCheck').prop('checked', false);
            $('#productos').removeClass('d-none');
            $('#producto_id').prop('required', true);
            $('#productosCheck').prop('checked', true);
            $('#marcas').removeClass('d-none');
            $('#marca_id').prop('required', true);
        } else {
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
            $('#referenciasCheck').prop('checked', false);
            $('#marca_id').prop('required', false);
            $('#referencia_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
    $("#referenciasCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#categorias').removeClass('d-none');
            $('#categoria_id').prop('required', true);
            $('#categoriasCheck').prop('checked', true);
            $('#servicios').addClass('d-none');
            $('#servicio_id').prop('required', false);
            $('#serviciosCheck').prop('checked', false);
            $('#productos').removeClass('d-none');
            $('#producto_id').prop('required', true);
            $('#productosCheck').prop('checked', true);
            $('#marcas').removeClass('d-none');
            $('#marca_id').prop('required', true);
            $('#marcasCheck').prop('checked', true);
            $('#referencias').removeClass('d-none');
            $('#referencia_id').prop('required', true);
        } else {
            $('#referencias').addClass('d-none');
            $('#referencia_id').prop('required', false);
        }
    });
    //------------------------------------------------------------
});
