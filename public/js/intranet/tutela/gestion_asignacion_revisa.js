window.addEventListener('DOMContentLoaded', function(){
    let idAuto = document.querySelector('.id_auto').value
    let idTarea = document.querySelector('.id_tarea').value

    // Guardar Confirmacion revición
    if(document.querySelector('.btn-tutela-revisa')){
        let btnRespuesta = document.querySelector('.btn-tutela-revisa')
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
                    idAuto
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
                        console.log(error.responseJSON)
                    }
                });

                $.ajax({
                    url: url2,
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
            }
        })
    }
    // Guardar Confirmacion regresar a proyecta
    if(document.querySelector('.btn-tutela-revisa-regresa')){
        let btnRespuesta = document.querySelector('.btn-tutela-revisa-regresa')
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
                    estado: 6
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
                        console.log(error.responseJSON)
                    }
                });

                $.ajax({
                    url: url2,
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
            }
        })
    }
})

