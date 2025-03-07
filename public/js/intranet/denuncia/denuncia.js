window.addEventListener('DOMContentLoaded', function () {
    // Incio Validacion envio de formulario
    if (document.querySelectorAll('#fromDenuncia')) {
        let btnSubmit = document.querySelector('#fromDenuncia')
        btnSubmit.addEventListener('submit', function(e){
            e.preventDefault()
            let anexos = document.querySelectorAll('input[type="file"]')
            anexos.forEach(anexo =>{
                if(anexo.value == ''){
                    anexo.parentNode.parentNode.remove()
                }
            })
            let hechos = document.querySelectorAll('.hechoIrregularidad input')
            hechos.forEach(hecho =>{
                if(hecho.value == ''){
                    hecho.parentNode.remove()
                }
            })
            ajustarIrregularidades()
            ajustarNameHecho(document.querySelectorAll('.hechoIrregularidad'))
            ajustarNameAnexo(document.querySelectorAll('.anexoirregularidad'))
            document.querySelector('.totalCantidadAnexosIrregularidades').value = document.querySelectorAll('.anexoirregularidad').length
            this.submit();
        })
        // Fin Validacion envio de formulario
        // ---------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios anexos en una irregularidad con validación.
        ajustarNameAnexo(document.querySelectorAll('.anexoirregularidad'))
        let btncrearAnexo = document.querySelectorAll('.crearAnexo')
        btncrearAnexo.forEach(btn => btn.addEventListener('click', crearNuevoAnexo))
        let btnEliminarAnexo = document.querySelector('.eliminaranexoIrregularidad')
        btnEliminarAnexo.addEventListener('click', agregarEliminarAnexo)

        function crearNuevoAnexo(e) {
            e.preventDefault()
            let irregularidad = e.target.parentNode.parentNode
            let nuevoAnexo = irregularidad.querySelectorAll('.anexoirregularidad')[0].cloneNode(true)
            nuevoAnexo.querySelector('.titulo-anexoIrregularidad input').value = ''
            nuevoAnexo.querySelector('.descripcion-anexoIrregularidad input').value = ''
            nuevoAnexo.querySelector('.doc-anexoIrregularidad input').value = ''
            irregularidad.querySelector('#anexosIrregularidad').appendChild(nuevoAnexo)
            ajustarNameAnexo(document.querySelectorAll('.anexoirregularidad'))
            document.querySelectorAll('.eliminaranexoIrregularidad').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
        }

        function ajustarNameAnexo(anexosIrregularidad) {
            for (let i = 0; i < anexosIrregularidad.length; i++) {
                const anexoirregularidad = anexosIrregularidad[i];
                anexoirregularidad.id = `anexosIrregularidad${i}`
                anexoirregularidad.querySelector('.titulo-anexoIrregularidad input').id = `titulo${i}`
                anexoirregularidad.querySelector('.titulo-anexoIrregularidad input').name = `titulo${i}`
                anexoirregularidad.querySelector('.descripcion-anexoIrregularidad input').id = `descripcion${i}`
                anexoirregularidad.querySelector('.descripcion-anexoIrregularidad input').name = `descripcion${i}`
                anexoirregularidad.querySelector('.doc-anexoIrregularidad input').id = `documentos${i}`
                anexoirregularidad.querySelector('.doc-anexoIrregularidad input').name = `documentos${i}`

            }
        }

        function agregarEliminarAnexo(e) {
            e.preventDefault()
            let irregularidad = e.target
            if (irregularidad.tagName === 'I') {
                irregularidad = irregularidad.parentNode.parentNode.parentNode.parentNode
            }else {
                irregularidad = irregularidad.parentNode.parentNode.parentNode
            }
            if (irregularidad.querySelectorAll('.anexoirregularidad').length >= 2) {
                let idAnexo = e.target
                if (idAnexo.tagName === 'I') {
                    idAnexo = idAnexo.parentNode.parentNode.parentNode
                } else {
                    idAnexo = idAnexo.parentNode.parentNode
                }
                idAnexo.remove()
                ajustarNameAnexo(document.querySelectorAll('.anexoirregularidad'))
            }
        }
        // Fin Función para generar varios anexos en una irregularidad con validación.
        // --------------------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios Hechos con validación.
        ajustarNameHecho(document.querySelectorAll('.hechoIrregularidad'))
        let btncrearHecho = document.querySelector('.crearHecho')
        btncrearHecho.addEventListener('click', crearNuevoHecho)
        let btnEliminarHecho = document.querySelector('.eliminarHecho')
        btnEliminarHecho.addEventListener('click', agregarEliminarHecho)
        
        function crearNuevoHecho(e) {
            e.preventDefault()
            let irregularidad = e.target.parentNode.parentNode
            nuevoHecho = irregularidad.querySelectorAll('.hechoIrregularidad')[0].cloneNode(true)
            nuevoHecho.querySelector('.hechoIrregularidad input').value = ''
            irregularidad.querySelector('#hechos').appendChild(nuevoHecho)
            ajustarNameHecho(document.querySelectorAll('.hechoIrregularidad'))
            document.querySelectorAll('.eliminarHecho').forEach(item => item.addEventListener('click', agregarEliminarHecho))
        }

        function ajustarNameHecho(irregularidadHechos){
            for (let i = 0; i < irregularidadHechos.length; i++) {
                const hecho = irregularidadHechos[i];
                hecho.id = `hecho${i}`
                hecho.querySelector('input').id = `hecho${i}`
                hecho.querySelector('input').name = `hecho${i}`
            }
        }
        function agregarEliminarHecho(e) {
            e.preventDefault()
            let irregularidad = e.target
            if (irregularidad.tagName === 'I') {
                irregularidad = irregularidad.parentNode.parentNode.parentNode.parentNode
            }else {
                irregularidad = irregularidad.parentNode.parentNode.parentNode
            }
            if(irregularidad.querySelectorAll('.hechoIrregularidad').length >= 2){
                let idHecho = e.target
                if (idHecho.tagName === 'I') {
                    idHecho = idHecho.parentNode.parentNode.parentNode
                }else {
                    idHecho = idHecho.parentNode.parentNode
                }
                idHecho.remove()
                ajustarNameHecho(document.querySelectorAll('.hechoIrregularidad'))
            }
        }
        // Fin Función para generar varios Hechos con validación.
        // ---------------------------------------------------------------------------------------------------------
        // Incio Función para generar varias irregularidades con validación.
        ajustarNameIrregularidad(document.querySelectorAll('.irregularidad'))
        let btncrearIrregularidad = document.querySelector('#crearIrregularidad')
        btncrearIrregularidad.addEventListener('click', function (e) {
            e.preventDefault()
            crearNuevaIrregularidad()
        })
        let btnEliminarIrregularidad = document.querySelector('.eliminarIrregularidad')
        btnEliminarIrregularidad.addEventListener('click', eliminarIrregularidad)

        ajustarIrregularidades()
        function ajustarIrregularidades(){
            let irregularidades = document.querySelectorAll('.irregularidad')
            for (let i = 0; i < irregularidades.length; i++) {
                irregularidades[i].querySelector('.cantidadAnexosIrregularidad').value = irregularidades[i].querySelectorAll('.anexoirregularidad').length
                irregularidades[i].querySelector('.cantidadHechosIrregularidad').value = irregularidades[i].querySelectorAll('.hechoIrregularidad').length
            }
        }

        function crearNuevaIrregularidad() {
            let nuevaIrregularidad = document.querySelectorAll('.irregularidad')[0].cloneNode(true)
            nuevaIrregularidad.querySelector('.otro input').value = ''
            if(!nuevaIrregularidad.querySelector('.otro').classList.contains('d-none')){
                nuevaIrregularidad.querySelector('.otro').classList.add('d-none') 
            }
            anexosTotal = nuevaIrregularidad.querySelectorAll('.anexoirregularidad')
            for (let i = 0; i < anexosTotal.length; i++) {
                const anexo = anexosTotal[i];
                if (i == 0) {
                    anexo.querySelector('.titulo-anexoIrregularidad input').value = ''
                    anexo.querySelector('.descripcion-anexoIrregularidad input').value = ''
                    anexo.querySelector('.doc-anexoIrregularidad input').value = ''
                }else{
                    anexo.remove()
                }
            }
            hechosTotal = nuevaIrregularidad.querySelectorAll('.hechoIrregularidad')
            for (let i = 0; i < hechosTotal.length; i++) {
                const hecho = hechosTotal[i];
                if (i == 0) {
                    hecho.querySelector('input').value = ''
                }else{
                    hecho.remove()
                }
            }
            document.querySelector('#irregularidades').appendChild(nuevaIrregularidad)
            document.querySelectorAll('.eliminarIrregularidad').forEach(item => item.addEventListener('click', eliminarIrregularidad))
            ajustarNameIrregularidad(document.querySelectorAll('.irregularidad'))
            document.querySelectorAll('.crearAnexo').forEach(btn => btn.addEventListener('click', crearNuevoAnexo))
            document.querySelectorAll('.eliminaranexoIrregularidad').forEach(item => item.addEventListener('click', agregarEliminarAnexo))
            document.querySelectorAll('.crearHecho').forEach(btn => btn.addEventListener('click', crearNuevoHecho))
            document.querySelectorAll('.eliminarHecho').forEach(item => item.addEventListener('click', agregarEliminarHecho))
            ajustarNameHecho(document.querySelectorAll('.hechoIrregularidad'))
            ajustarNameAnexo(document.querySelectorAll('.anexoirregularidad'))
            ajustarOtro()
        }

        function eliminarIrregularidad(e) {
            e.preventDefault()
            let irregularidad = e.target
            if (irregularidad.tagName === 'I') {
                irregularidad = irregularidad.parentNode.parentNode.parentNode.parentNode.parentNode
            }else {
                irregularidad = irregularidad.parentNode.parentNode.parentNode.parentNode
            }
            if (irregularidad.querySelectorAll('.irregularidad').length >= 2) {
                let idIrregularidad = e.target
                if (idIrregularidad.tagName === 'I') {
                    idIrregularidad = idIrregularidad.parentNode.parentNode.parentNode.parentNode
                } else {
                    idIrregularidad = idIrregularidad.parentNode.parentNode.parentNode
                }
                idIrregularidad.remove()
                ajustarNameIrregularidad(document.querySelectorAll('.irregularidad'))
            }
        }

        function ajustarNameIrregularidad(irregularidades) {
            for (let i = 0; i < irregularidades.length; i++) {
                const irregularidad = irregularidades[i]
                irregularidad.id = `irregularidad${i}`
                irregularidad.querySelector('.titulo-irregularidad label').innerHTML = `Tipo de irregularidad #${i + 1}`
                irregularidad.querySelector('.titulo-irregularidad select').id = `tipo_irregularidad${i}`
                irregularidad.querySelector('.titulo-irregularidad select').name = `tipo_irregularidad${i}`
                irregularidad.querySelector('.otro input').id = `otro${i}`
                irregularidad.querySelector('.otro input').name = `otro${i}`
                irregularidad.querySelector('.cantidadAnexosIrregularidad').id = `cantidadAnexosIrregularidad${i}`
                irregularidad.querySelector('.cantidadAnexosIrregularidad').name = `cantidadAnexosIrregularidad${i}`
                irregularidad.querySelector('.cantidadHechosIrregularidad').id = `cantidadHechosIrregularidad${i}`
                irregularidad.querySelector('.cantidadHechosIrregularidad').name = `cantidadHechosIrregularidad${i}`
            }
            document.querySelector('#cantidadIrregularidades').value = document.querySelectorAll('.irregularidad').length
        }
        // Fin Función para generar varias irregularidades con validación.
        // ---------------------------------------------------------------------------------------------------------
        function ajustarOtro(){
            $('.tipo_irregularidad').on('change', function(event) {
                if (event.target.value == 'otro') {
                    let padreHTML = event.target.parentNode.parentNode
                    let otro = padreHTML.querySelector('.otro')
                    otro.classList.toggle('d-none')
                }else{
                    let padreHTML = event.target.parentNode.parentNode
                    let otro = padreHTML.querySelector('.otro')
                    otro.querySelector('input').value = ''
                    if (!otro.classList.contains('d-none')) {
                        otro.classList.toggle('d-none')
                    }
                }
            });
        }
        ajustarOtro()
    }
})