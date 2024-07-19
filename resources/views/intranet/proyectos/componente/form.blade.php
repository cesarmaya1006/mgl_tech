<div class="row">
    @if (isset($componente))
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="fec_creacion">Titulo del componente</label>
        <input type="date" class="form-control form-control-sm" name="fec_creacion" value="{{$componente->fec_creacion}}" id="fec_creacion" required>
    </div>
    @else
    <input type="hidden" name="fec_creacion" value="{{ date('Y-m-d') }}">
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="fecha">Fecha</label>
        <span class="form-control form-control-sm text-center">{{ date('Y-m-d') }}</span>
    </div>
    @endif
    <input type="hidden" name="proyecto_id" value="{{ $proyecto->id }}">

    <div class="col-12 col-md-3 form-group">
        <label class="requerido" for="empleado_id">Responsable del componente</label>
        <select class="form-control form-control-sm" name="empleado_id" id="empleado_id" aria-describedby="helpId"
            required>
            <option value="">Seleccione un responsable</option>
            @foreach ($empleados as $empleado)
                <option value="{{ $empleado->id }}" {{isset($componente) && $componente->empleado_id == $empleado->id?'selected':''}}>
                    {{ $empleado->nombres . ' ' . $empleado->apellidos . ' (' . $empleado->cargo->cargo . ')' }}
                    {{ $proyecto->empresa_id != $empleado->cargo->area->empresa_id ? $empleado->cargo->area->empresa->empresa : '' }}
                </option>
            @endforeach
        </select>
    </div>
    <div class="col-12 col-md-4 form-group">
        <label class="requerido" for="titulo">Titulo del componente</label>
        <input type="text" class="form-control form-control-sm" name="titulo" value="{{ old('titulo', $componente->titulo ?? '') }}" id="titulo" required>
    </div>
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="impacto">Impacto del componente</label>
        <select class="form-control form-control-sm" name="impacto" id="impacto" aria-describedby="helpId" required>
            <option value="">Selec. impacto</option>
            <option value="Alto" {{isset($componente) && $componente->impacto == 'Alto'?'selected':''}}>Alto</option>
            <option value="Medio-alto" {{isset($componente) && $componente->impacto == 'Medio-alto'?'selected':''}}>Medio-alto</option>
            <option value="Medio" {{isset($componente) && $componente->impacto == 'Medio'?'selected':''}}>Medio</option>
            <option value="Medio-bajo" {{isset($componente) && $componente->impacto == 'Medio-bajo'?'selected':''}}>Medio-bajo</option>
            <option value="Bajo" {{isset($componente) && $componente->impacto == 'Bajo'?'selected':''}}>Bajo</option>
        </select>
    </div>
    <div class="col-12  form-group">
        <label class="requerido" for="objetivo">Objetivo del componente</label>
        <textarea class="form-control form-control-sm" name="objetivo" id="objetivo" cols="30" rows="3"
            style="resize: none;" required>{{ old('objetivo', $componente->objetivo ?? '') }}</textarea>
    </div>
</div>
@if (intval($proyecto->presupuesto) > 0 && auth()->user()->hasPermissionTo('ver_presupuesto_proyecto'))
    <hr>
    @php
        $presupuesto_proyecto = intval($proyecto->presupuesto + $proyecto->adiciones->sum('adicion'));
        $sum_presupuesto_componentes = 0;
        foreach ($proyecto->componentes as $componente) {
            $sum_presupuesto_componentes += intval($componente->presupuesto) + intval($componente->adiciones->sum('adicion'));
        }
        $disponible_componentes = $presupuesto_proyecto - $sum_presupuesto_componentes;
    @endphp
    @if (isset($componente))
        <div class="row">
            <div class="col-12">
                <h6><strong>Componente Financiero</strong></h6>
                <input type="hidden" id="presupuesto_proyecto" value="{{ $presupuesto_proyecto}}">
                <input type="hidden" id="sum_presupuesto_componentes" value="{{ $sum_presupuesto_componentes}}">
                <input type="hidden" id="disponible_componentes" value="{{ ($disponible_componentes) }}">
                <input type="hidden" id="presupuesto_total_componente" value="{{$componente->presupuesto + $componente->adiciones->sum('adicion')}}">
            </div>
        </div>
        <div class="row d-flex justify-content-evenly">
            <div class="col-12 col-md-5">
                <div class="row">
                    <div class="col-12 col-md-8"><strong>Presupuesto inicial del Componente:</strong></div>
                    <div class="col-12 col-md-4 text-md-right">$ {{number_format(($componente->presupuesto + $componente->adiciones->sum('adicion')),2,',','.')}}</div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-8"><strong>Adiciones al presupuesto:</strong></div>
                    <div class="col-12 col-md-4 text-md-right">$ {{number_format(($componente->adiciones->sum('adicion')),2,',','.')}}</div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-8"><strong>Presupuesto Total del Componente:</strong></div>
                    <div class="col-12 col-md-4 text-md-right">$ {{number_format(($componente->presupuesto + $componente->adiciones->sum('adicion')),2,',','.')}}</div>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div class="row">
                    <div class="col-12 col-md-8"><strong>Presupuesto disponible para asignación:</strong></div>
                    <div class="col-12 col-md-4 text-md-right">$ {{number_format($disponible_componentes,2,',','.')}}</div>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-12 col-md-3 form-group">
                <label for="adicion" class="d-flex flex-row">Adición al presupuesto del Componente  <span class="text-primary ml-2">+</span> / <span class="text-danger">-</span></label>
                <input type="number" max="{{ $disponible_componentes }}" value="0.00" step="0.01" class="form-control form-control-sm text-end" name="adicion" id="adicion" required>
            </div>
            <div class="col-12 col-md-5  form-group">
                <label for="justificacion">Justificación de la adiccion</label>
                <textarea class="form-control form-control-sm" name="justificacion" id="justificacion" cols="30" rows="3" style="resize: none;" ></textarea>
            </div>
        </div>
    @else
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
            <div class="col-12 col-md-4 ml-md-5">
                <span class="form-control form-control-sm">Presupuesto de total del proyecto: <strong class="float-end" style="font-size: 0.75em;">${{ number_format($proyecto->presupuesto + $proyecto->adiciones->sum('adicion'), 2) }}</strong></span>
                <span class="form-control form-control-sm">Presupuesto de asignado del proyecto: <strong class="float-end" style="font-size: 0.75em;">${{ number_format($proyecto->componentes->sum('presupuesto'), 2) }}</strong></span>
                <span class="form-control form-control-sm">Presupuesto de disponible del proyecto: <strong class="float-end" style="font-size: 0.75em;">${{ number_format(($proyecto->presupuesto + $proyecto->adiciones->sum('adicion')) - $proyecto->componentes->sum('presupuesto'), 2) }}</strong></span>
            </div>
        </div>
    @endif
    <hr>
@endif
