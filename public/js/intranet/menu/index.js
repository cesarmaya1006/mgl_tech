$(document).ready(function() {
    $('#nestable').nestable().on('change', function() {
        const data = {
            menu: window.JSON.stringify($('#nestable').nestable('serialize')),
            _token: $('input[name=_token]').val()
        };
        $.ajax({
            type: 'get', //THIS NEEDS TO BE GET
            url: 'http://127.0.0.1:8000/admin/menu-guardar-orden',
            dataType: 'json',
            data: data,
            success: function(respuesta) {}
        });
    });


    $('.eliminar-menu').on('click', function(event) {
        event.preventDefault();
        const url = $(this).attr('href');
        swal({
            title: '¿Está seguro que desea eliminar el registro ?',
            text: "Esta acción no se puede deshacer!",
            icon: 'warning',
            buttons: {
                cancel: "Cancelar",
                confirm: "Aceptar"
            },
        }).then((value) => {
            if (value) {
                window.location.href = url;
            }
        });
    })

    $('#nestable').nestable('expandAll');
});