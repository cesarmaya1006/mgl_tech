$(document).ready(function() {
    $('#icono').on('change', function() {
        $('#mostrar-icono').removeClass().addClass($(this).val() + ' fa-3x');
    });
});