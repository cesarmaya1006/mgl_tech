$(document).ready(function() {
    //==========================================================================
    $( "#formBusquedaAnalitica" ).submit(function( event ) {
        event.preventDefault();
        const form = $(this);
        submitRequest(form);
    });

    function submitRequest(form) {
        const data_url = form.attr('data_url');
        const tipo_grafico = $('#tipoGrafico').val();
        const esp_rango = $('#esp_rango').val();
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            success: function(respuesta) {
                $('#chartContainer').removeClass('d-none');
                console.log(respuesta);
                var titulo = '';
                if (esp_rango=='1') {
                    if ($('#subMotivoCheck').is(':checked')) {
                        var sub_motivo = '';
                        sub_motivo = $('#motivo_sub_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + sub_motivo;
                    }else if($('#motivoCheck').is(':checked')){
                        var motivo = '';
                        motivo = $('#motivo_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + motivo;
                    }else if($('#tipopqrCheck').is(':checked')){
                        var tipo_p_q_r_id = '';
                        tipo_p_q_r_id = $('#tipo_p_q_r_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + tipo_p_q_r_id;
                    }
                }else if(esp_rango=='2'){
                    if ($('#referenciasCheck').is(':checked')) {
                        var text = '';
                        text = $('#referencia_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }else if($('#marcasCheck').is(':checked')){
                        var text = '';
                        text = $('#marca_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }else if($('#productosCheck').is(':checked')){
                        var text = '';
                        text = $('#producto_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }else if($('#categoriasCheck').is(':checked')){
                        var text = '';
                        text = $('#categoria_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }
                }else if(esp_rango=='3'){
                    if ($('#empleadosCheck').is(':checked')) {
                        var text = '';
                        text = $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }
                }else if(esp_rango=='4'){
                    if ($('#subMotivoCheck').is(':checked')) {
                        if ($('#referenciasCheck').is(':checked')) {
                            var text = '';
                            text = $('#motivo_sub_id option:selected').text() + ' y' + $('#referencia_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#marcasCheck').is(':checked')){
                            var text = '';
                            text = $('#motivo_sub_id option:selected').text() + ' y' + $('#marca_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#productosCheck').is(':checked')){
                            var text = '';
                            text = $('#motivo_sub_id option:selected').text() + ' y' + $('#producto_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#categoriasCheck').is(':checked')){
                            var text = '';
                            text = $('#motivo_sub_id option:selected').text() + ' y' + $('#categoria_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }
                    }else if($('#motivoCheck').is(':checked')){
                        if ($('#referenciasCheck').is(':checked')) {
                            var text = '';
                            text = $('#motivo_id option:selected').text() + ' y ' + $('#referencia_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#marcasCheck').is(':checked')){
                            var text = '';
                            text = $('#motivo_id option:selected').text() + ' y ' + $('#marca_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#productosCheck').is(':checked')){
                            var text = '';
                            text = $('#motivo_id option:selected').text() + ' y ' + $('#producto_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#categoriasCheck').is(':checked')){
                            var text = '';
                            text = $('#motivo_id option:selected').text() + ' y ' + $('#categoria_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }
                    }else if($('#tipopqrCheck').is(':checked')){
                        if ($('#referenciasCheck').is(':checked')) {
                            var text = '';
                            text = $('#tipo_p_q_r_id option:selected').text() + ' y ' +$('#referencia_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#marcasCheck').is(':checked')){
                            var text = '';
                            text = $('#tipo_p_q_r_id option:selected').text() + ' y ' +$('#marca_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#productosCheck').is(':checked')){
                            var text = '';
                            text = $('#tipo_p_q_r_id option:selected').text() + ' y ' +$('#producto_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }else if($('#categoriasCheck').is(':checked')){
                            var text = '';
                            text = $('#tipo_p_q_r_id option:selected').text() + ' y ' +$('#categoria_id option:selected').text();
                            titulo ="Cantidad de PQR's por " + text;
                        }
                    }
                }else if(esp_rango=='5'){
                    if ($('#subMotivoCheck').is(':checked')) {
                        var sub_motivo = '';
                        sub_motivo = $('#motivo_sub_id option:selected').text() + ' y ' + $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + sub_motivo;
                    }else if($('#motivoCheck').is(':checked')){
                        var motivo = '';
                        motivo = $('#motivo_id option:selected').text() + ' y ' + $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + motivo;
                    }else if($('#tipopqrCheck').is(':checked')){
                        var tipo_p_q_r_id = '';
                        tipo_p_q_r_id = $('#tipo_p_q_r_id option:selected').text() + ' y  empleado ' + $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + tipo_p_q_r_id;
                    }
                }else if(esp_rango=='6'){
                    if ($('#referenciasCheck').is(':checked')) {
                        var text = '';
                        text = $('#referencia_id option:selected').text() + ' y  empleado ' + $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }else if($('#marcasCheck').is(':checked')){
                        var text = '';
                        text = $('#marca_id option:selected').text() + ' y  empleado ' + $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }else if($('#productosCheck').is(':checked')){
                        var text = '';
                        text = $('#producto_id option:selected').text() + ' y  empleado ' + $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }else if($('#categoriasCheck').is(':checked')){
                        var text = '';
                        text = $('#categoria_id option:selected').text() + ' y  empleado ' + $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }
                }else if(esp_rango=='7'){
                    if ($('#empleadosCheck').is(':checked')) {
                        var text = '';
                        text = $('#empleado_id option:selected').text();
                        titulo ="Cantidad de PQR's por " + text;
                    }
                }else if(esp_rango=='8'){
                    if ($('#empleadosCheck').is(':checked')) {
                        var text = '';
                        text = $('#empleado_id option:selected').text();
                        titulo ="Tiempo de respuestaen dias a PQR's por " + text;
                    }
                }
                //---------------------------------------------------------------
                if (tipo_grafico=='column') {
                    grafico_barras(respuesta.data_mes,titulo);
                }else if(tipo_grafico=='line'){
                    grafico_linea(respuesta.data_mes,titulo);
                }else if(tipo_grafico=='pie'){
                    grafico_pie(respuesta.data_mes,titulo);
                }else if(tipo_grafico=='area'){
                    grafico_area(respuesta.data_mes,titulo);
                }
                $('#titulo_tabla').html(titulo);
                $('#cajaTabla').removeClass('d-none');
                $('#hr_tablas').removeClass('d-none');
                html_='';
                respuesta.data_mes.forEach(function(item, index) {
                    html_ += '<tr>';
                    html_ += '<td class="text-center" style="white-space:nowrapmin-width:250px;">' + text + '</td>';
                    html_ += '<td class="text-center" style="white-space:nowrap;min-width:50px;">' + item['label'] + '</td>';
                    html_ += '<td class="text-center" style="white-space:nowrap;min-width:50px;">' + item['y'] + '</td>';
                    html_ += '</tr>';
                });
                $('#bodyTabla').html(html_);
            },
            error: function() {

            }
        });
    }
    function grafico_barras(dataPoints,titulo){
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: titulo,
                fontSize: 25,
            },
            data: [{
                type: "column",
                yValueFormatString: "#,##0.## pqr´s",
                dataPoints: dataPoints
            }]
        });
        chart.render();
    }

    function  grafico_linea(dataPoints,titulo){
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: titulo,
                fontSize: 25,
            },
            data: [{
                type: "line",
                yValueFormatString: "#,##0.## pqr´s",
                dataPoints: dataPoints
            }]
        });
        chart.render();
    }
    function  grafico_pie(dataPoints,titulo){
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: titulo,
                fontSize: 25,
            },
            data: [{
                type: "pie",
                yValueFormatString: "#,##0.## pqr´s",
                indexLabel: "{label} ({y})",
                dataPoints: dataPoints
            }]
        });
        chart.render();
    }
    function grafico_area(dataPoints,titulo){
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: titulo,
                fontSize: 25,
            },
            axisX: {
                title: "Meses"
            },
            axisY: {
                title: "Cant PQR's"
            },
            data: [{
                type: "area",
                markerSize: 0,
                yValueFormatString: "#,##0.## pqr´s",
                dataPoints: dataPoints
            }]
        });
        chart.render();
    }

    //==========================================================================
    $('#esp_rango').on('change', function(event) {
        const valor = $(this).val();
        switch (valor) {
            case '1':
                $('#caja_tiempo').removeClass('d-none');
                $('#hr_caja_tiempo').removeClass('d-none');
                $('#caja_area_conocimiento').removeClass('d-none');
                $('#hr_caja_area_conocimiento').removeClass('d-none');
                $('#caja_caracterizacion').addClass('d-none');
                $('#hr_caja_caracterizacion').addClass('d-none');
                $('#caja_empleados').addClass('d-none');
                $('#hr_caja_empleados').addClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#tipopqrCheck").prop('checked', true);
                $("#tipopqrCheck").attr('disabled',true);
                $('#tipo_pqr').removeClass('d-none');
                $('#tipo_p_q_r_id').prop('required', true);
                $('#categoriasCheck').prop('checked', false);
                $('#categorias').addClass('d-none');
                $('#categoria_id').prop('required', false);
                $('#categoriasCheck').attr('disabled',false);
                break;
            case '2':
                $('#caja_tiempo').removeClass('d-none');
                $('#hr_caja_tiempo').removeClass('d-none');
                $('#caja_area_conocimiento').addClass('d-none');
                $('#hr_caja_area_conocimiento').addClass('d-none');
                $('#caja_caracterizacion').removeClass('d-none');
                $('#hr_caja_caracterizacion').removeClass('d-none');
                $('#caja_empleados').addClass('d-none');
                $('#hr_caja_empleados').addClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#tipopqrCheck").prop('checked', false);
                $("#tipopqrCheck").attr('disabled',false);
                $('#tipo_pqr').addClass('d-none');
                $('#tipo_p_q_r_id').prop('required', false);

                $('#categoriasCheck').prop('checked', true);
                $('#categorias').removeClass('d-none');
                $('#categoria_id').prop('required', true);
                $('#categoriasCheck').attr('disabled',true);
                break;
            case '3':
                $('#caja_tiempo').removeClass('d-none');
                $('#hr_caja_tiempo').removeClass('d-none');
                $('#caja_area_conocimiento').addClass('d-none');
                $('#hr_caja_area_conocimiento').addClass('d-none');
                $('#caja_caracterizacion').addClass('d-none');
                $('#hr_caja_caracterizacion').addClass('d-none');
                $('#caja_empleados').removeClass('d-none');
                $('#hr_caja_empleados').removeClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#tipopqrCheck").prop('checked', false);
                $("#tipopqrCheck").attr('disabled',false);
                $("#categoriasCheck").prop('checked', false);
                $("#categoriasCheck").attr('disabled',false);

                $("#empleadosCheck").prop('checked', true);
                $('#empleadosCheck').attr('disabled',true);
                $('#empleados').removeClass('d-none');
                $('#empleado_id').prop('required', true);
                break;
            case '4':
                $('#caja_tiempo').addClass('d-none');
                $('#hr_caja_tiempo').addClass('d-none');
                $('#caja_empleados').addClass('d-none');
                $('#hr_caja_empleados').addClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#empleadosCheck").prop('checked', false);
                $('#empleadosCheck').attr('disabled',false);
                $('#empleado_id').prop('required', false);
                //---------------------------------------------------
                $('#caja_area_conocimiento').removeClass('d-none');
                $('#hr_caja_area_conocimiento').removeClass('d-none');
                $('#caja_caracterizacion').removeClass('d-none');
                $('#hr_caja_caracterizacion').removeClass('d-none');

                $('#tipo_pqr').removeClass('d-none');
                $("#tipopqrCheck").prop('checked', true);
                $("#tipopqrCheck").attr('disabled',true);
                $('#tipo_p_q_r_id').prop('required', false);

                $('#categorias').removeClass('d-none');
                $("#categoriasCheck").prop('checked', true);
                $('#categoriasCheck').attr('disabled',true);
                $('#categoria_id').prop('required', true);
                break;
            case '5':
                $('#caja_tiempo').addClass('d-none');
                $('#hr_caja_tiempo').addClass('d-none');
                $('#caja_caracterizacion').addClass('d-none');
                $('#hr_caja_caracterizacion').addClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#categoriasCheck").prop('checked', false);
                $('#categoriasCheck').attr('disabled',false);
                $('#categoria_id').prop('required', false);
                //---------------------------------------------------
                $('#caja_area_conocimiento').removeClass('d-none');
                $('#hr_caja_area_conocimiento').removeClass('d-none');
                $('#caja_empleados').removeClass('d-none');
                $('#hr_caja_empleados').removeClass('d-none');

                $('#tipo_pqr').removeClass('d-none');
                $("#tipopqrCheck").prop('checked', true);
                $("#tipopqrCheck").attr('disabled',true);
                $('#tipo_p_q_r_id').prop('required', false);

                $('#empleados').removeClass('d-none');
                $("#empleadosCheck").prop('checked', true);
                $('#empleadosCheck').attr('disabled',true);
                $('#empleado_id').prop('required', true);

                break;
            case '6':
                $('#caja_tiempo').addClass('d-none');
                $('#hr_caja_tiempo').addClass('d-none');
                $('#caja_area_conocimiento').addClass('d-none');
                $('#hr_caja_area_conocimiento').addClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#tipopqrCheck").prop('checked', false);
                $('#tipopqrCheck').attr('disabled',false);
                $('#tipo_p_q_r_id').prop('required', false);
                //---------------------------------------------------
                $('#caja_caracterizacion').removeClass('d-none');
                $('#hr_caja_caracterizacion').removeClass('d-none');
                $('#caja_empleados').removeClass('d-none');
                $('#hr_caja_empleados').removeClass('d-none');

                $('#categorias').removeClass('d-none');
                $("#categoriasCheck").prop('checked', true);
                $("#categoriasCheck").attr('disabled',true);
                $('#categoria_id').prop('required', false);

                $('#empleados').removeClass('d-none');
                $("#empleadosCheck").prop('checked', true);
                $('#empleadosCheck').attr('disabled',true);
                $('#empleado_id').prop('required', true);
                break;
            case '7':
                $('#caja_tiempo').removeClass('d-none');
                $('#hr_caja_tiempo').removeClass('d-none');
                $('#caja_area_conocimiento').addClass('d-none');
                $('#hr_caja_area_conocimiento').addClass('d-none');
                $('#caja_caracterizacion').addClass('d-none');
                $('#hr_caja_caracterizacion').addClass('d-none');
                $('#caja_empleados').removeClass('d-none');
                $('#hr_caja_empleados').removeClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#tipopqrCheck").prop('checked', false);
                $("#tipopqrCheck").attr('disabled',false);
                $("#categoriasCheck").prop('checked', false);
                $("#categoriasCheck").attr('disabled',false);

                $("#empleadosCheck").prop('checked', true);
                $('#empleadosCheck').attr('disabled',true);
                $('#empleados').removeClass('d-none');
                $('#empleado_id').prop('required', true);
                break;
            case '8':
                $('#caja_tiempo').removeClass('d-none');
                $('#hr_caja_tiempo').removeClass('d-none');
                $('#caja_area_conocimiento').addClass('d-none');
                $('#hr_caja_area_conocimiento').addClass('d-none');
                $('#caja_caracterizacion').addClass('d-none');
                $('#hr_caja_caracterizacion').addClass('d-none');
                $('#caja_empleados').removeClass('d-none');
                $('#hr_caja_empleados').removeClass('d-none');
                $('#anno_mes_2').attr('disabled',true);
                $("#tipopqrCheck").prop('checked', false);
                $("#tipopqrCheck").attr('disabled',false);
                $("#categoriasCheck").prop('checked', false);
                $("#categoriasCheck").attr('disabled',false);

                $("#empleadosCheck").prop('checked', true);
                $('#empleadosCheck').attr('disabled',true);
                $('#empleados').removeClass('d-none');
                $('#empleado_id').prop('required', true);
                break;
        }

    });
    //==========================================================================
    $('input[type=radio][name=anno_mes]').change(function() {
        if (this.value == 'anno') {
            $('#caja_mes').addClass('d-none');
            $('#mes_busqueda').prop('required', false);
        }else {
            $('#caja_mes').removeClass('d-none');
            $('#mes_busqueda').prop('required', true);
        }
    });
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
                //console.log(respuesta);
                respuesta_ini = '<option value="">---Seleccione---</option>';
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
        if (id != '') {

            var titulo = 'Cantidad de Tutela por  Funcionario';
            //cargarcanvas('tipopqr_id', id, titulo, 'Motivos', $('#annoBusqueda').val(), $('#tipoGrafico').val());

        }

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
        if (id != '') {
            var titulo = 'Tiempo medio de respuesta por motivo de Tutela ' + $(this).find("option:selected").text();
            //cargarcanvas('motivo_id', id, 'pie', titulo, 'Sub - Motivos');
        }
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
    //==========================================================================
    //==========================================================================
    $('#cargarCanvas').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const busqueda = $(this).val();
        var data = {
            "busqueda": busqueda,
        };
        if (busqueda == 'tipopqr') {
            var titulo = 'Tiempo medio de respuesta por tipo de Tutela';
            var tipo = 'column'
        } else if (busqueda == 'motivos') {
            var titulo = 'Tiempo medio de respuesta por motivo de Tutela';
            var tipo = 'pie'
        }
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {
                var dataPoints = [];
                var chart = new CanvasJS.Chart("analiticaAjax", {
                    title: {
                        text: titulo
                    },
                    animationEnabled: true,
                    data: [{
                        type: tipo,
                        dataPoints: respuesta,
                    }]
                });

                chart.render();
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    //==========================================================================
    //------------------------------------------------------------------------------------------------------------------------
    $("#empleadosCheck").click(function() {
        if ($(this).is(':checked')) {
            $('#empleados').removeClass('d-none');
            $('#empleados').prop('required', true);
        } else {
            $('#empleados').addClass('d-none');
            $('#empleados').prop('required', false);
        }
    });
    //------------------------------------------------------------------------------------------------------------------------


});

