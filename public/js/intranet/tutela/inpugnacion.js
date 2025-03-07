window.addEventListener('DOMContentLoaded', function() {
    // Carga de cargos en selector
    if (document.querySelector('.cargo')) {
        cargos = document.querySelector('.cargo')
        const url_t = cargos.getAttribute('data_url')
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
    }
    // Carga de funcionarios en selector
    $('.cargo').on('change', function(event) {
        const url_t = $(this).attr('data_url2');
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

    // Funcion check multiple resuelves
    if (document.querySelectorAll('.check-todos-resuelves')) {
        let checkTodos = document.querySelectorAll('.check-todos-resuelves')
        checkTodos.forEach(check => {
            check.addEventListener('input', seleccionMultiple)
        })

        function seleccionMultiple(btn) {
            let check = btn.target
            let contenedorPadre = check.parentElement.parentElement
            let selectores = contenedorPadre.querySelectorAll('.select-resuelve')
            if (check.checked) {
                selectores.forEach(selector => {
                    if (!selector.disabled) {
                        selector.checked = true
                    }
                })
            } else {
                selectores.forEach(selector => {
                    if (!selector.disabled) {
                        selector.checked = false
                    }
                })
            }
        }
    }

    if (document.querySelectorAll('.check-todos-accionantes')) {
        let checkTodos = document.querySelectorAll('.check-todos-accionantes')
        checkTodos.forEach(check => {
            check.addEventListener('input', seleccionMultiple)
        })

        function seleccionMultiple(btn) {
            let check = btn.target
            let contenedorPadre = check.parentElement.parentElement.parentElement
            let selectores = contenedorPadre.querySelectorAll('.select-accionantes')
            if (check.checked) {
                selectores.forEach(selector => {
                    if (!selector.disabled) {
                        selector.checked = true
                    }
                })
            } else {
                selectores.forEach(selector => {
                    if (!selector.disabled) {
                        selector.checked = false
                    }
                })
            }
        }
    }


    if (document.querySelectorAll('.check-todos-accionados')) {
        let checkTodos = document.querySelectorAll('.check-todos-accionados')
        checkTodos.forEach(check => {
            check.addEventListener('input', seleccionMultiple)
        })

        function seleccionMultiple(btn) {
            let check = btn.target
            let contenedorPadre = check.parentElement.parentElement.parentElement
            let selectores = contenedorPadre.querySelectorAll('.select-accionados')
            if (check.checked) {
                selectores.forEach(selector => {
                    if (!selector.disabled) {
                        selector.checked = true
                    }
                })
            } else {
                selectores.forEach(selector => {
                    if (!selector.disabled) {
                        selector.checked = false
                    }
                })
            }
        }
    }
});
$(document).ready(function() {
    const url_t = $(this).attr('data_url');
    $("#cajaAccionado").addClass("d-none");

    $(".loader").fadeOut("slow");
    $(".loader").hide();


    $("#nuevaImpugnacion").on('click', function() {
        var impugnacionModal = new bootstrap.Modal(document.getElementById('impugnacionModal'));
        impugnacionModal.show();
    });

    $("#guardarImpugnacion").on('click', function() {
        const url_t = $(this).attr('data_url');
        const data_id = $(this).attr('data_id');
        console.log(url_t);
        const data_archivos = $(this).attr('data_archivos');
        var resuelves = [];

        var myModal = new bootstrap.Modal(document.getElementById('impugnacionModal'), {
            keyboard: false
        });

        $(":checkbox[name=resuelve]").each(function() {
            if (this.checked) {
                // agregas cada elemento.
                resuelves.push($(this).val());
            }
        });

        if (resuelves.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Resuelves requeridos',
                text: 'Debe seleccionar al menos un resuelve para registrar la impugnación'
            })
        }


        var accionantes = [];
        $(":checkbox[name=accionantes]").each(function() {
            if (this.checked) {
                // agregas cada elemento.
                accionantes.push($(this).val());
            }
        });
        var accionados = [];
        $(":checkbox[name=accionados]").each(function() {
            if (this.checked) {
                // agregas cada elemento.
                accionados.push($(this).val());
            }
        });

        if (accionantes.length < 1 && accionados.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Accionantes o Accionados requeridos',
                text: 'Debe seleccionar al menos un accionante y/o acionado para registrar la impugnación'
            })
        }


        var paqueteDeDatos = new FormData();

        paqueteDeDatos.append('resuelve', $('#resuelve').prop('value'));
        paqueteDeDatos.append('data_id', data_id);
        paqueteDeDatos.append('resuelves', resuelves);
        paqueteDeDatos.append('accionantes', accionantes);
        paqueteDeDatos.append('accionados', accionados);
        paqueteDeDatos.append('url_sentencia', $('#url_sentencia')[0].files[0]);
        paqueteDeDatos.append('_token', $('input[name=_token]').val());

        if (!$('#url_sentencia')[0].files[0]) {
            Swal.fire({
                icon: 'error',
                title: 'Archivo de impugnación requerido',
                text: 'Debe adjuntar el archivo de impugnación'
            })
        }

        var data = {
            "resuelves": resuelves,
            "accionantes": accionantes,
            "accionados": accionados,
        };
        setTimeout(function() { $('#impugnacionModal').modal('hide'); }, 4000);

        $(".loader").show();

        $.ajax({
            url: url_t,
            type: 'POST',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            contentType: false,
            data: paqueteDeDatos,
            processData: false,
            cache: false,
            success: function(respuesta) {
                $(".loader").hide();
                $("#impugnacionModal").modal("hide");
                console.log(respuesta['data']);
                respuesta_html = '';
                $.each(respuesta['data'], function(index, item) {
                    respuesta_html += '<tr>';
                    respuesta_html += '<td>';
                    $.each(item['resuelves'], function(index, resuelves1) {
                        respuesta_html += '<p># ' + resuelves1['numeracion'] + '</p>';
                    });
                    respuesta_html += '</td>';
                    respuesta_html += '<td>';
                    $.each(item['accion'], function(index, accionantes) {
                        respuesta_html += '<p>' + accionantes['nombres_accion'] + ' ' + accionantes['apellidos_accion'] + '</p>';
                    });
                    respuesta_html += '</td>';
                    respuesta_html += '<td><a href="' + data_archivos + '/' + item['url'] + '" target="_blank" rel="noopener noreferrer">Descargar</a></td>';
                    respuesta_html += '<td>' + item['descripcion'] + '</td>';
                    respuesta_html += '</tr>';
                });
                $('#cuerpoTabla').html(respuesta_html);
                Sistema.notificaciones('El documento de anexo correctamente', 'Sistema', 'success');
            },
            error: function() {

            }
        });

    })

    $("#acionanteaccionado").on("change", function() {
        if ($(this).val() == "accionante") {
            $("#cajaAccionado").addClass("d-none");
            $("#cajaAccionante").removeClass("d-none");
        } else {
            $("#cajaAccionante").addClass("d-none");
            $("#cajaAccionado").removeClass("d-none");
        }
    })
});

function cerrarModal() {
    const impugnacionModal = document.getElementById('#impugnacionModal');
    const modal = new bootstrap.Modal(impugnacionModal, {
        backdrop: 'static'
    });
    modal.hide();
}
