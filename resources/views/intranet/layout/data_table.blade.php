<!-- dat Table -->
<script src="https://cdn.datatables.net/2.0.8/js/dataTables.js"></script>
<script src="https://cdn.datatables.net/2.0.8/js/dataTables.bootstrap5.js"></script>
<script src="https://cdn.datatables.net/buttons/3.0.2/js/dataTables.buttons.js"></script>
<script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.bootstrap5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.print.min.js"></script>
<script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.colVis.min.js"></script>


<script>
    function asignarDataTableEmpl(tabla_id, paginacion, orientation, pageSize) {
        $("#" + tabla_id).DataTable({
            scrollX: true,
            lengthMenu: [5, 10, 15, 25, 50, 75, 100],
            pageLength: paginacion,
            buttons: [
                "excel",
                {
                    extend: "pdfHtml5",
                    orientation: orientation,
                    pageSize: pageSize,
                },
            ],
            language: {
                sProcessing: "Procesando...",
                sLengthMenu: "Mostrar _MENU_ resultados",
                sZeroRecords: "No se encontraron resultados",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando resultados _START_-_END_ de  _TOTAL_",
                sInfoEmpty: "Mostrando resultados del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sSearch: "Buscar:",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
            },
        });

    }

    function asignarDataTable_ajax(tabla, paginacion, orientation, pageSize,titulo, buttons) {

        var buttons_t = '';
        if (buttons) {
            buttons_t = [{extend: 'excel',title:titulo},{extend: 'pdf',title: titulo}];
            layout_var = [{top2Start: {pageLength: paginacion}},{top2End: null},{topStart: {buttons: buttons_t}},{topEnd: 'search'}];
        }else{
            layout_var = [{topStart: {pageLength: paginacion}},{topEnd: 'search'}];
        }
        $(tabla).DataTable({
            scrollX: true,
            lengthMenu: [5, 10, 15, 25, 50, 75, 100],
            layout: {layout_var},
            language: {
                sProcessing: "Procesando...",
                sLengthMenu: "Mostrar _MENU_ resultados",
                sZeroRecords: "No se encontraron resultados",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando resultados _START_-_END_ de  _TOTAL_",
                sInfoEmpty: "Mostrando resultados del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sSearch: "Buscar:",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
            },
        });
    }
</script>
