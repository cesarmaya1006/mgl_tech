$('.influencia_check').on('change', function() {
    var data = {
        sede_id: $(this).data('sede'),
        departamento_id: $(this).data('departamento'),
        _token: $('input[name=_token]').val()
    };
    data_url = $(this).attr('data_url');
    sede_id_var = $(this).data('sede');
    departamento_id_var = $(this).data('departamento');
    data_sedes = $(this).attr('data_sedes');
    ajaxRequest(data_url, data, sede_id_var, departamento_id_var, data_sedes);
});

function ajaxRequest(url, data, sede_id_var, departamento_id_var, data_sedes) {
    const sede_id_var_c = sede_id_var;
    const departamento_id_var_c = departamento_id_var;
    const data_sedes_c = data_sedes;
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(respuesta) {
            console.log(respuesta);
            for (let i = 1; i <= data_sedes_c; i++) {
                if (sede_id_var_c != i) {
                    $("#sede_depto-" + i + "-" + departamento_id_var_c).prop('checked', false);
                    $("#sede_depto-" + i + "-" + departamento_id_var_c).attr("disabled", false);
                } else {
                    $("#sede_depto-" + i + "-" + departamento_id_var_c).attr("disabled", true);
                }
            }
            Sistema.notificaciones(respuesta.respuesta, 'Sistema', 'success');
        }
    });
}