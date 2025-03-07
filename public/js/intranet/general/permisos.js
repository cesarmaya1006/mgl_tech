$(document).ready(function() {
    $('#nombre').on('change', function() {
        $('#slug').val($(this).val().toLowerCase().replace(/ /g, '-'));
    });
});