window.addEventListener('DOMContentLoaded', function(){
    if (document.querySelector('#id')) {
        let tipoPqr = document.querySelector('#pqr_tipo').value
        let urlDescargaRadicado = ''
        if(tipoPqr){
          urlDescargaRadicado = 'pqr_radicada_pdf'
        }
        swal({
            title: "Creada correctamente",
            content: {
                element: "a",
                attributes: {
                  href: `/${urlDescargaRadicado}/${document.querySelector('#id').value}`,
                  textContent: 'Descarga aquí',
                  target : "_blank"
                },
              },
            text: `Número de radicado ${document.querySelector('#radicado').value}`,
            icon: 'success',
            button: 'Cerrar',
          });
    }  
    let otro = document.querySelector('.otros-btn')
    otro.addEventListener('click', function(e){
      e.preventDefault()
      let cardOtros = document.querySelector('.card-otros') 
      if(cardOtros.classList.contains('d-none')){
        cardOtros.classList.remove('d-none')
      }else{
        cardOtros.classList.add('d-none')
      }
    }) 
})