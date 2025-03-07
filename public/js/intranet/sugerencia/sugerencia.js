window.addEventListener('DOMContentLoaded', function () {
    // Incio Validacion envio de formulario
    if (document.querySelectorAll('#fromSugerencia')) {
        let btnSubmit = document.querySelector('#fromSugerencia')
        btnSubmit.addEventListener('submit', function (e) {
            e.preventDefault()
            document.querySelector('#cantidadHechos').value = document.querySelectorAll('.hechoSugerencia').length
            document.querySelector('#cantidadAnexos').value = document.querySelectorAll('.anexosugerencia').length
            this.submit();
        })
        // Fin Validacion envio de formulario
        // ---------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios anexos en una consulta con validación.
        ajustarNameAnexo(document.querySelectorAll('.anexosugerencia'))
        let btncrearAnexo = document.querySelectorAll('.crearAnexo')
        btncrearAnexo.forEach(btn => btn.addEventListener('click', crearNuevoAnexo))
        let btnEliminarAnexo = document.querySelector('.eliminaranexoSugerencia')
        btnEliminarAnexo.addEventListener('click', agregarEliminarAnexo)

        function crearNuevoAnexo(e) {
            e.preventDefault()
            let consulta = e.target.parentNode.parentNode
            let nuevoAnexo = consulta.querySelectorAll('.anexosugerencia')[0].cloneNode(true)
            nuevoAnexo.querySelector('.titulo-anexoSugerencia input').value = ''
            nuevoAnexo.querySelector('.descripcion-anexoSugerencia input').value = ''
            nuevoAnexo.querySelector('.doc-anexoSugerencia input').value = ''
            consulta.querySelector('#anexosSugerencia').appendChild(nuevoAnexo)
            ajustarNameAnexo(document.querySelectorAll('.anexosugerencia'))
            document.querySelectorAll('.eliminaranexoSugerencia').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
        }

        function ajustarNameAnexo(anexosSugerencia) {
            for (let i = 0; i < anexosSugerencia.length; i++) {
                const anexosugerencia = anexosSugerencia[i];
                anexosugerencia.id = `anexosSugerencia${i}`
                anexosugerencia.querySelector('.titulo-anexoSugerencia input').id = `titulo${i}`
                anexosugerencia.querySelector('.titulo-anexoSugerencia input').name = `titulo${i}`
                anexosugerencia.querySelector('.descripcion-anexoSugerencia input').id = `descripcion${i}`
                anexosugerencia.querySelector('.descripcion-anexoSugerencia input').name = `descripcion${i}`
                anexosugerencia.querySelector('.doc-anexoSugerencia input').id = `documentos${i}`
                anexosugerencia.querySelector('.doc-anexoSugerencia input').name = `documentos${i}`

            }
        }

        function agregarEliminarAnexo(e) {
            e.preventDefault()
            let consulta = e.target
            if (consulta.tagName === 'I') {
                consulta = consulta.parentNode.parentNode.parentNode.parentNode
            } else {
                consulta = consulta.parentNode.parentNode.parentNode
            }
            if (consulta.querySelectorAll('.anexosugerencia').length >= 2) {
                let idAnexo = e.target
                if (idAnexo.tagName === 'I') {
                    idAnexo = idAnexo.parentNode.parentNode.parentNode
                } else {
                    idAnexo = idAnexo.parentNode.parentNode
                }
                idAnexo.remove()
                ajustarNameAnexo(document.querySelectorAll('.anexosugerencia'))
            }
        }
        // Fin Función para generar varios anexos en una consulta con validación.
        // --------------------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios Hechos con validación.
        ajustarNameHecho(document.querySelectorAll('.hechoSugerencia'))
        let btncrearHecho = document.querySelector('.crearHecho')
        btncrearHecho.addEventListener('click', crearNuevoHecho)
        let btnEliminarHecho = document.querySelector('.eliminarHecho')
        btnEliminarHecho.addEventListener('click', agregarEliminarHecho)

        function crearNuevoHecho(e) {
            e.preventDefault()
            let consulta = e.target.parentNode.parentNode
            nuevoHecho = consulta.querySelectorAll('.hechoSugerencia')[0].cloneNode(true)
            nuevoHecho.querySelector('.hechoSugerencia input').value = ''
            consulta.querySelector('#hechos').appendChild(nuevoHecho)
            ajustarNameHecho(document.querySelectorAll('.hechoSugerencia'))
            document.querySelectorAll('.eliminarHecho').forEach(item => item.addEventListener('click', agregarEliminarHecho))
        }

        function ajustarNameHecho(consultaHechos) {
            for (let i = 0; i < consultaHechos.length; i++) {
                const hecho = consultaHechos[i];
                hecho.id = `hecho${i}`
                hecho.querySelector('input').id = `hecho${i}`
                hecho.querySelector('input').name = `hecho${i}`
            }
        }
        function agregarEliminarHecho(e) {
            e.preventDefault()
            let consulta = e.target
            if (consulta.tagName === 'I') {
                consulta = consulta.parentNode.parentNode.parentNode.parentNode
            } else {
                consulta = consulta.parentNode.parentNode.parentNode
            }
            if (consulta.querySelectorAll('.hechoSugerencia').length >= 2) {
                let idHecho = e.target
                if (idHecho.tagName === 'I') {
                    idHecho = idHecho.parentNode.parentNode.parentNode
                } else {
                    idHecho = idHecho.parentNode.parentNode
                }
                idHecho.remove()
                ajustarNameHecho(document.querySelectorAll('.hechoSugerencia'))
            }
        }
        // Fin Función para generar varios Hechos con validación.
    }
})