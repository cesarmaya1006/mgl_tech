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
            let idTarea = document.querySelector('#id_tarea').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            }else{
                guardarHistorialTarea()
            }

            function guardarHistorialTarea (){
                let data = {
                    mensajeHistorial,
                    idPqr,
                    idTarea
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

