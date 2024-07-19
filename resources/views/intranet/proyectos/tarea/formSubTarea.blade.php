<div class="row">
    <input type="hidden" name="tarea_id" value="{{ $tarea->id }}">
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="fecha">Fecha inicio</label>
        <input class="form-control form-control-sm" type="date" name="fec_creacion" id="fec_creacion" min="{{$tarea->fec_creacion}}" value="{{ date('Y-m-d') }}" required>
    </div>
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="fec_limite">Fecha límite</label>
        <input type="date" class="form-control form-control-sm" name="fec_limite" min="{{ date("Y-m-d",strtotime($tarea->fec_creacion."+ 1 days")) }}" value="{{ date("Y-m-d",strtotime(date('Y-m-d')."+ 1 days")) }}" id="fec_limite">
    </div>
    <div class="col-12 col-md-4 form-group">
        <label class="requerido" for="empleado_id">Responsable de la sub-tarea</label>
        <select class="form-control form-control-sm" name="empleado_id" id="empleado_id" aria-describedby="helpId" required>
            <option value="">Seleccione un responsable</option>
            @foreach ($empleados as $empleado)
                <option value="{{ $empleado->id }}">
                    {{ $empleado->nombres . ' ' . $empleado->apellidos . ' -  (' . $empleado->cargo->cargo . ')' }}
                    {{ $tarea->componente->proyecto->empresa_id != $empleado->cargo->area->empresa_id ? ' -->  Empresa: ' . $empleado->cargo->area->empresa->empresa : '' }}
                </option>
            @endforeach
        </select>
    </div>
    <div class="col-12 col-md-4 form-group">
        <label class="requerido" for="titulo">Titulo de la sub-tarea</label>
        <input type="text" class="form-control form-control-sm" name="titulo" id="titulo" required>
    </div>
    <div class="col-12 col-md-10 form-group">
        <label class="requerido" for="objetivo">Objetivo de la sub-tarea</label>
        <textarea class="form-control form-control-sm" name="objetivo" id="objetivo" cols="30" rows="3" style="resize: none;" required></textarea>
    </div>
</div>
