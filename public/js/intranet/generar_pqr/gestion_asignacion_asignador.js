window.addEventListener('DOMContentLoaded', function(){
    // Carga de cargos en selector
    if(document.querySelector('#cargo')){
        cargos = document.querySelector('#cargo')
        const url_t = cargos.getAttribute('data_url')
        $.ajax({
            url: url_t,
            type: 'GET',
            success: function(respuesta) {
                respuesta_html = '';
                respuesta_html += '<option value="">--Seleccione--</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['cargo'] + '</option>';
                });
                $('#cargo').html(respuesta_html);
            },
            error: function(e) {
                console.log(e)
            }
        });
    }
    // Carga de funcionarios en selector
    $('#cargo').on('change', function(event) {
        const url_t = $(this).attr('data_url2');
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
                    respuesta_html += '<option value="' + item['id'] + '">' + item['nombre1'] + ' ' + item['apellido1'] + '</option>';
                });
                $('#funcionario').html(respuesta_html);
            },
            error: function(e) {
                console.log(e)
            }
        });
    });


// Guardar confirmación de primera asignación
    if(document.querySelector('#guardarAsignacion')){
        let guardarAsignacion = document.querySelector('#guardarAsignacion')
        guardarAsignacion.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let mensajeAsignacion = document.querySelector('#mensaje-asignacion').value
            let cargo = document.querySelector('#cargo').value
            let funcionario = document.querySelector('#funcionario').value
            let idPqr = document.querySelector('#id_pqr').value
            if (mensajeAsignacion != '' && cargo != '' && funcionario != '' ) {
                guardarAsignacion()
            }else{
                alert("Debe diligenciar todos los campos del formulario")
            }

            function guardarAsignacion (){
                let data = {
                    funcionario,
                    idPqr,
                    mensajeAsignacion
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        window.location = "/funcionario/gestion_pqr"
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });

            }
        })
    }

//  Guardar Historial PQR primera asignación 
    if(document.querySelector('#guardarHistorial')){
        let guardarHistorial = document.querySelector('#guardarHistorial')
        guardarHistorial.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let mensajeHistorial = document.querySelector('#mensaje-historial').value
            let idPqr = document.querySelector('#id_pqr').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            }else{
                guardarHistorial()
            }

            function guardarHistorial (){
                let data = {
                    mensajeHistorial,
                    idPqr
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        location.reload();
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
            }
        })
    }

})

