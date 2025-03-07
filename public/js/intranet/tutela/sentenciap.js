$(document).ready(function() {
    //================================

    $('#cajaCantiodad').addClass('d-none');
    $('#detalles0').addClass('d-none');
    $('#cumplimiento').addClass('d-none');
    $('#cumplimiento').removeClass('d-none');

    $('.archivoAdjuntoC').addClass('d-none');

    $('input[type=radio][name=formaCarga]').change(function() {
        var sentencia = $('#sentencia').val();
        if (this.value == 'cantidad') {
            $('#cajaCantiodad').removeClass('d-none');
            $('#cajaDetalle').addClass('d-none');
            var xHtml = '';
            xHtml += '<div class="row resuelvecant" id="resuelvecant1">';
            xHtml += '<div class="col-12">';
            xHtml += '<h6><strong id="tituloResuelveCant">Resuelve 1</strong></h6>';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group">';
            xHtml += '<label for="cumplimientocant">Cumplimiento</label>';
            xHtml += '<select class="form-control form-control-sm tcumplimientocant" id="cumplimientocant1" name="cumplimientocant1" onchange="cumplimientoSentenciaCant(1)">';
            xHtml += '<option value="0">Sin cumplimiento</option>';
            xHtml += '<option value="1">Dias</option>';
            xHtml += '<option value="2">Horas</option>';
            xHtml += '</select>';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml += '<label for="dias1" id="diasLabel1">Dias Cumplimiento</label>';
            xHtml += '<input type="number" class="form-control form-control-sm diascant" name="diascant1" id="diascant1" value="0" min="0">';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml += '<label for="horas" id="horasLabel1">Horas Cumplimiento</label>';
            xHtml += '<input type="number" class="form-control form-control-sm horascant" name="horascant1" id="horascant1" value="0" min="0" max="23">';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group">';
            xHtml += '<label for="sentido" id="sentido1">Sentido del resuelve</label>';
            xHtml += '<select id="sentido1" class="form-control form-control-sm" name="sentido1">';
            if (sentencia == 'Favorable' || sentencia == 'Parcialmente desfavorable') {
                xHtml += '<option value="Favorable">Favorable</option>';
            }
            if (sentencia == 'Desfavorable' || sentencia == 'Parcialmente desfavorable') {
                xHtml += '<option value="Desfavorable">Desfavorable</option>';
                xHtml += '<option value="Parcialmente desfavorable">Parcialmente desfavorable</option>';
            }
            xHtml += '</select>';
            xHtml += '</div>';
            xHtml += '</div>';
            $('#resuelvesPorCantidad').html(xHtml);
            $('#catnResuelves').val('1');
            xHtml_2 = '';
            xHtml_2 += '<div class="row detallesTarjeta pt-3 pb-3 mb-4" id="detalles0">';
            xHtml_2 += '<input type="hidden" class="form-control form-control-sm numeracion" name="numeracion" id="numeracion" value="0">';
            xHtml_2 += '<div class="col-12 form-group" id="resuelve0">';
            xHtml_2 += '<label for="resuelve" class="resuelveLabel" id="resuelveLabel">Resuelve N° 0</label>';
            xHtml_2 += '<textarea class="form-control form-control-sm resuelve" name="resuelve" id="resuelve" cols="30" rows="10" style="resize: none;"></textarea>';
            xHtml_2 += '</div>';
            xHtml_2 += '<div class="col-12 col-md-2 form-group">';
            xHtml_2 += '<label for="cumplimiento">Cumplimiento</label>';
            xHtml_2 += '<select class="form-control form-control-sm tcumplimiento" id="cumplimiento" name="cumplimiento" onchange="cumplimientoSentencia(0)">';
            xHtml_2 += '<option value="0">Sin cumplimiento</option>';
            xHtml_2 += '<option value="1">Dias</option>';
            xHtml_2 += '<option value="2">Horas</option>';
            xHtml_2 += '</select>';
            xHtml_2 += '</div>';
            xHtml_2 += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml_2 += '<label for="dias" id="diasLabel">Dias Cumplimiento</label>';
            xHtml_2 += '<input type="number" class="form-control form-control-sm dias" name="dias" id="dias" value="0" min="0">';
            xHtml_2 += '</div>';
            xHtml_2 += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml_2 += '<label for="horas" id="horasLabel">Horas Cumplimiento</label>';
            xHtml_2 += '<input type="number" class="form-control form-control-sm horas" name="horas" id="horas" value="0" min="0" max="23">';
            xHtml_2 += '</div>';
            xHtml_2 += '<div class="col-12 col-md-2 form-group">';
            xHtml_2 += '<label for="sentido" id="sentido">Sentido del resuelve</label>';
            xHtml_2 += '<select id="sentido" class="form-control form-control-sm" name="sentido">';
            xHtml_2 += '<option value="Favorable">Favorable</option>';
            xHtml_2 += '<option value="Desfavorable">Desfavorable</option>';
            xHtml_2 += '<option value="Parcialmente desfavorable">Parcialmente desfavorable</option>';
            xHtml_2 += '</select>';
            xHtml_2 += '</div>';
            xHtml_2 += '<div class="col-12 col-md-6 form-group">';
            xHtml_2 += '<a class="btn-accion-tabla tooltipsC text-danger float-end eliminarResuelve" idResuelve="0" title="Quitar" onclick="eliminarDiv(0)"><i class="fa fa-trash" aria-hidden="true"></i>Eliminar Resuelve</a>';
            xHtml_2 += '</div>';
            xHtml_2 += '</div>';
            $('#cajaDetalleP').html(xHtml_2);
        } else if (this.value == 'detalle') {
            $('#cajaDetalle').removeClass('d-none');
            $('#cajaCantiodad').addClass('d-none');
            xHtml = '';
            xHtml += '<div class="row detallesTarjeta pt-3 pb-3 mb-4" id="detalles0">';
            xHtml += '<input type="hidden" class="form-control form-control-sm numeracion" name="numeracion" id="numeracion" value="0">';
            xHtml += '<div class="col-12 form-group" id="resuelve0">';
            xHtml += '<label for="resuelve" class="resuelveLabel" id="resuelveLabel">Resuelve N° 0</label>';
            xHtml += '<textarea class="form-control form-control-sm resuelve" name="resuelve" id="resuelve" cols="30" rows="10" style="resize: none;"></textarea>';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group">';
            xHtml += '<label for="cumplimiento">Cumplimiento</label>';
            xHtml += '<select class="form-control form-control-sm tcumplimiento" id="cumplimiento" name="cumplimiento" onchange="cumplimientoSentencia(0)">';
            xHtml += '<option value="0">Sin cumplimiento</option>';
            xHtml += '<option value="1">Dias</option>';
            xHtml += '<option value="2">Horas</option>';
            xHtml += '</select>';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml += '<label for="dias" id="diasLabel">Dias Cumplimiento</label>';
            xHtml += '<input type="number" class="form-control form-control-sm dias" name="dias" id="dias" value="0" min="0">';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml += '<label for="horas" id="horasLabel">Horas Cumplimiento</label>';
            xHtml += '<input type="number" class="form-control form-control-sm horas" name="horas" id="horas" value="0" min="0" max="23">';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group">';
            xHtml += '<label for="sentido" id="sentido">Sentido del resuelve</label>';
            xHtml += '<select id="sentido" class="form-control form-control-sm" name="sentido">';
            if (sentencia == 'Favorable' || sentencia == 'Parcialmente desfavorable') {
                xHtml += '<option value="Favorable">Favorable</option>';
            }
            if (sentencia == 'Desfavorable' || sentencia == 'Parcialmente desfavorable') {
                xHtml += '<option value="Desfavorable">Desfavorable</option>';
                xHtml += '<option value="Parcialmente desfavorable">Parcialmente desfavorable</option>';
            }
            xHtml += '</select>';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-6 form-group">';
            xHtml += '<a class="btn-accion-tabla tooltipsC text-danger float-end eliminarResuelve" idResuelve="0" title="Quitar" onclick="eliminarDiv(0)"><i class="fa fa-trash" aria-hidden="true"></i>Eliminar Resuelve</a>';
            xHtml += '</div>';
            xHtml += '</div>';
            $('#cajaDetalleP').html(xHtml);
            $('#resuelvesPorCantidad').html('');
            $('#catnResuelves').val('0');
        }
        $('#detalles0').addClass('d-none');
        $('#cantResuelves').val(1);
    });

    $('#cantResuelves').on('change', function() {
        var cantElem = 1;
        var cantElementos = $(this).val();
        var xHtml = '';
        for (let index = 1; index <= cantElementos; index++) {
            xHtml += '<div class="row resuelvecant" id="resuelvecant' + index + '">';
            xHtml += '<div class="col-12">';
            xHtml += '<h6><strong id="tituloResuelveCant">Resuelve ' + index + '</strong></h6>';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group">';
            xHtml += '<label for="cumplimientocant">Cumplimiento</label>';
            xHtml += '<select class="form-control form-control-sm tcumplimientocant" id="cumplimientocant' + index + '" name="cumplimientocant' + index + '" onchange="cumplimientoSentenciaCant(' + index + ')">';
            xHtml += '<option value="0">Sin cumplimiento</option>';
            xHtml += '<option value="1">Dias</option>';
            xHtml += '<option value="2">Horas</option>';
            xHtml += '</select>';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml += '<label for="dias' + index + '" id="diasLabel' + index + '">Dias Cumplimiento</label>';
            xHtml += '<input type="number" class="form-control form-control-sm diascant" name="diascant' + index + '" id="diascant' + index + '" value="0" min="0">';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group d-none">';
            xHtml += '<label for="horas" id="horasLabel' + index + '">Horas Cumplimiento</label>';
            xHtml += '<input type="number" class="form-control form-control-sm horascant" name="horascant' + index + '" id="horascant' + index + '" value="0" min="0" max="23">';
            xHtml += '</div>';
            xHtml += '<div class="col-12 col-md-2 form-group">';
            xHtml += '<label for="sentido" id="sentido' + index + '">Sentido del resuelve</label>';
            xHtml += '<select id="sentido' + index + '" class="form-control form-control-sm" name="sentido' + index + '">';
            xHtml += '<option value="Favorable">Favorable</option>';
            xHtml += '<option value="Desfavorable">Desfavorable</option>';
            xHtml += '<option value="Parcialmente desfavorable">Parcialmente desfavorable</option>';
            xHtml += '</select>';
            xHtml += '</div>';
            xHtml += '</div>';
        }
        $('#resuelvesPorCantidad').html(xHtml);
        $('#catnResuelves').val(cantElementos);

    });

    $("#anadirResuelve").click(function() {
        var cantElem = 0;
        $("#detalles0").clone().appendTo("#cajaDetalleP");
        $(".detallesTarjeta").each(function(indice, elemento) {
            if (cantElem > 0) {
                $(elemento).removeClass("d-none");
                $(elemento).attr('id', 'detalles' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#numeracion').attr('name', 'numeracion' + cantElem);
                $(elemento).find('input#numeracion').val(cantElem);
                $(elemento).find('input#numeracion').attr('id', 'numeracion' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#sincumplimiento').attr('idResuelve', cantElem);
                $(elemento).find('input#sincumplimiento').attr('id', 'sincumplimiento' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#diasc').attr('idResuelve', cantElem);
                $(elemento).find('input#diasc').attr('id', 'diasc' + cantElem);
                //---------------------------------------------------
                $(elemento).find('select#cumplimiento').attr('name', 'cumplimiento' + cantElem);
                $(elemento).find('select#cumplimiento').attr('idResuelve', cantElem);
                $(elemento).find('select#cumplimiento').attr("onchange", "cumplimientoSentencia(" + cantElem + ")");
                $(elemento).find('select#cumplimiento').attr('id', 'cumplimiento' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#horasc').attr('idResuelve', cantElem);
                $(elemento).find('input#horasc').attr('id', 'horasc' + cantElem);
                //---------------------------------------------------
                $(elemento).find('textarea#resuelve').attr('name', 'resuelve' + cantElem);
                $(elemento).find('textarea#resuelve').attr("required", "true");
                $(elemento).find('textarea#resuelve').attr('id', 'resuelve' + cantElem);
                //---------------------------------------------------
                $(elemento).find('label#resuelveLabel').attr('name', 'resuelveLabel' + cantElem);
                $(elemento).find('label#resuelveLabel').html('Resuelve N° ' + cantElem);
                $(elemento).find('label#resuelveLabel').attr('id', 'resuelveLabel' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#dias').attr('name', 'dias' + cantElem);
                $(elemento).find('input#dias').attr('id', 'dias' + cantElem);
                //---------------------------------------------------
                $(elemento).find('select#selectorTiempo').attr('name', 'selectorTiempo' + cantElem);
                $(elemento).find('select#selectorTiempo').attr('id_sel', cantElem);
                $(elemento).find('select#selectorTiempo').attr('id', 'selectorTiempo' + cantElem);
                //---------------------------------------------------
                $(elemento).find('select#sentido').attr('name', 'sentido' + cantElem);
                $(elemento).find('select#sentido').attr('id', 'sentido' + cantElem);
                //---------------------------------------------------
                $(elemento).find('label#diasLabel').attr('name', 'diasLabel' + cantElem);
                $(elemento).find('label#diasLabel').attr('id', 'diasLabel' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#horas').attr('name', 'horas' + cantElem);
                $(elemento).find('input#horas').attr('id', 'horas' + cantElem);
                //---------------------------------------------------
                $(elemento).find('label#horasLabel').attr('name', 'horasLabel' + cantElem);
                $(elemento).find('label#horasLabel').attr('id', 'horasLabel' + cantElem);
                //---------------------------------------------------
                $(elemento).find('a').attr('idResuelve', cantElem);
                $(elemento).find('a').attr("onclick", "eliminarDiv(" + cantElem + ")");
                //---------------------------------------------------
                $(elemento).hide();
                $(elemento).show();
            }
            cantElem++;
        });
        $('#catnResuelves').val(cantElem - 1);
    });

    $("#anadirArchivoAdjunto").click(function() {
        var cantElem = 0;
        $("#archivoAdjuntoC0").clone().appendTo("#cajaAdjunto");
        $(".archivoAdjuntoC").each(function(indice, elemento) {
            if (cantElem > 0) {
                $(elemento).removeClass("d-none");
                $(elemento).attr('id', 'archivoAdjuntoC' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#url_anexo0').attr('name', 'url_anexo' + cantElem);
                $(elemento).find('input#url_anexo0').attr('id', 'url_anexo' + cantElem);
                //---------------------------------------------------
                $(elemento).find('input#titulo_anexo0').attr('name', 'titulo_anexo' + cantElem);
                $(elemento).find('input#titulo_anexo0').attr('id', 'titulo_anexo' + cantElem);
                //---------------------------------------------------
                $(elemento).find('textarea#descripcion_anexo0').attr('name', 'descripcion_anexo' + cantElem);
                $(elemento).find('textarea#descripcion_anexo0').attr('id', 'descripcion_anexo' + cantElem);
                //---------------------------------------------------
                $(elemento).find('a').attr('idAnexo', cantElem);
                $(elemento).find('a').attr("onclick", "eliminarAnexo(" + cantElem + ")");
                //---------------------------------------------------
                //---------------------------------------------------
                $(elemento).find('select#selectorTiempo').attr('name', 'selectorTiempo' + cantElem);
                $(elemento).find('select#selectorTiempo').attr('id_sel', cantElem);
                $(elemento).find('select#selectorTiempo').attr('id', 'selectorTiempo' + cantElem);
                //---------------------------------------------------
                $(elemento).hide();
                $(elemento).show();
            }
            cantElem++;
        });
        $('#cantAdjuntos').val(cantElem - 1);
    });


});

function eliminarDiv(id) {
    var cantElem = 0;
    $("#detalles" + id).remove();
    $(".detallesTarjeta").each(function(indice, elemento) {
        if (cantElem > 0) {
            $(elemento).removeClass("d-none");
            $(elemento).attr('id', 'detalles' + cantElem);
            //---------------------------------------------------
            $(elemento).find('input.numeracion').attr('name', 'numeracion' + cantElem);
            $(elemento).find('input.numeracion').val(cantElem);
            $(elemento).find('input.numeracion').attr('id', 'numeracion' + cantElem);
            //---------------------------------------------------
            $(elemento).find('textarea.resuelve').attr('name', 'resuelve' + cantElem);
            $(elemento).find('textarea.resuelve').attr("required", "true");
            $(elemento).find('textarea.resuelve').attr('id', 'resuelve' + cantElem);
            //---------------------------------------------------
            $(elemento).find('label.resuelveLabel').attr('name', 'resuelveLabel' + cantElem);
            $(elemento).find('label.resuelveLabel').html('Resuelve N° ' + cantElem);
            $(elemento).find('label.resuelveLabel').attr('id', 'resuelveLabel' + cantElem);
            //---------------------------------------------------
            $(elemento).find('input.dias').attr('name', 'dias' + cantElem);
            $(elemento).find('input.dias').attr('id', 'dias' + cantElem);
            //---------------------------------------------------
            $(elemento).find('input.horas').attr('name', 'horas' + cantElem);
            $(elemento).find('input.horas').attr('id', 'horas' + cantElem);
            //---------------------------------------------------
            $(elemento).find('a').attr('idResuelve', cantElem);
            $(elemento).find('a').attr("onclick", "eliminarDiv(" + cantElem + ")");
            //---------------------------------------------------
            $(elemento).hide();
            $(elemento).show();
        }
        cantElem++;
    });
    $('#catnResuelves').val(cantElem - 1);
}

function cumplimientoSentencia(id) {
    var valorSelect = $('#cumplimiento' + id).val();
    if (valorSelect == 1) {
        $('#dias' + id).parent().removeClass('d-none');
        $('#horas' + id).parent().addClass('d-none');
    } else if (valorSelect == 2) {
        $('#dias' + id).parent().addClass('d-none');
        $('#horas' + id).parent().removeClass('d-none');
    } else {
        $('#dias' + id).parent().addClass('d-none');
        $('#horas' + id).parent().addClass('d-none');
    }

}

function cumplimientoSentenciaCant(id) {
    var valorSelect = $('#cumplimientocant' + id).val();
    if (valorSelect == 1) {
        $('#diascant' + id).parent().removeClass('d-none');
        $('#horascant' + id).parent().addClass('d-none');
    } else if (valorSelect == 2) {
        $('#diascant' + id).parent().addClass('d-none');
        $('#horascant' + id).parent().removeClass('d-none');
    } else {
        $('#diascant' + id).parent().addClass('d-none');
        $('#horascant' + id).parent().addClass('d-none');
    }

}

function eliminarAnexo(id) {
    var cantElem = 0;
    $("#archivoAdjuntoC" + id).remove();


    $(".archivoAdjuntoC").each(function(indice, elemento) {
        if (cantElem > 0) {
            $(elemento).removeClass("d-none");
            $(elemento).attr('id', 'archivoAdjuntoC' + cantElem);
            //---------------------------------------------------
            $(elemento).find('input.url_anexo0').attr('name', 'url_anexo' + cantElem);
            $(elemento).find('input.url_anexo0').attr('id', 'url_anexo' + cantElem);
            //---------------------------------------------------
            $(elemento).find('input.titulo_anexo0').attr('name', 'titulo_anexo' + cantElem);
            $(elemento).find('input.titulo_anexo0').attr('id', 'titulo_anexo' + cantElem);
            //---------------------------------------------------
            $(elemento).find('textarea.descripcion_anexo0').attr('name', 'descripcion_anexo' + cantElem);
            $(elemento).find('textarea.descripcion_anexo0').attr('id', 'descripcion_anexo' + cantElem);
            //---------------------------------------------------
            $(elemento).find('a').attr('idAnexo', cantElem);
            $(elemento).find('a').attr("onclick", "eliminarAnexo(" + cantElem + ")");
            //---------------------------------------------------
            $(elemento).hide();
            $(elemento).show();
        }
        cantElem++;

    });
}