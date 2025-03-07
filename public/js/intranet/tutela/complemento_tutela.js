window.addEventListener('DOMContentLoaded', function () {
    // Inicio Función para generar varios hechos.
    let btncrearHecho = document.querySelector('.crearHecho')
    btncrearHecho.addEventListener('click', crearNuevoHecho)
    let btnEliminarHechos = document.querySelectorAll('.eliminar_contenido_hechos')
    btnEliminarHechos.forEach(btn => {
        btn.addEventListener('click', agregarEliminarHecho)
    })

    function crearNuevoHecho(e) {
        e.preventDefault()
        let containerHecho = e.target.parentNode.parentNode
        let nuevoHecho = containerHecho.querySelectorAll('.contenido_hecho')[0].cloneNode(true)
        nuevoHecho.querySelector('.hecho').value = ''
        containerHecho.querySelector('.bloque_hecho').appendChild(nuevoHecho)
        document.querySelectorAll('.eliminar_contenido_hechos').forEach(item => item.addEventListener('click', agregarEliminarHecho))
    }

    function agregarEliminarHecho(e) {
        e.preventDefault()
        let bloqueHecho = e.target
        if (bloqueHecho.tagName === 'I') {
            bloqueHecho = bloqueHecho.parentNode.parentNode.parentNode
        }else {
            bloqueHecho = bloqueHecho.parentNode.parentNode
        }
        if (document.querySelectorAll('.contenido_hecho').length >= 2) {
            let idHecho = e.target
            if (idHecho.tagName === 'I') {
                idHecho = idHecho.parentNode.parentNode.parentNode
            } else {
                idHecho = idHecho.parentNode.parentNode
            }
            idHecho.remove()
        }
    }
    // Fin Función para generar varios hechos.
    // --------------------------------------------------------------------------------------------------------------------
    // Inicio Función para generar varias pretenciones.
    let btncrearPretension = document.querySelector('.crearPretension')
    btncrearPretension.addEventListener('click', crearNuevoPrestension)
    let btnEliminarPrestensiones = document.querySelectorAll('.eliminar_contenido_pretensiones')
    btnEliminarPrestensiones.forEach(btn => {
        btn.addEventListener('click', agregarEliminarPretensiones)
    })

    function crearNuevoPrestension(e) {
        e.preventDefault()
        let containerPretension = e.target.parentNode.parentNode
        let nuevoPretension = containerPretension.querySelectorAll('.contenido_pretension')[0].cloneNode(true)
        nuevoPretension.querySelector('.pretension').value = ''
        containerPretension.querySelector('.bloque_pretension').appendChild(nuevoPretension)
        document.querySelectorAll('.eliminar_contenido_pretensiones').forEach(item => item.addEventListener('click', agregarEliminarPretensiones))
    }

    function agregarEliminarPretensiones(e) {
        e.preventDefault()
        let bloquePretension = e.target
        if (bloquePretension.tagName === 'I') {
            bloquePretension = bloquePretension.parentNode.parentNode.parentNode
        }else {
            bloquePretension = bloquePretension.parentNode.parentNode
        }
        if (document.querySelectorAll('.contenido_pretension').length >= 2) {
            let idPretension = e.target
            if (idPretension.tagName === 'I') {
                idPretension = idPretension.parentNode.parentNode.parentNode
            } else {
                idPretension = idPretension.parentNode.parentNode
            }
            idPretension.remove()
        }
    }
    // Fin Función para generar varias pretenciones.
    // --------------------------------------------------------------------------------------------------------------------
    // Inicio Función para generar varios argumetos.
    let btncrearArgumento = document.querySelector('.crearArgumento')
    btncrearArgumento.addEventListener('click', crearNuevoArgumento)
    let btnEliminarArgumentos = document.querySelectorAll('.eliminar_contenido_argumentos')
    btnEliminarArgumentos.forEach(btn => {
        btn.addEventListener('click', agregarEliminarArgumentos)
    })

    function crearNuevoArgumento(e) {
        e.preventDefault()
        let containerArgumento = e.target.parentNode.parentNode
        let nuevoArgumento = containerArgumento.querySelectorAll('.contenido_argumento')[0].cloneNode(true)
        nuevoArgumento.querySelector('.argumento').value = ''
        containerArgumento.querySelector('.bloque_argumento').appendChild(nuevoArgumento)
        document.querySelectorAll('.eliminar_contenido_argumentos').forEach(item => item.addEventListener('click', agregarEliminarArgumentos))
    }

    function agregarEliminarArgumentos(e) {
        e.preventDefault()
        let bloqueArgumento = e.target
        if (bloqueArgumento.tagName === 'I') {
            bloqueArgumento = bloqueArgumento.parentNode.parentNode.parentNode
        }else {
            bloqueArgumento = bloqueArgumento.parentNode.parentNode
        }
        if (document.querySelectorAll('.contenido_argumento').length >= 2) {
            let idArgumento = e.target
            if (idArgumento.tagName === 'I') {
                idArgumento = idArgumento.parentNode.parentNode.parentNode
            } else {
                idArgumento = idArgumento.parentNode.parentNode
            }
            idArgumento.remove()
        }
    }
    // Fin Función para generar varios argumentos.
    // --------------------------------------------------------------------------------------------------------------------
    // Inicio Función para generar varios anexos pruebas.
    let btncrearAnexo = document.querySelector('.crearAnexo')
    btncrearAnexo.addEventListener('click', crearNuevoAnexo)
    let btnEliminarAnexos = document.querySelectorAll('.eliminar_contenido_anexo')
    btnEliminarAnexos.forEach(btn => {
        btn.addEventListener('click', agregarEliminarAnexo)
    })

    function crearNuevoAnexo(e) {
        e.preventDefault()
        let containerAnexo = e.target.parentNode.parentNode
        let nuevoAnexo = containerAnexo.querySelectorAll('.contenido_anexo')[0].cloneNode(true)
        nuevoAnexo.querySelector('.titulo-anexo input').value = ''
        nuevoAnexo.querySelector('.descripcion-anexo input').value = ''
        nuevoAnexo.querySelector('.anexo input').value = ''
        containerAnexo.querySelector('.bloque_anexos').appendChild(nuevoAnexo)
        document.querySelectorAll('.eliminar_contenido_anexo').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
    }

    function agregarEliminarAnexo(e) {
        e.preventDefault()
        let bloqueAnexo = e.target
        if (bloqueAnexo.tagName === 'I') {
            bloqueAnexo = bloqueAnexo.parentNode.parentNode.parentNode
        }else {
            bloqueAnexo = bloqueAnexo.parentNode.parentNode
        }
        if (document.querySelectorAll('.contenido_anexo').length >= 2) {
            let idAnexo = e.target
            if (idAnexo.tagName === 'I') {
                idAnexo = idAnexo.parentNode.parentNode.parentNode
            } else {
                idAnexo = idAnexo.parentNode.parentNode
            }
            idAnexo.remove()
        }
    }
    // Fin Función para generar varios anexos pruebas.
    // --------------------------------------------------------------------------------------------------------------------
    // Inicio Función para generar varias tutelas.
    let btncrearMotivo = document.querySelector('.crearMotivo')
    btncrearMotivo.addEventListener('click', crearNuevoMotivo)
    let btnEliminarMotivos = document.querySelectorAll('.eliminar_contenido_motivo')
    btnEliminarMotivos.forEach(btn => {
        btn.addEventListener('click', agregarEliminarMotivo)
    })

    function crearNuevoMotivo(e) {
        e.preventDefault()
        let containerMotivo = e.target.parentNode.parentNode
        let nuevoMotivo = containerMotivo.querySelectorAll('.contenido_motivo')[0].cloneNode(true)
        containerMotivo.querySelector('.bloque_motivos').appendChild(nuevoMotivo)
        document.querySelectorAll('.eliminar_contenido_motivo').forEach(item => item.addEventListener('click', agregarEliminarMotivo))
    }

    function agregarEliminarMotivo(e) {
        e.preventDefault()
        let bloqueMotivo = e.target
        if (bloqueMotivo.tagName === 'I') {
            bloqueMotivo = bloqueMotivo.parentNode.parentNode.parentNode
        }else {
            bloqueMotivo = bloqueMotivo.parentNode.parentNode
        }
        if (document.querySelectorAll('.contenido_motivo').length >= 2) {
            let idMotivo = e.target
            if (idMotivo.tagName === 'I') {
                idMotivo = idMotivo.parentNode.parentNode.parentNode
            } else {
                idMotivo = idMotivo.parentNode.parentNode
            }
            idMotivo.remove()
        }
    }
    // Fin Función para generar varias tutelas.
    // ---------------------------------------------------------------------------------------------------------

    // Inicio guardar auto admisorio  
    if(document.querySelector('.btn-complemento-tutela')){
        let btnGuardarComplemento = document.querySelector('.btn-complemento-tutela')
        btnGuardarComplemento.addEventListener('click', function(e){
            e.preventDefault
            let btnGuardar = e.target
            btnGuardar.setAttribute('disabled','' )
            let contenedorPadre = document.querySelector('.form_auto_admisorio_complemento')
            let url = e.target.getAttribute('data_url')
            let url1 = e.target.getAttribute('data_url1')
            let url2 = e.target.getAttribute('data_url2')
            let url3 = e.target.getAttribute('data_url3')
            let url4 = e.target.getAttribute('data_url4')
            let url5 = e.target.getAttribute('data_url5')
            let token = e.target.getAttribute('data_token')
            let auto_admisorio_id = contenedorPadre.querySelector('.auto_admisorio_id').value
            let check_cantidad_hechos = contenedorPadre.querySelector('.check-input-hechos').checked
            let check_cantidad_pretensiones = contenedorPadre.querySelector('.check-input-pretensiones').checked
            let cantidad_hechos = contenedorPadre.querySelector('.cantidad-hechos').value
            let cantidad_pretensiones = contenedorPadre.querySelector('.cantidad-pretensiones').value
            let motivos = contenedorPadre.querySelectorAll('.contenido_motivo')
            let validacion = false
            let hechos = contenedorPadre.querySelectorAll('.contenido_hecho')
            let pretensiones = contenedorPadre.querySelectorAll('.contenido_pretension')
            if(check_cantidad_hechos){
                if(!cantidad_hechos){
                    validacion = true
                }
            }else{
                hechos.forEach(hecho => {
                    if(!hecho.querySelector('.hecho').value){
                        validacion = true
                    }
                })
            }
            if(check_cantidad_pretensiones){
                if(!cantidad_pretensiones){
                    validacion = true
                }
            }else{
                pretensiones.forEach(pretension => {
                    if(!pretension.querySelector('.pretension').value){
                        validacion = true
                    }
                })
            }
            motivos.forEach(motivo => {
                let selects = motivo.querySelectorAll('select')
                selects.forEach(item => {
                    if(!item.value){
                        validacion = true
                    }
                })
            })
            if(validacion){
                alert('los campos marcados con * son obligatorios.')
                btnGuardar.removeAttribute('disabled','' )
            }
            else{
                if(check_cantidad_hechos){
                    let data = {
                        auto_admisorio_id,
                        check_cantidad_hechos,
                        cantidad_hechos
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
                    
                }else {
                    hechos.forEach((item, key) => {
                        let hecho = item.querySelector('.hecho').value
                        let data = {
                            auto_admisorio_id,
                            hecho,
                            consecutivo: key + 1
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
                    })
                }

                if(check_cantidad_pretensiones){
                    let data = {
                        auto_admisorio_id,
                        check_cantidad_pretensiones,
                        cantidad_pretensiones
                    }
                    $.ajax({
                        url: url1,
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
                }else{
                    pretensiones.forEach((item, key) => {
                        let pretension = item.querySelector('.pretension').value
                        let data = {
                            auto_admisorio_id,
                            pretension,
                            consecutivo: key + 1
                        }
                        $.ajax({
                            url: url1,
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
                    })
                }
        
                let argumentos = contenedorPadre.querySelectorAll('.contenido_argumento')
                argumentos.forEach(item => {
                    let argumento = item.querySelector('.argumento').value
                    if(argumento != ''){
                        let data = {
                            auto_admisorio_id,
                            argumento
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
                    }
                })

                let anexos = contenedorPadre.querySelectorAll('.contenido_anexo')
                anexos.forEach(anexo => {
                    let titulo_anexo = anexo.querySelector('.titulo-anexo input').value
                    let descripcion_anexo = anexo.querySelector('.descripcion-anexo input').value
                    let archivo_anexo = anexo.querySelector('.anexo input').files[0]
                    let dataAnexo = new FormData();
                    dataAnexo.append('titulo', titulo_anexo);
                    dataAnexo.append('descripcion', descripcion_anexo);
                    dataAnexo.append('archivo_anexo', archivo_anexo);
                    dataAnexo.append('id', auto_admisorio_id);
                    dataAnexo.append('_token', token);
                    if(archivo_anexo){
                        $.ajax({
                            async:false,
                            url: url3,
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
                    }
                })

                
                motivos.forEach(motivo => {
                    let motivo_tutela = motivo.querySelector('.motivo_tutela').value
                    let sub_motivo_tutela = motivo.querySelector('.motivo_sub_tutela').value
                    let tipo_tutela = motivo.querySelector('.tipo_tutela').value
                    if(motivo_tutela != ''){
                        let data = {
                            motivo_tutela,
                            sub_motivo_tutela,
                            tipo_tutela,
                            id: auto_admisorio_id
                        }
                        $.ajax({
                            url: url4,
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
                })

                let data = {
                    id: auto_admisorio_id,
                    check_cantidad_hechos,
                    check_cantidad_pretensiones
                }
                $.ajax({
                    url: url5,
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

                window.location = `/admin/gestion`
            }

        })
    }
    //Fin guardar auto admisorio complemento 
    // ---------------------------------------------------------------------------------------------------------
    // Inicio Funcion de cantidad hechos
    if(document.querySelector('.check-input-hechos')){
        let checkHechos = document.querySelector('.check-input-hechos')
        checkHechos.addEventListener('click', function(e){
            let btnCheck = e.target
            let contenedorPadre = btnCheck.parentElement.parentElement
            let bloqueCheck = contenedorPadre.querySelector('.active-hechos')
            let bloqueNocheck = contenedorPadre.querySelector('.none-hechos')
            if(btnCheck.checked){
                if(bloqueCheck.classList.contains('d-none')){
                    bloqueCheck.classList.remove('d-none')
                    bloqueNocheck.classList.add('d-none')
                }else{
                    bloqueCheck.classList.add('d-none')
                    bloqueNocheck.classList.remove('d-none')
                }
            }else{
                if(bloqueCheck.classList.contains('d-none')){
                    bloqueCheck.classList.remove('d-none')
                    bloqueNocheck.classList.add('d-none')
                }else{
                    bloqueCheck.classList.add('d-none')
                    bloqueNocheck.classList.remove('d-none')
                }
            }
        })

    }
    // Fin Funcion de cantidad hechos
    // ---------------------------------------------------------------------------------------------------------
    // Inicio Funcion de cantidad pretensiones
    if(document.querySelector('.check-input-pretensiones')){
        let checkPretensiones = document.querySelector('.check-input-pretensiones')
        checkPretensiones.addEventListener('click', function(e){
            let btnCheck = e.target
            let contenedorPadre = btnCheck.parentElement.parentElement
            let bloqueCheck = contenedorPadre.querySelector('.active-pretensiones')
            let bloqueNocheck = contenedorPadre.querySelector('.none-pretensiones')
            if(btnCheck.checked){
                if(bloqueCheck.classList.contains('d-none')){
                    bloqueCheck.classList.remove('d-none')
                    bloqueNocheck.classList.add('d-none')
                }else{
                    bloqueCheck.classList.add('d-none')
                    bloqueNocheck.classList.remove('d-none')
                }
            }else{
                if(bloqueCheck.classList.contains('d-none')){
                    bloqueCheck.classList.remove('d-none')
                    bloqueNocheck.classList.add('d-none')
                }else{
                    bloqueCheck.classList.add('d-none')
                    bloqueNocheck.classList.remove('d-none')
                }
            }
        })

    }
    // Fin Funcion de cantidad hechos
    
})