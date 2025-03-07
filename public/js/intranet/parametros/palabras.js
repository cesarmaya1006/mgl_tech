$(document).ready(function() {
    $("#tabla-data").on('submit', '.form-eliminar', function() {
        event.preventDefault();
        const form = $(this);
        swal({
            title: '¿Está seguro que desea eliminar el registro?',
            text: "Esta acción no se puede deshacer!",
            icon: 'warning',
            buttons: {
                cancel: "Cancelar",
                confirm: "Aceptar"
            },
        }).then((value) => {
            if (value) {
                ajaxRequest(form);
            }
        });
    });

    function ajaxRequest(form) {
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            success: function(respuesta) {
                console.log(respuesta);
                if (respuesta.mensaje == "ok") {
                    form.parents('tr').remove();
                    Sistema.notificaciones('El registro fue eliminado correctamente', 'Sistema', 'success');
                } else {
                    Sistema.notificaciones('El registro no pudo ser eliminado, hay recursos usandolo', 'Sistema', 'error');
                }
            },
            error: function() {

            }
        });
    }
    //=============================================================================
    $("#tabla-data").on('submit', '.form-adicionar', function() {
        event.preventDefault();
        const form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            success: function(respuesta) {
                if (respuesta.mensaje == "ok") {
                    form.attr("action", form.attr('action_restar'));
                    form.attr("action_restar", form.attr('action'));
                    form.removeAttr('form-adicionar');
                    form.addClass('form-restar');
                    form.find("button").attr("title", "Restar palabra");
                    respuesta_html = '<i class="fa fa-minus-square text-danger"aria-hidden="true"></i>';
                    form.find("button").html(respuesta_html);
                    Sistema.notificaciones('El registro fue asociado correctamente', 'Sistema', 'success');
                } else {
                    Sistema.notificaciones('El registro no pudo ser asociado', 'Sistema', 'error');
                }
            },
            error: function() {

            }
        });

    });
    //=============================================================================
    $("#tabla-data").on('submit', '.form-restar', function() {
        event.preventDefault();
        const form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            success: function(respuesta) {
                if (respuesta.mensaje == "ok") {
                    form.attr("action", form.attr('action_restar'));
                    form.attr("action_restar", form.attr('action'));
                    form.removeAttr('form-restar');
                    form.addClass('form-adicionar');
                    form.find("button").attr("title", "Asociar palabra");
                    respuesta_html = '<i class="fa fa-plus-square text-success" aria-hidden="true"></i>';
                    form.find("button").html(respuesta_html);
                    Sistema.notificaciones('El registro fue desvinculado correctamente', 'Sistema', 'success');
                } else {
                    Sistema.notificaciones('El registro no pudo ser desvinculado', 'Sistema', 'error');
                }
            },
            error: function() {

            }
        });

    });
    //=============================================================================
});
