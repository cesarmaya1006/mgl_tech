window.addEventListener('DOMContentLoaded', function(){
    let idPqr = document.querySelector('#id_pqr').value
    let idTarea = document.querySelector('#id_tarea').value
    // Guardar Confirmacion regresar a revisión
    if(document.querySelector('.btn-pqr-aprueba-regresa')){
        let btnRespuesta = document.querySelector('.btn-pqr-aprueba-regresa')
        btnRespuesta.addEventListener('click', function(e){
            e.preventDefault
            let contenedorPadre = btnRespuesta.parentElement.parentElement.parentElement
            let url = e.target.getAttribute('data_url')
            let url2 = e.target.getAttribute('data_url2')
            let token = e.target.getAttribute('data_token')
            let mensajeHistorial = contenedorPadre.querySelector('.mensaje-historial-tarea').value
            if (mensajeHistorial != '') {
                let data = {
                    idTarea: "3",
                    mensajeHistorial: 'Revisión no aprobada.',
                    idPqr,
                    estado: 6
                }
                let data2 = {
                    idTarea,
                    mensajeHistorial,
                    idPqr,
                    estado: 6
                }
                synchronous(data, data2)
                
                async function synchronous (data, data2){
                    await $.ajax({
                        url: url,
                        async: false,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data,
                        success: function(respuesta) {
                            // console.log(respuesta)
                        },
                        error: function(error) {
                            console.log(error.responseJSON)
                        }
                    });
    
                    await $.ajax({
                        url: url2,
                        async: false,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data,
                        success: function(respuesta) {
                            // console.log(respuesta)
                        },
                        error: function(error) {
                            console.log(error.responseJSON)
                        }
                    });
    
                    await $.ajax({
                        url: url,
                        async: false,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data2,
                        success: function(respuesta) {
                            // console.log(respuesta)
                        },
                        error: function(error) {
                            console.log(error.responseJSON)
                        }
                    });
    
                    await $.ajax({
                        url: url2,
                        async: false,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data2,
                        success: function(respuesta) {
                            window.location = "/funcionario/gestion_pqr"
                        },
                        error: function(error) {
                            console.log(error.responseJSON)
                        }
                    });
                }

            }
        })
    }

    //Guardar aprueba y radica anexo  
    if(document.querySelector('.btn-pqr-aprueba-radica')){
        let btnRespuesta = document.querySelector('.btn-pqr-aprueba-radica')
        btnRespuesta.addEventListener('click', function(e){
            e.preventDefault
            let contenedorPadre = btnRespuesta.parentElement.parentElement.parentElement
            let url = e.target.getAttribute('data_url')
            let url2 = e.target.getAttribute('data_url2')
            let url3 = e.target.getAttribute('data_url3')
            let token = e.target.getAttribute('data_token')
            let tipo_respuesta = document.querySelector('.tipo_respuesta').value
            let concedeRecursoApelacion = false
            if(document.querySelector('.concede_recurso_apelacion')){
                concedeRecursoApelacion = document.querySelector('.concede_recurso_apelacion').checked
            }
            let mensajeHistorial = contenedorPadre.querySelector('.mensaje-historial-tarea').value
            if (mensajeHistorial != '' && idPqr != '') {
                let data1 = {
                    idTarea: "3",
                    mensajeHistorial: 'Radicada automaticamente.',
                    idPqr,
                    tipo_respuesta,
                    concedeRecursoApelacion
                }
                $.ajax({
                    url: url2,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data1,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                $.ajax({
                    url: url3,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data1,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                let data = {
                    idTarea,
                    mensajeHistorial,
                    idPqr,
                    apruebaRadica : 1,
                    tipo_respuesta,
                    concedeRecursoApelacion
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
                $.ajax({
                    url: url2,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                $.ajax({
                    url: url3,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                let data2 = {
                    idTarea: "5",
                    mensajeHistorial: 'Radicada automaticamente.',
                    idPqr,
                    tipo_respuesta,
                    concedeRecursoApelacion
                }
                $.ajax({
                    url: url2,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data2,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                $.ajax({
                    url: url3,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data2,
                    success: function(respuesta) {
                        window.location = "/funcionario/gestion_pqr"
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
            }else{
                alert('Debe diligenciar todos los campos del formulario')
            }
        })
    }
    //Guardar aprueba anexo  
    if(document.querySelector('.btn-pqr-aprueba')){
        let btnRespuesta = document.querySelector('.btn-pqr-aprueba')
        btnRespuesta.addEventListener('click', function(e){
            e.preventDefault
            let contenedorPadre = btnRespuesta.parentElement.parentElement.parentElement
            let url = e.target.getAttribute('data_url')
            let url2 = e.target.getAttribute('data_url2')
            let url3 = e.target.getAttribute('data_url3')
            let token = e.target.getAttribute('data_token')
            let mensajeHistorial = contenedorPadre.querySelector('.mensaje-historial-tarea').value
            let titulo = contenedorPadre.querySelector('.titulo').value
            let descripcion = contenedorPadre.querySelector('.descripcion').value
            let archivo = contenedorPadre.querySelector('.anexo').files[0]
            let dataAnexo = new FormData();
            dataAnexo.append('pqr_id', idPqr);
            dataAnexo.append('titulo', titulo);
            dataAnexo.append('descripcion', descripcion);
            dataAnexo.append('archivo', archivo);
            dataAnexo.append('idTarea', idTarea);
            dataAnexo.append('_token', token);
            if (titulo != '' && archivo  && mensajeHistorial != '' && idPqr != '') {
                let data = {
                    idTarea,
                    mensajeHistorial,
                    idPqr
                }
                $.ajax({
                    async:false,
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: dataAnexo,
                    processData: false, 
                    contentType: false,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
                $.ajax({
                    url: url2,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                $.ajax({
                    url: url3,
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
            }else{
                alert('Debe diligenciar todos los campos del formulario')
            }
        })
    }

    // Ajuste visual para formulario recurso 
    if(document.querySelector('.respuestaRecurso')){
        let verificacionRecurso = document.querySelector('.respuestaRecurso')
        if(verificacionRecurso.value == 1){
            verificacionRecurso.parentElement.querySelector('.recurso_si').setAttribute('checked','')
            verificacionRecurso.parentElement.querySelector('.recurso_no').setAttribute('disabled','')
        }else{
            verificacionRecurso.parentElement.querySelector('.recurso_no').setAttribute('checked','')
            verificacionRecurso.parentElement.querySelector('.recurso-form').classList.add('d-none')
        }
    }

    $('.recurso_check').on('change', function(e) {
        let padre = e.target.parentNode.parentNode.parentNode
        switch (e.target.value) {
            case '1':
                padre.querySelector('.recurso-form').classList.remove('d-none');
                break;
            case '0':
                padre.querySelector('.recurso-form').classList.add('d-none');
                break;
        }
    });

    // Guardar recursos
    if(document.querySelector('#plazo_recurso_guardar')){
        let plazoRecurso = document.querySelector('#plazo_recurso_guardar')
        plazoRecurso.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let plazo_recurso = document.querySelector('#plazo_recurso').value
            let apelacion = document.querySelector('input[name="apelacion"]:checked').value
            if(plazo_recurso != ''){
                let data = {
                    plazo_recurso,
                    apelacion,
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
                        console.log(error)
                    }
                });
            }else{
                alert('Debe agragar plazo de días')
            }
        })
    }
})
