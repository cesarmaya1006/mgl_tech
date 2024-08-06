$(document).ready(function () {
    //===================================================================================================
    const id_usuario = $("#id_usuario").val();
    const val_count_tareas_activas = parseInt(
        $("#val_count_tareas_activas").val()
    );
    const val_count_tareas_vencidas = parseInt(
        $("#val_count_tareas_vencidas").val()
    );
    var tareas_vigentes = ((val_count_tareas_activas - val_count_tareas_vencidas) * 100) / val_count_tareas_activas;
    var tareas_vencidas = (val_count_tareas_vencidas * 100) / val_count_tareas_activas;

    Highcharts.setOptions({
        colors: ["rgba(0, 214, 0, 0.75)", "rgba(255, 0, 0, 0.75)"],
    });

    const chart = Highcharts.chart("container", {
        chart: {
            type: "pie",
            options3d: { enabled: !0, alpha: 45, beta: 0 },
        },
        title: {
            text:
                "Total de tareas asignadas al usuario: " + val_count_tareas_activas,
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
            pie: {
                allowPointSelect: !0,
                cursor: "pointer",
                depth: 35,
                dataLabels: { enabled: !0, format: "{point.name}" },
            },
        },
        series: [
            {
                type: "pie",
                name: "Porcentaje",
                data: [
                    ["Tareas Vigentes : " + (val_count_tareas_activas - val_count_tareas_vencidas), tareas_vigentes],
                    ["Tareas Vencidas : " + val_count_tareas_vencidas, tareas_vencidas],
                ],
            },
        ],
    });
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getProyectosGraficosLider =$("#id_usuario").attr("data_url_proyLider");
    const totalTareasProyectos = [];
    const totalProyectosTitulo = [];
    const totaltareasVigentes = [];
    const totaltareasVencidas = [];
    const hoy = new Date();
    var data = {
        id_usuario: id_usuario,
    };
    $.ajax({
        async: false,
        url: getProyectosGraficosLider,
        type: "GET",
        data: data,
        success: function (respuesta) {
            if (respuesta.proyectos.length > 0) {
                $.each(respuesta.proyectos, function (index, proyecto) {
                    totalProyectosTitulo.push(proyecto.titulo);
                    var totalTareas = 0;
                    var temTareasVigentes = 0;
                    var tempTareasVencidas = 0;
                    $.each(proyecto.componentes, function (index, componente) {
                        $.each(componente.tareas, function (index, tarea) {
                            totalTareas++;
                            var fechaLimite = new Date(tarea.fec_limite);
                            if (fechaLimite > hoy) {
                                tempTareasVencidas++;
                            } else {
                                temTareasVigentes++;
                            }
                        });
                    });
                    totalTareasProyectos.push(totalTareas);
                    totaltareasVigentes.push(temTareasVigentes);
                    totaltareasVencidas.push(tempTareasVencidas);
                });
            }
        },
        error: function () {},
    });
    Highcharts.setOptions({
        colors: ["rgba(18, 159, 32, 0.8)", "rgba(255, 0, 0, 0.75)"],
    });
    const chart_tareasProyectos = Highcharts.chart("tareasProyectosLider", {
        chart: {
            type: "column",
            options3d: {
                enabled: !0,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40,
            },
        },
        title: {
            text: "Tareas por proyectos (Lider)",
        },
        xAxis: {
            categories: totalProyectosTitulo,
        },
        yAxis: {
            allowDecimals: !1,
            min: 0,
            title: { text: "Cantidad de tareas" },
        },
        tooltip: {
            headerFormat: "<b>{point.key}</b><br>",
            pointFormat:
                '<span style="color:{series.color}">●</span> {series.name}: {point.y}',
        },
        plotOptions: { column: { stacking: "normal", depth: 40 } },
        series: [
            //{ name: "Tareas Total", data: totalTareasProyectos, stack: "total" },
            { name: "Vigentes", data: totaltareasVigentes, stack: "Vigentes" },
            { name: "Vencidas", data: totaltareasVencidas, stack: "Vencidas" },
        ],
    });
    //===================================================================================================
    var data = {
        id_usuario:id_usuario,
    };
    llenarCalendario($('#empleados_calendar_empleado').attr('data_url'),data);
    $('#flush-collapseCalendario').addClass('collapse');
    //----------------------------------------------------------------------------------------------------
    //===================================================================================================
    $('#btngruposTareasModal').on( "click", function(){
        const data_url = $('#getTareasEmpleadoGrupos').attr("data_url");
        $.ajax({
            async: false,
            url: data_url,
            type: "GET",
            success: function (respuesta) {
                console.log(respuesta);
            },
            error: function () {},
        });
    });
    //===================================================================================================
    $('input[type=radio][name=tareasTipo]').change(function() {
        if (this.value == 'mias') {
            var data = {
                id_usuario:id_usuario,
            };
            llenarCalendario($('#empleados_calendar_empleado').attr('data_url'),data);
            $('#selectProyectosCaja').addClass('d-none');
        }else{
            $('#selectProyectosCaja').removeClass('d-none');
        }
    });
    //===================================================================================================
    $("#proyecto_id").on("change", function () {
        const data_url = $(this).attr("data_url");
        const id = $(this).val();
        var data = {
            id: id,
        };
        llenarCalendario(data_url,data);
    });
    //===================================================================================================
    const proyectosModal = new bootstrap.Modal(
        document.getElementById("proyectosModal")
    );
    $(".ver_modal_proyectos").on("click", function () {
        const data_id = $(this).attr("data_id");
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
                console.log(data_url);


                $.each(respuesta.proyectos, function (index, proyecto) {
                    respuesta_html += "<tr>";
                    respuesta_html += '<td class="project-actions text-right">';
                    respuesta_html += "    <a ";
                    respuesta_html +=
                        '        href="' +
                        $("#input_getdetalleproyecto")
                            .val()
                            .replace("detalle/1", "detalle/" + proyecto.id) +
                        '" class="btn btn-primary btn-sm pl-3 pr-3"';
                    respuesta_html += '        data_id="' + proyecto.id + '"';
                    respuesta_html += '        style="font-size: 0.8em;"';
                    respuesta_html += ">";
                    respuesta_html +=
                        '            <iclass="fas fa-folder mr-1"></i>Ver</a>';
                    respuesta_html += "</td>";
                    respuesta_html +=
                        '<td style="white-space:nowrap;">' +
                        proyecto.id +
                        "</td>";
                    respuesta_html += '<td style="white-space:nowrap;">';
                    respuesta_html +=
                        '<a href="' +
                        $("#input_getdetalleproyecto")
                            .val()
                            .replace("detalle/1", "detalle/" + proyecto.id) +
                        '" class="btn btn-link" style="text-decoration: none;" >' +
                        proyecto.titulo +
                        "</a >";
                    respuesta_html += "<br>";
                    respuesta_html +=
                        '<small class="ml-4">Creado ' +
                        proyecto.fec_creacion +
                        "</small>";
                    respuesta_html += "</td>";
                    respuesta_html += '<td style="white-space:nowrap;">';

                    respuesta_html +=
                        '<div class="image"><img src="' +
                        $("#folder_imagenes_usuario").val() +
                        "/" +
                        proyecto.lider.foto +
                        '" class="img-circle elevation-2" alt="User Image" style="max-height:50px;width:auto;"></div>';

                    //respuesta_html +='<img alt="Avatar" class="table-avatar" title="' + proyecto.lider.nombres + ' ' + proyecto.lider.apellidos + '" src="' + $('#folder_imagenes_usuario').val() + '/' + proyecto.lider.foto + '">';

                    respuesta_html += "</td>";
                    respuesta_html +=
                        '<td class="d-flex justify-content-around" style="white-space:nowrap;">';
                    respuesta_html += '<ul class="list-inline">';
                    $.each(
                        proyecto.miembros_proyecto,
                        function (index, miembro_equipo) {
                            respuesta_html += '<li class="list-inline-item">';
                            if (proyecto.lider.id != miembro_equipo.id) {
                                respuesta_html +=
                                    '<div class="image"><img src="' +
                                    $("#folder_imagenes_usuario").val() +
                                    "/" +
                                    miembro_equipo.foto +
                                    '" class="img-circle elevation-2" alt="' +
                                    miembro_equipo.nombres +
                                    " " +
                                    miembro_equipo.apellidos +
                                    '" title="' +
                                    miembro_equipo.nombres +
                                    " " +
                                    miembro_equipo.apellidos +
                                    '" style="max-height:50px;width:auto;"></div>';
                            }

                            respuesta_html += "</li>";
                        }
                    );

                    respuesta_html += "</ul>";
                    respuesta_html += "</td>";
                    respuesta_html +=
                        '<td class="text-center" style="white-space:nowrap;">';
                    var d1 = new Date(proyecto.fec_creacion);
                    var d2 = new Date();
                    var diff = d2.getTime() - d1.getTime();
                    var daydiff = diff / (1000 * 60 * 60 * 24);
                    respuesta_html += Math.round(daydiff) + " días";
                    respuesta_html += "</td>";
                    respuesta_html += '<td class="project_progress">';
                    respuesta_html += '    <div class="progress progress-sm">';
                    respuesta_html +=
                        '        <div class="progress-bar bg-green" role="progressbar" aria-volumenow="' +
                        proyecto.progreso +
                        '" aria-volumemin="0" aria-volumemax="100" style="width: ' +
                        proyecto.progreso +
                        '%"></div>';
                    respuesta_html += "    </div>";
                    respuesta_html +=
                        "    <small>" +
                        parseInt(proyecto.progreso).toFixed(2) +
                        " %</small>";
                    respuesta_html += "</td>";
                    respuesta_html +=
                        '<td class="project-state" style="white-space:nowrap;">';
                    respuesta_html += '    <span class="badge ';
                    switch (proyecto.estado) {
                        case "activo":
                            respuesta_html += "badge-success";
                            break;

                        case "extendido":
                            respuesta_html += "badge-danger";
                            break;

                        case "cerrado":
                            respuesta_html += "badge-secondary";
                            break;
                        default:
                            respuesta_html += "badge-info";
                            break;
                    }
                    respuesta_html += '">' + proyecto.estado + "</span>";
                    respuesta_html += "</td>";
                    respuesta_html += '<td class="project-actions text-right">';
                    respuesta_html += "    <a ";
                    respuesta_html +=
                        '        href="' +
                        $("#input_getdetalleproyecto")
                            .val()
                            .replace("detalle/1", "detalle/" + proyecto.id) +
                        '" class="btn btn-primary btn-sm pl-3 pr-3"';
                    respuesta_html += '        data_id="' + proyecto.id + '"';
                    respuesta_html += '        style="font-size: 0.8em;"';
                    respuesta_html += ">";
                    respuesta_html +=
                        '            <iclass="fas fa-folder mr-1"></i>Ver</a>';
                    respuesta_html += "</td>";
                    respuesta_html += "</tr>";
                });

                $("#tabla_proyectos").DataTable().destroy();
                $("#tbody_proyectos").html(respuesta_html);
                asignarDataTable_ajax(
                    "#tabla_proyectos",
                    5,
                    "portrait",
                    "Legal",
                    "listado de proyectos",
                    true
                );
            },
            error: function () {},
        });
        proyectosModal.show();
    });
    $(".boton_cerrar_modal").on("click", function () {
        proyectosModal.hide();
    });
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $(".ver_proyectos").on("click", function () {
        const empleado_id = $(this).attr("data_id");
        const data_url = $(this).attr("data_url");
        var data = {
            empleado_id: empleado_id,
        };
        llenarTablaProyectos(empleado_id, data_url, data);
    });
    $(".ver_tareas").on("click", function () {
        const empleado_id = $(this).attr("data_id");
        const data_url = $(this).attr("data_url");
        const titulo = $(this).attr("data_titulo");
        $("#tareasModalLabel").html(titulo);
        var data = {
            empleado_id: empleado_id,
        };
        llenarTablaTareas(empleado_id, data_url, data);
    });
});

