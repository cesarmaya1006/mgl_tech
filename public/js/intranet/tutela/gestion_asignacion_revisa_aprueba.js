window.addEventListener('DOMContentLoaded', function(){
    let idAuto = document.querySelector('.id_auto').value
    let idTarea = document.querySelector('.id_tarea').value
    // Guardar Confirmacion regresar a proyecta
    if(document.querySelector('.btn-tutela-aprueba-regresa')){
        let btnRespuesta = document.querySelector('.btn-tutela-aprueba-regresa')
        btnRespuesta.addEventListener('click', function(e){
            e.preventDefault
            let contenedorPadre = btnRespuesta.parentElement.parentElement.parentElement
            let url = e.target.getAttribute('data_url')
            let url2 = e.target.getAttribute('data_url2')
            let token = e.target.getAttribute('data_token')
            let mensajeHistorial = contenedorPadre.querySelector('.mensaje-historial-tarea').value
            if (mensajeHistorial != '') {
                let data = {
                    idTarea,
                    mensajeHistorial,
                    idAuto,
                    estado: 1
                }
                let data2 = {
                    idTarea: 3,
                    mensajeHistorial: "Revisión no aprobada.",
                    idAuto,
                    estado: 6
                }
                regresarProyecta(data2)
                regresarProyecta(data)
            }

            function regresarProyecta(data){
                $.ajax({
                    url: url,
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
            }
            window.location = "/admin/gestion"
        })
    }
    //Guardar revisa, aprueba y radica anexo  
    if(document.querySelector('.btn-tutela-aprueba-radica')){
        let btnRespuesta = document.querySelector('.btn-tutela-aprueba-radica')
        btnRespuesta.addEventListener('click', function(e){
            e.preventDefault
            let contenedorPadre = btnRespuesta.parentElement.parentElement.parentElement
            let url = e.target.getAttribute('data_url')
            let url2 = e.target.getAttribute('data_url2')
            let url3 = e.target.getAttribute('data_url3')
            let token = e.target.getAttribute('data_token')
            let tipo_respuesta = document.querySelector('.tipo_respuesta').value
            let mensajeHistorial = contenedorPadre.querySelector('.mensaje-historial-tarea').value
            if (mensajeHistorial != '' && idAuto != '') {
                let data2 = {
                    idTarea: "3",
                    mensajeHistorial: 'Revisión Aprobada.',
                    idAuto,
                    tipo_respuesta
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
                        // console.log(respuesta)
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });

                let data = {
                    idTarea,
                    mensajeHistorial,
                    idAuto,
                    apruebaRadica : 1,
                    tipo_respuesta
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

                let data3 = {
                    idTarea: "5",
                    mensajeHistorial: 'Radicada automaticamente.',
                    idAuto,
                    tipo_respuesta
                }
                $.ajax({
                    url: url2,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data3,
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
                    data: data3,
                    success: function(respuesta) {
                        window.location = "/admin/gestion"
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
    //Guardar revisa, aprueba anexo  
    if(document.querySelector('.btn-tutela-aprueba')){
        let btnRespuesta = document.querySelector('.btn-tutela-aprueba')
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
            dataAnexo.append('tutela_id', idAuto);
            dataAnexo.append('titulo', titulo);
            dataAnexo.append('descripcion', descripcion);
            dataAnexo.append('archivo', archivo);
            dataAnexo.append('idTarea', idTarea);
            dataAnexo.append('_token', token);
            if (titulo != '' && archivo  && mensajeHistorial != '' && idAuto != '') {
                let data = {
                    idTarea,
                    mensajeHistorial,
                    idAuto
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
                        window.location = "/admin/gestion"
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

})

