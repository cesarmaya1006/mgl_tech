window.addEventListener('DOMContentLoaded', function() {
    const id_auto = document.querySelector('.id_auto_admisorio').value
    const sentenciapinstancia_id = document.querySelector('.id_sentencia_p_instancia').value

    // Funcion para reasignar hecho
    $('.reasignarHecho').on('change', function(e) {
        let padre = e.target.parentElement.parentElement.parentElement
        switch ($(this).val()) {
            case '1':
                padre.querySelector('.contentReasignacion').classList.remove('d-none');
                break;
            case '0':
                padre.querySelector('.contentReasignacion').classList.add('d-none');
                break;
        }
    });

    // Funcion para reasignar hecho
    $('.reasignarPretension').on('change', function(e) {
        let padre = e.target.parentElement.parentElement.parentElement
        switch ($(this).val()) {
            case '1':
                padre.querySelector('.contentReasignacion').classList.remove('d-none');
                break;
            case '0':
                padre.querySelector('.contentReasignacion').classList.add('d-none');
                break;
        }
    });

    // Carga de cargos en selector
    if (document.querySelectorAll('.cargo')) {
        const cargos = document.querySelectorAll('.cargo')
        cargos.forEach(cargo => {
            const url_t = cargo.getAttribute('data_url')
            $.ajax({
                url: url_t,
                type: 'GET',
                success: function(respuesta) {
                    respuesta_html = '';
                    respuesta_html += '<option value="">--Seleccione--</option>';
                    $.each(respuesta, function(index, item) {
                        respuesta_html += '<option value="' + item['id'] + '">' + item['cargo'] + '</option>';
                    });
                    $('.cargo').html(respuesta_html);
                },
                error: function(e) {
                    console.log(e)
                }
            });
        })
    }

    // Carga de funcionarios en selector
    $('.cargo').on('change', function(event) {
        const url_t = event.target.getAttribute('data_url2');
        const id = event.target.value;
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
                $('.funcionario').html(respuesta_html);
            },
            error: function(e) {
                console.log(e)
            }
        });
    });

    // Guardar reasignar Hecho a funcionario
    if (document.querySelectorAll('.reasignacion_hecho_guardar')) {
        let reasignacionHechos = document.querySelectorAll('.reasignacion_hecho_guardar')
        reasignacionHechos.forEach(reasignacion => {
            reasignacion.addEventListener('click', function(e) {
                e.preventDefault()
                let padre = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
                let url = e.target.getAttribute('data_url')
                let url2 = e.target.getAttribute('data_url2')
                let token = e.target.getAttribute('data_token')
                let hecho = padre.querySelector('.id_hecho').value
                let funcionario = padre.querySelector('.funcionario').value
                let cargo = padre.querySelector('.funcionario').value
                let mensajeHistorial = padre.querySelector('.mensaje-historial-hecho').value
                if (hecho == '' || cargo == '' || funcionario == '' || mensajeHistorial == '') {
                    alert("Debe dilegenciar todos los campos")
                } else {
                    guardarReasignacionHecho()
                }

                function guardarReasignacionHecho() {
                    let data = {
                        hecho,
                        funcionario
                    }
                    let data2 = {
                        idHecho: hecho,
                        mensajeHistorial,
                        idAuto: id_auto
                    }
                    $.ajax({
                        url: url2,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data2,
                        success: function(respuesta) {
                            // location.reload();
                        },
                        error: function(error) {
                            console.log(error.responseJSON)
                        }
                    });
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
        })
    }

    // Guardar reasignar Pretensión a funcionario
    if (document.querySelectorAll('.reasignacion_pretension_guardar')) {
        let reasignacionPretensiones = document.querySelectorAll('.reasignacion_pretension_guardar')
        reasignacionPretensiones.forEach(reasignacion => {
            reasignacion.addEventListener('click', function(e) {
                e.preventDefault()
                let padre = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
                let url = e.target.getAttribute('data_url')
                let url2 = e.target.getAttribute('data_url2')
                let token = e.target.getAttribute('data_token')
                let pretension = padre.querySelector('.id_pretension').value
                let funcionario = padre.querySelector('.funcionario').value
                let cargo = padre.querySelector('.funcionario').value
                let mensajeHistorial = padre.querySelector('.mensaje-historial-pretension').value
                if (pretension == '' || cargo == '' || funcionario == '' || mensajeHistorial == '') {
                    alert("Debe dilegenciar todos los campos")
                } else {
                    guardarReasignacionPretension()
                }

                function guardarReasignacionPretension() {
                    let data = {
                        pretension,
                        funcionario
                    }
                    let data2 = {
                        idPretension: pretension,
                        mensajeHistorial,
                        idAuto: id_auto
                    }
                    $.ajax({
                        url: url2,
                        type: 'POST',
                        headers: { 'X-CSRF-TOKEN': token },
                        data: data2,
                        success: function(respuesta) {
                            // location.reload();
                        },
                        error: function(error) {
                            console.log(error.responseJSON)
                        }
                    });
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
        })
    }

    // Guardar estado hechos
    if (document.querySelector('.btn-estado-hecho')) {
        let btnEstados = document.querySelectorAll('.btn-estado-hecho')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            if (btnE.tagName === 'I') {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                btnE = btnE.parentElement.parentElement
            } else {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement
            }
            let id_respuesta = padreEstado.querySelector('.id_respuesta').value
            let url = btnE.getAttribute('data_url')
            let token = btnE.getAttribute('data_token')
            let estado = padreEstado.querySelector('.estadoHecho').value
            let respuesta = padreEstado.querySelector('.respuesta').value
            let data = {
                estado,
                id_respuesta
            }
            if (estado == 11 && respuesta == '') {
                alert('Para guardar el 100% debe agregar una respuesta antes')
            } else {
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
    }

    // Guardar estado pretensiones
    if (document.querySelector('.btn-estado-pretension')) {
        let btnEstados = document.querySelectorAll('.btn-estado-pretension')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            if (btnE.tagName === 'I') {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                btnE = btnE.parentElement.parentElement
            } else {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement
            }
            let id_respuesta = padreEstado.querySelector('.id_respuesta').value
            let url = btnE.getAttribute('data_url')
            let token = btnE.getAttribute('data_token')
            let estado = padreEstado.querySelector('.estadoPretension').value
            let respuesta = padreEstado.querySelector('.respuesta').value
            let data = {
                estado,
                id_respuesta
            }
            if (estado == 11 && respuesta == '') {
                alert('Para guardar el 100% debe agregar una respuesta antes')
            } else {
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
    }
    // Guardar estado resuelve
    if (document.querySelector('.btn-estado-resuelve')) {
        let btnEstados = document.querySelectorAll('.btn-estado-resuelve')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            if (btnE.tagName === 'I') {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                btnE = btnE.parentElement.parentElement
            } else {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement
            }
            let id_respuesta = padreEstado.querySelector('.id_respuesta').value
            let url = btnE.getAttribute('data_url')
            let token = btnE.getAttribute('data_token')
            let estado = padreEstado.querySelector('.estadoResuelve').value
            let respuesta = padreEstado.querySelector('.respuesta').value
            let data = {
                estado,
                id_respuesta
            }
            if (estado == 11 && respuesta == '') {
                alert('Para guardar el 100% debe agregar una respuesta antes')
            } else {
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
    }

    //  Guardar Historial tutela - hecho
    if (document.querySelector('.guardarHistorialHecho')) {
        let HistorialHecho = document.querySelectorAll('.guardarHistorialHecho')
        HistorialHecho.forEach(btn => btn.addEventListener('click', guardarHistorialHecho))

        function guardarHistorialHecho(btn) {
            btn.preventDefault()
            let contenedorHisotrial = btn.target.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-hecho').value
            let idHecho = contenedorHisotrial.querySelector('.id_hecho').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            } else {
                guardarHistorialPeticion()
            }

            function guardarHistorialPeticion() {
                let data = {
                    mensajeHistorial,
                    idAuto: id_auto,
                    idHecho
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

    //  Guardar Historial tutela - respuesta hecho
    if (document.querySelector('.guardarHistorialRespuestaHecho')) {
        let HistorialHecho = document.querySelectorAll('.guardarHistorialRespuestaHecho')
        HistorialHecho.forEach(btn => btn.addEventListener('click', guardarHistorialRespuestaHecho))

        function guardarHistorialRespuestaHecho(btn) {
            btn.preventDefault()
            let contenedorHisotrial = btn.target.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-respuesta-hecho').value
            let idRespuesta = contenedorHisotrial.querySelector('.id_respuesta_hecho').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            } else {
                guardarHistorialPeticion()
            }

            function guardarHistorialPeticion() {
                let data = {
                    historial: mensajeHistorial,
                    respuesta_hecho_id: idRespuesta
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

    //  Guardar Historial tutela - pretension
    if (document.querySelector('.guardarHistorialPretension')) {
        let HistorialPretension = document.querySelectorAll('.guardarHistorialPretension')
        HistorialPretension.forEach(btn => btn.addEventListener('click', guardarHistorialPretension))

        function guardarHistorialPretension(btn) {
            btn.preventDefault()
            let contenedorHisotrial = btn.target.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-pretension').value
            let idPretension = contenedorHisotrial.querySelector('.id_pretension').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            } else {
                guardarHistorialPeticion()
            }

            function guardarHistorialPeticion() {
                let data = {
                    mensajeHistorial,
                    idAuto: id_auto,
                    idPretension
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

    //  Guardar Historial tutela - respuesta pretension
    if (document.querySelector('.guardarHistorialRespuestaPretension')) {
        let HistorialPretension = document.querySelectorAll('.guardarHistorialRespuestaPretension')
        HistorialPretension.forEach(btn => btn.addEventListener('click', guardarHistorialRespuestaPretension))

        function guardarHistorialRespuestaPretension(btn) {
            btn.preventDefault()
            let contenedorHisotrial = btn.target.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-respuesta-pretension').value
            let idRespuesta = contenedorHisotrial.querySelector('.id_respuesta_pretension').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            } else {
                guardarHistorialPeticion()
            }

            function guardarHistorialPeticion() {
                let data = {
                    historial: mensajeHistorial,
                    respuesta_pretension_id: idRespuesta
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

    //  Guardar Historial resuelve
    if (document.querySelector('.guardarHistorialRespuestaResuelve')) {
        let HistorialResuelve = document.querySelectorAll('.guardarHistorialRespuestaResuelve')
        HistorialResuelve.forEach(btn => btn.addEventListener('click', guardarHistorialRespuestaResuelve))

        function guardarHistorialRespuestaResuelve(btn) {
            btn.preventDefault()
            let contenedorHisotrial = btn.target.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-respuesta-resuelve').value
            let idRespuesta = contenedorHisotrial.querySelector('.id_respuesta_resuelve').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            } else {
                guardarHistorialPeticion()
            }

            function guardarHistorialPeticion() {
                let data = {
                    historial: mensajeHistorial,
                    respuesta_resuelve_id: idRespuesta
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

    // Inicio Función para generar varios anexos en una consulta con validación.
    if (document.querySelectorAll('.crearAnexo').length) {
        let btncrearAnexo = document.querySelectorAll('.crearAnexo')
        btncrearAnexo.forEach(btn => btn.addEventListener('click', crearNuevoAnexo))
        let btnEliminarAnexo = document.querySelector('.eliminaranexoConsulta')
        btnEliminarAnexo.addEventListener('click', agregarEliminarAnexo)

        function crearNuevoAnexo(e) {
            e.preventDefault()
            let consulta = e.target.parentNode.parentNode
            let nuevoAnexo = consulta.querySelectorAll('.anexoconsulta')[0].cloneNode(true)
            nuevoAnexo.querySelector('.titulo-anexoConsulta input').value = ''
            nuevoAnexo.querySelector('.descripcion-anexoConsulta input').value = ''
            nuevoAnexo.querySelector('.doc-anexoConsulta input').value = ''
            consulta.querySelector('.anexosConsulta').appendChild(nuevoAnexo)
            document.querySelectorAll('.eliminaranexoConsulta').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
        }

        function agregarEliminarAnexo(e) {
            e.preventDefault()
            let consulta = e.target
            if (consulta.tagName === 'I') {
                consulta = consulta.parentNode.parentNode.parentNode.parentNode
            } else {
                consulta = consulta.parentNode.parentNode.parentNode
            }
            if (consulta.querySelectorAll('.anexoconsulta').length >= 2) {
                let idAnexo = e.target
                if (idAnexo.tagName === 'I') {
                    idAnexo = idAnexo.parentNode.parentNode.parentNode
                } else {
                    idAnexo = idAnexo.parentNode.parentNode
                }
                idAnexo.remove()
            }
        }
    }

    // Guardar respuesta hechos
    if (document.querySelector('.btn-respuesta-hecho')) {
        let btnRespuesta = document.querySelector('.btn-respuesta-hecho')
        btnRespuesta.addEventListener('click', guardarRespuesta)

        function guardarRespuesta(btn) {
            btn.preventDefault()
            padreRespuesta = btn.target.parentElement
            let url = btn.target.getAttribute('data_url')
            let url2 = btn.target.getAttribute('data_url2')
            let url3 = btn.target.getAttribute('data_url3')
            let url4 = btn.target.getAttribute('data_url4')
            let token = btn.target.getAttribute('data_token')
            let hechosContent = padreRespuesta.querySelector('.bloque-seleccion-hechos')
            let hechos = hechosContent.querySelectorAll('.select-hecho')
            let estado = padreRespuesta.querySelector('.estadoHecho').value
            let respuesta = padreRespuesta.querySelector('.respuesta').value
            let anexos = padreRespuesta.querySelectorAll('.anexoconsulta')
            validacionHechos = false
            hechos.forEach(hecho => {
                if (hecho.checked == true) {
                    validacionHechos = true
                }
            })
            if (respuesta != '' && estado > 1 && validacionHechos) {
                let data1 = {
                    respuesta,
                    id_auto,
                    estado
                }
                guardarRespuesta(data1)
            } else {
                alert('Debe seleccionar los hechos y diligenciar los campos de respuesta y avance')
            }

            function guardarRespuesta(data) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        guardarRespuestaAnexo(anexos, respuesta)
                        guardarRelacionRespuesta(respuesta)
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
            }

            function guardarRespuestaAnexo(anexos, idrespuesta) {
                anexos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo').value
                    let descripcion = anexo.querySelector('.descripcion').value
                    let archivo = anexo.querySelector('.documento').files[0]
                    if (archivo) {
                        let dataAnexo = new FormData();
                        dataAnexo.append('respuesta_hechos_id', idrespuesta.data);
                        dataAnexo.append('titulo', titulo);
                        dataAnexo.append('descripcion', descripcion);
                        dataAnexo.append('archivo', archivo);
                        dataAnexo.append('_token', token);
                        $.ajax({
                            async: false,
                            url: url2,
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
            }

            function guardarRelacionRespuesta(idrespuesta) {
                let hechosValidados = []
                hechos.forEach(hecho => {
                    if (hecho.checked) {
                        hechosValidados.push(hecho.value)
                    }
                })
                let data = {
                    estado,
                    id_hechos: hechosValidados,
                    id_auto,
                    id_respuesta: idrespuesta.data
                }
                fetch(url3, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token
                     },
                    method:'POST',
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(res => {
                    fetch(url4, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': token
                         },
                        method:'POST',
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(res2 => {
                        location.reload();
                    })
                })
            }
        }


    }

    // Guardar asignacion de hecho desde respuesta
    if (document.querySelector('.btn-respuesta-hecho-asignar')) {
        let btnEstados = document.querySelectorAll('.btn-respuesta-hecho-asignar')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            let contenedorPadre = btnE.parentElement.parentElement
            let url = btnE.getAttribute('data_url')
            let url2 = btnE.getAttribute('data_url2')
            let token = btnE.getAttribute('data_token')
            let id_hecho = contenedorPadre.querySelector('.respuesta-hecho-asignar').value
            let id_respuesta = contenedorPadre.querySelector('.id_respuesta').value
            let estado = contenedorPadre.querySelector('.estado_actual').value
            let data = {
                id_hecho,
                id_auto,
                id_respuesta,
                estado
            }
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                 },
                method:'POST',
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(res => {
                fetch(url2, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token
                     },
                    method:'POST',
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(res2 => {
                    location.reload();
                })
            })
        }
    }

    // Guardar respuesta pretensiones
    if (document.querySelector('.btn-respuesta-pretension')) {
        let btnRespuesta = document.querySelector('.btn-respuesta-pretension')
        btnRespuesta.addEventListener('click', guardarRespuesta)

        function guardarRespuesta(btn) {
            btn.preventDefault()
            padreRespuesta = btn.target.parentElement
            let url = btn.target.getAttribute('data_url')
            let url2 = btn.target.getAttribute('data_url2')
            let url3 = btn.target.getAttribute('data_url3')
            let url4 = btn.target.getAttribute('data_url4')
            let token = btn.target.getAttribute('data_token')
            let pretensionesContent = padreRespuesta.querySelector('.bloque-seleccion-pretensiones')
            let pretensiones = pretensionesContent.querySelectorAll('.select-pretension')
            let estado = padreRespuesta.querySelector('.estadoPretension').value
            let respuesta = padreRespuesta.querySelector('.respuesta').value
            let anexos = padreRespuesta.querySelectorAll('.anexoconsulta')
            validacionPretensiones = false
            pretensiones.forEach(pretension => {
                if (pretension.checked == true) {
                    validacionPretensiones = true
                }
            })
            if (respuesta != '' && estado > 1 && validacionPretensiones) {
                let data1 = {
                    respuesta,
                    id_auto,
                    estado
                }
                guardarRespuesta(data1)
            } else {
                alert('Debe seleccionar las pretensiones y diligenciar los campos de respuesta y avance')
            }

            function guardarRespuesta(data) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        guardarRespuestaAnexo(anexos, respuesta)
                        guardarRelacionRespuesta(respuesta)
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
            }

            function guardarRespuestaAnexo(anexos, idrespuesta) {
                anexos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo').value
                    let descripcion = anexo.querySelector('.descripcion').value
                    let archivo = anexo.querySelector('.documento').files[0]
                    if (archivo) {
                        let dataAnexo = new FormData();
                        dataAnexo.append('respuesta_pretensiones_id', idrespuesta.data);
                        dataAnexo.append('titulo', titulo);
                        dataAnexo.append('descripcion', descripcion);
                        dataAnexo.append('archivo', archivo);
                        dataAnexo.append('_token', token);
                        $.ajax({
                            async: false,
                            url: url2,
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
            }

            function guardarRelacionRespuesta(idrespuesta) {
                let pretensionesValidados = []
                pretensiones.forEach(pretension => {
                    if (pretension.checked) {
                        pretensionesValidados.push(pretension.value)
                    }
                })
                let data = {
                    estado,
                    id_pretensiones: pretensionesValidados,
                    id_auto,
                    id_respuesta: idrespuesta.data
                }
                fetch(url3, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token
                     },
                    method:'POST',
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(res => {
                    fetch(url4, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': token
                         },
                        method:'POST',
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(res2 => {
                        location.reload();
                    })
                })
            }
        }
    }

    // Guardar respuesta impugnacion
    if (document.querySelector('.btn-respuesta-impugnacion')) {
        let btnRespuesta = document.querySelector('.btn-respuesta-impugnacion')
        btnRespuesta.addEventListener('click', guardarRespuesta)

        function guardarRespuesta(btn) {
            btn.preventDefault()
            padreRespuesta = btn.target.parentElement
            let url = btn.target.getAttribute('data_url')
            let url2 = btn.target.getAttribute('data_url2')
            let url3 = btn.target.getAttribute('data_url3')
            let url4 = btn.target.getAttribute('data_url4')
            let token = btn.target.getAttribute('data_token')
            let resuelvesContent = padreRespuesta.querySelector('.bloque-seleccion-resuelves')
            let resuelves = resuelvesContent.querySelectorAll('.select-resuleve')
            let estado = padreRespuesta.querySelector('.estadoResuelve').value
            let respuesta = padreRespuesta.querySelector('.respuesta').value
            let anexos = padreRespuesta.querySelectorAll('.anexoconsulta')
            validacionResuelves = false
            resuelves.forEach(resuelve => {
                if (resuelve.checked == true) {
                    validacionResuelves = true
                }
            })
            if (respuesta != '' && estado > 1 && validacionResuelves) {
                let data1 = {
                    respuesta,
                    sentenciapinstancia_id,
                    estado
                }
                guardarRespuesta(data1)
            } else {
                alert('Debe seleccionar los resuelves y diligenciar los campos de respuesta y avance')
            }

            function guardarRespuesta(data) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        guardarRespuestaAnexo(anexos, respuesta)
                        guardarRelacionRespuesta(respuesta)
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
            }

            function guardarRespuestaAnexo(anexos, idrespuesta) {
                anexos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo').value
                    let descripcion = anexo.querySelector('.descripcion').value
                    let archivo = anexo.querySelector('.documento').files[0]
                    if (archivo) {
                        let dataAnexo = new FormData();
                        dataAnexo.append('respuesta_resuelves_id', idrespuesta.data);
                        dataAnexo.append('titulo', titulo);
                        dataAnexo.append('descripcion', descripcion);
                        dataAnexo.append('archivo', archivo);
                        dataAnexo.append('_token', token);
                        $.ajax({
                            async: false,
                            url: url2,
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
            }

            function guardarRelacionRespuesta(idrespuesta) {
                let resuelvesValidados = []
                resuelves.forEach(resuelve => {
                    if (resuelve.checked) {
                        resuelvesValidados.push(resuelve.value)
                    }
                })
                let data = {
                    estado,
                    id_resuelves: resuelvesValidados,
                    sentenciapinstancia_id,
                    id_respuesta: idrespuesta.data
                }
                fetch(url3, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token
                     },
                    method:'POST',
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(res => {
                    fetch(url4, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': token
                         },
                        method:'POST',
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(res2 => {
                        location.reload();
                    })
                })
            }
        }
    }

    // Guardar asignacion de pretension desde respuesta
    if (document.querySelector('.btn-respuesta-pretension-asignar')) {
        let btnEstados = document.querySelectorAll('.btn-respuesta-pretension-asignar')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            let contenedorPadre = btnE.parentElement.parentElement
            let url = btnE.getAttribute('data_url')
            let url2 = btnE.getAttribute('data_url2')
            let token = btnE.getAttribute('data_token')
            let id_pretension = contenedorPadre.querySelector('.respuesta-pretension-asignar').value
            let id_respuesta = contenedorPadre.querySelector('.id_respuesta').value
            let estado = contenedorPadre.querySelector('.estado_actual').value
            let data = {
                id_pretension,
                id_auto,
                id_respuesta,
                estado
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
                    location.reload();

                },
                error: function(error) {
                    console.log(error)
                }
            });
        }
    }

    // Guardar asignacion de resuelve desde respuesta
    if (document.querySelector('.btn-respuesta-resuelve-asignar')) {
        let btnEstados = document.querySelectorAll('.btn-respuesta-resuelve-asignar')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            let contenedorPadre = btnE.parentElement.parentElement
            let url = btnE.getAttribute('data_url')
            let url2 = btnE.getAttribute('data_url2')
            let token = btnE.getAttribute('data_token')
            let id_resuelve = contenedorPadre.querySelector('.respuesta-resuelve-asignar').value
            // let id_respuesta = contenedorPadre.querySelector('.id_respuesta').value
            let estado = contenedorPadre.querySelector('.estado_actual').value
            let data = {
                id_resuelve,
                sentenciapinstancia_id,
                // id_respuesta,
                estado
            }

            console.log(data)
            // $.ajax({
            //     url: url,
            //     type: 'POST',
            //     headers: { 'X-CSRF-TOKEN': token },
            //     data: data,
            //     success: function(respuesta) {
            //         // console.log(respuesta)

            //     },
            //     error: function(error) {
            //         console.log(error)
            //     }
            // });
            // $.ajax({
            //     url: url2,
            //     type: 'POST',
            //     headers: { 'X-CSRF-TOKEN': token },
            //     data: data,
            //     success: function(respuesta) {
            //         location.reload();

            //     },
            //     error: function(error) {
            //         console.log(error)
            //     }
            // });
        }
    }

    // Eliminar respuesta hecho
    if (document.querySelectorAll('.eliminarHecho')) {
        let btnsEliminarHecho = document.querySelectorAll('.eliminarHecho')
        btnsEliminarHecho.forEach(btn => {
            btn.addEventListener('click', eliminarAsigancionHecho)
        })

        function eliminarAsigancionHecho(btn) {
            let btnEH = btn.target
            if (btnEH.tagName === 'I') {
                btnEH = btnEH.parentNode
            }
            let contenedorPadre = btnEH.parentElement
            let hecho_id = contenedorPadre.querySelector('.id_relacion_hecho').value
            let url = btnEH.getAttribute('data_url')
            let token = btnEH.getAttribute('data_token')
            let data = {
                hecho_id
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

    // Eliminar respuesta pretension
    if (document.querySelectorAll('.eliminarPretension')) {
        let btnsEliminarPretension = document.querySelectorAll('.eliminarPretension')
        btnsEliminarPretension.forEach(btn => {
            btn.addEventListener('click', eliminarAsigancionPretension)
        })

        function eliminarAsigancionPretension(btn) {
            let btnEH = btn.target
            if (btnEH.tagName === 'I') {
                btnEH = btnEH.parentNode
            }
            let contenedorPadre = btnEH.parentElement
            let pretension_id = contenedorPadre.querySelector('.id_relacion_pretension').value
            let url = btnEH.getAttribute('data_url')
            let token = btnEH.getAttribute('data_token')
            let data = {
                pretension_id
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

    // Eliminar respuesta resuelve
    if (document.querySelectorAll('.eliminarResuelve')) {
        let btnsEliminarResuelve = document.querySelectorAll('.eliminarResuelve')
        btnsEliminarResuelve.forEach(btn => {
            btn.addEventListener('click', eliminarAsigancionResuelve)
        })

        function eliminarAsigancionResuelve(btn) {
            let btnEH = btn.target
            if (btnEH.tagName === 'I') {
                btnEH = btnEH.parentNode
            }
            let contenedorPadre = btnEH.parentElement
            let resuelve_id = contenedorPadre.querySelector('.id_relacion_resuelve').value
            let url = btnEH.getAttribute('data_url')
            let token = btnEH.getAttribute('data_token')
            let data = {
                resuelve_id
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
                }
            });
        }
    }

    // Guardar respuesta hechos editar
    if (document.querySelectorAll('.btn-respuesta-hecho-editar')) {
        let btnRespuesta = document.querySelectorAll('.btn-respuesta-hecho-editar')
        btnRespuesta.forEach(btn => {
            btn.addEventListener('click', guardarRespuesta)
        })

        function guardarRespuesta(btn) {
            btn.preventDefault()
            padreRespuesta = btn.target.parentElement.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let url2 = btn.target.getAttribute('data_url2')
            let url3 = btn.target.getAttribute('data_url3')
            let token = btn.target.getAttribute('data_token')
            let estado = padreRespuesta.querySelector('.estadoHecho').value
            let respuesta = padreRespuesta.querySelector('.respuesta').value
            let respuestaAnterior = padreRespuesta.querySelector('.respuesta_anterior').value
            let url4 = padreRespuesta.querySelector('.respuesta_anterior').getAttribute('data_url')
            let id_respuesta = padreRespuesta.querySelector('.id_respuesta').value
            let anexos = padreRespuesta.querySelectorAll('.anexoconsulta')
            if (respuestaAnterior != respuesta) {
                guardarHisotrialRespuesta()
            }
            if (respuesta != '') {
                let data1 = {
                    respuesta,
                    id_respuesta,
                    estado
                }
                guardarRespuesta(data1)
            }

            function guardarRespuesta(data) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        guardarRespuestaAnexo(anexos, id_respuesta)
                        guardarEstado()
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
            }

            function guardarRespuestaAnexo(anexos, idrespuesta) {
                anexos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo').value
                    let descripcion = anexo.querySelector('.descripcion').value
                    let archivo = anexo.querySelector('.documento').files[0]
                    if (archivo) {
                        let dataAnexo = new FormData();
                        dataAnexo.append('respuesta_hechos_id', idrespuesta);
                        dataAnexo.append('titulo', titulo);
                        dataAnexo.append('descripcion', descripcion);
                        dataAnexo.append('archivo', archivo);
                        dataAnexo.append('_token', token);
                        $.ajax({
                            async: false,
                            url: url2,
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
            }

            function guardarHisotrialRespuesta() {
                let data = {
                    historial: respuestaAnterior,
                    respuesta_hecho_id: id_respuesta
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
                        console.log(error)
                    }
                });
            }

            function guardarEstado(idrespuesta) {
                let data = {
                    estado,
                    id_respuesta
                }

                $.ajax({
                    url: url3,
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
                location.reload();
            }

        }
    }

    // Guardar respuesta pretensiones editar
    if (document.querySelectorAll('.btn-respuesta-pretension-editar')) {
        let btnRespuesta = document.querySelectorAll('.btn-respuesta-pretension-editar')
        btnRespuesta.forEach(btn => {
            btn.addEventListener('click', guardarRespuesta)
        })

        function guardarRespuesta(btn) {
            btn.preventDefault()
            padreRespuesta = btn.target.parentElement.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let url2 = btn.target.getAttribute('data_url2')
            let url3 = btn.target.getAttribute('data_url3')
            let token = btn.target.getAttribute('data_token')
            let estado = padreRespuesta.querySelector('.estadoPretension').value
            let respuesta = padreRespuesta.querySelector('.respuesta').value
            let respuestaAnterior = padreRespuesta.querySelector('.respuesta_anterior').value
            let url4 = padreRespuesta.querySelector('.respuesta_anterior').getAttribute('data_url')
            let id_respuesta = padreRespuesta.querySelector('.id_respuesta').value
            let anexos = padreRespuesta.querySelectorAll('.anexoconsulta')
            if (respuestaAnterior != respuesta) {
                guardarHisotrialRespuesta()
            }
            if (respuesta != '') {
                let data1 = {
                    respuesta,
                    id_respuesta,
                    estado
                }
                guardarRespuesta(data1)
            }

            function guardarRespuesta(data) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        guardarRespuestaAnexo(anexos, id_respuesta)
                        guardarEstado()
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
            }

            function guardarRespuestaAnexo(anexos, idrespuesta) {
                anexos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo').value
                    let descripcion = anexo.querySelector('.descripcion').value
                    let archivo = anexo.querySelector('.documento').files[0]
                    if (archivo) {
                        let dataAnexo = new FormData();
                        dataAnexo.append('respuesta_pretensiones_id', idrespuesta);
                        dataAnexo.append('titulo', titulo);
                        dataAnexo.append('descripcion', descripcion);
                        dataAnexo.append('archivo', archivo);
                        dataAnexo.append('_token', token);
                        $.ajax({
                            async: false,
                            url: url2,
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
            }

            function guardarHisotrialRespuesta() {
                let data = {
                    historial: respuestaAnterior,
                    respuesta_pretension_id: id_respuesta
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
                        console.log(error)
                    }
                });
            }

            function guardarEstado(idrespuesta) {
                let data = {
                    estado,
                    id_respuesta
                }

                $.ajax({
                    url: url3,
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
                location.reload();
            }

        }
    }

    // Guardar respuesta resuelve editar
    if (document.querySelectorAll('.btn-respuesta-resuelve-editar')) {
        let btnRespuesta = document.querySelectorAll('.btn-respuesta-resuelve-editar')
        btnRespuesta.forEach(btn => {
            btn.addEventListener('click', guardarRespuesta)
        })

        function guardarRespuesta(btn) {
            btn.preventDefault()
            padreRespuesta = btn.target.parentElement.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let url2 = btn.target.getAttribute('data_url2')
            let url3 = btn.target.getAttribute('data_url3')
            let token = btn.target.getAttribute('data_token')
            let estado = padreRespuesta.querySelector('.estadoResuelve').value
            let respuesta = padreRespuesta.querySelector('.respuesta').value
            let respuestaAnterior = padreRespuesta.querySelector('.respuesta_anterior').value
            let url4 = padreRespuesta.querySelector('.respuesta_anterior').getAttribute('data_url')
            let id_respuesta = padreRespuesta.querySelector('.id_respuesta').value
            let anexos = padreRespuesta.querySelectorAll('.anexoconsulta')
            if (respuestaAnterior != respuesta) {
                guardarHisotrialRespuesta()
            }
            if (respuesta != '') {
                let data1 = {
                    respuesta,
                    id_respuesta,
                    estado
                }
                guardarRespuesta(data1)
            }

            function guardarRespuesta(data) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        guardarRespuestaAnexo(anexos, id_respuesta)
                        guardarEstado()
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
            }

            function guardarRespuestaAnexo(anexos, idrespuesta) {
                anexos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo').value
                    let descripcion = anexo.querySelector('.descripcion').value
                    let archivo = anexo.querySelector('.documento').files[0]
                    if (archivo) {
                        let dataAnexo = new FormData();
                        dataAnexo.append('respuesta_resuelves_id', idrespuesta);
                        dataAnexo.append('titulo', titulo);
                        dataAnexo.append('descripcion', descripcion);
                        dataAnexo.append('archivo', archivo);
                        dataAnexo.append('_token', token);
                        $.ajax({
                            async: false,
                            url: url2,
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
            }

            function guardarHisotrialRespuesta() {
                let data = {
                    historial: respuestaAnterior,
                    respuesta_resuelve_id: id_respuesta
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
                        console.log(error)
                    }
                });
            }

            function guardarEstado(idrespuesta) {
                let data = {
                    estado,
                    id_respuesta
                }

                $.ajax({
                    url: url3,
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
                location.reload();
            }

        }
    }

    // Funcion check multiple hechos
    if (document.querySelectorAll('.check-todos-hechos')) {
        let checkTodos = document.querySelectorAll('.check-todos-hechos')
        checkTodos.forEach(check => {
            check.addEventListener('input', seleccionMultiple)
        })

        function seleccionMultiple(btn) {
            let check = btn.target
            let contenedorPadre = check.parentElement.parentElement
            let selectores = contenedorPadre.querySelectorAll('.select-hecho')
            if (check.checked) {
                selectores.forEach(selector => {
                    selector.checked = true
                })
            } else {
                selectores.forEach(selector => {
                    selector.checked = false
                })
            }
        }
    }

    // Funcion check multiple pretensiones
    if (document.querySelectorAll('.check-todos-pretensiones')) {
        let checkTodos = document.querySelectorAll('.check-todos-pretensiones')
        checkTodos.forEach(check => {
            check.addEventListener('input', seleccionMultiple)
        })

        function seleccionMultiple(btn) {
            let check = btn.target
            let contenedorPadre = check.parentElement.parentElement
            let selectores = contenedorPadre.querySelectorAll('.select-pretension')
            if (check.checked) {
                selectores.forEach(selector => {
                    selector.checked = true
                })
            } else {
                selectores.forEach(selector => {
                    selector.checked = false
                })
            }
        }
    }

    // Funcion check multiple resuelves
    if (document.querySelectorAll('.check-todos-resuelves')) {
        let checkTodos = document.querySelectorAll('.check-todos-resuelves')
        checkTodos.forEach(check => {
            check.addEventListener('input', seleccionMultiple)
        })

        function seleccionMultiple(btn) {
            let check = btn.target
            let contenedorPadre = check.parentElement.parentElement
            let selectores = contenedorPadre.querySelectorAll('.select-resuleve')
            if (check.checked) {
                selectores.forEach(selector => {
                    selector.checked = true
                })
            } else {
                selectores.forEach(selector => {
                    selector.checked = false
                })
            }
        }
    }

    //==========================================================================
    $(document).ready(function() {
        $('.respuesta-editar').summernote({
            tabsize: 2,
            height: 120,
            toolbar: [
                ['font', ['bold', 'underline', 'italic', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']],
            ]
        })
    });
    //==========================================================================
    $(document).ready(function() {
        $('.titulo-anexoRespuestaRecurso textArea').summernote({
            tabsize: 2,
            height: 120,
            toolbar: [
                ['font', ['bold', 'underline', 'italic', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']],
            ]
        })
    });
    //==========================================================================
    $(".query").keyup(function() {
        const radio = $('input:radio[name=radio1]:checked').val();
        const url_t = $(this).attr('data_url');
        const query = $(this).val();
        $html_ = '';
        if (query != '') {
            var data = {
                "query": query,
                "radio": radio,
            };
            $.ajax({
                url: url_t,
                type: 'GET',
                data: data,
                success: function(respuesta) {
                    $html_ = '';
                    $.each(respuesta.argumentos, function(index, argumento) {
                        $html_ += '<div class="col -12 col-md-10">';
                        $html_ += '<div class="resultado-busqueda card card-success bg-legal1 collapsed-card card-mini-sombra">';
                        $html_ += '<div class="card-header">';
                        $html_ += '<div class="user-block">';
                        $html_ += '<span class="username"><a href="#">Argumento</a></span>';
                        $html_ += '<span class="description text-white" >' + argumento.tema_especifico.tema_.area['area'] + '->' + argumento.tema_especifico.tema_['tema'] + '->' + argumento.tema_especifico['tema'] + '</span>';
                        $html_ += '</div>';
                        $html_ += '<div class="card-tools">';
                        $html_ += '<button type="button" class="btn btn-tool" data-card-widget="collapse">';
                        $html_ += '<i class="fas fa-plus"></i>';
                        $html_ += '</button>';
                        $html_ += '<button type="button" class="btn btn-tool" data-card-widget="remove">';
                        $html_ += '<i class="fas fa-times"></i>';
                        $html_ += '</button>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '<div class="card-body">';
                        $html_ += '<div class="row">';
                        $html_ += '<div class="col-12">';
                        $html_ += '<p><strong>Texto:</strong></p>';
                        $html_ += '<div class="textoCopiar">' + argumento['texto'] + '</div>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '<div class="row">';
                        if (argumento.criterios.length > 0) {
                            $html_ += '<hr>';
                            $html_ += '<div class="row">';
                            $html_ += '<div class="col-12"><h6>Criterios Juridicos</h6></div>';
                            $html_ += '<div class="col-12 table-responsive" style="font-size:0.8em;">';
                            $html_ += '<table class="table">';
                            $html_ += '<thead>';
                            $html_ += '<tr>';
                            $html_ += '<th style="white-space:nowrap">Autor(es)</th>';
                            $html_ += '<th style="white-space:nowrap">Criterios jurídicos de aplicación</th>';
                            $html_ += '<th style="white-space:nowrap">Criterios jurídicos de no aplicación</th>';
                            $html_ += '<th style="white-space:nowrap">Notas de la Vigencia</th>';
                            $html_ += '</tr>';
                            $html_ += '</thead>';
                            $html_ += '<tbody>';
                            $.each(argumento.criterios, function(index, criterio) {
                                $html_ += '<tr>';
                                $html_ += '<td style="white-space:nowrap">' + criterio['autores'] + '</td>';
                                if (criterio['criterio_si'] != null) {
                                    $html_ += '<td>' + criterio['criterio_si'] + '</td>';
                                } else {
                                    $html_ += '<td class="text-center">---</td>';
                                }
                                if (criterio['criterio_no'] != null) {
                                    $html_ += '<td>' + criterio['criterio_no'] + '</td>';
                                } else {
                                    $html_ += '<td class="text-center">---</td>';
                                }
                                if (criterio['notas'] != null) {
                                    $html_ += '<td>' + criterio['notas'] + '</td>';
                                } else {
                                    $html_ += '<td class="text-center">---</td>';
                                }
                                $html_ += '</tr>';
                            })
                            $html_ += '</tbody>';
                            $html_ += '</table>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                        } else {
                            $html_ += '<div class="col-12 text-center"><p><strong>Sin criterios jurídicos</strong></p></div>';
                        }
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '<div class="card-footer ">';
                        $html_ += '<div class="row">';
                        $html_ += '<div class="col-12">';
                        $html_ += '<button class="btn btn-info btn-xs pl-4 pr-4 agregarTexto">Agregar</button>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '</div>';

                    });
                    $.each(respuesta.normas, function(index, norma) {
                        $html_ += '<div class="col -12 col-md-10">';
                        $html_ += '<div class="card card-info collapsed-card card-mini-sombra">';
                        $html_ += '<div class="card-header">';
                        $html_ += '<div class="user-block">';
                        $html_ += '<span class="username"><a href="#">Norma</a></span>';
                        $html_ += '<span class="description text-white" >' + norma.tema_especifico.tema_.area['area'] + '->' + norma.tema_especifico.tema_['tema'] + '->' + norma.tema_especifico['tema'] + '->' + norma['articulo'] + '</span>';
                        $html_ += '</div>';
                        $html_ += '<div class="card-tools">';
                        $html_ += '<button type="button" class="btn btn-tool" data-card-widget="collapse">';
                        $html_ += '<i class="fas fa-plus"></i>';
                        $html_ += '</button>';
                        $html_ += '<button type="button" class="btn btn-tool" data-card-widget="remove">';
                        $html_ += '<i class="fas fa-times"></i>';
                        $html_ += '</button>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '<div class="card-body">';
                        $html_ += '<div class="row">';
                        $html_ += '<div class="col-12">';
                        $html_ += '<p><strong>Texto:</strong> ' + norma['texto'] + '</p>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '<div class="row">';
                        if (norma.criterios.length > 0) {
                            $html_ += '<hr>';
                            $html_ += '<div class="row">';
                            $html_ += '<div class="col-12"><h6>Criterios Juridicos</h6></div>';
                            $html_ += '<div class="col-12 table-responsive" style="font-size:0.8em;">';
                            $html_ += '<table class="table">';
                            $html_ += '<thead>';
                            $html_ += '<tr>';
                            $html_ += '<th style="white-space:nowrap">Autor(es)</th>';
                            $html_ += '<th style="white-space:nowrap">Criterios jurídicos de aplicación</th>';
                            $html_ += '<th style="white-space:nowrap">Criterios jurídicos de no aplicación</th>';
                            $html_ += '<th style="white-space:nowrap">Notas de la Vigencia</th>';
                            $html_ += '</tr>';
                            $html_ += '</thead>';
                            $html_ += '<tbody>';
                            $.each(norma.criterios, function(index, criterio) {
                                $html_ += '<tr>';
                                $html_ += '<td style="white-space:nowrap">' + criterio['autores'] + '</td>';
                                if (criterio['criterio_si'] != null) {
                                    $html_ += '<td>' + criterio['criterio_si'] + '</td>';
                                } else {
                                    $html_ += '<td class="text-center">---</td>';
                                }
                                if (criterio['criterio_no'] != null) {
                                    $html_ += '<td>' + criterio['criterio_no'] + '</td>';
                                } else {
                                    $html_ += '<td class="text-center">---</td>';
                                }
                                if (criterio['notas'] != null) {
                                    $html_ += '<td>' + criterio['notas'] + '</td>';
                                } else {
                                    $html_ += '<td class="text-center">---</td>';
                                }
                                $html_ += '</tr>';
                            })
                            $html_ += '</tbody>';
                            $html_ += '</table>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                        } else {
                            $html_ += '<div class="col-12 text-center"><p><strong>Sin criterios jurídicos</strong></p></div>';
                        }
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '<div class="card-footer ">';
                        $html_ += '<div class="row">';
                        $html_ += '<div class="col-12">';
                        $html_ += '<button class="btn btn-info btn-xs pl-4 pr-4 agregarTexto">Agregar</button>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                        $html_ += '</div>';

                    });
                    $('.coleccionrespuesta').html($html_);
                    asignarBusqueda()
                },
                error: function() {

                }
            });
        } else {
            $('.coleccionrespuesta').html($html_);
        }

    });

    //==========================================================================
    $('#tipo_wiku').on('change', function(event) {
        if ($(this).val() != '') {
            $('.cajaArea').removeClass('d-none');
            $('.seccionProductosTipoPQR').removeClass('d-none');
            $('.seccionAreaTemas').removeClass('d-none');

        } else {
            $('.cajaArea').addClass('d-none');
            $('.seccionProductosTipoPQR').addClass('d-none');
            $('.seccionAreaTemas').addClass('d-none');


        }
        if ($(this).val() == 'Argumentos') {
            $('.seccionFuenteEmisora').addClass('d-none');
            //-*+-*+-*+-*+-*+-*+-*+-*+-*
            const url_t = $(this).attr('data_url');
            $.ajax({
                url: url_t,
                type: 'GET',
                success: function(respuesta) {
                    respuesta_html = '';
                    respuesta_html += '<option value="">---Seleccione---</option>';
                    $.each(respuesta, function(index, item) {
                        respuesta_html += '<option value="' + item['id'] + '">' + item['id'] + '</option>';
                    });
                    $('#id').html(respuesta_html);
                    $('#tituloID').html('Por Id');
                },
                error: function() {

                }
            });
            //-*+-*+-*+-*+-*+-*+-*+-*+-*

        } else if ($(this).val() == 'Normas') {
            $('.seccionFuenteEmisora').removeClass('d-none');
            $('#tituloID').html('Artículo');
        }
    });
    //==========================================================================
    $('#area_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
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
                if (id != '') {
                    respuesta_html += '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html += '<option value="">Seleccione primero un área</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['tema'] + '</option>';
                });
                $('#tema_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#tema_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
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
                if (id != '') {
                    respuesta_html += '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html += '<option value="">Seleccione primero un tema</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['tema'] + '</option>';
                });
                $('#wikutemaespecifico_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#fuente_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
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
                if (id != '') {
                    respuesta_html += '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html += '<option value="">Seleccione primero una Fuente Emisora</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['articulo'] + '</option>';
                });
                $('#id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#tipo_p_q_r_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();
        var data = {
            "id": id,
        };
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {

                respuesta_html = '<option value="">---Seleccione---</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['motivo'] + '</option>';
                });
                $('#motivo_id').html(respuesta_html);
                $('#motivo_sub_id').html('<option value="">---Seleccione un motivo---</option>');
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#motivo_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();
        var data = {
            "id": id,
        };
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {
                respuesta_html = '<option value="">---Seleccione---</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['sub_motivo'] + '</option>';
                });
                $('#motivo_sub_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#categoria_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();
        var data = {
            "id": id,
        };
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {
                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Elija primero una categoria</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['producto'] + '</option>';
                });
                $('#producto_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#producto_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();
        var data = {
            "id": id,
        };
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {
                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Elija primero un producto</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['marca'] + '</option>';
                });
                $('#marca_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#marca_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();
        var data = {
            "id": id,
        };
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {

                if (respuesta != '') {
                    respuesta_html = '<option value="">---Seleccione---</option>';
                } else {
                    respuesta_html = '<option value="">Elija primero una marca</option>';
                }
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['referencia'] + '</option>';
                });
                $('#referencia_id').html(respuesta_html);
            },
            error: function() {

            }
        });

    });
    //==========================================================================
    $('#prod_serv').on('change', function(event) {
        if ($(this).val() == 'Producto') {
            $('#servicios').addClass('d-none');
            $('#categorias').removeClass('d-none');
            $('#productos').removeClass('d-none');
            $('#marcas').removeClass('d-none');
            $('#referencias').removeClass('d-none');
        } else if ($(this).val() == 'Servicio') {
            $('#servicios').removeClass('d-none');
            $('#categorias').addClass('d-none');
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
        } else {
            $('#servicios').addClass('d-none');
            $('#categorias').addClass('d-none');
            $('#productos').addClass('d-none');
            $('#marcas').addClass('d-none');
            $('#referencias').addClass('d-none');
        }

    });
    //==========================================================================
    $('.busquedaAvanzada').on('click', function() {
        const url_t_1 = $(this).attr('data_url');
        busquedaAvanzada(url_t_1);
    });
    //==========================================================================
    function busquedaAvanzada(url_t_1) {
        //const url_t = $("#btn_buscar").attr('data_url');
        const url_t = url_t_1;
        const tipo_wiku = $('#tipo_wiku');
        const area_id = $('#area_id');
        const tema_id = $('#tema_id');
        const wikutemaespecifico_id = $('#wikutemaespecifico_id');
        const fuente_id = $('#fuente_id');
        const id = $('#id');
        const fecha = $('#fecha');
        const prod_serv = $('#prod_serv');
        const tipo_p_q_r_id = $('#tipo_p_q_r_id');
        const motivo_id = $('#motivo_id');
        const motivo_sub_id = $('#motivo_sub_id');
        const servicio_id = $('#servicio_id');
        const categoria_id = $('#categoria_id');
        const producto_id = $('#producto_id');
        const marca_id = $('#marca_id');
        const referencia_id = $('#referencia_id');
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        const tipowiku = tipo_wiku.val();
        if (tipowiku != '') {
            var data = {
                "tipowiku": tipowiku,
                "area_id": area_id.val(),
                "tema_id": tema_id.val(),
                "wikutemaespecifico_id": wikutemaespecifico_id.val(),
                "fuente_id": fuente_id.val(),
                "id": id.val(),
                "fecha": fecha.val(),
                "prod_serv": prod_serv.val(),
                "tipo_p_q_r_id": tipo_p_q_r_id.val(),
                "motivo_id": motivo_id.val(),
                "motivo_sub_id": motivo_sub_id.val(),
                "servicio_id": servicio_id.val(),
                "categoria_id": categoria_id.val(),
                "producto_id": producto_id.val(),
                "marca_id": marca_id.val(),
                "referencia_id": referencia_id.val(),
            };
            $.ajax({
                url: url_t,
                type: 'GET',
                data: data,
                success: function(respuesta) {
                    $html_ = '';
                    if (tipowiku == 'Normas') {
                        $.each(respuesta, function(index, norma) {
                            $html_ += '<div class="col -12 col-md-10">';
                            $html_ += '<div class="card card-info collapsed-card card-mini-sombra">';
                            $html_ += '<div class="card-header">';
                            $html_ += '<div class="user-block">';
                            $html_ += '<span class="username"><a href="#">Norma</a></span>';
                            $html_ += '<span class="description text-white" >' + norma.tema_especifico.tema_.area['area'] + '->' + norma.tema_especifico.tema_['tema'] + '->' + norma.tema_especifico['tema'] + '->' + norma['articulo'] + '</span>';
                            $html_ += '</div>';
                            $html_ += '<div class="card-tools">';
                            $html_ += '<button type="button" class="btn btn-tool" data-card-widget="collapse">';
                            $html_ += '<i class="fas fa-plus"></i>';
                            $html_ += '</button>';
                            $html_ += '<button type="button" class="btn btn-tool" data-card-widget="remove">';
                            $html_ += '<i class="fas fa-times"></i>';
                            $html_ += '</button>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '<div class="card-body">';
                            $html_ += '<div class="row">';
                            $html_ += '<div class="col-12">';
                            $html_ += '<p><strong>Texto:</strong> ' + norma['texto'] + '</p>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '<div class="row">';
                            if (norma.criterios.length > 0) {
                                $html_ += '<hr>';
                                $html_ += '<div class="row">';
                                $html_ += '<div class="col-12"><h6>Criterios Juridicos</h6></div>';
                                $html_ += '<div class="col-12 table-responsive" style="font-size:0.8em;">';
                                $html_ += '<table class="table">';
                                $html_ += '<thead>';
                                $html_ += '<tr>';
                                $html_ += '<th style="white-space:nowrap">Autor(es)</th>';
                                $html_ += '<th style="white-space:nowrap">Criterios jurídicos de aplicación</th>';
                                $html_ += '<th style="white-space:nowrap">Criterios jurídicos de no aplicación</th>';
                                $html_ += '<th style="white-space:nowrap">Notas de la Vigencia</th>';
                                $html_ += '</tr>';
                                $html_ += '</thead>';
                                $html_ += '<tbody>';
                                $.each(norma.criterios, function(index, criterio) {
                                    $html_ += '<tr>';
                                    $html_ += '<td style="white-space:nowrap">' + criterio['autores'] + '</td>';
                                    if (criterio['criterio_si'] != null) {
                                        $html_ += '<td>' + criterio['criterio_si'] + '</td>';
                                    } else {
                                        $html_ += '<td class="text-center">---</td>';
                                    }
                                    if (criterio['criterio_no'] != null) {
                                        $html_ += '<td>' + criterio['criterio_no'] + '</td>';
                                    } else {
                                        $html_ += '<td class="text-center">---</td>';
                                    }
                                    if (criterio['notas'] != null) {
                                        $html_ += '<td>' + criterio['notas'] + '</td>';
                                    } else {
                                        $html_ += '<td class="text-center">---</td>';
                                    }
                                    $html_ += '</tr>';
                                })
                                $html_ += '</tbody>';
                                $html_ += '</table>';
                                $html_ += '</div>';
                                $html_ += '</div>';
                            } else {
                                $html_ += '<div class="col-12 text-center"><p><strong>Sin criterios jurídicos</strong></p></div>';
                            }
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '<div class="card-footer ">';
                            $html_ += '<div class="row">';
                            $html_ += '<div class="col-12">';
                            $html_ += '<button class="btn btn-info btn-xs pl-4 pr-4 agregarTexto">Agregar</button>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '</div>';

                        });
                    } else if (tipowiku == 'Argumentos') {
                        $.each(respuesta, function(index, argumento) {
                            $html_ += '<div class="col -12 col-md-10">';
                            $html_ += '<div class="resultado-busqueda card card-success bg-legal1 collapsed-card card-mini-sombra">';
                            $html_ += '<div class="card-header">';
                            $html_ += '<div class="user-block">';
                            $html_ += '<span class="username"><a href="#">Argumento</a></span>';
                            $html_ += '<span class="description text-white" >' + argumento.tema_especifico.tema_.area['area'] + '->' + argumento.tema_especifico.tema_['tema'] + '->' + argumento.tema_especifico['tema'] + '</span>';
                            $html_ += '</div>';
                            $html_ += '<div class="card-tools">';
                            $html_ += '<button type="button" class="btn btn-tool" data-card-widget="collapse">';
                            $html_ += '<i class="fas fa-plus"></i>';
                            $html_ += '</button>';
                            $html_ += '<button type="button" class="btn btn-tool" data-card-widget="remove">';
                            $html_ += '<i class="fas fa-times"></i>';
                            $html_ += '</button>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '<div class="card-body">';
                            $html_ += '<div class="row">';
                            $html_ += '<div class="col-12">';
                            $html_ += '<p><strong>Texto:</strong></p>';
                            $html_ += '<div class="textoCopiar">' + argumento['texto'] + '</div>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '<div class="row">';
                            if (argumento.criterios.length > 0) {
                                $html_ += '<hr>';
                                $html_ += '<div class="row">';
                                $html_ += '<div class="col-12"><h6>Criterios Juridicos</h6></div>';
                                $html_ += '<div class="col-12 table-responsive" style="font-size:0.8em;">';
                                $html_ += '<table class="table">';
                                $html_ += '<thead>';
                                $html_ += '<tr>';
                                $html_ += '<th style="white-space:nowrap">Autor(es)</th>';
                                $html_ += '<th style="white-space:nowrap">Criterios jurídicos de aplicación</th>';
                                $html_ += '<th style="white-space:nowrap">Criterios jurídicos de no aplicación</th>';
                                $html_ += '<th style="white-space:nowrap">Notas de la Vigencia</th>';
                                $html_ += '</tr>';
                                $html_ += '</thead>';
                                $html_ += '<tbody>';
                                $.each(argumento.criterios, function(index, criterio) {
                                    $html_ += '<tr>';
                                    $html_ += '<td style="white-space:nowrap">' + criterio['autores'] + '</td>';
                                    if (criterio['criterio_si'] != null) {
                                        $html_ += '<td>' + criterio['criterio_si'] + '</td>';
                                    } else {
                                        $html_ += '<td class="text-center">---</td>';
                                    }
                                    if (criterio['criterio_no'] != null) {
                                        $html_ += '<td>' + criterio['criterio_no'] + '</td>';
                                    } else {
                                        $html_ += '<td class="text-center">---</td>';
                                    }
                                    if (criterio['notas'] != null) {
                                        $html_ += '<td>' + criterio['notas'] + '</td>';
                                    } else {
                                        $html_ += '<td class="text-center">---</td>';
                                    }
                                    $html_ += '</tr>';
                                })
                                $html_ += '</tbody>';
                                $html_ += '</table>';
                                $html_ += '</div>';
                                $html_ += '</div>';
                            } else {
                                $html_ += '<div class="col-12 text-center"><p><strong>Sin criterios jurídicos</strong></p></div>';
                            }
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '<div class="card-footer ">';
                            $html_ += '<div class="row">';
                            $html_ += '<div class="col-12">';
                            $html_ += '<button class="btn btn-info btn-xs pl-4 pr-4 agregarTexto">Agregar</button>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '</div>';
                            $html_ += '</div>';

                        });
                    }
                    $('#coleccionrespuesta').html($html_);
                    asignarBusqueda()

                },
                error: function() {

                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'fantan datos de busqueda',
                text: 'Debe elegir al menos una categoria de wiku'
            })
            tipo_wiku.focus();
        }

    }
    //==========================================================================

    function asignarBusqueda() {
        let btnAgregarRespuestas = document.querySelectorAll('.agregarTexto')
        btnAgregarRespuestas.forEach(btn => {
            btn.addEventListener('click', agregarTexto)
        })
    }

    function agregarTexto(btn) {
        let btnRespuesta = btn.target
        let bloqueRespuesta = btnRespuesta.parentElement.parentElement.parentElement.parentElement
        let numPeticion = bloqueRespuesta.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-value')
        let respuestaBusqueda = bloqueRespuesta.querySelector('.textoCopiar')
        let respuestaCopia = respuestaBusqueda.cloneNode(true)
        let respuestaPeticion = bloqueRespuesta.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        let bloqueEditable = respuestaPeticion.querySelector('.note-editable')
        let parrafosAnteriores = bloqueEditable.querySelectorAll('p')
        if (parrafosAnteriores.length == 1) {
            if (parrafosAnteriores[0].querySelector('br')) {
                parrafosAnteriores[0].remove()
            }
        }

        bloqueEditable.appendChild(respuestaCopia)
        const enter = new KeyboardEvent('keydown', {
            bubbles: true, cancelable: true, keyCode: 32
        });
        bloqueEditable.dispatchEvent(enter);
        let btnCerrar = document.querySelector(`.buscar-${numPeticion} .modal-header button`)
        btnCerrar.click()

    }
})

window.onload = function () {
    const id_tutela = $('#id_tutela').val();
    const url_t = $('#id_tutela').attr('data_url');


    $html_ = '';
    if (id_tutela != '') {
        var data = {
            "id_tutela": id_tutela,
        };
        $.ajax({
            url: url_t,
            type: 'GET',
            data: data,
            success: function(respuesta) {
                console.log(respuesta);
                $html_ = '';
                $.each(respuesta.argumentos, function(index, argumento) {
                    $html_ += '<div class="col -12 col-md-10">';
                    $html_ += '<div class="resultado-busqueda card card-success bg-legal1 collapsed-card card-mini-sombra">';
                    $html_ += '<div class="card-header">';
                    $html_ += '<div class="user-block">';
                    $html_ += '<span class="username"><a href="#">Argumento</a></span>';
                    $html_ += '<span class="description text-white" >' + argumento.tema_especifico.tema_.area['area'] + '->' + argumento.tema_especifico.tema_['tema'] + '->' + argumento.tema_especifico['tema'] + '</span>';
                    $html_ += '</div>';
                    $html_ += '<div class="card-tools">';
                    $html_ += '<button type="button" class="btn btn-tool" data-card-widget="collapse">';
                    $html_ += '<i class="fas fa-plus"></i>';
                    $html_ += '</button>';
                    $html_ += '<button type="button" class="btn btn-tool" data-card-widget="remove">';
                    $html_ += '<i class="fas fa-times"></i>';
                    $html_ += '</button>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '<div class="card-body">';
                    $html_ += '<div class="row">';
                    $html_ += '<div class="col-12">';
                    $html_ += '<p><strong>Texto:</strong></p>';
                    $html_ += '<div class="textoCopiar">' + argumento['texto'] + '</div>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '<div class="row">';
                    if (argumento.criterios.length > 0) {
                        $html_ += '<hr>';
                        $html_ += '<div class="row">';
                        $html_ += '<div class="col-12"><h6>Criterios Juridicos</h6></div>';
                        $html_ += '<div class="col-12 table-responsive" style="font-size:0.8em;">';
                        $html_ += '<table class="table">';
                        $html_ += '<thead>';
                        $html_ += '<tr>';
                        $html_ += '<th style="white-space:nowrap">Autor(es)</th>';
                        $html_ += '<th style="white-space:nowrap">Criterios jurídicos de aplicación</th>';
                        $html_ += '<th style="white-space:nowrap">Criterios jurídicos de no aplicación</th>';
                        $html_ += '<th style="white-space:nowrap">Notas de la Vigencia</th>';
                        $html_ += '</tr>';
                        $html_ += '</thead>';
                        $html_ += '<tbody>';
                        $.each(argumento.criterios, function(index, criterio) {
                            $html_ += '<tr>';
                            $html_ += '<td style="white-space:nowrap">' + criterio['autores'] + '</td>';
                            if (criterio['criterio_si'] != null) {
                                $html_ += '<td>' + criterio['criterio_si'] + '</td>';
                            } else {
                                $html_ += '<td class="text-center">---</td>';
                            }
                            if (criterio['criterio_no'] != null) {
                                $html_ += '<td>' + criterio['criterio_no'] + '</td>';
                            } else {
                                $html_ += '<td class="text-center">---</td>';
                            }
                            if (criterio['notas'] != null) {
                                $html_ += '<td>' + criterio['notas'] + '</td>';
                            } else {
                                $html_ += '<td class="text-center">---</td>';
                            }
                            $html_ += '</tr>';
                        })
                        $html_ += '</tbody>';
                        $html_ += '</table>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                    } else {
                        $html_ += '<div class="col-12 text-center"><p><strong>Sin criterios jurídicos</strong></p></div>';
                    }
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '<div class="card-footer ">';
                    $html_ += '<div class="row">';
                    $html_ += '<div class="col-12">';
                    $html_ += '<button class="btn btn-info btn-xs pl-4 pr-4 agregarTexto">Agregar</button>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '</div>';

                });
                $.each(respuesta.normas, function(index, norma) {
                    $html_ += '<div class="col -12 col-md-10">';
                    $html_ += '<div class="card card-info collapsed-card card-mini-sombra">';
                    $html_ += '<div class="card-header">';
                    $html_ += '<div class="user-block">';
                    $html_ += '<span class="username"><a href="#">Norma</a></span>';
                    $html_ += '<span class="description text-white" >' + norma.tema_especifico.tema_.area['area'] + '->' + norma.tema_especifico.tema_['tema'] + '->' + norma.tema_especifico['tema'] + '->' + norma['articulo'] + '</span>';
                    $html_ += '</div>';
                    $html_ += '<div class="card-tools">';
                    $html_ += '<button type="button" class="btn btn-tool" data-card-widget="collapse">';
                    $html_ += '<i class="fas fa-plus"></i>';
                    $html_ += '</button>';
                    $html_ += '<button type="button" class="btn btn-tool" data-card-widget="remove">';
                    $html_ += '<i class="fas fa-times"></i>';
                    $html_ += '</button>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '<div class="card-body">';
                    $html_ += '<div class="row">';
                    $html_ += '<div class="col-12">';
                    $html_ += '<p><strong>Texto:</strong> ' + norma['texto'] + '</p>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '<div class="row">';
                    if (norma.criterios.length > 0) {
                        $html_ += '<hr>';
                        $html_ += '<div class="row">';
                        $html_ += '<div class="col-12"><h6>Criterios Juridicos</h6></div>';
                        $html_ += '<div class="col-12 table-responsive" style="font-size:0.8em;">';
                        $html_ += '<table class="table">';
                        $html_ += '<thead>';
                        $html_ += '<tr>';
                        $html_ += '<th style="white-space:nowrap">Autor(es)</th>';
                        $html_ += '<th style="white-space:nowrap">Criterios jurídicos de aplicación</th>';
                        $html_ += '<th style="white-space:nowrap">Criterios jurídicos de no aplicación</th>';
                        $html_ += '<th style="white-space:nowrap">Notas de la Vigencia</th>';
                        $html_ += '</tr>';
                        $html_ += '</thead>';
                        $html_ += '<tbody>';
                        $.each(norma.criterios, function(index, criterio) {
                            $html_ += '<tr>';
                            $html_ += '<td style="white-space:nowrap">' + criterio['autores'] + '</td>';
                            if (criterio['criterio_si'] != null) {
                                $html_ += '<td>' + criterio['criterio_si'] + '</td>';
                            } else {
                                $html_ += '<td class="text-center">---</td>';
                            }
                            if (criterio['criterio_no'] != null) {
                                $html_ += '<td>' + criterio['criterio_no'] + '</td>';
                            } else {
                                $html_ += '<td class="text-center">---</td>';
                            }
                            if (criterio['notas'] != null) {
                                $html_ += '<td>' + criterio['notas'] + '</td>';
                            } else {
                                $html_ += '<td class="text-center">---</td>';
                            }
                            $html_ += '</tr>';
                        })
                        $html_ += '</tbody>';
                        $html_ += '</table>';
                        $html_ += '</div>';
                        $html_ += '</div>';
                    } else {
                        $html_ += '<div class="col-12 text-center"><p><strong>Sin criterios jurídicos</strong></p></div>';
                    }
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '<div class="card-footer ">';
                    $html_ += '<div class="row">';
                    $html_ += '<div class="col-12">';
                    $html_ += '<button class="btn btn-info btn-xs pl-4 pr-4 agregarTexto">Agregar</button>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '</div>';
                    $html_ += '</div>';

                });
                $('.coleccionrespuesta').html($html_);
                asignarBusqueda()
            },
            error: function() {

            }
        });
    } else {
        $('.coleccionrespuesta').html($html_);
    }
    function asignarBusqueda() {
        let btnAgregarRespuestas = document.querySelectorAll('.agregarTexto')
        btnAgregarRespuestas.forEach(btn => {
            btn.addEventListener('click', agregarTexto)
        })
    }

    function agregarTexto(btn) {
        let btnRespuesta = btn.target
        let bloqueRespuesta = btnRespuesta.parentElement.parentElement.parentElement.parentElement
        let numPeticion = bloqueRespuesta.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-value')
        let respuestaBusqueda = bloqueRespuesta.querySelector('.textoCopiar')
        let respuestaCopia = respuestaBusqueda.cloneNode(true)
        let respuestaPeticion = bloqueRespuesta.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        let bloqueEditable = respuestaPeticion.querySelector('.note-editable')
        let parrafosAnteriores = bloqueEditable.querySelectorAll('p')
        if (parrafosAnteriores.length == 1) {
            if (parrafosAnteriores[0].querySelector('br')) {
                parrafosAnteriores[0].remove()
            }
        }

        bloqueEditable.appendChild(respuestaCopia)
        const enter = new KeyboardEvent('keydown', {
            bubbles: true, cancelable: true, keyCode: 32
        });
        bloqueEditable.dispatchEvent(enter);
        let btnCerrar = document.querySelector(`.buscar-${numPeticion} .modal-header button`)
        btnCerrar.click()

    }
  }