function llenarTablaProyectos(empleado_id, data_url, data) {
    const proyectosModal = new bootstrap.Modal(
        document.getElementById("proyectosModal")
    );
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            var respuesta_html = "";
            $.each(respuesta.proyectos, function (index, proyecto) {
                respuesta_html += "<tr>";
                respuesta_html += '<td class="project-actions text-right">';
                respuesta_html += "    <a ";
                respuesta_html +=
                    '        href="' +
                    $("#input_getdetalleproyecto")
                        .val()
                        .replace("detalle/1", "detalle/" + proyecto.id) +
                    '" class="btn btn-primary btn-sm pl-3 pr-3"';
                respuesta_html += '        data_id="' + proyecto.id + '"';
                respuesta_html += '        style="font-size: 0.8em;"';
                respuesta_html += ">";
                respuesta_html +=
                    '            <iclass="fas fa-folder mr-1"></i>Ver</a>';
                respuesta_html += "</td>";
                respuesta_html +=
                    '<td style="white-space:nowrap;">' + proyecto.id + "</td>";
                respuesta_html += '<td style="white-space:nowrap;">';
                respuesta_html +=
                    '<a href="' +
                    $("#input_getdetalleproyecto")
                        .val()
                        .replace("detalle/1", "detalle/" + proyecto.id) +
                    '" class="btn btn-link" style="text-decoration: none;" >' +
                    proyecto.titulo +
                    "</a >";
                respuesta_html += "<br>";
                respuesta_html +=
                    '<small class="ml-4">Creado ' +
                    proyecto.fec_creacion +
                    "</small>";
                respuesta_html += "</td>";
                respuesta_html += '<td style="white-space:nowrap;">';

                respuesta_html +=
                    '<div class="image"><img src="' +
                    $("#folder_imagenes_usuario").val() +
                    "/" +
                    proyecto.lider.foto +
                    '" alt="' +
                    proyecto.lider.nombres +
                    " " +
                    proyecto.lider.apellidos +
                    '" title="' +
                    proyecto.lider.nombres +
                    " " +
                    proyecto.lider.apellidos +
                    '" class="img-circle elevation-2" alt="User Image" style="max-height:50px;width:auto;"></div>';

                //respuesta_html +='<img alt="Avatar" class="table-avatar" title="' + proyecto.lider.nombres + ' ' + proyecto.lider.apellidos + '" src="' + $('#folder_imagenes_usuario').val() + '/' + proyecto.lider.foto + '">';

                respuesta_html += "</td>";
                respuesta_html +=
                    '<td class="d-flex justify-content-around" style="white-space:nowrap;">';
                respuesta_html += '<ul class="list-inline">';
                $.each(
                    proyecto.miembros_proyecto,
                    function (index, miembro_equipo) {
                        respuesta_html += '<li class="list-inline-item">';
                        if (proyecto.lider.id != miembro_equipo.id) {
                            respuesta_html +=
                                '<div class="image"><img src="' +
                                $("#folder_imagenes_usuario").val() +
                                "/" +
                                miembro_equipo.foto +
                                '" class="img-circle elevation-2" alt="' +
                                miembro_equipo.nombres +
                                " " +
                                miembro_equipo.apellidos +
                                '" title="' +
                                miembro_equipo.nombres +
                                " " +
                                miembro_equipo.apellidos +
                                '" style="max-height:50px;width:auto;"></div>';
                        }

                        respuesta_html += "</li>";
                    }
                );

                respuesta_html += "</ul>";
                respuesta_html += "</td>";
                respuesta_html +=
                    '<td class="text-center" style="white-space:nowrap;">';
                var d1 = new Date(proyecto.fec_creacion);
                var d2 = new Date();
                var diff = d2.getTime() - d1.getTime();
                var daydiff = diff / (1000 * 60 * 60 * 24);
                respuesta_html += Math.round(daydiff) + " días";
                respuesta_html += "</td>";
                respuesta_html += '<td class="project_progress">';
                respuesta_html += '    <div class="progress progress-sm">';
                respuesta_html +=
                    '        <div class="progress-bar bg-green" role="progressbar" aria-volumenow="' +
                    proyecto.progreso +
                    '" aria-volumemin="0" aria-volumemax="100" style="width: ' +
                    proyecto.progreso +
                    '%"></div>';
                respuesta_html += "    </div>";
                respuesta_html +=
                    "    <small>" +
                    parseInt(proyecto.progreso).toFixed(2) +
                    " %</small>";
                respuesta_html += "</td>";
                respuesta_html +=
                    '<td class="project-state" style="white-space:nowrap;">';
                respuesta_html += '    <span class="badge ';
                switch (proyecto.estado) {
                    case "activo":
                        respuesta_html += "badge-success";
                        break;

                    case "extendido":
                        respuesta_html += "badge-danger";
                        break;

                    case "cerrado":
                        respuesta_html += "badge-secondary";
                        break;
                    default:
                        respuesta_html += "badge-info";
                        break;
                }
                respuesta_html += '">' + proyecto.estado + "</span>";
                respuesta_html += "</td>";
                respuesta_html += '<td class="project-actions text-right">';
                respuesta_html += "    <a ";
                respuesta_html +=
                    '        href="' +
                    $("#input_getdetalleproyecto")
                        .val()
                        .replace("detalle/1", "detalle/" + proyecto.id) +
                    '" class="btn btn-primary btn-sm pl-3 pr-3"';
                respuesta_html += '        data_id="' + proyecto.id + '"';
                respuesta_html += '        style="font-size: 0.8em;"';
                respuesta_html += ">";
                respuesta_html +=
                    '            <iclass="fas fa-folder mr-1"></i>Ver</a>';
                respuesta_html += "</td>";
                respuesta_html += "</tr>";
            });

            $("#tabla_proyectos").DataTable().destroy();
            $("#tbody_proyectos").html(respuesta_html);
            asignarDataTable_ajax(
                "#tabla_proyectos",
                5,
                "portrait",
                "Legal",
                "listado de proyectos",
                false
            );
        },
        error: function () {},
    });
    proyectosModal.show();
}

