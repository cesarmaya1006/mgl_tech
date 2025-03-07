$(document).ready(function() {
    //----------------------------------------------------------------------
    $('#rol_id_form').on('change', function(event) {
        if ($(this).val() == 3 || $(this).val() == 4) {
            res_div_img_cc_propietario = '';
            res_div_img_cc_propietario += '<div class="row form-group d-flex justify-content-around">';
            res_div_img_cc_propietario += '<label class="col-12" for="img_cc_apoderado">Imagen C&eacute;dula</label>';
            res_div_img_cc_propietario += '<div class="col-12"><iframe id="imagen_cc_propietario" src="" width="100%" height="auto" frameborder="2"></iframe></div>';
            res_div_img_cc_propietario += '<input class="col-12 form-control" type="file" name="img_cc_apoderado" id="img_cc_apoderado" accept="application/pdf" onchange="document.getElementById(\'imagen_cc_propietario\').src = window.URL.createObjectURL(this.files[0])" required>';
            res_div_img_cc_propietario += '</div>';
            div_tarjeta_profesional = '';
            div_tarjeta_profesional += '<div class="col-11 col-md-3 col-lg-3 docu_abogados">';
            div_tarjeta_profesional += '</div>';
            div_tarjeta_profesional += '<div class="col-11 col-md-3 col-lg-3 docu_abogados">';
            div_tarjeta_profesional += '<label for="t_profesional" class="requerido">N° de Tarjeta Profesional</label>';
            div_tarjeta_profesional += '<input type="text" class="form-control" id="t_profesional" name="t_profesional" placeholder="N° de tarjeta profesional" required>';
            div_tarjeta_profesional += '</div>';
            div_tarjeta_profesional += '<div class="col-11 col-md-3 col-lg-3 docu_abogados">';
            div_tarjeta_profesional += '<div class="row form-group d-flex justify-content-around">';
            div_tarjeta_profesional += '<label class="col-12" for="img_t_profesional">Imagen Tarjeta Profesional</label>';
            div_tarjeta_profesional += '<div class="col-12"><iframe id="imagen_t_profesional" src="" width="100%" height="auto" frameborder="2"></iframe></div>';
            div_tarjeta_profesional += '<input class="col-12 form-control" type="file" name="img_t_profesional" id="img_t_profesional" accept="application/pdf" onchange="document.getElementById(\'imagen_t_profesional\').src = window.URL.createObjectURL(this.files[0])" required>';
            div_tarjeta_profesional += '</div>';
            div_tarjeta_profesional += '</div>';
            $('#div_img_cc_propietario').html(res_div_img_cc_propietario);
            $('#div_tarjeta_profesional').html(div_tarjeta_profesional);

            div_info_clientes = '';
            $('#div_info_clientes').html(div_info_clientes);

        } else if ($(this).val() == 5) {
            res_div_img_cc_propietario = '';
            div_tarjeta_profesional = '';
            $('#div_img_cc_propietario').html(res_div_img_cc_propietario);
            $('#div_tarjeta_profesional').html(div_tarjeta_profesional);

            div_info_clientes = '';
            div_info_clientes += '<div class="col-11 col-md-3 col-lg-3">';
            div_info_clientes += '<label for="direcc_client" class="requerido">Direcci&oacute;n</label>';
            div_info_clientes += '<input type="text" class="form-control" id="direcc_client" name="direcc_client" placeholder="Direccion" required>';
            div_info_clientes += '</div>';
            div_info_clientes += '<div class="col-11 col-md-3 col-lg-3">';
            div_info_clientes += '<label for="person_contac" class="requerido">Persona de Contacto</label>';
            div_info_clientes += '<input type="text" class="form-control" id="person_contac" name="person_contac" placeholder="Contacto" required>';
            div_info_clientes += '</div>';
            div_info_clientes += '<div class="col-11 col-md-3 col-lg-3">';
            div_info_clientes += '<label for="cargox_contac" class="requerido">Cargo Contacto</label>';
            div_info_clientes += '<input type="text" class="form-control" id="cargox_contac" name="cargox_contac" placeholder="Cargo contacto" required>';
            div_info_clientes += '</div>';
            $('#div_info_clientes').html(div_info_clientes);
        } else {
            res_div_img_cc_propietario = '';
            div_tarjeta_profesional = '';
            $('#div_img_cc_propietario').html(res_div_img_cc_propietario);
            $('#div_tarjeta_profesional').html(div_tarjeta_profesional);
            div_info_clientes = '';
            $('#div_info_clientes').html(div_info_clientes);
        }
    });
    //----------------------------------------------------------------------
});