function cargarcanvas(busqueda_, id_, titulo_, titulo_tabla, annoBusqueda, tipoGrafico) {
    $('.cajasAnaliticas').removeClass('d-none');
    $('#tituloTabla1').html(titulo_tabla);
    const url_t = $('#cargarGraficos').attr('data_url');
    const busqueda = busqueda_;
    const id = id_;
    const tipo_grafico = tipoGrafico;
    const titulo = titulo_;
    var respuestaT = [];
    var data = {
        "busqueda": busqueda,
        "id": id,
        "annoBusqueda": annoBusqueda,
        "tipo_grafico": tipo_grafico
    };
    $.ajax({
        url: url_t,
        type: 'GET',
        data: data,
        success: function(respuesta) {

            //console.log(respuesta);

            if (tipo_grafico == 'pie') {
                var html_ = "";

                respuesta.forEach(function(item, index) {
                    item.dataPoints.forEach(function(item2, index) {
                        html_ += '<tr>';
                        html_ += '<td class="text-center" style="white-space:nowrapmin-width:250px;">' + item['motivo'] + '</td>';
                        html_ += '<td class="text-center" style="white-space:nowrap;min-width:50px;">' + item2['name'] + '</td>';
                        html_ += '<td class="text-center" style="white-space:nowrap;min-width:50px;">' + item2['y'] + '</td>';
                        html_ += '</tr>';
                    });
                });
                $("#bodyTabla").html(html_);
                var html_ = "";
                respuesta.forEach(function(item, index) {
                    cajaanaliticaAjax = 'analiticaAjax' + (index + 1);
                    html_ += '<div class="col-12 col-md-6 pl-3 pr-3 mb-5 mt-5" id="caja' + (index + 1) + '">';
                    html_ += '<div id="' + cajaanaliticaAjax + '" style="height: 370px; max-width: auto; margin: 0px auto;"></div>';
                    html_ += '</div>';
                });
                $("#containerAnalitica").html(html_);
                respuesta.forEach(function(item, index) {
                    var chart = new CanvasJS.Chart("analiticaAjax" + (index + 1), {
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: titulo + ' ' + item['motivo'],
                            fontSize: 16,
                            wrap: true,
                        },
                        legend: {
                            horizontalAlign: "right",
                            verticalAlign: "center"
                        },
                        data: [{
                            type: "pie",
                            showInLegend: true,
                            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
                            indexLabel: "{name}",
                            legendText: "{name} (#percent%)",
                            indexLabelPlacement: "inside",
                            dataPoints: item['dataPoints']
                        }]
                    });
                    chart.render();
                });

            } else {
                var html_ = "";

                respuesta.forEach(function(item, index) {
                    item.dataPoints.forEach(function(item2, index) {
                        html_ += '<tr>';
                        html_ += '<td class="text-center" style="white-space:nowrapmin-width:250px;">' + item['name'] + '</td>';
                        html_ += '<td class="text-center" style="white-space:nowrap;min-width:50px;">' + convertirMeses(item2['x']) + '</td>';
                        html_ += '<td class="text-center" style="white-space:nowrap;min-width:50px;">' + item2['y'] + '</td>';
                        html_ += '</tr>';
                    });
                });
                $("#bodyTabla").html(html_);
                var html_ = "";
                html_ += '<div class="col-12" id="caja1">';
                html_ += '<div id="analiticaAjax" style="height: 370px; max-width: auto; margin: 0px auto;"></div>';
                html_ += '</div>';
                $("#containerAnalitica").html(html_);
                var chart = new CanvasJS.Chart("analiticaAjax", {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: titulo
                    },
                    axisY: {
                        title: "Dias Promedio",
                        valueFormatString: "#0",
                        suffix: " D"
                    },
                    axisX: {
                        title: "Meses",
                        suffix: " Mes"
                    },
                    legend: {
                        cursor: "pointer",
                        itemclick: toogleDataSeries
                    },
                    toolTip: {
                        shared: true
                    },
                    exportEnabled: true,

                    data: respuesta
                });
                chart.render();
            }



        },
        error: function() {

        }
    });


}

function toogleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

function convertirMeses(numero) {
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];
    return monthNames[numero - 1]
}
