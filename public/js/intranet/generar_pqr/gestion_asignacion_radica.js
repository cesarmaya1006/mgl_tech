window.addEventListener('DOMContentLoaded', function(){
    let idPqr = document.querySelector('#id_pqr').value
    let idTarea = document.querySelector('#id_tarea').value

    // Guardar Confirmacion revición
    if(document.querySelector('.btn-pqr-radica')){
        let btnRespuesta = document.querySelector('.btn-pqr-radica')
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
                    idPqr
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
                        window.location = "/funcionario/gestion_pqr"
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
            }
        })
    }
})
