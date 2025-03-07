window.addEventListener('DOMContentLoaded', function () {
    // Incio Validacion envio de formulario
    if (document.querySelectorAll('#fromConceptoUOpinion')) {
        let btnSubmit = document.querySelector('#fromConceptoUOpinion')
        btnSubmit.addEventListener('submit', function (e) {
            e.preventDefault()
                let anexos = document.querySelectorAll('input[type="file"]')
                anexos.forEach(anexo =>{
                    if(anexo.value == ''){
                        anexo.parentNode.parentNode.remove()
                    }
                })
                let hechos = document.querySelectorAll('.hechoConsulta input')
                hechos.forEach(hecho =>{
                    if(hecho.value == ''){
                        hecho.parentNode.remove()
                    }
                })
                ajustarConsultas()
                ajustarNameHecho(document.querySelectorAll('.hechoConsulta'))
                ajustarNameAnexo(document.querySelectorAll('.anexoconsulta'))
                document.querySelector('.totalCantidadAnexosConsultas').value = document.querySelectorAll('.anexoconsulta').length
                this.submit();
        })
        // Fin Validacion envio de formulario
        // ---------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios anexos en una consulta con validación.
        ajustarNameAnexo(document.querySelectorAll('.anexoconsulta'))
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
            consulta.querySelector('#anexosConsulta').appendChild(nuevoAnexo)
            ajustarNameAnexo(document.querySelectorAll('.anexoconsulta'))
            document.querySelectorAll('.eliminaranexoConsulta').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
        }

        function ajustarNameAnexo(anexosConsulta) {
            for (let i = 0; i < anexosConsulta.length; i++) {
                const anexoconsulta = anexosConsulta[i];
                anexoconsulta.id = `anexosConsulta${i}`
                anexoconsulta.querySelector('.titulo-anexoConsulta input').id = `titulo${i}`
                anexoconsulta.querySelector('.titulo-anexoConsulta input').name = `titulo${i}`
                anexoconsulta.querySelector('.descripcion-anexoConsulta input').id = `descripcion${i}`
                anexoconsulta.querySelector('.descripcion-anexoConsulta input').name = `descripcion${i}`
                anexoconsulta.querySelector('.doc-anexoConsulta input').id = `documentos${i}`
                anexoconsulta.querySelector('.doc-anexoConsulta input').name = `documentos${i}`

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
        // Fin Función para generar varios anexos en una consulta con validación.
        // --------------------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios Hechos con validación.
        ajustarNameHecho(document.querySelectorAll('.hechoConsulta'))
        let btncrearHecho = document.querySelector('.crearHecho')
        btncrearHecho.addEventListener('click', crearNuevoHecho)
        let btnEliminarHecho = document.querySelector('.eliminarHecho')
        btnEliminarHecho.addEventListener('click', agregarEliminarHecho)
        
        function crearNuevoHecho(e) {
            e.preventDefault()
            let consulta = e.target.parentNode.parentNode
            nuevoHecho = consulta.querySelectorAll('.hechoConsulta')[0].cloneNode(true)
            nuevoHecho.querySelector('.hechoConsulta input').value = ''
            consulta.querySelector('#hechos').appendChild(nuevoHecho)
            ajustarNameHecho(document.querySelectorAll('.hechoConsulta'))
            document.querySelectorAll('.eliminarHecho').forEach(item => item.addEventListener('click', agregarEliminarHecho))
        }

        function ajustarNameHecho(consultaHechos){
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
            }else {
                consulta = consulta.parentNode.parentNode.parentNode
            }
            if(consulta.querySelectorAll('.hechoConsulta').length >= 2){
                let idHecho = e.target
                if (idHecho.tagName === 'I') {
                    idHecho = idHecho.parentNode.parentNode.parentNode
                }else {
                    idHecho = idHecho.parentNode.parentNode
                }
                idHecho.remove()
                ajustarNameHecho(document.querySelectorAll('.hechoConsulta'))
            }
        }
        // Fin Función para generar varios Hechos con validación.
        // ---------------------------------------------------------------------------------------------------------
        // Incio Función para generar varias consultas con validación.
        ajustarNameConsulta(document.querySelectorAll('.consulta'))
        let btncrearConsulta = document.querySelector('#crearConsulta')
        btncrearConsulta.addEventListener('click', function (e) {
            e.preventDefault()
            crearNuevaConsulta()
        })
        let btnEliminarConsulta = document.querySelector('.eliminarConsulta')
        btnEliminarConsulta.addEventListener('click', eliminarConsulta)

        ajustarConsultas()
        function ajustarConsultas(){
            let consultas = document.querySelectorAll('.consulta')
            for (let i = 0; i < consultas.length; i++) {
                consultas[i].querySelector('.cantidadAnexosConsulta').value = consultas[i].querySelectorAll('.anexoconsulta').length
                consultas[i].querySelector('.cantidadHechosConsulta').value = consultas[i].querySelectorAll('.hechoConsulta').length
            }
        }

        function crearNuevaConsulta() {
            let nuevaConsulta = document.querySelectorAll('.consulta')[0].cloneNode(true)
            nuevaConsulta.querySelector('.titulo-consulta input').value = ''
            anexosTotal = nuevaConsulta.querySelectorAll('.anexoconsulta')
            for (let i = 0; i < anexosTotal.length; i++) {
                const anexo = anexosTotal[i];
                if (i == 0) {
                    anexo.querySelector('.titulo-anexoConsulta input').value = ''
                    anexo.querySelector('.descripcion-anexoConsulta input').value = ''
                    anexo.querySelector('.doc-anexoConsulta input').value = ''
                }else{
                    anexo.remove()
                }
            }
            hechosTotal = nuevaConsulta.querySelectorAll('.hechoConsulta')
            for (let i = 0; i < hechosTotal.length; i++) {
                const hecho = hechosTotal[i];
                if (i == 0) {
                    hecho.querySelector('input').value = ''
                }else{
                    hecho.remove()
                }
            }
            document.querySelector('#consultas').appendChild(nuevaConsulta)
            document.querySelectorAll('.eliminarConsulta').forEach(item => item.addEventListener('click', eliminarConsulta))
            ajustarNameConsulta(document.querySelectorAll('.consulta'))
            document.querySelectorAll('.crearAnexo').forEach(btn => btn.addEventListener('click', crearNuevoAnexo))
            document.querySelectorAll('.eliminaranexoConsulta').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
            document.querySelectorAll('.crearHecho').forEach(btn => btn.addEventListener('click', crearNuevoHecho))
            document.querySelectorAll('.eliminarHecho').forEach(item => item.addEventListener('click', agregarEliminarHecho))
            ajustarNameHecho(document.querySelectorAll('.hechoConsulta'))
            ajustarNameAnexo(document.querySelectorAll('.anexoconsulta'))
        }

        function eliminarConsulta(e) {
            e.preventDefault()
            let consulta = e.target
            if (consulta.tagName === 'I') {
                consulta = consulta.parentNode.parentNode.parentNode.parentNode.parentNode
            }else {
                consulta = consulta.parentNode.parentNode.parentNode.parentNode
            }
            if (consulta.querySelectorAll('.consulta').length >= 2) {
                let idConsulta = e.target
                if (idConsulta.tagName === 'I') {
                    idConsulta = idConsulta.parentNode.parentNode.parentNode.parentNode
                } else {
                    idConsulta = idConsulta.parentNode.parentNode.parentNode
                }
                idConsulta.remove()
                ajustarNameConsulta(document.querySelectorAll('.consulta'))
            }
        }

        function ajustarNameConsulta(consultas) {
            for (let i = 0; i < consultas.length; i++) {
                const consulta = consultas[i]
                consulta.id = `consulta${i}`
                consulta.querySelector('.titulo-consulta label').innerHTML = `Concepto u opinión #${i + 1}`
                consulta.querySelector('.titulo-consulta input').id = `consulta${i}`
                consulta.querySelector('.titulo-consulta input').name = `consulta${i}`
                consulta.querySelector('.cantidadAnexosConsulta').id = `cantidadAnexosConsulta${i}`
                consulta.querySelector('.cantidadAnexosConsulta').name = `cantidadAnexosConsulta${i}`
                consulta.querySelector('.cantidadHechosConsulta').id = `cantidadHechosConsulta${i}`
                consulta.querySelector('.cantidadHechosConsulta').name = `cantidadHechosConsulta${i}`
            }
            document.querySelector('#cantidadConsultas').value = document.querySelectorAll('.consulta').length
        }
        // Fin Función para generar varias consultas con validación.
        // ---------------------------------------------------------------------------------------------------------
  
    }
})