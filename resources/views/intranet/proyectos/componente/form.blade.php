<div class="row">
    <input type="hidden" name="fec_creacion" value="{{ date('Y-m-d') }}">
    <input type="hidden" name="proyecto_id" value="{{ $proyecto->id }}">
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="fecha">Fecha</label>
        <span class="form-control form-control-sm text-center">{{ date('Y-m-d') }}</span>
    </div>
    <div class="col-12 col-md-3 form-group">
        <label class="requerido" for="empleado_id">Responsable del componente</label>
        <select class="form-control form-control-sm" name="empleado_id" id="empleado_id" aria-describedby="helpId"
            required>
            <option value="">Seleccione un responsable</option>
            @foreach ($empleados as $empleado)
                <option value="{{ $empleado->id }}">
                    {{ $empleado->nombres . ' ' . $empleado->apellidos . ' (' . $empleado->cargo->cargo . ')' }}
                    {{ $proyecto->empresa_id != $empleado->cargo->area->empresa_id ? $empleado->cargo->area->empresa->empresa : '' }}
                </option>
            @endforeach
        </select>
    </div>
    <div class="col-12 col-md-4 form-group">
        <label class="requerido" for="titulo">Titulo del componente</label>
        <input type="text" class="form-control form-control-sm" name="titulo" id="titulo" required>
    </div>
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="impacto">Impacto del componente</label>
        <select class="form-control form-control-sm" name="impacto" id="impacto" aria-describedby="helpId" required>
            <option value="">Selec. impacto</option>
            <option value="Alto">Alto</option>
            <option value="Medio-alto">Medio-alto</option>
            <option value="Medio">Medio</option>
            <option value="Medio-bajo">Medio-bajo</option>
            <option value="Bajo">Bajo</option>
        </select>
    </div>
    <div class="col-12  form-group">
        <label class="requerido" for="objetivo">Objetivo del componente</label>
        <textarea class="form-control form-control-sm" name="objetivo" id="objetivo" cols="30" rows="3"
            style="resize: none;" required></textarea>
    </div>
</div>
@if (intval($proyecto->presupuesto) > 0)
    <hr>
    <div class="row">
        <div class="col-12">
            <h6><strong>Componente Financiero</strong></h6>
        </div>
        <input type="hidden" id="presupuesto_proyecto" value="{{ intval($proyecto->presupuesto + $proyecto->adiciones->sum('adicion')) }}">
        <input type="hidden" id="sum_presupuesto_componentes" value="{{ intval($proyecto->componentes->sum('presupuesto')) }}">
        <input type="hidden" id="disponible_componentes" value="{{ ($proyecto->presupuesto + $proyecto->adiciones->sum('adicion')) - $proyecto->componentes->sum('presupuesto') }}">
        <div class="col-12 col-md-2 form-group">
            <label for="presupuesto">Presupuesto del Componente</label>
            <input type="number" min="0" max="{{ $proyecto->presupuesto - $proyecto->componentes->sum('presupuesto') }}"
                   value="0.00" step="0.01" class="form-control form-control-sm text-end" name="presupuesto" id="presupuesto" required>
        </div>
        <div class="col-12 col-md-3 ml-md-5">
            <span class="form-control form-control-sm">Presupuesto de total del proyecto: <strong class="float-end">${{ number_format($proyecto->presupuesto + $proyecto->adiciones->sum('adicion'), 2) }}</strong></span>
            <span class="form-control form-control-sm">Presupuesto de asignado del proyecto: <strong class="float-end">${{ number_format($proyecto->componentes->sum('presupuesto'), 2) }}</strong></span>
            <span class="form-control form-control-sm">Presupuesto de disponible del proyecto: <strong class="float-end">${{ number_format(($proyecto->presupuesto + $proyecto->adiciones->sum('adicion')) - $proyecto->componentes->sum('presupuesto'), 2) }}</strong></span>
        </div>
    </div>
    <hr>
@endif
