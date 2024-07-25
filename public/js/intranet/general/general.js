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
    getNotificacionesEmpleado();
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
function getEmpleadosChatGeneral(){
    const data_url = $('#getEmpleadosChat').attr('data_url');
    $.ajax({
        async: false,
        url: data_url,
        type: "GET",
        success: function (respuesta) {

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
            if (respuesta.mensajes.length > 0) {
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
            } else {
                        html_respuesta +='<div class="row d-flex justify-content-center center align-items-center" id="chatSinMensajes" style="min-height: 100%;">';
                        html_respuesta +='<div class="col-12 text-center" >';
                        html_respuesta +='<div class="row d-flex justify-content-center center align-items-center">';
                        html_respuesta +='<div class="col-12 col-md-5"><img src="'+$('#imagenMglTech').val()+'" class="img-fluid"></div>';
                        html_respuesta +='<div class="col-12 col-md-8 mt-3">';
                        html_respuesta +='<h5>Chat sin conversaciones.</h5>';
                        html_respuesta +='</div>';
                        html_respuesta +='</div>';
                        html_respuesta +='</div>';
                        html_respuesta +='</div>                ';
            }

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
                    var badgeCantinLeer ='';
                    htmlUsuarios +='<li class="itemUsuario mt-1 mb-1 pt-1 pb-1" id="liItemUsuario_'+usuario.id+'" onclick="activoFunction(\'liItemUsuario_'+usuario.id+'\','+usuario.id+')" style="list-style-type: none;">';
                    htmlUsuarios +='<div class="media d-flex align-items-center" style="cursor: pointer;">';
                    htmlUsuarios +='<img src="'+ruta_fotos+usuario.foto_chat+'" alt="'+usuario.nombre_chat+'" title="'+usuario.nombre_chat+'" class="img-size-50 mr-3 img-circle" style="max-width: 60px;">';
                    htmlUsuarios +='<div class="media-body">';
                    if (parseInt(usuario.cant_sin_leer)>0) {
                        badgeCantinLeer = '<span class="float-right badge badge-info" style="font-size: 0.65em">'+usuario.cant_sin_leer+'</span>';
                    }
                    htmlUsuarios +='<h3 class="dropdown-item-title">'+usuario.nombre_chat+ badgeCantinLeer+'</h3>';
                    htmlUsuarios +='<span style="font-size: 0.75em;">Administrador del sistema</span>';
                    htmlUsuarios +='</div>';
                    htmlUsuarios +='</div>';
                    htmlUsuarios +='</li>';
                    //-----------------------------

                });
                $.each(respuesta.empleados, function (index, usuario) {
                    var badgeCantinLeer ='';
                    htmlUsuarios +='<li class="itemUsuario mt-1 mb-1 pt-1 pb-1" id="liItemUsuario_'+usuario.id+'" onclick="activoFunction(\'liItemUsuario_'+usuario.id+'\','+usuario.id+')" style="list-style-type: none;">';
                    htmlUsuarios +='<div class="media d-flex align-items-center" style="cursor: pointer;">';
                    htmlUsuarios +='<img src="'+ruta_fotos+usuario.foto_chat+'" alt="'+usuario.nombre_chat+'" title="'+usuario.nombre_chat+'" class="img-size-50 mr-3 img-circle" style="max-width: 60px;">';
                    htmlUsuarios +='<div class="media-body">';
                    if (parseInt(usuario.cant_sin_leer)>0) {
                        badgeCantinLeer = '<span class="float-right badge badge-info" style="font-size: 0.65em">'+usuario.cant_sin_leer+'</span>';
                    }
                    htmlUsuarios +='<h3 class="dropdown-item-title">'+usuario.nombre_chat+ badgeCantinLeer+'</h3>';htmlUsuarios +='<span style="font-size: 0.75em;">Empleado</span>';
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

function getNotificacionesEmpleado(){
    const data_url = $('#getNotificacionesEmpleado').attr('data_url');
    $.ajax({
        async: false,
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            console.log(respuesta);
            var li_html = '';
            if (respuesta.notificaciones.length > 0) {
                var badge_color = '';
                if (respuesta.notificaciones.length < 4) {
                    badge_color = 'primary';
                } else if(respuesta.notificaciones.length < 8){
                    badge_color = 'success';
                }else if(respuesta.notificaciones.length < 10){
                    badge_color = 'warning';
                }else{
                    badge_color = 'danger';
                }

                li_html += '<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">';
                li_html += '<i class="far fa-bell" style="font-size: 1.5em;"></i>';
                li_html += '<span class="badge badge-'+badge_color+' navbar-badge" style="font-size: 0.78em;position: absolute;">'+respuesta.notificaciones.length+'</span>';
                li_html += '</a>';
                li_html += '<ul class="dropdown-menu dropdown-menu-right" id="menu_badge_cant_notificaciones_2" style="left: inherit; right: 0px;font-size: 0.75em;width: 350px;">';
                li_html += '<li><span class="dropdown-item">'+respuesta.notificaciones.length+' Notificaciones</span></li>';
                li_html += '<li><hr class="dropdown-divider"></li>';
                var i = 0;
                $.each(respuesta.notificaciones, function (index, notificacion) {
                    i ++;
                    var link = '';
                    var ubicacion = notificacion.link.search("dashboard");
                    link = location.href.substring(0,location.href.search(("dashboard")))+ notificacion.link.substring(ubicacion)+'/' + notificacion.id;
                    li_html += '<li>';
                    li_html += '<a class="dropdown-item d-flex flex-row" href="'+link+'">';
                    li_html += '<div class="row">';
                    li_html += '<div class="col-12"><span class="float-right text-sm ml-5"><strong style="font-size: 0.75em;">'+notificacion.diff_creacion+'</strong></span></div>';
                    li_html += '<div class="col-12"><p class="text-wrap"><i class="fas fa-project-diagram mr-3"></i>' +notificacion.mensaje+ '</p></div>';
                    li_html += '</div>';
                    li_html += '</a>';
                    li_html += '</li>';
                    if(i === 3) {
                        return false; // breaks
                    }
                });
                li_html += '<li><hr class="dropdown-divider"></li>';
                li_html += '<li><a class="dropdown-item" href="#" onclick="abrirNotificaciones()">Ver Todas las Notificaciones</a></li>';
                li_html += '</ul>';
                $('#li_notificaciones').html(li_html);
            } else {
                console.log('nopp');
            }
        },
        error: function () {},
    });
}
function abrirNotificaciones(){
    const data_url = $('#getNotificacionesEmpleado').attr('data_url');
    const  myModalNotificaciones = new bootstrap.Modal(document.getElementById('modalNotificaciones'))
    $.ajax({
        async: false,
        url: data_url,
        type: "GET",
        success: function (respuesta) {
            console.log(respuesta);
            var tbody_html = '';
            if (respuesta.notificaciones.length > 0) {
                $.each(respuesta.notificaciones, function (index, notificacion) {
                    var link = '';
                    var ubicacion = notificacion.link.search("dashboard");
                    link = location.href.substring(0,location.href.search(("dashboard")))+ notificacion.link.substring(ubicacion)+'/' + notificacion.id;
                    tbody_html += '<tr onclick="verNotificacion(\''+link+'\')" style="cursor: pointer;">';
                    tbody_html += '<th scope="row">'+notificacion.id+'</th>';
                    tbody_html += '<td>'+notificacion.fec_creacion+'</td>';
                    tbody_html += '<td>'+notificacion.mensaje+'</td>';
                    tbody_html += '</tr>';

                });
                $('#tbody_notificaciones_general').html(tbody_html);
                myModalNotificaciones.show();
            } else {
                console.log('nopp');
            }
        },
        error: function () {},
    });
}
 function verNotificacion(link){
    window.location.href = link;
 }
