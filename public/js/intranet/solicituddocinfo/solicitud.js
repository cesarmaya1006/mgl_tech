window.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll('#fromSolicitudDocInfo')) {
        // Incio Validacion envio de formulario
        let btnSubmit = document.querySelector('#fromSolicitudDocInfo')
        btnSubmit.addEventListener('submit', function (e) {
            e.preventDefault()
            ajustarSolicitudes()
            ajustarNameAnexo(document.querySelectorAll('.anexosolicitud'))
            document.querySelector('.totalCantidadAnexosSolicitud').value = document.querySelectorAll('.anexosolicitud').length
            this.submit();
        })
        // Fin Validacion envio de formulario

        // ---------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios anexos en una peticion con validación.
        ajustarNameAnexo(document.querySelectorAll('.anexosolicitud'))
        let btncrearAnexo = document.querySelectorAll('.crearAnexo')
        btncrearAnexo.forEach(btn => btn.addEventListener('click', crearNuevoAnexo))
        let btnEliminarAnexo = document.querySelector('.eliminaranexoSolicitud')
        btnEliminarAnexo.addEventListener('click', agregarEliminarAnexo)

        function crearNuevoAnexo(e) {
            e.preventDefault()
            let peticion = e.target.parentNode.parentNode
            let nuevoAnexoHecho = peticion.querySelectorAll('.anexosolicitud')[0].cloneNode(true)
            nuevoAnexoHecho.querySelector('.titulo-anexoSolicitud input').value = ''
            nuevoAnexoHecho.querySelector('.descripcion-anexoSolicitud input').value = ''
            nuevoAnexoHecho.querySelector('.doc-anexoSolicitud input').value = ''
            peticion.querySelector('#anexosSolicitud').appendChild(nuevoAnexoHecho)
            ajustarNameAnexo(document.querySelectorAll('.anexosolicitud'))
            document.querySelectorAll('.eliminaranexoSolicitud').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
        }

        function ajustarNameAnexo(anexosSolicitud) {
            for (let i = 0; i < anexosSolicitud.length; i++) {
                const anexosolicitud = anexosSolicitud[i];
                anexosolicitud.id = `anexosSolicitud${i}`
                anexosolicitud.querySelector('.titulo-anexoSolicitud input').id = `titulo${i}`
                anexosolicitud.querySelector('.titulo-anexoSolicitud input').name = `titulo${i}`
                anexosolicitud.querySelector('.descripcion-anexoSolicitud input').id = `descripcion${i}`
                anexosolicitud.querySelector('.descripcion-anexoSolicitud input').name = `descripcion${i}`
                anexosolicitud.querySelector('.doc-anexoSolicitud input').id = `documentos${i}`
                anexosolicitud.querySelector('.doc-anexoSolicitud input').name = `documentos${i}`

            }
        }

        function agregarEliminarAnexo(e) {
            e.preventDefault()
            let consulta = e.target
            if (consulta.tagName === 'I') {
                consulta = consulta.parentNode.parentNode.parentNode.parentNode
            }else {
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
                ajustarNameAnexo(document.querySelectorAll('.anexoconsulta'))
            }
        }
        // Fin Función para generar varios anexos en una peticion con validación.       
        // ---------------------------------------------------------------------------------------------------------
        // Incio Función para generar varias peticiones con validación.
        ajustarNamePeticion(document.querySelectorAll('.solicitud'))
        let btncrearSolicitud = document.querySelector('#crearSolicitud')
        btncrearSolicitud.addEventListener('click', function (e) {
            e.preventDefault()
            crearNuevaSolicitud()
        })
        let btnEliminarPeticion = document.querySelector('.eliminarPeticion')
        btnEliminarPeticion.addEventListener('click', eliminarPeticion)

        ajustarSolicitudes()
        function ajustarSolicitudes(){
            let solicitudes = document.querySelectorAll('.solicitud')
            for (let i = 0; i < solicitudes.length; i++) {
                solicitudes[i].querySelector('.cantidadAnexosSolicitud').value = solicitudes[i].querySelectorAll('.anexosolicitud').length
            }
        }

        function crearNuevaSolicitud() {
            let nuevaSolicitud = document.querySelectorAll('.solicitud')[0].cloneNode(true)
            nuevaSolicitud.querySelector('.indentifiquedocinfo-solicitud input').value = ''
            nuevaSolicitud.querySelector('.justificacion-solicitud input').value = ''
            anexosTotal = nuevaSolicitud.querySelectorAll('.anexosolicitud')
            for (let i = 0; i < anexosTotal.length; i++) {
                const anexo = anexosTotal[i];
                if (i == 0) {
                    anexo.querySelector('.titulo-anexoSolicitud input').value = ''
                    anexo.querySelector('.descripcion-anexoSolicitud input').value = ''
                    anexo.querySelector('.doc-anexoSolicitud input').value = ''
                }else{
                    anexo.remove()
                }
            }
            document.querySelector('#solicitudes').appendChild(nuevaSolicitud)
            document.querySelectorAll('.eliminarPeticion').forEach(item => item.addEventListener('click', eliminarPeticion))
            ajustarNamePeticion(document.querySelectorAll('.solicitud'))
            document.querySelectorAll('.crearAnexo').forEach(btn => btn.addEventListener('click', crearNuevoAnexo))
            document.querySelectorAll('.eliminaranexoSolicitud').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
        }

        function eliminarPeticion(e) {
            e.preventDefault()
            let solicitud = e.target
            if (solicitud.tagName === 'I') {
                solicitud = solicitud.parentNode.parentNode.parentNode.parentNode.parentNode
            }else {
                solicitud = solicitud.parentNode.parentNode.parentNode.parentNode
            }
            if (solicitud.querySelectorAll('.solicitud').length >= 2) {
                let idPeticion = e.target
                if (idPeticion.tagName === 'I') {
                    idPeticion = idPeticion.parentNode.parentNode.parentNode.parentNode
                } else {
                    idPeticion = idPeticion.parentNode.parentNode.parentNode
                }
                idPeticion.remove()
                ajustarNamePeticion(document.querySelectorAll('.solicitud'))
            }
        }

        function ajustarNamePeticion(solicitudes) {
            for (let i = 0; i < solicitudes.length; i++) {
                const solicitud = solicitudes[i]
                solicitud.id = `solicitud${i}`
                solicitud.querySelector('.titulo-solicitud label').innerHTML = `Petición #${i + 1}`
                solicitud.querySelector('.titulo-solicitud select').id = `peticion${i}`
                solicitud.querySelector('.titulo-solicitud select').name = `peticion${i}`
                solicitud.querySelector('.indentifiquedocinfo-solicitud input').id = `indentifiquedocinfo${i}`
                solicitud.querySelector('.indentifiquedocinfo-solicitud input').name = `indentifiquedocinfo${i}`
                solicitud.querySelector('.justificacion-solicitud input').id = `justificacion${i}`
                solicitud.querySelector('.justificacion-solicitud input').name = `justificacion${i}`
                solicitud.querySelector('.cantidadAnexosSolicitud').id = `cantidadAnexosSolicitud${i}`
                solicitud.querySelector('.cantidadAnexosSolicitud').name = `cantidadAnexosSolicitud${i}`
            }
            document.querySelector('#cantidadPeticiones').value = document.querySelectorAll('.solicitud').length
        }
    }
})