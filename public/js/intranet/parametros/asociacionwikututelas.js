$(document).ready(function() {
	$('.check_sub_motivotutelas').change(function() {
		const val_check = this.checked ? 'sip' : 'nop';
		const url_t = $(this).attr('data_url');
		const wiku_argumento_id = $(this).attr('wiku_argumento_id');
		const submotivotutela_id = $(this).attr('submotivotutela_id');
		const tipo_wiku = $(this).attr('tipo_wiku');

        console.log(val_check);
        console.log(wiku_argumento_id);
        console.log(submotivotutela_id);
        console.log(tipo_wiku);

		var data = {
			wiku_argumento_id: wiku_argumento_id,
			submotivotutela_id: submotivotutela_id,
			tipo_wiku: tipo_wiku,
			val_check: val_check
		};

		$.ajax({
			url: url_t,
			type: 'GET',
			data: data,
			success: function(respuesta) {
                console.log(respuesta.mensaje);
				if (respuesta.mensaje == 'ok') {
					Sistema.notificaciones('Se asocio el submotivo correctamente', 'Sistema', 'success');
				} else {
					Sistema.notificaciones('Se elimino la asociación', 'Sistema', 'error');
				}
			},
			error: function() {}
		});
	});
	//==========================================================================
	$('.tabla-data').on('submit', '.form-eliminar', function() {
		event.preventDefault();
		const form = $(this);
		new swal({
			title: '¿Está seguro que desea eliminar el registro?',
			text: 'Esta acción desasociara el submotivo',
			icon: 'warning',
			buttons: {
				cancel: 'Cancelar',
				confirm: 'Aceptar'
			}
		}).then((value) => {
			if (value) {
				ajaxRequest(form);
			}
		});
	});

	function ajaxRequest(form) {
		$.ajax({
			url: form.attr('action'),
			type: 'POST',
			data: form.serialize(),
			success: function(respuesta) {
				if (respuesta.mensaje == 'ok') {
					Sistema.notificaciones('El registro fue eliminado correctamente', 'Sistema', 'success');
					window.location.reload();
				} else {
					Sistema.notificaciones(
						'El registro no pudo ser eliminado, hay recursos usandolo',
						'Sistema',
						'error'
					);
					window.location.reload();
				}
			},
			error: function() {}
		});
	}
});
