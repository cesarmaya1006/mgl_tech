window.addEventListener('DOMContentLoaded', function () {
    // Incio Validacion envio de formulario
    if (document.querySelectorAll('#fromFelicitacion')) {
        let btnSubmit = document.querySelector('#fromFelicitacion')
        btnSubmit.addEventListener('submit', function (e) {
            e.preventDefault()
            document.querySelector('#cantidadHechos').value = document.querySelectorAll('.hechoFelicitacion').length
            this.submit();
        })
        // Fin Validacion envio de formulario
        // ---------------------------------------------------------------------------------------------------------
        // Inicio Función para generar varios Hechos con validación.
        ajustarNameHecho(document.querySelectorAll('.hechoFelicitacion'))
        let btncrearHecho = document.querySelector('.crearHecho')
        btncrearHecho.addEventListener('click', crearNuevoHecho)
        let btnEliminarHecho = document.querySelector('.eliminarHecho')
        btnEliminarHecho.addEventListener('click', agregarEliminarHecho)
        
        function crearNuevoHecho(e) {
            e.preventDefault()
            let consulta = e.target.parentNode.parentNode
            nuevoHecho = consulta.querySelectorAll('.hechoFelicitacion')[0].cloneNode(true)
            nuevoHecho.querySelector('.hechoFelicitacion input').value = ''
            consulta.querySelector('#hechos').appendChild(nuevoHecho)
            ajustarNameHecho(document.querySelectorAll('.hechoFelicitacion'))
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
            if(consulta.querySelectorAll('.hechoFelicitacion').length >= 2){
                let idHecho = e.target
                if (idHecho.tagName === 'I') {
                    idHecho = idHecho.parentNode.parentNode.parentNode
                }else {
                    idHecho = idHecho.parentNode.parentNode
                }
                idHecho.remove()
                ajustarNameHecho(document.querySelectorAll('.hechoFelicitacion'))
            }
        }
        // Fin Función para generar varios Hechos con validación.
        // Incio Validacion envio de sede
        // ---------------------------------------------------------------------------------------------------------
        $('input[type=radio][name=felicitarSede]').on('change', function () {
            switch ($(this).val()) {
                case 'si':
                    $('.group-sede').removeClass('d-none');
                    break;
                case 'no':
                    $('.group-sede').addClass('d-none');
                    break;
            }
        });
        // Fin Validacion envio de sede
    }
})
