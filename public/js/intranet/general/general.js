var Sistema = (function () {
    return {
        validacionGeneral: function (id, reglas, mensajes) {
            const formulario = $("#" + id);
            formulario.validate({
                rules: reglas,
                messages: mensajes,
                errorElement: "span", //default input error message container
                errorClass: "help-block help-block-error", // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "", // validate all fields including form hidden input
                highlight: function (element, errorClass, validClass) {
                    // hightlight error inputs
                    $(element).closest(".form-group").addClass("has-error"); // set error class to the control group
                },
                unhighlight: function (element) {
                    // revert the change done by hightlight
                    $(element).closest(".form-group").removeClass("has-error"); // set error class to the control group
                },
                success: function (label) {
                    label.closest(".form-group").removeClass("has-error"); // set success class to the control group
                },
                errorPlacement: function (error, element) {
                    if (
                        $(element).is("select") &&
                        element.hasClass("bs-select")
                    ) {
                        //PARA LOS SELECT BOOSTRAP
                        error.insertAfter(element); //element.next().after(error);
                    } else if (
                        $(element).is("select") &&
                        element.hasClass("select2-hidden-accessible")
                    ) {
                        element.next().after(error);
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // default placement for everything else
                    }
                },
                invalidHandler: function (event, validator) {
                    //display error alert on form submit
                },
                submitHandler: function (form) {
                    return true;
                },
            });
        },
        notificaciones: function (mensaje, titulo, tipo) {
            toastr.options = {
                closeButton: true,
                newestOnTop: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                timeOut: "5000",
            };
            if (tipo == "error") {
                toastr.error(mensaje, titulo);
            } else if (tipo == "success") {
                toastr.success(mensaje, titulo);
            } else if (tipo == "info") {
                toastr.info(mensaje, titulo);
            } else if (tipo == "warning") {
                toastr.warning(mensaje, titulo);
            } else if (tipo == "secondary") {
                toastr.secondary(mensaje, titulo);
            }
        },
    };
})();

function mayus(e) {
    e.value = e.value.toUpperCase();
}
function menu_ul() {
    $("a.active").parent("ul.nav-treeview").css("display", "block");
}

