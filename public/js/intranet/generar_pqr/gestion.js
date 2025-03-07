$(document).ready(function(e) {
    $('textarea').find('p').on('input', function(e) {
        let contenedor = e.target.parentNode.parentNode
        let respuesta = contenedor.querySelector('.titulo-anexoRespuestaRecurso textArea').value
        alert('sip');
    })
});
window.addEventListener('DOMContentLoaded', function() {
    const id_pqr = document.querySelector('.id_pqr').value

    // Funcion para reasignar petición
    $('.reasignarPeticion').on('change', function(e) {
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

    // Funcion para reasignar petición
    $('.recurso_check').on('change', function(e) {
        let padre = e.target.parentElement.parentElement.parentElement
        switch (e.target.value) {
            case '1':
                padre.querySelector('.recurso-form').classList.remove('d-none');
                break;
            case '0':
                padre.querySelector('.recurso-form').classList.add('d-none');
                break;
        }
    });

    // Funcion para responder recurso petición
    let btnRecursosGuardar = document.querySelectorAll('.guardarRespuestaRecurso button')
    btnRecursosGuardar.forEach(e => {
        e.addEventListener('click', guardarRespuestaRecurso)
    })

    function guardarRespuestaRecurso(e) {
        e.preventDefault()
        let contenedor = e.target.parentNode.parentNode
        let url = e.target.getAttribute('data_url')
        let token = e.target.getAttribute('data_token')
        let idRecurso = contenedor.querySelector('.id_recurso').value
        let tipo_reposicion_id = contenedor.querySelector('.tipo_reposicion_id').value
        let respuesta = contenedor.querySelector('.titulo-anexoRespuestaRecurso textArea').value
        if (respuesta == '') {
            alert('La respuesta al recurso esta vacia.')
        } else {
            let resprecursos_id = 0
            let data = {
                recurso_id: idRecurso,
                id: id_pqr,
                tipo_reposicion_id,
                respuesta: respuesta
            }
            guardar_recurso(data)

            function guardar_recurso(data) {
                $.ajax({
                    async: false,
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        // console.log(respuesta)
                        resprecursos_id = respuesta.data.id
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                if (!data.apelacionCierre) {
                    let anexosRecursos = contenedor.querySelectorAll('.anexoRespuestaRecurso')
                    anexosRecursos.forEach(anexo => {
                        let titulo = anexo.querySelector('.titulo-anexoRespuestaRecurso textArea').value
                        let descripcion = anexo.querySelector('.descripcion-anexoRespuestaRecurso input').value
                        let archivo = anexo.querySelector('.doc-anexoRespuestaRecurso input').files[0]
                        let dataAnexo = new FormData();
                        dataAnexo.append('resprecursos_id', resprecursos_id);
                        dataAnexo.append('titulo', titulo);
                        dataAnexo.append('descripcion', descripcion);
                        dataAnexo.append('archivo', archivo);
                        dataAnexo.append('_token', token);
                        let urlAnexo = anexo.parentNode.parentNode.parentNode
                        urlAnexo = urlAnexo.querySelector('.guardarRespuestaRecurso button').getAttribute('data_url_anexos')
                        if (archivo) {
                            $.ajax({
                                async: false,
                                url: urlAnexo,
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
                location.reload();
            }
        }
    }

    // Funcion para actualizar recurso petición
    let btnRecursosActualizar = document.querySelectorAll('.actualizarRespuestaRecurso button')
    btnRecursosActualizar.forEach(e => {
        e.addEventListener('click', actualizarRespuestaRecurso)
    })

    function actualizarRespuestaRecurso(e) {
        e.preventDefault()
        let contenedor = e.target.parentNode.parentNode
        let url = e.target.getAttribute('data_url')
        let token = e.target.getAttribute('data_token')
        let idRecurso = contenedor.querySelector('.id_recurso').value
        let tipo_reposicion_id = contenedor.querySelector('.tipo_reposicion_id').value
        let respuesta = contenedor.querySelector('.titulo-anexoRespuestaRecurso textArea').value
        if (respuesta == '') {
            alert('La respuesta al recurso esta vacia.')
        } else {
            let resprecursos_id = 0
            let data = {
                recurso_id: idRecurso,
                id: id_pqr,
                tipo_reposicion_id,
                respuesta: respuesta
            }
            guardar_recurso(data)

            function guardar_recurso(data) {
                $.ajax({
                    async: false,
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        // console.log(respuesta)
                        resprecursos_id = respuesta.data.id
                    },
                    error: function(error) {
                        console.log(error.responseJSON)
                    }
                });
                let anexosRecursos = contenedor.querySelectorAll('.anexoRespuestaRecurso')
                anexosRecursos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo-anexoRespuestaRecurso textArea').value
                    let descripcion = anexo.querySelector('.descripcion-anexoRespuestaRecurso input').value
                    let archivo = anexo.querySelector('.doc-anexoRespuestaRecurso input').files[0]
                    let dataAnexo = new FormData();
                    dataAnexo.append('resprecursos_id', resprecursos_id);
                    dataAnexo.append('titulo', titulo);
                    dataAnexo.append('descripcion', descripcion);
                    dataAnexo.append('archivo', archivo);
                    dataAnexo.append('_token', token);
                    let urlAnexo = anexo.parentNode.parentNode.parentNode
                    urlAnexo = urlAnexo.querySelector('.actualizarRespuestaRecurso button').getAttribute('data_url_anexos')
                    if (archivo) {
                        $.ajax({
                            async: false,
                            url: urlAnexo,
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
                location.reload();
            }
        }
    }

    // Funcion para ocultar bloque aclaraciones
    $('.aclaracion_check').on('change', function(e) {
        let padre = e.target.parentNode.parentNode.parentNode
        switch (e.target.value) {
            case '1':
                padre.querySelector('.aclaracion').parentElement.classList.remove('d-none');
                break;
            case '0':
                padre.querySelector('.aclaracion').parentElement.classList.add('d-none');
                break;
        }
    });

    let verificacionAclaracion = document.querySelectorAll('.respuestaAclaracion')
    verificacionAclaracion.forEach(item => {
        if (item.value == 1) {
            if (item.parentElement.querySelector('.aclaracion_check_si')) {
                item.parentElement.querySelector('.aclaracion_check_si').setAttribute('checked', '')
                item.parentElement.querySelector('.aclaracion_check_no').setAttribute('disabled', '')
            }
        } else {
            if (item.parentElement.querySelector('.aclaracion_check_no')) {
                item.parentElement.querySelector('.aclaracion_check_no').setAttribute('checked', '')
                item.parentElement.querySelector('.aclaracion').parentElement.classList.add('d-none')
            }
        }
    })


    // Guardar aclaracion
    if (document.querySelector('.btn-aclaracion')) {
        let btnAclaraciones = document.querySelectorAll('.btn-aclaracion')
        btnAclaraciones.forEach(btn => btn.addEventListener('click', guardarAclaraciones))

        function guardarAclaraciones(btn) {
            btn.preventDefault()
            padreAclaracion = btn.target.parentElement.parentElement.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let tipoAclaracion = padreAclaracion.querySelector('.tipo_aclaracion').value
            let solicitudAclaracion = padreAclaracion.querySelector('.solicitud_aclaracion').value
            let id_peticion = padreAclaracion.querySelector('.id_peticion').value
            if (tipoAclaracion != '' && solicitudAclaracion != '') {
                let data = {
                    tipoAclaracion,
                    solicitudAclaracion,
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
            } else {
                alert('Debe diligenciar todos los campos del formulario')
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

    // Guardar respuesta
    if (document.querySelector('.btn-respuesta')) {
        let btnRespuestas = document.querySelectorAll('.btn-respuesta')
        btnRespuestas.forEach(btn => btn.addEventListener('click', guardarRespuestas))

        function guardarRespuestas(btn) {
            btn.preventDefault()
            padreRespuesta = btn.target.parentElement
            let url = btn.target.getAttribute('data_url')
            let url2 = btn.target.getAttribute('data_url2')
            let token = btn.target.getAttribute('data_token')
            let respuesta = padreRespuesta.querySelector('.respuesta').value
            let id_peticion = padreRespuesta.parentElement.parentElement.querySelector('.id_peticion').value
            let anexos = padreRespuesta.querySelectorAll('.anexoconsulta')
            if (respuesta != '') {
                swal("Guardar la respúesta como:", {
                    buttons: {
                        definitiva: {
                            text: "Definitiva",
                            value: "definitiva",
                            className: "bg-primary",
                        },
                        parcial: {
                            text: "Parcial",
                            value: "parcial",
                            className: "bg-primary",
                        },
                        cancel: "Cancelar",
                    },
                })
                .then((value) => {
                    switch (value) {
                        case "definitiva":
                            let data = {
                                respuesta,
                                id_peticion,
                                estado: 11
                            }
                            guardarRespuesta(data)
                            break;


                        case "parcial":
                            let data1 = {
                                respuesta,
                                id_peticion
                            }
                            guardarRespuesta(data1)
                            break;

                        default:
                    }
                });
            }

            function guardarRespuesta(data) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { 'X-CSRF-TOKEN': token },
                    data: data,
                    success: function(respuesta) {
                        guardarRespuestaAnexo(anexos, respuesta)
                    },
                    error: function(error) {
                        console.log(error)
                    }
                });
                if (padreRespuesta.querySelector('.respuesta_anterior')) {
                    let respuesta_anterior = padreRespuesta.querySelector('.respuesta_anterior')
                    let url_respuesta_anterior = respuesta_anterior.getAttribute('data_url')
                    if (respuesta != respuesta_anterior) {
                        let data = {
                            mensajeHistorial: `Respuesta anterior: "${respuesta_anterior.value}"`,
                            idPqr: id_pqr,
                            idPeticion: id_peticion
                        }
                        $.ajax({
                            url: url_respuesta_anterior,
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

                }
            }

            function guardarRespuestaAnexo(anexos, idrespuesta) {
                anexos.forEach(anexo => {
                    let titulo = anexo.querySelector('.titulo').value
                    let descripcion = anexo.querySelector('.descripcion').value
                    let archivo = anexo.querySelector('.documento').files[0]
                    if (archivo) {
                        let dataAnexo = new FormData();
                        dataAnexo.append('respuesta_id', idrespuesta.data);
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
                location.reload();
            }
        }
    }


    // Guardar estado
    if (document.querySelector('.btn-estado')) {
        let btnEstados = document.querySelectorAll('.btn-estado')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            if (btnE.tagName === 'I') {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement
                btnE = btnE.parentElement.parentElement
            } else {
                padreEstado = btnE.parentElement.parentElement.parentElement
            }
            let url = btnE.getAttribute('data_url')
            let token = btnE.getAttribute('data_token')
            let estado = padreEstado.querySelector('.estadoPeticion').value
            let respuesta = padreEstado.querySelector('.respuesta').value
            let id_peticion = padreEstado.parentElement.querySelector('.id_peticion').value
            let data = {
                estado,
                id_peticion
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

    // Guardar estado recurso
    if (document.querySelector('.btn-estado-recurso')) {
        let btnEstados = document.querySelectorAll('.btn-estado-recurso')
        btnEstados.forEach(btn => btn.addEventListener('click', guardarEstado))

        function guardarEstado(btn) {
            btn.preventDefault()
            let btnE = btn.target
            if (btnE.tagName === 'I') {
                padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement
                btnE = btnE.parentElement.parentElement
            } else {
                padreEstado = btnE.parentElement.parentElement.parentElement
            }
            let url = btnE.getAttribute('data_url')
            let token = btnE.getAttribute('data_token')
            let estado = padreEstado.querySelector('.estadoPeticion').value
            let id_peticion = padreEstado.parentElement.parentElement.parentElement.querySelector('.id_peticion').value
            if (padreEstado.parentElement.parentElement.parentElement.querySelector('.validacion_recurso')) {
                if (padreEstado.parentElement.parentElement.parentElement.querySelector('.validacion_recurso').value == 0) {
                    alert('Debe responder el recursos de la petición')
                } else {
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
            } else {
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
    }

    // Guardar reasignar petición a funcionario
    if (document.querySelectorAll('.reasignacion_peticion_guardar')) {
        let reasignacionPeticiones = document.querySelectorAll('.reasignacion_peticion_guardar')
        reasignacionPeticiones.forEach(reasignacion => {
            reasignacion.addEventListener('click', function(e) {
                e.preventDefault()
                let padre = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
                let url = e.target.getAttribute('data_url')
                let url2 = e.target.getAttribute('data_url2')
                let token = e.target.getAttribute('data_token')
                let peticion = padre.querySelector('.id_peticion').value
                let funcionario = padre.querySelector('.funcionario').value
                let cargo = padre.querySelector('.funcionario').value
                let mensajeHistorial = padre.querySelector('.mensaje-historial-peticion').value
                if (peticion == '' || cargo == '' || funcionario == '' || mensajeHistorial == '') {
                    alert("Debe dilegenciar todos los campos")
                } else {
                    guardarReasignacionPeticion()
                }

                function guardarReasignacionPeticion() {
                    let data = {
                        peticion,
                        funcionario
                    }
                    let data2 = {
                        idPeticion: peticion,
                        mensajeHistorial,
                        idPqr: id_pqr
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

    //  Guardar Historial PQR-peticion
    if (document.querySelector('.guardarHistorialPeticion')) {
        let HistorialPeticiones = document.querySelectorAll('.guardarHistorialPeticion')
        HistorialPeticiones.forEach(btn => btn.addEventListener('click', guardarHistorialPeticiones))

        function guardarHistorialPeticiones(btn) {
            btn.preventDefault()
            let contenedorHisotrial = btn.target.parentElement.parentElement
            let url = btn.target.getAttribute('data_url')
            let token = btn.target.getAttribute('data_token')
            let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-peticion').value
            let idPeticion = contenedorHisotrial.parentElement.querySelector('.id_peticion').value
            if (mensajeHistorial == '') {
                alert("Debe agregar un historial")
            } else {
                guardarHistorialPeticion()
            }

            function guardarHistorialPeticion() {
                let data = {
                    mensajeHistorial,
                    idPqr: id_pqr,
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
window.addEventListener('load', function() {
    $('.coleccionrespuesta').html('');
    const url_t = $('#pqr_id').attr('data_url');
    $html_ = '';
    $.ajax({
        url: url_t,
        type: 'GET',
        success: function(respuesta) {
            console.log(respuesta);
            $html_ = '';
            if (respuesta.argumentos.length>0) {
                $.each(respuesta.argumentos, function(index, argumento) {
                    $html_ += '<div class="col -12 col-md-10">';
                    $html_ += '<div class="resultado-busqueda card card-success bg-legal1 collapsed-card card-mini-sombra">';
                    $html_ += '<div class="card-header">';
                    $html_ += '<div class="user-block">';
                    $html_ += '<span class="username"><a href="#">Argumento</a></span>';
                    //$html_ += '<span class="description text-white" >' + argumento.tema_especifico.tema_.area['area'] + '->' + argumento.tema_especifico.tema_['tema'] + '->' + argumento.tema_especifico['tema'] + '</span>';
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
            if (respuesta.normas.length>0) {
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

            }
            $('.coleccionrespuesta').html($html_);
            asignarBusqueda()
        },
        error: function() {

        }
    });
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
});
