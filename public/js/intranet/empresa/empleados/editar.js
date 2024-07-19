$(document).ready(function () {
    $("#check_4").prop("checked", true);
    $("input[name=roles]").each( function () {
        if ($(this).attr(':checked')) {
            $(this).prop("checked", true);
        }
    });

    $("#emp_grupo_id").on("change", function () {
        const data_url = $(this).attr("data_url");
        const id = $(this).val();
        var data = {
            id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                var respuesta_html = "";
                if (respuesta.empresas.length > 0) {
                    respuesta_html += '<option value="">Elija empresa</option>';
                    $.each(respuesta.empresas, function (index, item) {
                        respuesta_html +=
                            '<option value="' +
                            item.id +
                            '">' +
                            item.empresa +
                            "</option>";
                    });
                    $("#empresa_id").html(respuesta_html);
                    $("#caja_empresas").removeClass("d-none");
                    $("#label_empresa_id").addClass("requerido");
                } else {
                    $("#empresa_id").html(respuesta_html);
                    $("#caja_empresas").addClass("d-none");
                    $("#label_empresa_id").removeClass("requerido");
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $("#empresa_id").on("change", function () {
        const data_url = $(this).attr("data_url");
        const id = $(this).val();
        var data = {
            id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                var respuesta_html = "";
                if (respuesta.areasPadre.length > 0) {
                    respuesta_html += '<option value="">Elija área</option>';
                    $.each(respuesta.areasPadre, function (index, item) {
                        respuesta_html +=
                            '<option value="' +
                            item.id +
                            '">' +
                            item.area +
                            "</option>";
                    });
                    $("#area_id").html(respuesta_html);
                    $("#col_caja_areas").removeClass("d-none");
                    $("#area_id").prop("required", true);
                } else {
                    $("#area_id").html(respuesta_html);
                    $("#col_caja_areas").addClass("d-none");
                    $("#area_id").prop("required", false);
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $("#area_id").on("change", function () {
        const data_url = $(this).attr("data_url");
        const id = $(this).val();
        var data = {
            id: id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                var respuesta_html = "";
                if (respuesta.cargos.length > 0) {
                    respuesta_html +=
                        '<option value="">Elija un cargo</option>';
                    $.each(respuesta.cargos, function (index, item) {
                        respuesta_html +=
                            '<option value="' +
                            item.id +
                            '">' +
                            item.cargo +
                            "</option>";
                    });
                    $("#cargo_id").html(respuesta_html);
                    $("#col_caja_areas").removeClass("d-none");
                    $("#cargo_id").prop("required", true);
                } else {
                    $("#cargo_id").html(respuesta_html);
                    $("#col_caja_areas").addClass("d-none");
                    $("#cargo_id").prop("required", false);
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $("#usuario_tranv").change(function () {
        const valor = $(this).val();
        if (this.checked) {
            $("#id_tabla_transv").removeClass("d-none");
        } else {
            $("#id_tabla_transv").addClass("d-none");
            $("#body_usuario_tranv").find("input").prop("checked", false);
        }
    });
    //--------------------------------------------------------------------------
    $(".label_checkbox").change(function () {
        const valor = $(this).val();
        if (this.checked) {
            $("#label_checkbox" + valor).html("Si");
        } else {
            $("#label_checkbox" + valor).html("No");
        }
    });
    //--------------------------------------------------------------------------
    $('.setCambioLiderProyecto').on("change", function () {
        const data_url = $(this).attr("data_url");
        const proyecto_id = $(this).attr("data_id");
        const id = $(this).val();
        const input_act = $(this);
        var data = {
            empleado_id: id,
            proyecto_id: proyecto_id,
        };
        $.ajax({
            async: false,
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                console.log(respuesta);
                if (respuesta.mensaje =='ok') {
                    input_act.parents("tr:first").remove();
                    var reponsabilidades_activas = parseInt($('#reponsabilidades_activas').val());
                    console.log(reponsabilidades_activas);
                    reponsabilidades_activas = reponsabilidades_activas - 1;
                    $('#reponsabilidades_activas').val(reponsabilidades_activas);
                    console.log(reponsabilidades_activas);
                    if (reponsabilidades_activas == 0) {
                        console.log('true');
                        $('#botonDesactivar').prop("disabled", false);
                    }else{
                        console.log('false');
                        $('#botonDesactivar').prop("disabled", true);
                    }
                    Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
                }else{
                    Sistema.notificaciones('no se pudo realizar el cambio de líder', 'Sistema', 'erros');
                }
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------
    $('.setCambioRespComponente').on("change", function () {
        const data_url = $(this).attr("data_url");
        const componente_id = $(this).attr("data_id");
        const id = $(this).val();
        const input_act = $(this);
        if (id != '') {
            var data = {
                empleado_id: id,
                componente_id: componente_id,
            };
            $.ajax({
                async: false,
                url: data_url,
                type: "GET",
                data: data,
                success: function (respuesta) {
                    console.log(respuesta);
                    if (respuesta.mensaje =='ok') {
                        input_act.parents("tr:first").remove();
                        var reponsabilidades_activas = parseInt($('#reponsabilidades_activas').val());
                        console.log(reponsabilidades_activas);
                        reponsabilidades_activas = reponsabilidades_activas - 1;
                        $('#reponsabilidades_activas').val(reponsabilidades_activas);
                        console.log(reponsabilidades_activas);
                        if (reponsabilidades_activas == 0) {
                            console.log('true');
                            $('#botonDesactivar').prop("disabled", false);
                        }else{
                            console.log('false');
                            $('#botonDesactivar').prop("disabled", true);
                        }
                        Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
                    }else{
                        Sistema.notificaciones('no se pudo realizar el cambio de responsabilidad', 'Sistema', 'erros');
                    }
                },
                error: function () {},
            });
        } else {
            Sistema.notificaciones('Debe elegir un empleado', 'Sistema', 'erros');
        }
    });
    //--------------------------------------------------------------------------
    $('.setCambioRespTarea').on("change", function () {
        const data_url = $(this).attr("data_url");
        const tarea_id = $(this).attr("data_id");
        const id = $(this).val();
        const input_act = $(this);
        if (id != '') {
            var data = {
                empleado_id: id,
                tarea_id: tarea_id,
            };
            $.ajax({
                async: false,
                url: data_url,
                type: "GET",
                data: data,
                success: function (respuesta) {
                    console.log(respuesta);
                    if (respuesta.mensaje =='ok') {
                        input_act.parents("tr:first").remove();
                        var reponsabilidades_activas = parseInt($('#reponsabilidades_activas').val());
                        console.log(reponsabilidades_activas);
                        reponsabilidades_activas = reponsabilidades_activas - 1;
                        $('#reponsabilidades_activas').val(reponsabilidades_activas);
                        console.log(reponsabilidades_activas);
                        if (reponsabilidades_activas == 0) {
                            console.log('true');
                            $('#botonDesactivar').prop("disabled", false);
                        }else{
                            console.log('false');
                            $('#botonDesactivar').prop("disabled", true);
                        }
                        Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
                    }else{
                        Sistema.notificaciones('no se pudo realizar el cambio de responsabilidad', 'Sistema', 'erros');
                    }
                },
                error: function () {},
            });
        } else {
            Sistema.notificaciones('Debe elegir un empleado', 'Sistema', 'erros');
        }
    });
    //--------------------------------------------------------------------------
    const modalTCP_Empleado = new bootstrap.Modal(document.getElementById('modalTCP_Empleado'));
    $('#boton_desactivar').on("click", function () {
        const reponsabilidades_activas = parseInt($('#reponsabilidades_activas').val());
        console.log(reponsabilidades_activas);
        const data_estado_sweet = parseInt($(this).attr('data_estado'));
        var titulo = "Esta seguro de desactivar al Empleado?";
        var texto = "Esto deshabilitara al empleado para ingreso a cualquier parte del sistema";
        var botonTexto = "Si desactivar!";
        if (data_estado_sweet == 0) {
            var titulo = "Esta seguro de activar al Empleado?";
            var texto = "Esto habilitara al empleado para ingreso al sistema";
            var botonTexto = "Si activar!";
        }

        if (reponsabilidades_activas > 0) {
            modalTCP_Empleado.show();
        } else {
            Swal.fire({
                title: titulo,
                text: texto,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: botonTexto,
                cancelButtonText: "No , Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                    const getResponsabilidadesTotal = $(this).attr('data_url_des');
                    const empleado_id = $(this).attr('data_id');
                    const data_estado = parseInt($(this).attr('data_estado'));
                    var estado_fin = 0;
                    if (data_estado == 0) {
                        estado_fin = 1;
                    }
                    var data = {
                        empleado_id: empleado_id,
                        data_estado: estado_fin,
                    };
                    $.ajax({
                        async: false,
                        url: getResponsabilidadesTotal,
                        type: "GET",
                        data: data,
                        success: function (respuesta) {
                            if (respuesta.mensaje =='wa') {
                                $('#boton_desactivar').html('Activar');
                                $('#boton_desactivar').attr('data_estado',0);
                                $('#boton_desactivar').removeClass('btn-warning');
                                $('#boton_desactivar').addClass('btn-secondary');
                            }else{
                                $('#boton_desactivar').html('Desactivar');
                                $('#boton_desactivar').attr('data_estado',1);
                                $('#boton_desactivar').removeClass('btn-secondary');
                                $('#boton_desactivar').addClass('btn-warning');
                            }
                            $('#reponsabilidades_activas').val(0);
                            Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
                        },
                        error: function () {},
                    });
                }
            });
        }
    });
    //---------------------------------------------------------------------------------------------------
    $('#botonDesactivar').on("click", function () {
        Swal.fire({
            title: "Esta seguro de desactivar al Empleado?",
            text: "Esto deshabilitara al empleado para ingreso a cualquier parte del sistema",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si desactivar!",
            cancelButtonText: "No , Cancelar"
            }).then((result) => {
            if (result.isConfirmed) {
                const getResponsabilidadesTotal = $(this).attr('data_url_des');
                const empleado_id = $(this).attr('data_id');
                const data_estado = parseInt($(this).attr('data_estado'));
                var estado_fin = 0;
                if (data_estado == 0) {
                    estado_fin = 1;
                }
                var data = {
                    empleado_id: empleado_id,
                    data_estado: estado_fin,
                };
                $.ajax({
                    async: false,
                    url: getResponsabilidadesTotal,
                    type: "GET",
                    data: data,
                    success: function (respuesta) {
                        if (respuesta.mensaje =='wa') {
                            $('#boton_desactivar').html('Activar');
                            $('#boton_desactivar').attr('data_estado',0);
                            $('#boton_desactivar').removeClass('btn-warning');
                            $('#boton_desactivar').addClass('btn-secondary');
                        }else{
                            $('#boton_desactivar').html('Desactivar');
                            $('#boton_desactivar').attr('data_estado',1);
                            $('#boton_desactivar').removeClass('btn-secondary');
                            $('#boton_desactivar').addClass('btn-warning');
                        }
                        $('#reponsabilidades_activas').val(0);
                        modalTCP_Empleado.hide();
                        Sistema.notificaciones(respuesta.respuesta, 'Sistema', respuesta.tipo);
                    },
                    error: function () {},
                });
            }
        });
    });

    //---------------------------------------------------------------------------------------------------
});

function mostrar() {
    var archivo = document.getElementById("foto").files[0];
    var reader = new FileReader();
    if (archivo) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            document.getElementById("fotoUsuario").src = reader.result;
        };
    }
}
