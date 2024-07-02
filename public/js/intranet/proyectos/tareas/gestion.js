$(document).ready(function () {
    asignarDataTable_ajax("#tablas_gestion_historiales",5,"portrait","Legal","Listado de historiales",true);
    asignarDataTable_ajax("#tablas_gestion_sub_tarea",5,"portrait","Legal","Listado de sub-tareas",true);
    const histDocModal = new bootstrap.Modal(document.getElementById("docHistorialNew"));
    $(".btn_new_doc_hist").on("click", function () {
        $("#historial_id").val($(this).attr("data_id"));
    });

    $("#guardarArchivos").click(function (e) {
        e.preventDefault();
        //-------------------------------------------------------
        var fail = false;
        const ruta_docs_histotiales = $('#ruta_docs_histotiales').attr('data_url');
        if (!$("#historial_id").val() || !$("#docu_historial").val()) {
            Swal.fire({
                icon: "error",
                title: "No selecciono ningun archivo",
            });
            return false;
        } else {
            var data = new FormData($("#form_historiales_store")[0]);
            $.ajax({
                url: $("#form_historiales_store").attr("action"),
                data: data,
                type: "POST",
                contentType: false,
                processData: false,
                success: function (respuesta) {
                    if (respuesta.mensaje == "ok") {
                        $('#caja_doc_hist_'+$('#historial_id').val()).append('<a href="' + ruta_docs_histotiales +  '/' + respuesta.url + '" target="_blank">' + respuesta.titulo + '</a>');
                        hideModal('docHistorialNew');
                        Sistema.notificaciones("El archivo fue agregado correctamente","Sistema","success");
                    } else {
                        Sistema.notificaciones(
                            "El archivo no pudo ser agregado",
                            "Sistema",
                            "error"
                        );
                    }
                },
            });
        }
    });
});

function hideModal(modal) {
    $("#"+modal).removeClass("in");
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
    $("#"+modal).hide();
  }
