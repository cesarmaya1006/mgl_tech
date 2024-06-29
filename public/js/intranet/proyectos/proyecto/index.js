$(document).ready(function () {
    //===================================================================================================
    const proyectosModal = new bootstrap.Modal(document.getElementById("proyectosModal"));
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

                $.each(respuesta.proyectos, function (index, proyecto) {
                    respuesta_html += '<tr>';
                    respuesta_html +='<td class="project-actions text-right">';
                    respuesta_html +='    <a ';
                    respuesta_html +='        href="' + $('#input_getdetalleproyecto').val().replace('detalle/1','detalle/'+proyecto.id)  + '" class="btn btn-primary btn-sm pl-3 pr-3"';
                    respuesta_html +='        data_id="' + proyecto.id + '"';
                    respuesta_html +='        style="font-size: 0.8em;"';
                    respuesta_html +=     '>';
                    respuesta_html +='            <iclass="fas fa-folder mr-1"></i>Ver</a>';
                    respuesta_html +='</td>';
                    respuesta_html +='<td style="white-space:nowrap;">' + proyecto.id + '</td>';
                    respuesta_html +='<td style="white-space:nowrap;">';
                    respuesta_html +='<a href="' + $('#input_getdetalleproyecto').val().replace('detalle/1','detalle/'+proyecto.id)  + '" class="btn btn-link" style="text-decoration: none;" >' + proyecto.titulo + '</a >';
                    respuesta_html +='<br>';
                    respuesta_html +='<small class="ml-4">Creado ' + proyecto.fec_creacion + '</small>';
                    respuesta_html +='</td>';
                    respuesta_html +='<td style="white-space:nowrap;">';

                    respuesta_html +='<div class="image"><img src="' + $('#folder_imagenes_usuario').val() + '/' + proyecto.lider.foto + '" class="img-circle elevation-2" alt="User Image" style="max-height:50px;width:auto;"></div>';

                    //respuesta_html +='<img alt="Avatar" class="table-avatar" title="' + proyecto.lider.nombres + ' ' + proyecto.lider.apellidos + '" src="' + $('#folder_imagenes_usuario').val() + '/' + proyecto.lider.foto + '">';

                    respuesta_html +='</td>';
                    respuesta_html +='<td class="d-flex justify-content-around" style="white-space:nowrap;">';
                    respuesta_html +='<ul class="list-inline">';
                    $.each(proyecto.miembros_proyecto, function (index, miembro_equipo){
                        respuesta_html +='<li class="list-inline-item">';
                        if (proyecto.lider.id != miembro_equipo.id ) {
                            respuesta_html +='<div class="image"><img src="' + $('#folder_imagenes_usuario').val() + '/' + miembro_equipo.foto + '" class="img-circle elevation-2" alt="' + miembro_equipo.nombres + ' ' + miembro_equipo.apellidos + '" title="' + miembro_equipo.nombres + ' ' + miembro_equipo.apellidos + '" style="max-height:50px;width:auto;"></div>';
                        }

                        respuesta_html +='</li>';
                    });

                    respuesta_html +='</ul>';
                    respuesta_html +='</td>';
                    respuesta_html +='<td class="text-center" style="white-space:nowrap;">';
                    var d1 = new Date(proyecto.fec_creacion);
                    var d2 = new Date();
                    var diff = d2.getTime() - d1.getTime();
                    var daydiff = diff / (1000 * 60 * 60 * 24);
                    respuesta_html += Math.round(daydiff)  + ' días';
                    respuesta_html +='</td>';
                    respuesta_html +='<td class="project_progress">';
                    respuesta_html +='    <div class="progress progress-sm">';
                    respuesta_html +='        <div class="progress-bar bg-green" role="progressbar" aria-volumenow="' + proyecto.progreso + '" aria-volumemin="0" aria-volumemax="100" style="width: ' + proyecto.progreso + '%"></div>';
                    respuesta_html +='    </div>';
                    respuesta_html +='    <small>' + parseInt(proyecto.progreso).toFixed(2) + ' %</small>';
                    respuesta_html +='</td>';
                    respuesta_html +='<td class="project-state" style="white-space:nowrap;">';
                    respuesta_html +='    <span class="badge ';
                    switch (proyecto.estado) {
                        case 'activo':
                            respuesta_html +='badge-success';
                            break;

                        case 'extendido':
                            respuesta_html +='badge-danger';
                            break;

                        case 'cerrado':
                            respuesta_html +='badge-secondary';
                            break;
                        default:
                            respuesta_html +='badge-info';
                            break;
                    }
                    respuesta_html +='">' + proyecto.estado + '</span>';
                    respuesta_html +='</td>';
                    respuesta_html +='<td class="project-actions text-right">';
                    respuesta_html +='    <a ';
                    respuesta_html +='        href="' + $('#input_getdetalleproyecto').val().replace('detalle/1','detalle/'+proyecto.id)  + '" class="btn btn-primary btn-sm pl-3 pr-3"';
                    respuesta_html +='        data_id="' + proyecto.id + '"';
                    respuesta_html +='        style="font-size: 0.8em;"';
                    respuesta_html +=     '>';
                    respuesta_html +='            <iclass="fas fa-folder mr-1"></i>Ver</a>';
                    respuesta_html +='</td>';
                    respuesta_html += "</tr>";
                });

                $('#tabla_proyectos').DataTable().destroy();
                $("#tbody_proyectos").html(respuesta_html);
                asignarDataTable_ajax('#tabla_proyectos',5,"portrait","Legal","listado de proyectos",true);

            },
            error: function () {},
        });
        proyectosModal.show();
    });
    $(".boton_cerrar_modal").on("click", function () {
        proyectosModal.toggle();
    });
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
});
