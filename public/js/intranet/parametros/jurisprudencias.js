$(document).ready(function() {
    $(function() {
        $('[data-toggle="popover-hover"]').popover({
            trigger: 'hover',
        })
    })
    const modalEnteEmisor = new bootstrap.Modal(document.getElementById('modalEnteEmisor'));
    $('#nuevoEnte').click(function() {
        modalEnteEmisor.show();
    });
    $('#crearEnteEmisor').click(function() {
        modalEnteEmisor.hide();
        const url_t = $(this).attr('data_url');
        const ente = $('#ente').val();
        var data = {
            "ente": ente,
        };
        if (ente != '') {
            $.ajax({
                url: url_t,
                type: 'GET',
                data: data,
                success: function(respuesta) {
                    respuesta_html = '';
                    $.each(respuesta, function(index, item) {
                        if (item['ente'] == ente) {
                            respuesta_html += '<option value="' + item['id'] + '" selected>' + item['ente'] + '</option>';
                            var url_t_sala = $('ente_id').attr('data_url');
                            cargarSalas(url_t_sala, item['id']);
                        } else {
                            respuesta_html += '<option value="' + item['id'] + '">' + item['ente'] + '</option>';
                        }
                    });
                    $('.enteClass').html(respuesta_html);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ente Emisor Cargado con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    })

                },
                error: function() {

                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No se cargo el Ente Emisor',
                text: 'Al parecer olvido escribir el nombre'
            })
        }
    })

    //-*-*-*-*
    const modalSala = new bootstrap.Modal(document.getElementById('modalSala'));
    $('#nuevaSala').click(function() {
        modalSala.show();
    });
    //-*-*-*
    $('#crearSala').click(function() {
        modalEnteEmisor.hide();
        const url_t = $(this).attr('data_url');
        const ente_id = $('#enteSala_id').val();
        const sala = $('#sala').val();
        var data = {
            "ente_id": ente_id,
            "sala": sala,
        };
        if (ente_id != '') {
            if (sala != '') {
                $.ajax({
                    url: url_t,
                    type: 'GET',
                    data: data,
                    success: function(respuesta) {
                        console.log(respuesta);
                        respuesta_html = '';
                        $.each(respuesta, function(index, item) {
                            console.log(item['sala'] + ' - ' + sala)
                            if (item['sala'] == sala) {
                                respuesta_html += '<option value="' + item['id'] + '" selected>' + item['sala'] + '</option>';

                            } else {
                                respuesta_html += '<option value="' + item['id'] + '">' + item['sala'] + '</option>';
                            }
                        });
                        $('#sala_id').html(respuesta_html);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Sala Cargado con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    },
                    error: function() {

                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se cargo el Ente Emisor',
                    text: 'Al parecer olvido digitar la sala'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No se cargo el Ente Emisor',
                text: 'Al parecer olvido elegir el ente'
            })
        }
    });

    //==========================================================================
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
    //================================================================================================
    $('#ente_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();
        cargarSalas(url_t, id);

    });
    //================================================================================================
    $('#sala_id').on('change', function(event) {
        const url_t = $(this).attr('data_url');
        const id = $(this).val();
        cargarSubSalas(url_t, id);

    });

    //================================================================================================
    //================================================================================================
    //-*-*-*-*
    const modalSubSala = new bootstrap.Modal(document.getElementById('modalSubSala'));
    $('#nuevaSubSala').click(function() {
        const sala_id = $('#sala_id').val();
        if (sala_id != '') {
            modalSubSala.show();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'falta la Sala',
                text: 'Debe escoger primero una sala'
            })
        }
    });
    $('#crearSubSala').click(function() {
        modalSubSala.hide();
        const url_t = $(this).attr('data_url');
        const sala_id = $('#sala_id').val();
        const subsala = $('#subsala').val();
        var data = {
            "sala_id": sala_id,
            "subsala": subsala,
        };
        if (sala_id != '') {
            if (subsala != '') {
                $.ajax({
                    url: url_t,
                    type: 'GET',
                    data: data,
                    success: function(respuesta) {
                        respuesta_html = '';
                        $.each(respuesta, function(index, item) {
                            if (item['subsala'] == subsala) {
                                respuesta_html += '<option value="' + item['id'] + '" selected>' + item['subsala'] + '</option>';

                            } else {
                                respuesta_html += '<option value="' + item['id'] + '">' + item['subsala'] + '</option>';
                            }
                        });
                        $('#subsala_id').html(respuesta_html);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Sub-Sala Cargada con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    },
                    error: function() {

                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se cargo La Sub-Sala',
                    text: 'Al parecer olvido digitar la sub-sala'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No se cargo La Sub-Sala',
                text: 'Al parecer olvido escoger la sala'
            })
        }

    });
    //================================================================================================
    //================================================================================================
    //-*-*-*-*
    const modalMagistrado = new bootstrap.Modal(document.getElementById('modalMagistrado'));
    $('#nuevoMagistrado').click(function() {
        modalMagistrado.show();

    });

    $('#crearMagistrado').click(function() {
        modalSubSala.hide();
        const url_t = $(this).attr('data_url');
        const nombre1 = $('#nombre1').val();
        const nombre2 = $('#nombre2').val();
        const apellido1 = $('#apellido1').val();
        const apellido2 = $('#apellido2').val();
        var data = {
            "nombre1": nombre1,
            "nombre2": nombre2,
            "apellido1": apellido1,
            "apellido2": apellido2,
        };
        if (nombre1 != '') {
            if (apellido1 != '') {
                $.ajax({
                    url: url_t,
                    type: 'GET',
                    data: data,
                    success: function(respuesta) {
                        respuesta_html = '';
                        $.each(respuesta, function(index, item) {
                            if (item['nombre1'] == nombre1 && item['apellido1'] == apellido1) {
                                respuesta_html += '<option value="' + item['id'] + '" selected>' + item['nombre1'];
                                if (item['nombre2'] != null) {
                                    respuesta_html += ' ' + item['nombre2'];
                                }
                                respuesta_html += ' ' + item['apellido1'];
                                if (item['apellido2'] != null) {
                                    respuesta_html += ' ' + item['apellido2'];
                                }
                                respuesta_html += '</option>';

                            } else {
                                respuesta_html += '<option value="' + item['id'] + '" selected>' + item['nombre1'];
                                if (item['nombre2'] != null) {
                                    respuesta_html += ' ' + item['nombre2'];
                                }
                                respuesta_html += ' ' + item['apellido1'];
                                if (item['apellido2'] != null) {
                                    respuesta_html += ' ' + item['apellido2'];
                                }
                                respuesta_html += '</option>';
                            }
                        });
                        $('#magistrado_id').html(respuesta_html);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Magistrado cargado con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    },
                    error: function() {

                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se cargo el nombre del magistrado',
                    text: 'Al parecer olvido digitar al menos un nombre'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No se cargo el nombre del magistrado',
                text: 'Al parecer olvido digitar al menos un apellido'
            })
        }

    });
    //================================================================================================
    //================================================================================================
    //-*-*-*-*
    const modalDemandante = new bootstrap.Modal(document.getElementById('modalDemandante'));
    $('#nuevoDemandante').click(function() {
        modalDemandante.show();

    });
    $('#crearDemandante').click(function() {
        modalDemandante.hide();
        const url_t = $(this).attr('data_url');
        const demandante = $('#demandante').val();
        var data = {
            "demandante": demandante,
        };
        if (demandante != '') {
            $.ajax({
                url: url_t,
                type: 'GET',
                data: data,
                success: function(respuesta) {
                    respuesta_html = '';
                    $.each(respuesta, function(index, item) {
                        if (item['demandante'] == demandante) {
                            respuesta_html += '<option value="' + item['id'] + '" selected>' + item['demandante'] + '</option>';
                        } else {
                            respuesta_html += '<option value="' + item['id'] + '">' + item['demandante'] + '</option>';
                        }
                    });
                    $('#demandante_id').html(respuesta_html);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Demandante cargado con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    })

                },
                error: function() {

                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No se cargo el nombre del demandante',
                text: 'Al parecer olvido digitar el nombre del demandante'
            })
        }

    });
    //================================================================================================
    //================================================================================================
    //-*-*-*-*
    const modalDemandado = new bootstrap.Modal(document.getElementById('modalDemandado'));
    $('#nuevoDemandado').click(function() {
        modalDemandado.show();

    });
    $('#crearDemandado').click(function() {
        modalDemandado.hide();
        const url_t = $(this).attr('data_url');
        const demandado = $('#demandado').val();
        var data = {
            "demandado": demandado,
        };
        if (demandado != '') {
            $.ajax({
                url: url_t,
                type: 'GET',
                data: data,
                success: function(respuesta) {
                    respuesta_html = '';
                    $.each(respuesta, function(index, item) {
                        if (item['demandado'] == demandado) {
                            respuesta_html += '<option value="' + item['id'] + '" selected>' + item['demandado'] + '</option>';
                        } else {
                            respuesta_html += '<option value="' + item['id'] + '">' + item['demandado'] + '</option>';
                        }
                    });
                    $('#demandado_id').html(respuesta_html);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Demandado cargado con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    })

                },
                error: function() {

                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No se cargo el nombre del demandado',
                text: 'Al parecer olvido digitar el nombre del demandado'
            })
        }

    });
    //================================================================================================



});

function cargarSalas(url_t, ente_id) {
    var data = {
        "ente_id": ente_id,
    };
    $.ajax({
        url: url_t,
        type: 'GET',
        data: data,
        success: function(respuesta) {
            console.log(respuesta);
            if (respuesta.length > 0) {
                respuesta_html = '<option value="">---Seleccione---</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['sala'] + '</option>';
                });
            } else {
                respuesta_html = '<option value="">---Seleccione otro ente---</option>';
            }
            $('#sala_id').html(respuesta_html);
        },
        error: function() {

        }
    });
}

function cargarSubSalas(url_t, sala_id) {
    var data = {
        "sala_id": sala_id,
    };
    $.ajax({
        url: url_t,
        type: 'GET',
        data: data,
        success: function(respuesta) {
            console.log(respuesta);
            if (respuesta.length > 0) {
                respuesta_html = '<option value="">---Seleccione---</option>';
                $.each(respuesta, function(index, item) {
                    respuesta_html += '<option value="' + item['id'] + '">' + item['subsala'] + '</option>';
                });
            } else {
                respuesta_html = '<option value="">---Seleccione otra sala o agrege una sub-sala---</option>';
            }
            $('#subsala_id').html(respuesta_html);
        },
        error: function() {

        }
    });
}