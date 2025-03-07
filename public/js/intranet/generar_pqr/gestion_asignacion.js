window.addEventListener('DOMContentLoaded', function(){
    let idPqr = document.querySelector('#id_pqr').value
    //  Guardar Historial PQR-tarea
    if(document.querySelector('#guardarHistorialTarea')){
        let guardarHistorialTarea = document.querySelector('#guardarHistorialTarea')
        guardarHistorialTarea.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let mensajeHistorial = document.querySelector('#mensaje-historial-tarea').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            }else{
                guardarHistorialTarea()
            }

            function guardarHistorialTarea (){
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
    // Carga de tareas en selector
    if(document.querySelector('#tarea')){
        tareas = document.querySelector('#tarea')
        const url_t = tareas.getAttribute('data_url')
        $.ajax({
            url: url_t,
            type: 'GET',
            success: function(respuesta) {
                respuesta_html = '';
                respuesta_html += '<option value="">--Seleccione--</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['tarea'] + '</option>';
                });
                $('#tarea').html(respuesta_html);
            },
            error: function(e) {
                console.log(e)
            }
        });
    }
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

// Script para ocultar cuadro de mensaje en formulario confirmacion asignación
    $('#confirmacion-asignacion').on('change', function(e) {
        let padre = e.target.parentNode.parentNode.parentNode
        switch (e.target.value) {
            case '1':
                    padre.querySelector('.container-mensaje-asigacion').classList.add('d-none');
                break;
                case '0':
                    padre.querySelector('.container-mensaje-asigacion').classList.remove('d-none');
                break;
        }
    });

// Guardar confirmación de primera asignación
    if(document.querySelector('#guardarAsignacion')){
        let guardarAsignacion = document.querySelector('#guardarAsignacion')
        guardarAsignacion.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let confirmacionAsignacion = document.querySelector('#confirmacion-asignacion').value
            let mensajeAsignacion = document.querySelector('#mensaje-asignacion').value
            if(confirmacionAsignacion == '0' ){
                if (mensajeAsignacion == '') {
                    alert("debe agregar un mensaje")
                }else{
                    guardarAsignacion()
                }
            }else{
                mensajeAsignacion = "Aceptada por el funcionario"
                guardarAsignacion()
            }
            function guardarAsignacion (){
                let data = {
                    confirmacionAsignacion,
                    mensajeAsignacion,
                    idPqr
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        if(confirmacionAsignacion == 1){
                            location.reload()
                        }else{
                            window.location = "/funcionario/gestion_pqr"
                        }
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

// Guardar asignar tarea a funcionario
    if(document.querySelector('#asignacion_tarea_guardar')){
        let asignacionTarea = document.querySelector('#asignacion_tarea_guardar')
        asignacionTarea.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let tarea = document.querySelector('#tarea').value
            let funcionario = document.querySelector('#funcionario').value
            if (tarea == '' || cargo == '' || funcionario == '' ) {
                alert("Debe dilegenciar todos los campos")
            }else{
                guardarAsignacionTarea()
            }
            function guardarAsignacionTarea (){
                let data = {
                    tarea,
                    funcionario,
                    idPqr
                }
                console.log(data)
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

