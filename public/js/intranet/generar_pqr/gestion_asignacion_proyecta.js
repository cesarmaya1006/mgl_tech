window.addEventListener('DOMContentLoaded', function(){
    let idPqr = document.querySelector('#id_pqr').value
    let idTarea = document.querySelector('#id_tarea').value
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

//  Guardar Historial PQR-peticion  
    if(document.querySelector('.guardarHistorialPeticion')){
        let HistorialPeticiones = document.querySelectorAll('.guardarHistorialPeticion')
        HistorialPeticiones.forEach(btn => btn.addEventListener('click', guardarHistorialPeticiones))
        function guardarHistorialPeticiones(btn){
            btn.preventDefault()
            let contenedorHisotrial = btn.target.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-peticion').value
            let idPeticion = contenedorHisotrial.querySelector('.id_peticion').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            }else{
                guardarHistorialPeticion()
            }
    
            function guardarHistorialPeticion (){
                let data = {
                    mensajeHistorial,
                    idPqr,
                    idPeticion
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
        }   
    }

// Guardar asignar petición a funcionario
    if(document.querySelector('#asignacion_peticion_guardar')){
        let asignacionPeticion = document.querySelector('#asignacion_peticion_guardar')
        asignacionPeticion.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let peticion = document.querySelector('#peticion').value
            let funcionario = document.querySelector('#funcionario').value
            let cargo = document.querySelector('#cargo').value
            if (peticion == '' || cargo == '' || funcionario == '' ) {
                alert("Debe dilegenciar todos los campos del formulario")
            }else{
                guardarAsignacionPeticion()
            }
            function guardarAsignacionPeticion (){
                let data = {
                    peticion,
                    funcionario,
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

// Guardar prioridad pqr
    if(document.querySelector('#prioridad_guardar')){
        let prioridadGuardar = document.querySelector('#prioridad_guardar')
        prioridadGuardar.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let prioridad = document.querySelector('#prioridad').value
            if (prioridad == '' ) {
                alert("Debe dilegenciar todos los campos del formulario")
            }else{
                guardarPrioridad()
            }
            function guardarPrioridad (){
                let data = {
                    prioridad,
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

// Cargar estado prorroga
    if(document.querySelector('.respuestaProrroga')){
        let verificacionProrroga = document.querySelector('.respuestaProrroga')
        if(verificacionProrroga.value == 0){
            verificacionProrroga.parentElement.querySelector('.prorroga_no').setAttribute('checked','')
            verificacionProrroga.parentElement.querySelector('.contentProrroga').classList.add('d-none')
        }
    }

// Ajuste visual para formulario prorroga 
    $('input[type=radio][name=prorroga]').on('change', function() {
        switch ($(this).val()) {
            case '1':
                $('.contentProrroga').removeClass('d-none');
                break;
            case '0':
                $('.contentProrroga').addClass('d-none');
                break;
        }
    });

// Guardar prorroga 
    if(document.querySelector('#guardarProrroga')){
        let guardarProrroga = document.querySelector('#guardarProrroga')
        guardarProrroga.addEventListener('click', function(e){
            e.preventDefault()
            let url = e.target.getAttribute('data_url')
            let token = e.target.getAttribute('data_token')
            let plazo_prorroga = document.querySelector('#plazo_prorroga').value
            let prorroga_pdf = document.querySelector('#prorroga_pdf').value
            let plazoRecurso = 0
            if(document.querySelector('.plazoRecurso')){
                plazoRecurso = document.querySelector('.plazoRecurso').value
            }
    
            if(plazo_prorroga != '' && prorroga_pdf != ''){
                let data = {
                    prorroga : 1,
                    plazo_prorroga,
                    prorroga_pdf,
                    idPqr,
                    plazoRecurso
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
                alert('Debe diligenciar todos los campos del formulario')
            }
        })
    }

//Guardar respuesta anexo  
if(document.querySelector('.btn-pqr-anexo')){
    let btnRespuesta = document.querySelector('.btn-pqr-anexo')
    btnRespuesta.addEventListener('click', function(e){
        e.preventDefault
        let contenedorPadre = btnRespuesta.parentElement.parentElement.parentElement
        let url = e.target.getAttribute('data_url')
        let url2 = e.target.getAttribute('data_url2')
        let url3 = e.target.getAttribute('data_url3')
        let token = e.target.getAttribute('data_token')
        let mensajeHistorial = contenedorPadre.querySelector('.mensaje-historial-tarea').value
        if (mensajeHistorial != '' && idPqr != '') {
            let data = {
                idTarea,
                mensajeHistorial,
                idPqr
            }
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

// Guardar estado 
if(document.querySelector('.btn-estado')){
    let btnEstados = document.querySelectorAll('.btn-estado')
    btnEstados.forEach(btn=> btn.addEventListener('click', guardarEstado))

    function guardarEstado(btn){
        btn.preventDefault()
        let btnE = btn.target 
        if (btnE.tagName === 'I') {
            padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            btnE = btnE.parentElement.parentElement
        }else {
            padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement
        }
        let url = btnE.getAttribute('data_url')
        let token = btnE.getAttribute('data_token')
        let estado = padreEstado.querySelector('.estadoPeticion').value
        let id_peticion = padreEstado.querySelector('.id_peticion').value
        let data = {
            estado,
            id_peticion
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
    }
}

//Guardar resuelve  
if(document.querySelector('.btn-pqr-resuelve')){
    let btnResuelve = document.querySelector('.btn-pqr-resuelve')
    btnResuelve.addEventListener('click', function(e){
        e.preventDefault
        let contenedorPadre = btnResuelve.parentElement.parentElement.parentElement
        let url = e.target.getAttribute('data_url')
        let token = e.target.getAttribute('data_token')
        let mensajeResuelve = contenedorPadre.querySelector('.mensaje-resuelve').value
        let idPqr = document.querySelector('#id_pqr').value
        if (mensajeResuelve != '' && idPqr != '') {
            let data = {
                mensajeResuelve,
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
            alert('Debe diligenciar el campo del formulario')
        }
    })
}

//Eliminar resuelve  
if(document.querySelectorAll('.eliminarResuelve')){
    let btnEliminaResuelves = document.querySelectorAll('.eliminarResuelve')
    btnEliminaResuelves.forEach(btnEliminar => {
        btnEliminar.addEventListener('click', function(btn){
            btn.preventDefault
            let btnElim = btn.target
            if (!btnElim.classList.contains('.eliminarResuelve')) {
                btnElim = btnElim.parentNode
            }
            let url = btnElim.getAttribute('data_url')
            let token = btnElim.getAttribute('data_token')
            let value = btnElim.value
            let data = {
                value
            }
            swal({
                title: "¿Desea eliminar recurso?",
                icon: "warning",
                buttons: ["No", "Si"],
                dangerMode: true,
            })
            .then((value) => {
                if (value) {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data,
                        success: function(respuesta) {
                            setTimeout(function(){
                                location.reload();
                            }, 3000);
                        },
                        error: function(error) {
                        }
                    });
                }
            });
        })
    })
}

//Editar resuelve  
if(document.querySelectorAll('.editarResuelve')){
    let resuelves = document.querySelectorAll('.editarResuelve')
    resuelves.forEach(resuelve => {
        resuelve.addEventListener('click', editarResuelve)
    })
    function editarResuelve(resuelve){
        let resuelveBtn = resuelve.target
        if (resuelveBtn.classList.contains('editarResuelve-i')) {
            resuelveBtn = resuelve.target.parentNode
        }else {
            resuelveBtn = resuelve.target
        }
        let tdResuelve = resuelveBtn.parentElement.parentElement.parentElement
        let contenidoAnteriorResuelve = tdResuelve.querySelector('.contenido-resuelve input').value
        let valueResuelve = tdResuelve.querySelector('.editarResuelve').value
        let modalResuelveEditar = document.querySelector('.bd-resuelve')
        let textareaResuelveEditar = modalResuelveEditar.querySelector('.note-editable')
        let btnGuardarResuelve = modalResuelveEditar.querySelector('.editarResuelveGuardar')
        textareaResuelveEditar.innerHTML = contenidoAnteriorResuelve
        btnGuardarResuelve.value = valueResuelve
    }
}

//Guardar Editar resuelve  
if(document.querySelector('.editarResuelveGuardar')){
    let btnResuelve = document.querySelector('.editarResuelveGuardar')
    btnResuelve.addEventListener('click', function(resuelve){
        resuelve.preventDefault()
        let url = resuelve.target.getAttribute('data_url')
        let token = resuelve.target.getAttribute('data_token')
        let contenidoResuelve = resuelve.target.parentElement.parentElement
        let resuelveNuevo = contenidoResuelve.querySelector('.mensaje-resuelve-editar').value
        let value = contenidoResuelve.querySelector('.editarResuelveGuardar').value
        let data = {
            value,
            resuelveNuevo
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
    })
}

//Editar orden resuelve  
if(document.querySelector('.btn-ordenar')){
    let btnOrdenar = document.querySelector('.btn-ordenar')
    btnOrdenar.addEventListener('click', function(btn){
        btn.preventDefault()
        let orden = document.querySelector('.orden-resuelve')
        let ordenEditar = document.querySelector('.editar-orden-resuelve')
        let btnGuardar = document.querySelector('.btn-ordenar-guardar')
        if (orden.classList.contains('d-none')) {
            orden.classList.remove('d-none')
            ordenEditar.classList.add('d-none')
            btnGuardar.classList.add('d-none')
        }else{
            btnGuardar.classList.remove('d-none')
            ordenEditar.classList.remove('d-none')
            orden.classList.add('d-none')
        }
    })
}

//Guardar orden resuelve  
if(document.querySelector('.btn-ordenar-guardar')){
    let btnGuardarOrden = document.querySelector('.btn-ordenar-guardar')
    btnGuardarOrden.addEventListener('click', function(btn){
        btn.preventDefault()
        let url = btn.target.getAttribute('data_url')
        let token = btn.target.getAttribute('data_token')
        let ordenEditar = document.querySelector('.editar-orden-resuelve')
        let trs = ordenEditar.querySelectorAll('tr')
        let dataOrden = []
        let validadorConsecutivo = true
        trs.forEach((tr, key) => {
            dataOrden.push(tr.querySelector('.select-orden').value)
        })
        dataOrden.forEach((orden, key )=>{
            let index = key + 1
            if(index != dataOrden.find(item => item == index)){
                alert("¡Error! El consecutivo de orden no puede estar duplicado.")
                validadorConsecutivo = false
            }
        })
        if(validadorConsecutivo){
            trs.forEach((tr) => {
                let data = {
                    orden : tr.querySelector('.select-orden').value,
                    id : tr.querySelector('.editarResuelve').value
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
            })
            location.reload();
        }
    })

}

//==========================================================================

//Guardar resuelve  recurso
if(document.querySelector('.btn-pqr-resuelve-recurso')){
    let btnResuelve = document.querySelector('.btn-pqr-resuelve-recurso')
    btnResuelve.addEventListener('click', function(e){
        e.preventDefault
        let contenedorPadre = btnResuelve.parentElement.parentElement.parentElement
        let url = e.target.getAttribute('data_url')
        let token = e.target.getAttribute('data_token')
        let mensajeResuelve = contenedorPadre.querySelector('.mensaje-resuelve').value
        let tipoRecurso = contenedorPadre.querySelector('.resuelve-recurso_tipo').value
        let idPqr = document.querySelector('#id_pqr').value
        if (mensajeResuelve != '' && idPqr != '') {
            let data = {
                mensajeResuelve,
                idPqr,
                tipoRecurso
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
            alert('Debe diligenciar el campo del formulario')
        }
    })
}

// Eliminar resuelve recurso
if(document.querySelectorAll('.eliminarResuelveRecurso')){
    let btnEliminaResuelves = document.querySelectorAll('.eliminarResuelveRecurso')
    btnEliminaResuelves.forEach(btnEliminar => {
        btnEliminar.addEventListener('click', function(btn){
            btn.preventDefault
            let btnElim = btn.target
            if (!btnElim.classList.contains('.eliminarResuelveRecurso')) {
                btnElim = btnElim.parentNode
            }
            let url = btnElim.getAttribute('data_url')
            let token = btnElim.getAttribute('data_token')
            let value = btnElim.value
            let data = {
                value
            }
            swal({
                title: "¿Desea eliminar recurso?",
                icon: "warning",
                buttons: ["No", "Si"],
                dangerMode: true,
            })
            .then((value) => {
                if (value) {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data,
                        success: function(respuesta) {
                            // setTimeout(function(){
                                location.reload();
                            // }, 3000);
                        },
                        error: function(error) {
                        }
                    });
                }
            });
        })
    })
}

// Editar resuelve recurso
if(document.querySelectorAll('.editarResuelveRecurso')){
    let resuelves = document.querySelectorAll('.editarResuelveRecurso')
    resuelves.forEach(resuelve => {
        resuelve.addEventListener('click', editarResuelve)
    })
    function editarResuelve(resuelve){
        let resuelveBtn = resuelve.target
        if (resuelveBtn.classList.contains('editarResuelveRecurso-i')) {
            resuelveBtn = resuelve.target.parentNode
        }else {
            resuelveBtn = resuelve.target
        }
        let tdResuelve = resuelveBtn.parentElement.parentElement.parentElement
        let contenidoAnteriorResuelve = tdResuelve.querySelector('.contenido-resuelve input').value
        let valueResuelve = tdResuelve.querySelector('.editarResuelveRecurso').value
        let modalResuelveEditar = document.querySelector('.bd-resuelve')
        let textareaResuelveEditar = modalResuelveEditar.querySelector('.note-editable')
        let btnGuardarResuelve = modalResuelveEditar.querySelector('.editarResuelveRecursoGuardar')
        textareaResuelveEditar.innerHTML = contenidoAnteriorResuelve
        btnGuardarResuelve.value = valueResuelve
    }
}

//Guardar Editar resuelve  
if(document.querySelector('.editarResuelveRecursoGuardar')){
    let btnResuelve = document.querySelector('.editarResuelveRecursoGuardar')
    btnResuelve.addEventListener('click', function(resuelve){
        resuelve.preventDefault()
        let url = resuelve.target.getAttribute('data_url')
        let token = resuelve.target.getAttribute('data_token')
        let contenidoResuelve = resuelve.target.parentElement.parentElement
        let resuelveNuevo = contenidoResuelve.querySelector('.mensaje-resuelve-editar').value
        let value = contenidoResuelve.querySelector('.editarResuelveRecursoGuardar').value
        let data = {
            value,
            resuelveNuevo
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
    })
}

//Editar orden resuelve  
if(document.querySelector('.btn-ordenar-recurso')){
    let btnOrdenar = document.querySelector('.btn-ordenar-recurso')
    btnOrdenar.addEventListener('click', function(btn){
        btn.preventDefault()
        let orden = document.querySelector('.orden-resuelve')
        let ordenEditar = document.querySelector('.editar-orden-resuelve')
        let btnGuardar = document.querySelector('.btn-ordenar-recurso-guardar')
        if (orden.classList.contains('d-none')) {
            orden.classList.remove('d-none')
            ordenEditar.classList.add('d-none')
            btnGuardar.classList.add('d-none')
        }else{
            btnGuardar.classList.remove('d-none')
            ordenEditar.classList.remove('d-none')
            orden.classList.add('d-none')
        }
    })
}

// Guardar orden resuelve  
if(document.querySelector('.btn-ordenar-recurso-guardar')){
    let btnGuardarOrden = document.querySelector('.btn-ordenar-recurso-guardar')
    btnGuardarOrden.addEventListener('click', function(btn){
        btn.preventDefault()
        let url = btn.target.getAttribute('data_url')
        let token = btn.target.getAttribute('data_token')
        let ordenEditar = document.querySelector('.editar-orden-resuelve')
        let trs = ordenEditar.querySelectorAll('tr')
        let dataOrden = []
        let validadorConsecutivo = true
        trs.forEach((tr, key) => {
            dataOrden.push(tr.querySelector('.select-orden').value)
        })
        dataOrden.forEach((orden, key )=>{
            let index = key + 1
            if(index != dataOrden.find(item => item == index)){
                alert("¡Error! El consecutivo de orden no puede estar duplicado.")
                validadorConsecutivo = false
            }
        })
        if(validadorConsecutivo){
            trs.forEach((tr) => {
                let data = {
                    orden : tr.querySelector('.select-orden').value,
                    id : tr.querySelector('.editarResuelveRecurso').value
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
            })
            location.reload();
        }
    })

}

// Funcion check multiple peticiones
if (document.querySelectorAll('.check-todos-peticiones')) {
    let checkTodos = document.querySelectorAll('.check-todos-peticiones');
    checkTodos.forEach((check) => {
        check.addEventListener('input', seleccionMultiple);
    });

    function seleccionMultiple(btn) {
        let check = btn.target;
        let contenedorPadre = check.parentElement.parentElement;
        let selectores = contenedorPadre.querySelectorAll('.select-peticion');
        if (check.checked) {
            selectores.forEach((selector) => {
                if (!selector.disabled) {
                    selector.checked = true;
                }
            });
        } else {
            selectores.forEach((selector) => {
                if (!selector.disabled) {
                    selector.checked = false;
                }
            });
        }
    }
}

// Guardar asignar peticion a funcionario
if (document.querySelector('.asignacion_peticion_guardar')) {
    let asignacionPeticion = document.querySelector('.asignacion_peticion_guardar');
    asignacionPeticion.addEventListener('click', function(e) {
        e.preventDefault();
        let padreContenedor = e.target.parentElement.parentElement;
        let url = e.target.getAttribute('data_url');
        let token = e.target.getAttribute('data_token');
        let funcionario = padreContenedor.querySelector('.funcionario').value;
        let cargo = padreContenedor.querySelector('.cargo').value;
        let peticiones = document.querySelectorAll('.select-peticion');
        let peticionesAsignar = [];
        peticiones.forEach((peticion) => {
            if (peticion.checked) {
                peticionesAsignar.push(peticion);
            }
        });
        if (peticionesAsignar.length == 0 || cargo == '' || funcionario == '') {
            alert('Debe dilegenciar todos los campos del formulario');
        } else {
            peticionesAsignar.forEach((peticion) => {
                guardarAsignacionPeticion(peticion.value);
            });
        }

        function guardarAsignacionPeticion(value) {
            let data = {
                peticion: value,
                funcionario,
                idPqr
            };
            $.ajax({
                url: url,
                type: 'POST',
                headers: { 'X-CSRF-TOKEN': token },
                data: data,
                success: function(respuesta) {
                    location.reload();
                },
                error: function(error) {
                    console.log(error.responseJSON);
                }
            });
        }
    });
}

//==========================================================================
    $(document).ready(function() {
        $('.mensaje-resuelve').summernote({
            tabsize: 2,
            height: 120,
            toolbar: [
              ['font', ['bold', 'underline', 'italic', 'clear' ]],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture']],
            ]
          })
    });
//==========================================================================
    $(document).ready(function() {
        $('.mensaje-resuelve-editar').summernote({
            tabsize: 2,
            height: 320,
            toolbar: [
              ['font', ['bold', 'underline', 'italic', 'clear' ]],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture']],
            ]
          })
    });
})

