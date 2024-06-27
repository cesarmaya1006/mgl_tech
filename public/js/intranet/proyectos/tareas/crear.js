$(document).ready(function () {
    const hoy = new Date();
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $("input[type=radio][name=termina_radio]").change(function () {
        $('#cant_repeticiones').val('1');
        $('#fec_termino_repeticion').val(today);
        if (this.value == "repeticiones") {
            $('#caja_repeticiones1').removeClass('d-none');
            $('#caja_repeticiones2').addClass('d-none');

        } else {
            $('#caja_repeticiones2').removeClass('d-none');
            $('#caja_repeticiones1').addClass('d-none');
        }
    });

    $("#repeticion_tarea").change(function() {
        const valor = $(this).val();
        if(this.checked) {
            $('#caja_repeticiones').removeClass('d-none');
        }else{
            $('#caja_repeticiones').addClass('d-none');
        }
    });
});
