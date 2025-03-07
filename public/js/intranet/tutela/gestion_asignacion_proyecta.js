window.addEventListener('DOMContentLoaded', function() {
	let idAuto = document.querySelector('.id_auto').value;
	let idTarea = document.querySelector('.id_tarea').value;
	//oculta o muestra  bloque Gestión Sentencia en primera Instancia
	if ($('#verificada').val() == '0') {
		$('.gest1eraparte2').addClass('d-none');
	} else {
		$('.gest1eraparte1').addClass('d-none');
	}

	// Carga de cargos en selector
	if (document.querySelector('.cargo')) {
		cargos = document.querySelector('.cargo');
		const url_t = cargos.getAttribute('data_url');
		$.ajax({
			url: url_t,
			type: 'GET',
			success: function(respuesta) {
				respuesta_html = '';
				respuesta_html += '<option value="">--Seleccione--</option>';
				$.each(respuesta, function(index, item) {
					respuesta_html += '<option value="' + item['id'] + '">' + item['cargo'] + '</option>';
				});
				$('.cargo').html(respuesta_html);
			},
			error: function(e) {
				console.log(e);
			}
		});
	}
	// Carga de funcionarios en selector
	$('.cargo').on('change', function(event) {
		const url_t = $(this).attr('data_url2');
		const id = $(this).val();
		var data = {
			id: id
		};
		$.ajax({
			url: url_t,
			type: 'GET',
			data: data,
			success: function(respuesta) {
				respuesta_html = '';
				respuesta_html += '<option value="">--Seleccione--</option>';
				$.each(respuesta, function(index, item) {
					respuesta_html +=
						'<option value="' + item['id'] + '">' + item['nombre1'] + ' ' + item['apellido1'] + '</option>';
				});
				$('.funcionario').html(respuesta_html);
			},
			error: function(e) {
				console.log(e);
			}
		});
	});

	// Guardar Historial tutela - tarea
	if (document.querySelector('.guardarHistorialTarea')) {
		let guardarHistorialTarea = document.querySelector('.guardarHistorialTarea');
		guardarHistorialTarea.addEventListener('click', function(e) {
			e.preventDefault();
			let url = e.target.getAttribute('data_url');
			let token = e.target.getAttribute('data_token');
			let mensajeHistorial = document.querySelector('.mensaje-historial-tarea').value;
			let idTarea = document.querySelector('.id_tarea').value;
			if (mensajeHistorial == '') {
				alert('Debe agregar un historial');
			} else {
				guardarHistorialTarea();
			}

			function guardarHistorialTarea() {
				let data = {
					mensajeHistorial,
					idAuto,
					idTarea
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		});
	}

	// Guardar Historial tutela - hecho
	if (document.querySelector('.guardarHistorialHecho')) {
		let HistorialHecho = document.querySelectorAll('.guardarHistorialHecho');
		HistorialHecho.forEach((btn) => btn.addEventListener('click', guardarHistorialHecho));

		function guardarHistorialHecho(btn) {
			btn.preventDefault();
			let contenedorHisotrial = btn.target.parentElement.parentElement;
			let url = btn.target.getAttribute('data_url');
			let token = btn.target.getAttribute('data_token');
			let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-hecho').value;
			let idHecho = contenedorHisotrial.querySelector('.id_hecho').value;
			if (mensajeHistorial == '') {
				alert('Debe agregar un historial');
			} else {
				guardarHistorialPeticion();
			}

			function guardarHistorialPeticion() {
				let data = {
					mensajeHistorial,
					idAuto,
					idHecho
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}

	// Guardar Historial tutela - respuesta hecho
	if (document.querySelector('.guardarHistorialRespuestaHecho')) {
		let HistorialHecho = document.querySelectorAll('.guardarHistorialRespuestaHecho');
		HistorialHecho.forEach((btn) => btn.addEventListener('click', guardarHistorialRespuestaHecho));

		function guardarHistorialRespuestaHecho(btn) {
			btn.preventDefault();
			let contenedorHisotrial = btn.target.parentElement.parentElement;
			let url = btn.target.getAttribute('data_url');
			let token = btn.target.getAttribute('data_token');
			let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-respuesta-hecho').value;
			let idRespuesta = contenedorHisotrial.querySelector('.id_respuesta_hecho').value;
			if (mensajeHistorial == '') {
				alert('Debe agregar un historial');
			} else {
				guardarHistorialPeticion();
			}

			function guardarHistorialPeticion() {
				let data = {
					historial: mensajeHistorial,
					respuesta_hecho_id: idRespuesta
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}

	// Guardar Historial tutela - pretension
	if (document.querySelector('.guardarHistorialPretension')) {
		let HistorialPretension = document.querySelectorAll('.guardarHistorialPretension');
		HistorialPretension.forEach((btn) => btn.addEventListener('click', guardarHistorialPretension));

		function guardarHistorialPretension(btn) {
			btn.preventDefault();
			let contenedorHisotrial = btn.target.parentElement.parentElement;
			let url = btn.target.getAttribute('data_url');
			let token = btn.target.getAttribute('data_token');
			let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-pretension').value;
			let idPretension = contenedorHisotrial.querySelector('.id_pretension').value;
			if (mensajeHistorial == '') {
				alert('Debe agregar un historial');
			} else {
				guardarHistorialPeticion();
			}

			function guardarHistorialPeticion() {
				let data = {
					mensajeHistorial,
					idAuto,
					idPretension
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}

	// Guardar Historial tutela - respuesta pretensión
	if (document.querySelector('.guardarHistorialRespuestaPretension')) {
		let HistorialPretension = document.querySelectorAll('.guardarHistorialRespuestaPretension');
		HistorialPretension.forEach((btn) => btn.addEventListener('click', guardarHistorialRespuestaPretension));

		function guardarHistorialRespuestaPretension(btn) {
			btn.preventDefault();
			let contenedorHisotrial = btn.target.parentElement.parentElement;
			let url = btn.target.getAttribute('data_url');
			let token = btn.target.getAttribute('data_token');
			let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-respuesta-pretension').value;
			let idRespuesta = contenedorHisotrial.querySelector('.id_respuesta_pretension').value;
			if (mensajeHistorial == '') {
				alert('Debe agregar un historial');
			} else {
				guardarHistorialPeticion();
			}

			function guardarHistorialPeticion() {
				let data = {
					historial: mensajeHistorial,
					respuesta_pretension_id: idRespuesta
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}

	// Guardar Historial tutela - respuesta resuelve
	if (document.querySelector('.guardarHistorialRespuestaResuelve')) {
		let HistorialResuelve = document.querySelectorAll('.guardarHistorialRespuestaResuelve');
		HistorialResuelve.forEach((btn) => btn.addEventListener('click', guardarHistorialRespuestaResuelve));

		function guardarHistorialRespuestaResuelve(btn) {
			btn.preventDefault();
			let contenedorHisotrial = btn.target.parentElement.parentElement;
			let url = btn.target.getAttribute('data_url');
			let token = btn.target.getAttribute('data_token');
			let mensajeHistorial = contenedorHisotrial.querySelector('.mensaje-historial-respuesta-resuelve').value;
			let idRespuesta = contenedorHisotrial.querySelector('.id_respuesta_resuelve').value;
			if (mensajeHistorial == '') {
				alert('Debe agregar un historial');
			} else {
				guardarHistorialResuelve();
			}

			function guardarHistorialResuelve() {
				let data = {
					historial: mensajeHistorial,
					respuesta_resuelve_id: idRespuesta
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}
    // Guardar asignar impugnacion a funcionario
	if (document.querySelector('.asignacion_impugnacion_guardar')) {
		let asignacionImpugnacion = document.querySelector('.asignacion_impugnacion_guardar');
		asignacionImpugnacion.addEventListener('click', function(e) {
			e.preventDefault();
			let padreContenedor = e.target.parentElement.parentElement;
			let url = e.target.getAttribute('data_url');
			let token = e.target.getAttribute('data_token');
			let funcionario = padreContenedor.querySelector('.funcionario').value;
			let cargo = padreContenedor.querySelector('.cargo').value;
			let impugnaciones = document.querySelectorAll('.select-impugnacion');
			let impugnacionesAsignar = [];
			impugnaciones.forEach((impugnacion) => {
				if (impugnacion.checked) {
					impugnacionesAsignar.push(impugnacion);
				}
			});
			if (impugnacionesAsignar.length == 0 || cargo == '' || funcionario == '') {
				alert('Debe dilegenciar todos los campos del formulario');
			} else {
				impugnacionesAsignar.forEach((impugnacion) => {
					guardarAsignacionImpugnacion(impugnacion.value);
				});
			}

			function guardarAsignacionImpugnacion(value) {
				let data = {
					impugnacion: value,
					funcionario,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		});
	}
    //===========================================================================

	// Guardar asignar hecho a funcionario
	if (document.querySelector('.asignacion_hecho_guardar')) {
		let asignacionHecho = document.querySelector('.asignacion_hecho_guardar');
		asignacionHecho.addEventListener('click', function(e) {
			e.preventDefault();
			let padreContenedor = e.target.parentElement.parentElement;
			let url = e.target.getAttribute('data_url');
			let token = e.target.getAttribute('data_token');
			let funcionario = padreContenedor.querySelector('.funcionario').value;
			let cargo = padreContenedor.querySelector('.cargo').value;
			let hechos = document.querySelectorAll('.select-hecho');
			let hechosAsignar = [];
			hechos.forEach((hecho) => {
				if (hecho.checked) {
					hechosAsignar.push(hecho);
				}
			});
			if (hechosAsignar.length == 0 || cargo == '' || funcionario == '') {
				alert('Debe dilegenciar todos los campos del formulario');
			} else {
				hechosAsignar.forEach((hecho) => {
					guardarAsignacionPeticion(hecho.value);
				});
			}

			function guardarAsignacionPeticion(value) {
				let data = {
					hecho: value,
					funcionario,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		});
	}

	// Guardar reasignar hecho a funcionario
	if (document.querySelectorAll('.reasignacion_hecho_guardar')) {
		let asignacionHechos = document.querySelectorAll('.reasignacion_hecho_guardar');
		asignacionHechos.forEach((asignacionHecho) => {
			asignacionHecho.addEventListener('click', reasignacionHechos);
		});

		function reasignacionHechos(e) {
			e.preventDefault();
			let padreContenedor = e.target.parentElement.parentElement.parentElement;
			let url = e.target.getAttribute('data_url');
			let url2 = e.target.getAttribute('data_url2');
			let token = e.target.getAttribute('data_token');
			let id_respuesta = padreContenedor.querySelector('.id_respuesta').value;
			let funcionario = padreContenedor.querySelector('.funcionario').value;
			let cargo = padreContenedor.querySelector('.cargo').value;
			let hechos = padreContenedor.querySelectorAll('.id_relacion_hecho');
			if (cargo == '' || funcionario == '') {
				alert('Debe dilegenciar todos los campos del formulario');
			} else {
				actualizarRespuesta();
				hechos.forEach((hecho) => {
					guardarAsignacionPeticion(hecho.value);
				});
			}

			function actualizarRespuesta() {
				let data = {
					id_respuesta,
					funcionario
				};
				$.ajax({
					url: url2,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						// console.log(respuesta)
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}

			function guardarAsignacionPeticion(value) {
				let data = {
					hecho: value,
					funcionario,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}

	// Guardar asignar pretension a funcionario
	if (document.querySelector('.asignacion_pretension_guardar')) {
		let asignacionPretension = document.querySelector('.asignacion_pretension_guardar');
		asignacionPretension.addEventListener('click', function(e) {
			e.preventDefault();
			let padreContenedor = e.target.parentElement.parentElement;
			let url = e.target.getAttribute('data_url');
			let token = e.target.getAttribute('data_token');
			let funcionario = padreContenedor.querySelector('.funcionario').value;
			let cargo = padreContenedor.querySelector('.cargo').value;
			let pretensiones = document.querySelectorAll('.select-pretension');
			let pretensionesAsignar = [];
			pretensiones.forEach((pretension) => {
				if (pretension.checked) {
					pretensionesAsignar.push(pretension);
				}
			});
			if (pretensionesAsignar.length == 0 || cargo == '' || funcionario == '') {
				alert('Debe dilegenciar todos los campos del formulario');
			} else {
				pretensionesAsignar.forEach((pretension) => {
					guardarAsignacionPeticion(pretension.value);
				});
			}

			function guardarAsignacionPeticion(value) {
				let data = {
					pretension: value,
					funcionario,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		});
	}

	// Guardar reasignar pretension a funcionario
	if (document.querySelectorAll('.reasignacion_pretension_guardar')) {
		let asignacionPretensiones = document.querySelectorAll('.reasignacion_pretension_guardar');
		asignacionPretensiones.forEach((asignacionPretension) => {
			asignacionPretension.addEventListener('click', reasignacionPretensiones);
		});

		function reasignacionPretensiones(e) {
			e.preventDefault();
			let padreContenedor = e.target.parentElement.parentElement.parentElement;
			let url = e.target.getAttribute('data_url');
			let url2 = e.target.getAttribute('data_url2');
			let token = e.target.getAttribute('data_token');
			let id_respuesta = padreContenedor.querySelector('.id_respuesta').value;
			let funcionario = padreContenedor.querySelector('.funcionario').value;
			let cargo = padreContenedor.querySelector('.cargo').value;
			let pretensiones = padreContenedor.querySelectorAll('.id_relacion_pretension');
			if (cargo == '' || funcionario == '') {
				alert('Debe dilegenciar todos los campos del formulario');
			} else {
				actualizarRespuesta();
				pretensiones.forEach((pretension) => {
					guardarAsignacionPeticion(pretension.value);
				});
			}

			function actualizarRespuesta() {
				let data = {
					id_respuesta,
					funcionario
				};
				$.ajax({
					url: url2,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						// console.log(respuesta)
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}

			function guardarAsignacionPeticion(value) {
				let data = {
					pretension: value,
					funcionario,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}

	// Guardar reasignar resuelve a funcionario
	if (document.querySelectorAll('.reasignacion_resuelve_guardar')) {
		let asignacionResuelves = document.querySelectorAll('.reasignacion_resuelve_guardar');
		asignacionResuelves.forEach((asignacionPretension) => {
			asignacionPretension.addEventListener('click', reasignacionResuelves);
		});

		function reasignacionResuelves(e) {
			e.preventDefault();
			let padreContenedor = e.target.parentElement.parentElement.parentElement;
			let url = e.target.getAttribute('data_url');
			let url2 = e.target.getAttribute('data_url2');
			let token = e.target.getAttribute('data_token');
			let id_respuesta = padreContenedor.querySelector('.id_respuesta').value;
			let funcionario = padreContenedor.querySelector('.funcionario').value;
			let cargo = padreContenedor.querySelector('.cargo').value;
			let resuelves = padreContenedor.querySelectorAll('.id_relacion_resuelve');
			if (cargo == '' || funcionario == '') {
				alert('Debe dilegenciar todos los campos del formulario');
			} else {
				actualizarRespuesta();
				resuelves.forEach((resuelve) => {
					guardarAsignacionPeticion(resuelve.value);
				});
			}

			function actualizarRespuesta() {
				let data = {
					id_respuesta,
					funcionario
				};
				$.ajax({
					url: url2,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						// console.log(respuesta)
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}

			function guardarAsignacionPeticion(value) {
				let data = {
					resuelve: value,
					funcionario,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		}
	}

	// Guardar prioridad tutela
	if (document.querySelector('.prioridad_guardar')) {
		let prioridadGuardar = document.querySelector('.prioridad_guardar');
		prioridadGuardar.addEventListener('click', function(e) {
			e.preventDefault();
			let url = e.target.getAttribute('data_url');
			let token = e.target.getAttribute('data_token');
			let prioridad = document.querySelector('.prioridad').value;
			if (prioridad == '') {
				alert('Debe dilegenciar todos los campos del formulario');
			} else {
				guardarPrioridad();
			}

			function guardarPrioridad() {
				let data = {
					prioridad,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			}
		});
	}

	// Guardar respuesta tutela
	if (document.querySelector('.btn-tutela')) {
		let btnRespuesta = document.querySelector('.btn-tutela');
		btnRespuesta.addEventListener('click', function(e) {
			e.preventDefault;
			let contenedorPadre = btnRespuesta.parentElement.parentElement.parentElement;
			let url2 = e.target.getAttribute('data_url2');
			let url3 = e.target.getAttribute('data_url3');
			let token = e.target.getAttribute('data_token');
			let mensajeHistorial = contenedorPadre.querySelector('.mensaje-historial-tarea').value;
			if (mensajeHistorial != '' && idAuto != '') {
				let data = {
					idTarea,
					mensajeHistorial,
					idAuto
				};
				$.ajax({
					url: url2,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						// console.log(respuesta)
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
				$.ajax({
					url: url3,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						// console.log(respuesta)
						window.location = '/admin/gestion';
					},
					error: function(error) {
						console.log(error.responseJSON);
					}
				});
			} else {
				alert('Debe diligenciar todos los campos del formulario');
			}
		});
	}

	// Guardar estado hechos
	if (document.querySelector('.btn-estado-hecho')) {
		let btnEstados = document.querySelectorAll('.btn-estado-hecho');
		btnEstados.forEach((btn) => btn.addEventListener('click', guardarEstado));

		function guardarEstado(btn) {
			btn.preventDefault();
			let btnE = btn.target;
			if (btnE.tagName === 'I') {
				padreEstado =
					btnE.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
						.parentElement;
				btnE = btnE.parentElement.parentElement;
			} else {
				padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement;
			}
			let id_respuesta = padreEstado.querySelector('.id_respuesta').value;
			let url = btnE.getAttribute('data_url');
			let token = btnE.getAttribute('data_token');
			let estado = padreEstado.querySelector('.estadoHecho').value;
			let respuesta = padreEstado.querySelector('.respuesta').value;
			let data = {
				estado,
				id_respuesta
			};
			if (estado == 11 && respuesta == '') {
				alert('Para guardar el 100% debe agregar una respuesta antes');
			} else {
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error);
					}
				});
			}
		}
	}

	// Guardar estado pretensiones
	if (document.querySelector('.btn-estado-pretension')) {
		let btnEstados = document.querySelectorAll('.btn-estado-pretension');
		btnEstados.forEach((btn) => btn.addEventListener('click', guardarEstado));

		function guardarEstado(btn) {
			btn.preventDefault();
			let btnE = btn.target;
			if (btnE.tagName === 'I') {
				padreEstado =
					btnE.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
						.parentElement;
				btnE = btnE.parentElement.parentElement;
			} else {
				padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement;
			}
			let id_respuesta = padreEstado.querySelector('.id_respuesta').value;
			let url = btnE.getAttribute('data_url');
			let token = btnE.getAttribute('data_token');
			let estado = padreEstado.querySelector('.estadoPretension').value;
			let respuesta = padreEstado.querySelector('.respuesta').value;
			let data = {
				estado,
				id_respuesta
			};
			if (estado == 11 && respuesta == '') {
				alert('Para guardar el 100% debe agregar una respuesta antes');
			} else {
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error);
					}
				});
			}
		}
	}

	// Guardar estado resuelve
	if (document.querySelector('.btn-estado-resuelve')) {
		let btnEstados = document.querySelectorAll('.btn-estado-resuelve');
		btnEstados.forEach((btn) => btn.addEventListener('click', guardarEstado));

		function guardarEstado(btn) {
			btn.preventDefault();
			let btnE = btn.target;
			if (btnE.tagName === 'I') {
				padreEstado =
					btnE.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
						.parentElement;
				btnE = btnE.parentElement.parentElement;
			} else {
				padreEstado = btnE.parentElement.parentElement.parentElement.parentElement.parentElement;
			}
			let id_respuesta = padreEstado.querySelector('.id_respuesta').value;
			let url = btnE.getAttribute('data_url');
			let token = btnE.getAttribute('data_token');
			let estado = padreEstado.querySelector('.estadoResuelve').value;
			let respuesta = padreEstado.querySelector('.respuesta').value;
			let data = {
				estado,
				id_respuesta
			};
			if (estado == 11 && respuesta == '') {
				alert('Para guardar el 100% debe agregar una respuesta antes');
			} else {
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error);
					}
				});
			}
		}
	}

	// Eliminar respuesta hecho
	if (document.querySelectorAll('.eliminarHecho')) {
		let btnsEliminarHecho = document.querySelectorAll('.eliminarHecho');
		btnsEliminarHecho.forEach((btn) => {
			btn.addEventListener('click', eliminarAsigancionHecho);
		});

		function eliminarAsigancionHecho(btn) {
			let btnEH = btn.target;
			if (btnEH.tagName === 'I') {
				btnEH = btnEH.parentNode;
			}
			let contenedorPadre = btnEH.parentElement;
			let hecho_id = contenedorPadre.querySelector('.id_relacion_hecho').value;
			let url = btnEH.getAttribute('data_url');
			let token = btnEH.getAttribute('data_token');
			let data = {
				hecho_id
			};

			$.ajax({
				url: url,
				type: 'POST',
				headers: { 'X-CSRF-TOKEN': token },
				data: data,
				success: function(respuesta) {
					location.reload();
				},
				error: function(error) {
					console.log(error);
				}
			});
		}
	}

	// Eliminar respuesta Pretesion
	if (document.querySelectorAll('.eliminarPretension')) {
		let btnsEliminarPretension = document.querySelectorAll('.eliminarPretension');
		btnsEliminarPretension.forEach((btn) => {
			btn.addEventListener('click', eliminarAsigancionPretension);
		});

		function eliminarAsigancionPretension(btn) {
			let btnEH = btn.target;
			if (btnEH.tagName === 'I') {
				btnEH = btnEH.parentNode;
			}
			let contenedorPadre = btnEH.parentElement;
			let pretension_id = contenedorPadre.querySelector('.id_relacion_pretension').value;
			let url = btnEH.getAttribute('data_url');
			let token = btnEH.getAttribute('data_token');
			let data = {
				pretension_id
			};

			$.ajax({
				url: url,
				type: 'POST',
				headers: { 'X-CSRF-TOKEN': token },
				data: data,
				success: function(respuesta) {
					location.reload();
				},
				error: function(error) {
					console.log(error);
				}
			});
		}
	}

	// Eliminar respuesta Resuelve
	if (document.querySelectorAll('.eliminarResuelve')) {
		let btnsEliminarResuelve = document.querySelectorAll('.eliminarResuelve');
		btnsEliminarResuelve.forEach((btn) => {
			btn.addEventListener('click', eliminarAsigancionResuelve);
		});

		function eliminarAsigancionResuelve(btn) {
			let btnEH = btn.target;
			if (btnEH.tagName === 'I') {
				btnEH = btnEH.parentNode;
			}
			let contenedorPadre = btnEH.parentElement;
			let resuelve_id = contenedorPadre.querySelector('.id_relacion_resuelve').value;
			let url = btnEH.getAttribute('data_url');
			let token = btnEH.getAttribute('data_token');
			let data = {
				resuelve_id
			};
			$.ajax({
				url: url,
				type: 'POST',
				headers: { 'X-CSRF-TOKEN': token },
				data: data,
				success: function(respuesta) {
					location.reload();
				},
				error: function(error) {
					console.log(error);
				}
			});
		}
	}

	// Guardar resuelve tutela
	if (document.querySelector('.btn-tutela-resuelve')) {
		let btnResuelve = document.querySelector('.btn-tutela-resuelve');
		btnResuelve.addEventListener('click', function(e) {
			e.preventDefault;
			let contenedorPadre = btnResuelve.parentElement.parentElement.parentElement;
			let url = e.target.getAttribute('data_url');
			let token = e.target.getAttribute('data_token');
			let mensajeResuelve = contenedorPadre.querySelector('.mensaje-resuelve').value;
			if (mensajeResuelve != '' && idAuto != '') {
				let data = {
					mensajeResuelve,
					idAuto
				};
				$.ajax({
					url: url,
					type: 'POST',
					headers: { 'X-CSRF-TOKEN': token },
					data: data,
					success: function(respuesta) {
						location.reload();
					},
					error: function(error) {
						console.log(error);
					}
				});
			} else {
				alert('Debe diligenciar el campo del formulario');
			}
		});
	}

	// //Eliminar resuelve
	if (document.querySelectorAll('.eliminarResuelveTutela')) {
		let btnEliminaResuelves = document.querySelectorAll('.eliminarResuelveTutela');
		btnEliminaResuelves.forEach((btnEliminar) => {
			btnEliminar.addEventListener('click', function(btn) {
				btn.preventDefault;
				let btnElim = btn.target;
				if (btnElim.tagName === 'I') {
					btnElim = btnElim.parentNode;
				}
				let url = btnElim.getAttribute('data_url');
				let token = btnElim.getAttribute('data_token');
				let value = btnElim.value;
				let data = {
					value
				};
				swal({
					title: '¿Desea eliminar recurso?',
					icon: 'warning',
					buttons: [ 'No', 'Si' ],
					dangerMode: true
				}).then((value) => {
					if (value) {
						$.ajax({
							url: url,
							type: 'POST',
							headers: { 'X-CSRF-TOKEN': token },
							data: data,
							success: function(respuesta) {
								setTimeout(function() {
									location.reload();
								}, 3000);
							},
							error: function(error) {}
						});
					}
				});
			});
		});
	}

	// //Editar resuelve
	if (document.querySelectorAll('.editarResuelveTutela')) {
		let resuelves = document.querySelectorAll('.editarResuelveTutela');
		resuelves.forEach((resuelve) => {
			resuelve.addEventListener('click', editarResuelveTutela);
		});

		function editarResuelveTutela(resuelve) {
			let resuelveBtn = resuelve.target;
			if (resuelveBtn.classList.contains('editarResuelveTutela-i')) {
				resuelveBtn = resuelve.target.parentNode;
			} else {
				resuelveBtn = resuelve.target;
			}
			let tdResuelve = resuelveBtn.parentElement.parentElement.parentElement;
			let contenidoAnteriorResuelve = tdResuelve.querySelector('.contenido-resuelve input').value;
			let valueResuelve = tdResuelve.querySelector('.editarResuelveTutela').value;
			let modalResuelveEditar = document.querySelector('.bd-resuelve');
			let textareaResuelveEditar = modalResuelveEditar.querySelector('.note-editable');
			let btnGuardarResuelve = modalResuelveEditar.querySelector('.editarResuelveTutelaGuardar');
			textareaResuelveEditar.innerHTML = contenidoAnteriorResuelve;
			btnGuardarResuelve.value = valueResuelve;
		}
	}

	//Guardar Editar resuelve
	if (document.querySelector('.editarResuelveTutelaGuardar')) {
		let btnResuelve = document.querySelector('.editarResuelveTutelaGuardar');
		btnResuelve.addEventListener('click', function(resuelve) {
			resuelve.preventDefault();
			let url = resuelve.target.getAttribute('data_url');
			let token = resuelve.target.getAttribute('data_token');
			let contenidoResuelve = resuelve.target.parentElement.parentElement;
			let resuelveNuevo = contenidoResuelve.querySelector('.mensaje-resuelve-editar').value;
			let value = contenidoResuelve.querySelector('.editarResuelveTutelaGuardar').value;
			let data = {
				value,
				resuelveNuevo
			};
			$.ajax({
				url: url,
				type: 'POST',
				headers: { 'X-CSRF-TOKEN': token },
				data: data,
				success: function(respuesta) {
					location.reload();
				},
				error: function(error) {
					console.log(error);
				}
			});
		});
	}

	//Editar orden resuelve
	if (document.querySelector('.btn-ordenar')) {
		let btnOrdenar = document.querySelector('.btn-ordenar');
		btnOrdenar.addEventListener('click', function(btn) {
			btn.preventDefault();
			let orden = document.querySelector('.orden-resuelve');
			let ordenEditar = document.querySelector('.editar-orden-resuelve');
			let btnGuardar = document.querySelector('.btn-ordenar-guardar');
			if (orden.classList.contains('d-none')) {
				orden.classList.remove('d-none');
				ordenEditar.classList.add('d-none');
				btnGuardar.classList.add('d-none');
			} else {
				btnGuardar.classList.remove('d-none');
				ordenEditar.classList.remove('d-none');
				orden.classList.add('d-none');
			}
		});
	}

	//Guardar orden resuelve
	if (document.querySelector('.btn-ordenar-guardar')) {
		let btnGuardarOrden = document.querySelector('.btn-ordenar-guardar');
		btnGuardarOrden.addEventListener('click', function(btn) {
			btn.preventDefault();
			let url = btn.target.getAttribute('data_url');
			let token = btn.target.getAttribute('data_token');
			let ordenEditar = document.querySelector('.editar-orden-resuelve');
			let trs = ordenEditar.querySelectorAll('tr');
			let dataOrden = [];
			let validador = true;
			trs.forEach((tr, key) => {
				dataOrden.push(tr.querySelector('.select-orden').value);
			});
			dataOrden.forEach((orden, key) => {
				let index = key + 1;
				if (index != dataOrden.find((item) => item == index)) {
					alert('¡Error! El consecutivo de orden no puede estar duplicado.');
					validador = false;
				}
			});
			if (validador) {
				trs.forEach((tr) => {
					let data = {
						orden: tr.querySelector('.select-orden').value,
						id: tr.querySelector('.editarResuelveTutela').value
					};
					$.ajax({
						url: url,
						type: 'POST',
						headers: { 'X-CSRF-TOKEN': token },
						data: data,
						success: function(respuesta) {
							// console.log(respuesta)
						},
						error: function(error) {
							console.log(error);
						}
					});
				});
			}
			location.reload();
		});
	}

	//==========================================================================
	$(document).ready(function() {
		$('.mensaje-resuelve').summernote({
			tabsize: 2,
			height: 120,
			toolbar: [
				[ 'font', [ 'bold', 'underline', 'italic', 'clear' ] ],
				[ 'color', [ 'color' ] ],
				[ 'para', [ 'ul', 'ol', 'paragraph' ] ],
				[ 'table', [ 'table' ] ],
				[ 'insert', [ 'link', 'picture' ] ]
			]
		});
	});
	//==========================================================================
	$(document).ready(function() {
		$('.mensaje-resuelve-editar').summernote({
			tabsize: 2,
			height: 320,
			toolbar: [
				[ 'font', [ 'bold', 'underline', 'italic', 'clear' ] ],
				[ 'color', [ 'color' ] ],
				[ 'para', [ 'ul', 'ol', 'paragraph' ] ],
				[ 'table', [ 'table' ] ],
				[ 'insert', [ 'link', 'picture' ] ]
			]
		});
	});

	// Funcion check multiple hechos
	if (document.querySelectorAll('.check-todos-hechos')) {
		let checkTodos = document.querySelectorAll('.check-todos-hechos');
		checkTodos.forEach((check) => {
			check.addEventListener('input', seleccionMultiple);
		});

		function seleccionMultiple(btn) {
			let check = btn.target;
			let contenedorPadre = check.parentElement.parentElement;
			let selectores = contenedorPadre.querySelectorAll('.select-hecho');
			if (check.checked) {
				selectores.forEach((selector) => {
					if (!selector.disabled) {
						selector.checked = true;
					}
				});
			} else {
				selectores.forEach((selector) => {
					if (!selector.disabled) {
						selector.checked = false;
					}
				});
			}
		}
	}

	// Funcion check multiple pretensiones
	if (document.querySelectorAll('.check-todos-pretensiones')) {
		let checkTodos = document.querySelectorAll('.check-todos-pretensiones');
		checkTodos.forEach((check) => {
			check.addEventListener('input', seleccionMultiple);
		});

		function seleccionMultiple(btn) {
			let check = btn.target;
			let contenedorPadre = check.parentElement.parentElement;
			let selectores = contenedorPadre.querySelectorAll('.select-pretension');
			if (check.checked) {
				selectores.forEach((selector) => {
					if (!selector.disabled) {
						selector.checked = true;
					}
				});
			} else {
				selectores.forEach((selector) => {
					if (!selector.disabled) {
						selector.checked = false;
					}
				});
			}
		}
	}

	// Cambio de sentido resuelve primera instancia

	$('.sentidoResuelve').on('change', function() {
		const url_t = $(this).attr('data_url');
		const sentido = $(this).val();
		const id = $(this).attr('id_resuelve');
		const token_ = $('input[name=_token]').val();
		if (sentido == 'Favorable') {
			$(this).parent().parent().parent().find('.crearimpugnacion').prop('disabled', true);
			$(this).parent().parent().parent().find('.crearimpugnacion').prop('checked', false);
		} else {
			$(this).parent().parent().parent().find('input').prop('disabled', false);
			$(this).parent().parent().parent().find('.crearimpugnacion').prop('checked', false);
		}
		var data = {
			sentido: sentido,
			id: id
		};
		$.ajax({
			url: url_t,
			type: 'POST',
			headers: { 'X-CSRF-TOKEN': token_ },
			data: data,
			success: function(respuesta) {
				respuesta_html = llenarTablaImpugnacionesAjax(respuesta.tutela);
				$('#bodyTablaResuelves').html(respuesta_html);
				respuesta_html = llenarCheckBoxImpgnaciones(respuesta.tutela);
				$('#cajaChecksAsignar').html(respuesta_html);

				if (respuesta.mensaje == 'ok') {
					Sistema.notificaciones('El sentido fue cambiado de manera correcta', 'Sistema', 'success');
				} else {
					Sistema.notificaciones('El sentido no fue cambiado', 'Sistema', 'error');
				}
			},
			error: function() {}
		});
	});

	$('.crearimpugnacion').change(function() {
		const url_t = $(this).attr('data_url');
		const token_ = $('input[name=_token]').val();
		var check = 0;
		if (this.checked) {
			var check = 1;
		}
		var data = {
			check: check
		};
		$.ajax({
			url: url_t,
			type: 'POST',
			headers: { 'X-CSRF-TOKEN': token_ },
			data: data,
			success: function(respuesta) {
				if (respuesta.mensaje == 'ok') {
					Sistema.notificaciones(respuesta.data, 'Sistema', 'success');
					respuesta_html = llenarTablaImpugnacionesAjax(respuesta.tutela);
					$('#bodyTablaResuelves').html(respuesta_html);
					respuesta_html = llenarCheckBoxImpgnaciones(respuesta.tutela);
					$('#cajaChecksAsignar').html(respuesta_html);
				} else {
					Sistema.notificaciones('No fue posible hacer el proceso', 'Sistema', 'error');
				}
			},
			error: function() {}
		});
	});
	$('#guardarCambiosSentidos').on('click', function(e) {
		const url_t = $(this).attr('data_url');
		const token_ = $('input[name=_token]').val();
		const verificada = $('#verificada').val();
		Swal.fire({
			title: '¿Esta seguro de verificar la sentencia en primera instancia?',
			text:
				'Este proceso solo se puede hacer una vez, despues de verificar los sentidos de los resuelves no se puede volver a cambiar',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, verificar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				guardarCambiosSentidos(url_t, token_, verificada);
			}
		});

		//
	});
});

function guardarCambiosSentidos(url_t, token_, verificada) {
	var data = {
		verificada: verificada
	};
	$.ajax({
		url: url_t,
		type: 'POST',
		headers: { 'X-CSRF-TOKEN': token_ },
		data: data,
		success: function(respuesta) {
			if (respuesta.mensaje == 'ok') {
				Sistema.notificaciones('Sentencia en primera instancia verificada', 'Sistema', 'success');
				$('.gest1eraparte2').removeClass('d-none');
				$('.gest1eraparte1').addClass('d-none');
			} else {
				Sistema.notificaciones('No fue posible hacer el proceso', 'Sistema', 'error');
			}
		},
		error: function() {}
	});
}

function llenarTablaImpugnacionesAjax(tutela) {
	respuesta_html = '';
	$.each(tutela, function(index, tutela) {
		$.each(tutela.primera_instancia.impugnacionesinternas, function(index, impugnacion) {
			respuesta_html += '<tr>';
			if (impugnacion.empleado) {
				respuesta_html += '<td class="text-success font-weight-bold">' + impugnacion['consecutivo'] + '</td>';
				respuesta_html +=
					'<td class="text-success font-weight-bold">' +
					impugnacion.empleado['nombre1'] +
					' ' +
					impugnacion.empleado['apellido1'] +
					'</td>';
				respuesta_html +=
					'<td class="text-success font-weight-bold">' + impugnacion.estado['estado'] + '%</td>';
			} else {
				respuesta_html += '<td class="text-success font-weight-bold">' + impugnacion['consecutivo'] + '</td>';
				respuesta_html += '<td class="text-success font-weight-bold">Sin asignar</td>';
				respuesta_html +=
					'<td class="text-success font-weight-bold">' + impugnacion.estado['estado'] + '%</td>';
			}
			respuesta_html += '</tr>';
		});
	});
	return respuesta_html;
}
function llenarCheckBoxImpgnaciones(tutela) {
	respuesta_html = '';
	$.each(tutela, function(index, tutela) {
		$.each(tutela.primera_instancia.impugnacionesinternas, function(index, impugnacion) {
			respuesta_html += '<div class="form-check form-check-inline checksAsignar">';
			if (impugnacion.estado['estado'] == 0) {
				respuesta_html +=
					'<input type="checkbox" class="form-check-input select-impugnacion" value="' + impugnacion['id'] + '">';
				respuesta_html +=
					'<label class="form-check-label"><strong>#' + impugnacion['consecutivo'] + '</strong></label>';
			} else {
				respuesta_html += '<input type="checkbox" class="form-check-input select-impugnacion" disabled>';
				respuesta_html +=
					'<label class="form-check-label"><strong>#' + $impugnacion['consecutivo'] + '</strong></label>';
			}
			respuesta_html += '</div>';
		});
	});
	return respuesta_html;
}