$(document).ready(function () {
    $("a.active").parents("li").addClass("menu-open");
    //setInterval(notificacionesUsuairo, 5000);
    //setInterval(getmensajes_dest_rem_ult, 5000);
    //setInterval(get_all_nuevos_mensajes, 5000);
    //get_all_nuevos_mensajes();
    setInterval(getMensajesNuevosDestinatarioChat,2000);
    setInterval(getMensajesNuevosEmpleadosChat,2000);
    // * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - *
    $('#abrirModalChat').on("click", function () {


    });

    // * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - *
    //------------------------------------------------------
    $('#botonChat').click(function(e) {
        if ($("#listaUsuarios").hasClass("colapsado")) {
            $('#flechaChat').removeClass('fa fa-arrow-right').addClass('fa fa-arrow-left');
            $('.media-body').removeClass().addClass('media-body');
            $('#listaUsuarios').removeClass().addClass('col-11 col-sm-3 ');
            $('#cajaChat').removeClass().addClass('col-1 col-sm-9');

        }else{
            $('#flechaChat').removeClass('fa fa-arrow-left').addClass('fa fa-arrow-right');
            $('.media-body').removeClass().addClass('media-body d-none');
            $('#listaUsuarios').removeClass().addClass('col-2 col-sm-1 colapsado');
            $('#cajaChat').removeClass().addClass('col-10 col-sm-11');
        }
    });
    $('.itemUsuario').click(function(e) {

    });
    //-------------------------------------------------------
    $("#formNuevoMensaje").on("submit", function (e) {
        e.preventDefault();
        const form = $(this);
        $.ajax({
            async: false,
            url: form.attr("action"),
            type: "POST",
            data: form.serialize(),
            success: function (respuesta) {
                var html_respuesta = '';
                if (respuesta.respuesta == "ok") {
                    html_respuesta += '<div class="row d-flex justify-content-end mt-1 mb-1 mr-1" id="mensaje_N_'+respuesta.mensaje.id +'">';
                    html_respuesta += '<div class="col-10 cajaRemitente border border-success rounded p-2">';
                    html_respuesta += '<p style="text-align: justify">'+respuesta.mensaje.mensaje+'</p>';
                    html_respuesta += '<span class="float-end text-small" style="font-size: 0.7em;">'+respuesta.mensaje.fec_creacion+'</span>';
                    html_respuesta += '</div>';
                    html_respuesta += '</div>';
                }
                $( "#cajonChatsFinal" ).append( html_respuesta );
                $("#cajonChatsFinal").animate({ scrollTop: $("#cajonChatsFinal").prop("scrollHeight")}, 1000);
                $('#mensaje').val('');
            },
            error: function () {},
        });
    });
    // * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - *
    //-------------------------------------------------------
    $(".tabla-borrando").on("submit", ".form-eliminar", function () {
        event.preventDefault();
        const form = $(this);
        Swal.fire({
            title: "¿Está seguro que desea eliminar el registro?",
            text: "Esta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                ajaxRequest(form);
            }
        });
    });

    function ajaxRequest(form) {
        $.ajax({
            url: form.attr("action"),
            type: "POST",
            data: form.serialize(),
            success: function (respuesta) {
                if (respuesta.mensaje == "ok") {
                    form.parents("tr").remove();
                    Sistema.notificaciones(
                        "El registro fue eliminado correctamente",
                        "Sistema",
                        "success"
                    );
                } else {
                    Sistema.notificaciones(
                        "El registro no pudo ser eliminado, hay recursos usandolo",
                        "Sistema",
                        "error"
                    );
                }
            },
            error: function () {},
        });
    }
    //--------------------------------------------------------------------------------------------
    $("#id_body_dark_mode").change(function () {
        var valor_dark = "";
        if (this.checked) {
            valor_dark = "si";
        } else {
            valor_dark = "no";
        }
        const data_url = $("#ruta_body_dark_mode").attr("data_url");
        var data = {
            body_dark_mode: valor_dark,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                Sistema.notificaciones(
                    respuesta.respuesta,
                    "Sistema",
                    respuesta.tipo
                );
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------------------------
    $(".check_apariencia").change(function () {
        var valor_fijo = "";
        if (this.checked) {
            valor_fijo = "si";
        } else {
            valor_fijo = "no";
        }
        const data_url = $("#id_cambio_check_ruta").attr("data_url");
        const bd_variable = $(this).attr("bd_variable");
        var data = {
            valor_fijo: valor_fijo,
            bd_variable: bd_variable,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                Sistema.notificaciones(
                    respuesta.respuesta,
                    "Sistema",
                    respuesta.tipo
                );
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------------------------
    $("#fondo_barra_sup").on("change", function () {
        $(this).removeClass();
        var color = "bg-" + $(this).val().toLowerCase();
        $(this).addClass("custom-select mb-3 text-light border-0 " + color);
        if (color == "bg-light") {
            $("#menu_superior")
                .removeClass()
                .addClass(
                    "main-header navbar navbar-expand navbar-white navbar-light"
                );
            color = "navbar-light";
        } else if (color == "bg-warning") {
            $("#menu_superior")
                .removeClass()
                .addClass(
                    "main-header navbar navbar-expand navbar-white navbar-light " +
                        color
                );
        } else {
            $("#menu_superior")
                .removeClass()
                .addClass(
                    "main-header navbar navbar-expand navbar-white navbar-dark " +
                        color
                );
        }
        const data_url = $("#ruta_fondo_barra_sup").attr("data_url");
        const bd_valor = color;
        var data = {
            bd_valor: bd_valor,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                Sistema.notificaciones(
                    respuesta.respuesta,
                    "Sistema",
                    respuesta.tipo
                );
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------------------------
    $(".item_notificacion_link").on("click", function () {
        const data_id = $(this).attr("data_id");
        const data_url = $("#readnotificaciones").attr("data_url");
        var data = {
            id: data_id,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                Sistema.notificaciones("Notificación leida", "Sistema", "info");
            },
            error: function () {},
        });
    });
    //--------------------------------------------------------------------------------------------

    $("#fondo_barra_lat").on("change", function () {
        const color = "bg-" + $(this).val().toLowerCase();
        color_fondo_hijos(color);
        $(this)
            .removeClass()
            .addClass("custom-select mb-3 text-light border-0 " + color);
        const data_url = $("#ruta_fondo_barra_lat").attr("data_url");
        const bd_valor = color;
        var data = {
            bd_valor: bd_valor,
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                Sistema.notificaciones(
                    respuesta.respuesta,
                    "Sistema",
                    respuesta.tipo
                );
            },
            error: function () {},
        });
    });
    /*
    notificacionesUsuairo();
    sidebar_collapse();
    sidebar_mini_md_checkbox_input();
    sidebar_mini_xs_checkbox_input();
    flat_sidebar_checkbox_input();
    color_fondo_hijos($("#fondo_barra_lat_input").val());
    $("#fondo_barra_sup").removeClass().addClass("custom-select mb-3 text-light border-0 " + $("#fondo_barra_sup_input").val().toLowerCase().replace("navbar", "bg"));
    $("#fondo_barra_sup").find("." +$("#fondo_barra_sup_input").val().toLowerCase().replace("navbar", "bg")).prop("selected", true);
    $("#fondo_barra_lat").removeClass().addClass("custom-select mb-3 text-light border-0 " +$("#fondo_barra_lat_input").val().toLowerCase());
    $("#fondo_barra_lat").find("." + $("#fondo_barra_lat_input").val().toLowerCase()).prop("selected", true);
    $(".tr_modal").click(function () {
        window.location = $(this).attr("href");
        return false;
    });
*/
    //-------------------------------------------
    $(".search").keyup(function () {
        var searchTerm = $(".search").val();
        var listItem = $(".results tbody").children("tr");
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

        $.extend($.expr[":"], {
            containsi: function (elem, i, match, array) {
                return (
                    (elem.textContent || elem.innerText || "")
                        .toLowerCase()
                        .indexOf((match[3] || "").toLowerCase()) >= 0
                );
            },
        });

        $(".results tbody tr")
            .not(":containsi('" + searchSplit + "')")
            .each(function (e) {
                $(this).attr("visible", "false");
            });

        $(".results tbody tr:containsi('" + searchSplit + "')").each(function (
            e
        ) {
            $(this).attr("visible", "true");
        });

        var jobCount = $('.results tbody tr[visible="true"]').length;
        $(".counter").text(jobCount + " item");

        if (jobCount == "0") {
            $(".no-result").show();
        } else {
            $(".no-result").hide();
        }
    });
    $("#chatModal").on("hidden.bs.modal", function (event) {
        $('#getMensajesChatUsuario').attr('data_estado',0);
    });
});

function sidebar_collapse() {
    if ($("#sidebar_collapse_input").val() == "si") {
        $("body").addClass("sidebar-collapse");
        $(window).trigger("resize");
    } else {
        $("body").removeClass("sidebar-collapse");
        $(window).trigger("resize");
    }
}
function sidebar_mini_md_checkbox_input() {
    if ($("#sidebar_mini_md_checkbox_input").val() == "si") {
        $("body").addClass("sidebar-mini-md");
    } else {
        $("body").removeClass("sidebar-mini-md");
    }
}
function sidebar_mini_xs_checkbox_input() {
    if ($("#sidebar_mini_xs_checkbox_input").val() == "si") {
        $("body").addClass("sidebar-mini-xs");
    } else {
        $("body").removeClass("sidebar-mini-xs");
    }
}
function flat_sidebar_checkbox_input() {
    if ($("#sidebar_mini_xs_checkbox_input").val() == "si") {
        $(".nav-sidebar").addClass("nav-flat");
    } else {
        $(".nav-sidebar").removeClass("nav-flat");
    }
}
/*

function notificacionesUsuairo() {
    const data_url = $("#input_notificaiones").attr("data_url");
    const data_cantidad = parseInt(
        $("#badge_cant_notificaciones").attr("data_cantidad")
    );
    const URLactual = window.location;
    $.ajax({
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            var respuesta_html = "";
            $("#badge_cant_notificaciones").html(respuesta.cant_notificaciones);
            $("#badge_cant_notificaciones").attr(
                "data_cantidad",
                respuesta.cant_notificaciones
            );
            $("#badge_cant_notificaciones").removeClass();
            if (respuesta.cant_notificaciones < 3) {
                $("#badge_cant_notificaciones").addClass(
                    "badge badge-primary navbar-badge"
                );
            } else if (respuesta.cant_notificaciones < 5) {
                $("#badge_cant_notificaciones").addClass(
                    "badge badge-success navbar-badge"
                );
            } else {
                $("#badge_cant_notificaciones").addClass(
                    "badge badge-danger navbar-badge"
                );
            }
            var cant_notificaciones = parseInt(respuesta.cant_notificaciones);
            if (cant_notificaciones > 0) {
                respuesta_html +=
                    '<span class="dropdown-item dropdown-header" id="badge_cant_notificaciones_2">' +
                    cant_notificaciones +
                    " Notificaciones</span>";
                respuesta_html +=
                    '<div class="dropdown-divider" id="id_division_primera"></div>';
                var cant_control = 0;
                $.each(respuesta.notificaciones, function (index, item) {
                    cant_control++;

                    var fechaInicio = new Date(item.fec_creacion).getTime();
                    var fechaFin = new Date().getTime();
                    var diff = fechaFin - fechaInicio;

                    var diferencia_minutos = parseInt(
                        Math.round(diff / (1000 * 60))
                    );
                    var diferencia_horas = parseInt(
                        Math.round(diff / (1000 * 60 * 60))
                    );
                    var diferencia_dias = parseInt(
                        Math.round(diff / (1000 * 60 * 60 * 24))
                    );

                    if (diferencia_minutos < 60) {
                        var diferencia_final = diferencia_minutos + " Minutos";
                    } else if (diferencia_horas < 24) {
                        var diferencia_final = diferencia_horas + " Horas";
                    } else {
                        var diferencia_final = diferencia_dias + " Dias";
                    }
                    if (item.accion == "creacion") {
                        var icono = "fas fa-upload";
                    } else {
                        var icono = "far fa-thumbs-up";
                    }
                    if (cant_control < 4) {
                        var index_dashboard_bd = item.link.indexOf("dashboard");
                        var sub_cadena_original = item.link.substring(
                            0,
                            index_dashboard_bd
                        );

                        respuesta_html +=
                            '<a href="' +
                            item.link.replace(
                                sub_cadena_original,
                                URLactual.origin + "/"
                            ) +
                            "/" +
                            item.id +
                            '" class="dropdown-item item_notificacion_link" data_id="' +
                            item.id +
                            '">';
                        respuesta_html +=
                            '    <i class="' +
                            icono +
                            ' mr-1"></i> <span class="text-wrap"> ' +
                            item.titulo +
                            "</span>";
                        respuesta_html +=
                            '    <span class="float-right text-muted" style="float: right;font-size: 0.9em;">' +
                            diferencia_final +
                            "</span>";
                        respuesta_html += "</a>";
                    }
                });
                respuesta_html +=
                    '<div class="dropdown-divider" id="id_division_segunda"></div>';
                respuesta_html +=
                    '<a href="#" class="dropdown-item dropdown-footer ver_todas_notif" onclick="ver_todas_notif_modal()">Ver Todas las notificaciones</a>';
            } else {
                respuesta_html +=
                    '<span class="dropdown-item dropdown-header" id="badge_cant_notificaciones_2">Sin  Notificaciones</span>';
            }
            $("#menu_badge_cant_notificaciones_2").html(respuesta_html);
        },
        error: function () {},
    });
}

const notificacionesMenuSupModal = new bootstrap.Modal(
    document.getElementById("notificacionesMenuSupModal")
);
function ver_todas_notif_modal() {
    const data_url = $("#input_notificaiones").attr("data_url");
    const URLactual = window.location;
    $.ajax({
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            var respuesta_html = "";
            var cant_notificaciones = parseInt(respuesta.cant_notificaciones);
            $.each(respuesta.notificaciones, function (index, item) {
                var fechaInicio = new Date(item.fec_creacion).getTime();
                var fechaFin = new Date().getTime();
                var diff = fechaFin - fechaInicio;

                var diferencia_minutos = parseInt(
                    Math.round(diff / (1000 * 60))
                );
                var diferencia_horas = parseInt(
                    Math.round(diff / (1000 * 60 * 60))
                );
                var diferencia_dias = parseInt(
                    Math.round(diff / (1000 * 60 * 60 * 24))
                );

                if (diferencia_minutos < 60) {
                    var diferencia_final = diferencia_minutos + " Minutos";
                } else if (diferencia_horas < 24) {
                    var diferencia_final = diferencia_horas + " Horas";
                } else {
                    var diferencia_final = diferencia_dias + " Dias";
                }
                if (item.accion == "creacion") {
                    var icono = "fas fa-upload";
                } else {
                    var icono = "far fa-thumbs-up";
                }
                var index_dashboard_bd = item.link.indexOf("dashboard");
                var sub_cadena_original = item.link.substring(
                    0,
                    index_dashboard_bd
                );

                respuesta_html +=
                    "<tr onClick=\"tr_modalFunction('" +
                    item.link.replace(
                        sub_cadena_original,
                        URLactual.origin + "/"
                    ) +
                    "/" +
                    item.id +
                    '\')" style="cursor:pointer;">';
                respuesta_html += "    <th>" + item.fec_creacion + "</th>";
                respuesta_html +=
                    '    <td width="40%"><p class="text-wrap">' +
                    item.titulo +
                    "</p></td>";
                respuesta_html +=
                    '    <td width="40%"><p class="text-wrap">' +
                    item.mensaje +
                    "</p></td>";
                respuesta_html += "</tr>";
            });
            $("#tbody_notificacionesMenuSupModal").html(respuesta_html);
        },
        error: function () {},
    });
    notificacionesMenuSupModal.show();
}

$(".boton_cerrar_modal_notif").on("click", function () {
    notificacionesMenuSupModal.toggle();
});

function tr_modalFunction(url_modal) {
    window.location = url_modal;
    return false;
}

const mensajesMenuSupModal = new bootstrap.Modal(
    document.getElementById("mensajesMenuSupModal")
);
function abrir_chat_mensajes() {
    const data_url = $("#ruta_get_usuarios").attr("data_url");
    const URLactual = window.location;
    const remitente_id_msj = $('#remitente_id_msj').val();
    const folder_imagenes_usuario = $("#folder_imagenes_usuarios").val();
    $.ajax({
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            var respuesta_html = "";
            var cant_usuarios = parseInt(respuesta.usuarios);
            $.each(respuesta.usuarios, function (index, item) {
                if (remitente_id_msj != item.id) {
                    respuesta_html += "<tr>";
                    respuesta_html +='<td class="d-flex flex-row align-items-center" id="usuario_'+item.id+'" style="cursor: pointer;" onClick="chat_seleccion(\'persona\',\'' + item.id + '\',\'0\',\'usuario_'+item.id+'\')"';
                    respuesta_html +='data_destinatario_id_msj="' + item.id + '"';
                    respuesta_html +='data_proyectos_id_msj="0"';
                    respuesta_html +='data_tipo_msj="persona"';
                    respuesta_html +='>';
                    respuesta_html +='<img style="border-radius: 50%;display: inline;width: 2.5rem;" alt="Avatar" class="table-avatar" title="' + item.nombres + " " + item.apellidos + '" src="' + folder_imagenes_usuario + "/" + item.foto + '">';
                    respuesta_html +='<h6 style="margin-left:10px;" id="h6_usuario_' + item.id + '">' + item.nombres + ' ' + item.apellidos;
                    if (item.cant_sin_leer>0) {
                        respuesta_html+= '<span class="badge bg-info ml-3">' + item.cant_sin_leer  + '</span>';
                    }
                    respuesta_html +='</h6>';
                    respuesta_html += "</td>";
                    respuesta_html += "</tr>";
                }
            });
            $("#body_table_usuarios_chat").html(respuesta_html);
            if (respuesta.proyectos.length>0) {
                respuesta_html = "";
                $.each(respuesta.proyectos, function (index, proyecto) {
                    respuesta_html += "<tr>";
                    respuesta_html +='<td class="d-flex flex-row align-items-center" id="proyecto_'+proyecto.id+'" style="cursor: pointer;" onClick="chat_seleccion(\'proyecto\',\'0\',\'' + proyecto.id + '\',\'proyecto_'+proyecto.id+'\')"';
                    respuesta_html +='data_destinatario_id_msj="0"';
                    respuesta_html +='data_proyectos_id_msj="' + proyecto.id + '"';
                    respuesta_html +='data_tipo_msj="proyecto"';
                    respuesta_html +='>';
                    respuesta_html +='<h6 style="margin-left:10px;">' + proyecto.titulo +"</h6>";
                    respuesta_html += "</td>";
                    respuesta_html += "</tr>";
                });
                $("#body_table_usuarios_chat_p").html(respuesta_html);
                $('#tabla_msj_proyectos').removeClass('d-none');
            }else{
                $('#tabla_msj_proyectos').addClass('d-none');
            }

        },
        error: function () {},
    });
    mensajesMenuSupModal.show();
}
$(".boton_cerrar_modal_mjs").on("click", function () {
    mensajesMenuSupModal.toggle();
});

function chat_seleccion(data_tipo_msj,data_destinatario_id_msj,data_proyectos_id_msj,data_id){
    $('#destinatario_id_msj').val(data_destinatario_id_msj);
    $('#proyectos_id_msj').val(data_proyectos_id_msj);
    $('#tipo_msj').val(data_tipo_msj);
    $('#mensaje_envio').prop('disabled', false);
    $('#mensaje_envio').val('');
    $('#body_table_usuarios_chat').children().removeClass('bg-info table-info');
    $('#'+data_id).parent().addClass('bg-info table-info');
    $('#'+data_id).find('span').remove();

    getmensajes_dest_rem ();
}

$( "#form_mensajes" ).on( "submit", function( event ) {
    event.preventDefault();
    const form = $(this);
    $.ajax({
        url: form.attr("action"),
        type: "POST",
        data: form.serialize(),
        success: function (respuesta) {
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
            respuesta_html = $('#caja_conversaciones').html();
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            $('#ultimo_mensaje_subido_id').val(respuesta.mensaje.id);
            if (respuesta.mensaje.remitente_id == $('#remitente_id_msj').val()) {
                // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                respuesta_html+='';
                respuesta_html+='<div class="row mt-2 mr-2 caja_remitente_base" id="caja_remitente_' + respuesta.mensaje.id + '">';
                respuesta_html+='    <div class="col-2"></div>';
                respuesta_html+='    <div class="col-10 p-2 remitente" style="border: 1px black solid; border-radius: 5px;background-color: rgba(0, 195, 255, 0.062);">';
                respuesta_html+='        <div class="row">';
                respuesta_html+='            <div class="col-12">';
                respuesta_html+='                <span class="float-end">';
                respuesta_html+='                    <h6><i class="fas fa-comment-alt mr-1" aria-hidden="true"></i><strong class="strong_remitente">' + respuesta.mensaje.remitente.nombres + ' ' + respuesta.mensaje.remitente.apellidos + '</strong></h6><span class="span_fecha" style="font-size: 0.7em;">[' + respuesta.mensaje.fec_creacion + ']</span>';
                respuesta_html+='                </span>';
                respuesta_html+='            </div>';
                respuesta_html+='            <div class="col-12">';
                respuesta_html+='                <p class="p_mensaje float-end" style="text-align: justify;">' + respuesta.mensaje.mensaje + '</p>';
                respuesta_html+='            </div>';
                respuesta_html+='        </div>';
                respuesta_html+='    </div>';
                respuesta_html+='</div>';

                // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
            }
                else {
                // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                respuesta_html+='<div class="row mt-2 ml-2 caja_destinatario_base" id="caja_destinatario_' + respuesta.mensaje.id + '">';
                respuesta_html+='    <div class="col-10 p-2 destinatario" style="border: 1px black solid; border-radius: 5px;background-color: rgba(0, 255, 0, 0.062);">';
                respuesta_html+='        <div class="row">';
                respuesta_html+='            <div class="col-12">';
                respuesta_html+='                <span class="float-star">';
                respuesta_html+='                    <h6><i class="fas fa-comment-alt mr-1" aria-hidden="true"></i><strong class="strong_remitente">' + respuesta.mensaje.remitente.nombres + ' ' + respuesta.mensaje.remitente.apellidos + '</strong></h6><span class="span_fecha" style="font-size: 0.7em;">[' + respuesta.mensaje.fec_creacion + ']]</span>';
                respuesta_html+='                </span>';
                respuesta_html+='            </div>';
                respuesta_html+='            <div class="col-12">';
                respuesta_html+='                <p class="p_mensaje" style="text-align: justify;">' + respuesta.mensaje.mensaje + '</p>';
                respuesta_html+='            </div>';
                respuesta_html+='        </div>';
                respuesta_html+='    </div>';
                respuesta_html+='    <div class="col-2"></div>';
                respuesta_html+='</div>';
                // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            respuesta_html+='<div class="row ultima_caja" id="ultima_caja">.</div>';
            $('#caja_conversaciones').html(respuesta_html);
            let container = $('#caja_conversaciones');
            let scrollToMe = $('#ultima_caja');
            container.animate({scrollTop: scrollToMe.offset().top - container.offset().top + container.scrollTop()},500);
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
        },
        error: function () {},
    });

  });
function getmensajes_dest_rem (){
    const data_url = $("#data_getmensajes_dest_rem").attr("data_url");
    $('.chat_pantalla').remove();
    var data = {
        remitente_id: $('#remitente_id_msj').val(),
        destinatario_id: $('#destinatario_id_msj').val()
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            respuesta_html = '';
            $.each(respuesta.mensajes, function (index, mensaje) {
                $('#ultimo_mensaje_subido_id').val(mensaje.id);
                if (mensaje.remitente_id == $('#remitente_id_msj').val()) {
                    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                    respuesta_html+='';
                    respuesta_html+='<div class="row mt-2 mr-2 caja_remitente_base" id="caja_remitente_' + mensaje.id + '">';
                    respuesta_html+='    <div class="col-2"></div>';
                    respuesta_html+='    <div class="col-10 p-2 remitente" style="border: 1px black solid; border-radius: 5px;background-color: rgba(0, 195, 255, 0.062);">';
                    respuesta_html+='        <div class="row">';
                    respuesta_html+='            <div class="col-12">';
                    respuesta_html+='                <span class="float-end">';
                    respuesta_html+='                    <h6><i class="fas fa-comment-alt mr-1" aria-hidden="true"></i><strong class="strong_remitente">' + mensaje.remitente.nombres + ' ' + mensaje.remitente.apellidos + '</strong></h6><span class="span_fecha" style="font-size: 0.7em;">[' + mensaje.fec_creacion + ']</span>';
                    respuesta_html+='                </span>';
                    respuesta_html+='            </div>';
                    respuesta_html+='            <div class="col-12">';
                    respuesta_html+='                <p class="p_mensaje float-end" style="text-align: justify;">' + mensaje.mensaje + '</p>';
                    respuesta_html+='            </div>';
                    respuesta_html+='        </div>';
                    respuesta_html+='    </div>';
                    respuesta_html+='</div>';

                    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                }
                 else {
                    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                    respuesta_html+='<div class="row mt-2 ml-2 caja_destinatario_base" id="caja_destinatario_' + mensaje.id + '">';
                    respuesta_html+='    <div class="col-10 p-2 destinatario" style="border: 1px black solid; border-radius: 5px;background-color: rgba(0, 255, 0, 0.062);">';
                    respuesta_html+='        <div class="row">';
                    respuesta_html+='            <div class="col-12">';
                    respuesta_html+='                <span class="float-star">';
                    respuesta_html+='                    <h6><i class="fas fa-comment-alt mr-1" aria-hidden="true"></i><strong class="strong_remitente">' + mensaje.remitente.nombres + ' ' + mensaje.remitente.apellidos + '</strong></h6><span class="span_fecha" style="font-size: 0.7em;">[' + mensaje.fec_creacion + ']]</span>';
                    respuesta_html+='                </span>';
                    respuesta_html+='            </div>';
                    respuesta_html+='            <div class="col-12">';
                    respuesta_html+='                <p class="p_mensaje" style="text-align: justify;">' + mensaje.mensaje + '</p>';
                    respuesta_html+='            </div>';
                    respuesta_html+='        </div>';
                    respuesta_html+='    </div>';
                    respuesta_html+='    <div class="col-2"></div>';
                    respuesta_html+='</div>';
                    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                }
            });
            respuesta_html+='<div class="row ultima_caja" id="ultima_caja">.</div>';
            $('#caja_conversaciones').html(respuesta_html);
            let container = $('#caja_conversaciones');
            let scrollToMe = $('#ultima_caja');
            container.animate({scrollTop: scrollToMe.offset().top - container.offset().top + container.scrollTop()},500);

        },
        error: function () {},
    });
}

function getmensajes_dest_rem_ult(){
    if ($('#destinatario_id_msj').val()!='0') {
        const data_url = $("#data_getmensajes_dest_rem_ult").attr("data_url");
        const ultimo_mensaje_subido_id = $('#ultimo_mensaje_subido_id').val();
        var data = {
            remitente_id: $('#remitente_id_msj').val(),
            destinatario_id: $('#destinatario_id_msj').val()
        };
        $.ajax({
            url: data_url,
            type: "GET",
            data: data,
            success: function (respuesta) {
                if (ultimo_mensaje_subido_id!=respuesta.mensaje.id) {
                    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                    respuesta_html = $('#caja_conversaciones').html();
                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    $('#ultimo_mensaje_subido_id').val(respuesta.mensaje.id);
                    if (respuesta.mensaje.remitente_id == $('#remitente_id_msj').val()) {
                        // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                        respuesta_html+='';
                        respuesta_html+='<div class="row mt-2 mr-2 caja_remitente_base" id="caja_remitente_' + respuesta.mensaje.id + '">';
                        respuesta_html+='    <div class="col-2"></div>';
                        respuesta_html+='    <div class="col-10 p-2 remitente" style="border: 1px black solid; border-radius: 5px;background-color: rgba(0, 195, 255, 0.062);">';
                        respuesta_html+='        <div class="row">';
                        respuesta_html+='            <div class="col-12">';
                        respuesta_html+='                <span class="float-end">';
                        respuesta_html+='                    <h6><i class="fas fa-comment-alt mr-1" aria-hidden="true"></i><strong class="strong_remitente">' + respuesta.mensaje.remitente.nombres + ' ' + respuesta.mensaje.remitente.apellidos + '</strong></h6><span class="span_fecha" style="font-size: 0.7em;">[' + respuesta.mensaje.fec_creacion + ']</span>';
                        respuesta_html+='                </span>';
                        respuesta_html+='            </div>';
                        respuesta_html+='            <div class="col-12">';
                        respuesta_html+='                <p class="p_mensaje float-end" style="text-align: justify;">' + respuesta.mensaje.mensaje + '</p>';
                        respuesta_html+='            </div>';
                        respuesta_html+='        </div>';
                        respuesta_html+='    </div>';
                        respuesta_html+='</div>';

                        // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                    }
                        else {
                        // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                        respuesta_html+='<div class="row mt-2 ml-2 caja_destinatario_base" id="caja_destinatario_' + respuesta.mensaje.id + '">';
                        respuesta_html+='    <div class="col-10 p-2 destinatario" style="border: 1px black solid; border-radius: 5px;background-color: rgba(0, 255, 0, 0.062);">';
                        respuesta_html+='        <div class="row">';
                        respuesta_html+='            <div class="col-12">';
                        respuesta_html+='                <span class="float-star">';
                        respuesta_html+='                    <h6><i class="fas fa-comment-alt mr-1" aria-hidden="true"></i><strong class="strong_remitente">' + respuesta.mensaje.remitente.nombres + ' ' + respuesta.mensaje.remitente.apellidos + '</strong></h6><span class="span_fecha" style="font-size: 0.7em;">[' + respuesta.mensaje.fec_creacion + ']]</span>';
                        respuesta_html+='                </span>';
                        respuesta_html+='            </div>';
                        respuesta_html+='            <div class="col-12">';
                        respuesta_html+='                <p class="p_mensaje" style="text-align: justify;">' + respuesta.mensaje.mensaje + '</p>';
                        respuesta_html+='            </div>';
                        respuesta_html+='        </div>';
                        respuesta_html+='    </div>';
                        respuesta_html+='    <div class="col-2"></div>';
                        respuesta_html+='</div>';
                        // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                    }
                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    respuesta_html+='<div class="row ultima_caja" id="ultima_caja">.</div>';
                    $('#caja_conversaciones').html(respuesta_html);
                    let container = $('#caja_conversaciones');
                    let scrollToMe = $('#ultima_caja');
                    container.animate({scrollTop: scrollToMe.offset().top - container.offset().top + container.scrollTop()},500);
                    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
                }
            },
            error: function () {},
        });
    }
}

function get_all_nuevos_mensajes(){
    const data_url = $("#data_get_all_nuevos_mensajes").attr("data_url");
    const remitente_id_msj = $('#remitente_id_msj').val();
    const folder_imagenes_usuario = $("#folder_imagenes_usuarios").val();
    var data = {
        remitente_id: remitente_id_msj
    };
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            $('#badge_mesajes_usu').html(respuesta.mensaje_sin_leer_cant);
            if (respuesta.mensaje_sin_leer_cant > 0) {
                respuesta_html = '';
                var i = 1
                $.each(respuesta.mensaje_sin_leer, function (index, mensaje) {
                    if (i < 4) {
                        var fechaInicio = new Date(mensaje.fec_creacion).getTime();
                        var fechaFin = new Date().getTime();
                        var diff = fechaFin - fechaInicio;

                        var diferencia_minutos = parseInt(
                            Math.round(diff / (1000 * 60))
                        );
                        var diferencia_horas = parseInt(
                            Math.round(diff / (1000 * 60 * 60))
                        );
                        var diferencia_dias = parseInt(
                            Math.round(diff / (1000 * 60 * 60 * 24))
                        );

                        if (diferencia_minutos < 60) {
                            var diferencia_final = diferencia_minutos + " Minutos";
                        } else if (diferencia_horas < 24) {
                            var diferencia_final = diferencia_horas + " Horas";
                        } else {
                            var diferencia_final = diferencia_dias + " Dias";
                        }
                    //-------------------------------------------------------------------------------
                        respuesta_html +='<a href="#" class="dropdown-item" onclick="abrir_chat_mensajes()">';
                        respuesta_html +='    <!-- Message Start -->';
                        respuesta_html +='    <div class="media">';
                        respuesta_html +='        <img src="' + folder_imagenes_usuario + "/" + mensaje.remitente.foto + '" alt="" class="img-size-50 mr-3 img-circle">';
                        respuesta_html +='        <div class="media-body">';
                        respuesta_html +='            <h3 class="dropdown-item-title">';
                        respuesta_html +='                ' + mensaje.remitente.nombres + ' ' + mensaje.remitente.apellidos;
                        //respuesta_html +='                <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>';
                        respuesta_html +='            </h3>';
                        respuesta_html +='            <p class="text-sm">' + mensaje.mensaje.substring(0, 20) + '...</p>';
                        respuesta_html +='            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> ' + diferencia_final + '</p>';
                        respuesta_html +='        </div>';
                        respuesta_html +='    </div>';
                        respuesta_html +='    <!-- Message End -->';
                        respuesta_html +='</a>';
                        respuesta_html +='<div class="dropdown-divider"></div>';

                    }
                    i++;
                });
                respuesta_html += '<a href="#" class="dropdown-item dropdown-footer ver_chats" id="ver_chats" onclick="abrir_chat_mensajes()">Abrir Chats</a>';
                $('#cajonera_mensajes_sup').html(respuesta_html);
            }
        },
        error: function () {},
    });
}
*/


function getEmpleadosChatGeneral(){
    const data_url = $('#getEmpleadosChat').attr('data_url');
    $.ajax({
        async: false,
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            console.log(respuesta);
        },
        error: function () {},
    });
}
function getMensajesNuevosEmpleadosChat(){
    const data_url = $('#getEmpleadosChat').attr('data_url_MN');
    var ruta_fotos_temp = $('#getEmpleadosChat').attr('ruta_fotos');
    const ruta_fotos = ruta_fotos_temp.trim();
    $.ajax({
        async: false,
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            var html_Chat = '';
            var cantidadMensajesNuevos = parseInt(respuesta.cantidadMensajesNuevos);
            if (cantidadMensajesNuevos < 4) {
                $('#badge_mesajes_usu').removeClass().addClass('badge badge-primary navbar-badge').html(cantidadMensajesNuevos);
            } else if(cantidadMensajesNuevos < 8){
                $('#badge_mesajes_usu').removeClass().addClass('badge badge-success navbar-badge').html(cantidadMensajesNuevos);
            }else if(cantidadMensajesNuevos < 10){
                $('#badge_mesajes_usu').removeClass().addClass('badge badge-warning navbar-badge').html(cantidadMensajesNuevos);
            }else{
                $('#badge_mesajes_usu').removeClass().addClass('badge badge-danger navbar-badge').html(cantidadMensajesNuevos);
            }

            if (cantidadMensajesNuevos > 0) {
                var i = 0
                $.each(respuesta.mensajesDestinatario, function (index, mensaje) {
                    html_Chat+='<li>';
                    html_Chat+='<a class="dropdown-item" href="#" onclick="abrirChatEspecifico(\'liItemUsuario_'+mensaje.remitente.id+'\','+mensaje.remitente.id+')">';
                    html_Chat+='<div class="media">';
                    html_Chat +='<img src="'+ruta_fotos+mensaje.remitente.fotoChat+'" alt="'+mensaje.remitente.nombre_chat+'" title="'+mensaje.remitente.nombre_chat+'" class="img-size-50 mr-3 img-circle" style="max-width: 70px;">';
                    html_Chat+='<div class="media-body">';
                    html_Chat+='<h3 class="dropdown-item-title">';
                    html_Chat+= mensaje.remitente.nombre_chat;
                    html_Chat+='<span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>';
                    html_Chat+='</h3>';
                    html_Chat+='<p class="text-sm" style="min-width: 550px; font-size: 0.65em; text-align: justify">'+mensaje.mensaje.substring(0,25)+'...</p>';
                    html_Chat+='<p class="text-muted" style="min-width: 550px; font-size: 0.75em;"><i class="far fa-clock mr-1"></i>Hace  '+mensaje.diff_creacion+'</p>';
                    html_Chat+='</div>';
                    html_Chat+='</div>';
                    html_Chat+='</a>';
                    html_Chat+='</li>';
                    html_Chat+='<li><hr class="dropdown-divider"></li>';
                    i++;
                    if(i === 4) {
                        return false; // breaks
                    }
                });
                html_Chat += '<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#chatModal" id="abrirModalChat" onclick="abrirModalChat()">Abrir Chat</a></li>               ';
            }else{
                html_Chat += '<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#chatModal" id="abrirModalChat" onclick="abrirModalChat()">Abrir Chat</a></li>';
            }
            $('#ul_mensajes').html(html_Chat);

        },
        error: function () {},
    });
}

function activoFunction(li,destinatario_id){
    const li_item = $('#'+li);
    li_item.parent().children('li').removeClass('itemActivo');
    li_item.addClass('itemActivo');
    $('#destinatario_id').val(destinatario_id);
    $('#formNuevoMensaje').removeClass('d-none');
    const data_url = $('#getMensajesChatUsuario').attr('data_url');
    var data = {
        id_usuario: destinatario_id
    };
    $.ajax({
        async: false,
        data: data,
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            var html_respuesta = '';
            $.each(respuesta.mensajes, function (index, mensaje) {
                if (mensaje.destinatario_id != destinatario_id) {
                    html_respuesta += '<div class="row d-flex justify-content-start mt-1 mb-1 ml-1" id="mensaje_N_'+mensaje.id +'">';
                    html_respuesta += '<div class="col-10 cajaDestinatario border border-primary rounded p-2">';
                    html_respuesta += '<p style="text-align: justify">'+mensaje.mensaje+'</p>';
                    html_respuesta += '<span class="float-end text-small" style="font-size: 0.7em;">'+mensaje.fec_creacion+'</span>';
                    html_respuesta += '</div>';
                    html_respuesta += '</div>';
                } else {
                    html_respuesta += '<div class="row d-flex justify-content-end mt-1 mb-1 mr-1" id="mensaje_N_'+mensaje.id +'">';
                    html_respuesta += '<div class="col-10 cajaRemitente border border-success rounded p-2">';
                    html_respuesta += '<p style="text-align: justify">'+mensaje.mensaje+'</p>';
                    html_respuesta += '<span class="float-end text-small" style="font-size: 0.7em;">'+mensaje.fec_creacion+'</span>';
                    html_respuesta += '</div>';
                    html_respuesta += '</div>';
                }
            });
            $('#cajonChatsFinal').html(html_respuesta);
            $("#cajonChatsFinal").animate({ scrollTop: $("#cajonChatsFinal").prop("scrollHeight")}, 1000);
            $('#getMensajesChatUsuario').attr('data_estado',1);
        },
        error: function () {},
    });
}

function getMensajesNuevosDestinatarioChat(){
    const data_estado = $('#getMensajesChatUsuario').attr('data_estado');
    if (data_estado == 1) {
        const data_url = $('#getMensajesNuevosDestinatarioChat').attr('data_url');
        const destinatario_id = $('#destinatario_id').val();
        var data = {
            id_usuario: destinatario_id
        };
        $.ajax({
            async: false,
            data: data,
            url: data_url,
            type: "GET",
            success: function (respuesta) {
                var html_respuesta = '';
                $.each(respuesta.mensajes, function (index, mensaje) {
                    html_respuesta += '<div class="row d-flex justify-content-start mt-1 mb-1 ml-1" id="mensaje_N_'+mensaje.id +'">';
                    html_respuesta += '<div class="col-10 cajaDestinatario border border-primary rounded p-2">';
                    html_respuesta += '<p style="text-align: justify">'+mensaje.mensaje+'</p>';
                    html_respuesta += '<span class="float-end text-small" style="font-size: 0.7em;">'+mensaje.fec_creacion+'</span>';
                    html_respuesta += '</div>';
                    html_respuesta += '</div>';
                });
                $( "#cajonChatsFinal" ).append( html_respuesta );
                $("#cajonChatsFinal").animate({ scrollTop: $("#cajonChatsFinal").prop("scrollHeight")}, 1000);
            },
            error: function () {},
        });
    }
}

function abrirModalChat(){
    const data_url = $('#getEmpleadosChat').attr('data_url');
        const dataMyId = $('#getEmpleadosChat').attr('dataMyId');
        var ruta_fotos_temp = $('#getEmpleadosChat').attr('ruta_fotos');
        const ruta_fotos = ruta_fotos_temp.trim();
        $.ajax({
            async: false,
            url: data_url,
            type: "GET",
            success: function (respuesta) {
                var htmlUsuarios = '';
                var htmlUsuariosTable = '';
                $.each(respuesta.superAdminstradores, function (index, usuario) {
                    htmlUsuarios +='<li class="itemUsuario mt-1 mb-1 pt-1 pb-1" id="liItemUsuario_'+usuario.id+'" onclick="activoFunction(\'liItemUsuario_'+usuario.id+'\','+usuario.id+')" style="list-style-type: none;">';
                    htmlUsuarios +='<div class="media d-flex align-items-center" style="cursor: pointer;">';
                    htmlUsuarios +='<img src="'+ruta_fotos+usuario.foto_chat+'" alt="'+usuario.nombre_chat+'" title="'+usuario.nombre_chat+'" class="img-size-50 mr-3 img-circle" style="max-width: 60px;">';
                    htmlUsuarios +='<div class="media-body">';
                    htmlUsuarios +='<h3 class="dropdown-item-title">'+usuario.nombre_chat+'<span class="float-right badge badge-info" style="font-size: 0.65em">'+usuario.cant_sin_leer+'</span></h3>';
                    htmlUsuarios +='<span style="font-size: 0.75em;">Administrador del sistema</span>';
                    htmlUsuarios +='</div>';
                    htmlUsuarios +='</div>';
                    htmlUsuarios +='</li>';
                    //-----------------------------

                });
                $.each(respuesta.empleados, function (index, usuario) {
                    htmlUsuarios +='<li class="itemUsuario mt-1 mb-1 pt-1 pb-1" id="liItemUsuario_'+usuario.id+'" onclick="activoFunction(\'liItemUsuario_'+usuario.id+'\','+usuario.id+')" style="list-style-type: none;">';
                    htmlUsuarios +='<div class="media d-flex align-items-center" style="cursor: pointer;">';
                    htmlUsuarios +='<img src="'+ruta_fotos+usuario.foto_chat+'" alt="'+usuario.nombre_chat+'" title="'+usuario.nombre_chat+'" class="img-size-50 mr-3 img-circle" style="max-width: 60px;">';
                    htmlUsuarios +='<div class="media-body">';
                    htmlUsuarios +='<h3 class="dropdown-item-title">'+usuario.nombre_chat+'<span class="float-right badge badge-info" style="font-size: 0.65em">'+usuario.cant_sin_leer+'</span></h3>';
                    htmlUsuarios +='<span style="font-size: 0.75em;">Empleado</span>';
                    htmlUsuarios +='</div>';
                    htmlUsuarios +='</div>';
                    htmlUsuarios +='</li>';
                    //-----------------------------
                });
                //$('#menuChatUsuarios').html(htmlUsuarios);

                $('#ul_listaUsuarios').html(htmlUsuarios);
            },
            error: function () {},
        });
}

function abrirChatEspecifico (li,destinatario_id){
    abrirModalChat();
    const myModal = new bootstrap.Modal(document.getElementById('chatModal'));
    myModal.show();
    activoFunction(li,destinatario_id);
}

