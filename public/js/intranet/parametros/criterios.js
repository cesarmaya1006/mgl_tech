$(document).ready(function() {
    //==========================================================================
    $('input[type=radio][name=tipo_criterio]').change(function() {
        if (this.value == 'no') {
            $('#requerido_si').addClass('d-none');
            $('#criterio_si').removeAttr('required');
            $('#criterio_si').val("");

            $('#requerido_no').removeClass('d-none');
            $('#criterio_no').prop('required', true);
            $('#criterio_no').val("");

        } else if (this.value == 'si') {
            $('#requerido_no').addClass('d-none');
            $('#criterio_no').removeAttr('required');
            $('#criterio_no').val("");

            $('#requerido_si').removeClass('d-none');
            $('#criterio_si').prop('required', true);
            $('#criterio_si').val("");
        } else {
            $('#requerido_si').removeClass('d-none');
            $('#criterio_si').prop('required', true);
            $('#criterio_si').val("");
            $('#requerido_no').removeClass('d-none');
            $('#criterio_no').prop('required', true);
            $('#criterio_no').val("");

        }
    });
    //==========================================================================


});