function llenarTablaTareas(empleado_id, data_url, data) {
    const tareasModal = new bootstrap.Modal(
        document.getElementById("tareasModal")
    );
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    var temp_ruta_tareas_gestion = $("#ruta_tareas_gestion").attr("data_url");
    temp_ruta_tareas_gestion = temp_ruta_tareas_gestion.substring(
        0,
        temp_ruta_tareas_gestion.length - 1
    );
    const ruta_tareas_gestion = temp_ruta_tareas_gestion;
    // -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*- -*-
    $.ajax({
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            var respuesta_html = "";
            $.each(respuesta.tareas, function (index, tarea) {
                respuesta_html += "<tr>";
                respuesta_html += "<td>";
                respuesta_html +=
                    '<a href="' +
                    ruta_tareas_gestion +
                    tarea.id +
                    '" class="btn-accion-tabla text-primary" title="Gestionar tarea"><i class="fas fa-eye mr-2"></i></a>';
                respuesta_html += "</td>";
                respuesta_html +=
                    '<td style="white-space:nowrap;">' + tarea.id + "</td>";
                respuesta_html +=
                    '<td style="white-space:nowrap;">' + tarea.titulo + "</td>";
                respuesta_html +=
                    '<td class="text-center" style="white-space:nowrap;">' +
                    tarea.fec_creacion +
                    "</td>";
                respuesta_html +=
                    '<td class="text-center" style="white-space:nowrap;">' +
                    tarea.fec_limite +
                    "</td>";
                var progreso = "<span>" + tarea.progreso + " %</span>";
                progreso +=
                    '<div class="progress"><div class="progress-bar" role="progressbar" style="width: ' +
                    tarea.progreso +
                    ' %;" aria-valuenow="' +
                    tarea.progreso +
                    '" aria-valuemin="0" aria-valuemax="100"></div></div>';
                respuesta_html +=
                    '<td class="text-center" style="white-space:nowrap;">' +
                    progreso +
                    "</td>";
                var hoy = new Date();
                var fechaFormulario = new Date(tarea.fec_limite);
                var bg_estado = "";
                if (hoy >= fechaFormulario) {
                    bg_estado = "danger";
                    title_estado = "Vencida";
                } else {
                    switch (tarea.estado) {
                        case "Activa":
                            bg_estado = "success";
                            title_estado = tarea.estado;
                            break;
                        case "Completa":
                            bg_estado = "success";
                            title_estado = tarea.estado;
                            break;
                        default:
                            bg_estado = "danger";
                            title_estado = tarea.estado;
                    }
                }
                respuesta_html +=
                    '<td class="text-center d-grid gap-2"><span class="bg-' +
                    bg_estado +
                    ' pl-3 pr-3 w-100" style="font-size: 0.85em;">' +
                    title_estado +
                    "</span></td>";
                respuesta_html += "</tr>";
            });

            $("#tabla_tareas").DataTable().destroy();
            $("#tbody_tareas").html(respuesta_html);
            asignarDataTable_ajax(
                "#tabla_tareas",
                5,
                "portrait",
                "Legal",
                "listado de tareas",
                false
            );
        },
        error: function () {},
    });
    tareasModal.show();
}
function cerrarModal() {
    const proyectosModal = new bootstrap.Modal(
        document.getElementById("proyectosModal")
    );
    proyectosModal.hide();
}

function llenarCalendario(data_url,data){
    var Calendar = FullCalendar.Calendar;
    var calendarEl = document.getElementById('calendar');
    //----------------------------------------------------------------------------------------------------
    $.ajax({
        async: false,
        url: data_url,
        type: "GET",
        data: data,
        success: function (respuesta) {
            var calendar =  new Calendar(calendarEl,{
                headerToolbar: {
                    left  : '',
                    center: 'title',
                },
                locale: 'es',
                themeSystem: 'bootstrap',
                events: respuesta.array_events_calendario,
                editable  : false,
                droppable : false,
            });
            calendar.render();
        },
        error: function () {},
    });

}
