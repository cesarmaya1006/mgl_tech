<div class="row">
    <input type="hidden" name="tarea_id" value="{{$tarea->id}}">
    <input type="hidden" name="fecha" value="{{date('Y-m-d H:i:s')}}">
    <div class="col-12 col-md-2 form-group">
        <label class="requerido">Fecha del historial</label>
        <span class="form-control form-control-sm">{{date('Y-m-d')}}</span>
        <small id="helpId" class="form-text text-muted">Fecha registro del historial</small>
    </div>
    <div class="col-12 col-md-3 form-group">
        <label class="requerido">{{session('roles')->where('name','Empleado')->count()?'Usuarios':'Usuario'}}</label>
        @if (session('roles')->where('name','Empleado')->count())
            <input type="hidden" name="empleado_id" value="{{date('Y-m-d H:i:s')}}">
            <span class="form-control form-control-sm">{{session('nombres_completos')}}</span>
        @else
            <select class="form-control form-control-sm" name="empleado_id" id="empleado_id" aria-describedby="helpId" required>
                <option value="">Seleccione un usuario</option>
                @foreach ($empleados as $empleado)
                    <option value="{{$empleado->id}}">{{$empleado->nombres.' '.$empleado->apellidos . ' (' . $empleado->cargo->cargo . ')'}}</option>
                @endforeach
            </select>
        @endif
        <small id="helpId" class="form-text text-muted">Usuario que registra el historial</small>
    </div>
    <div class="col-12 col-md-3 form-group">
        <label class="requerido" for="usuarioasignado_id">Asignación de tarea</label>
        <select class="form-control form-control-sm" name="usuarioasignado_id" id="usuarioasignado_id" aria-describedby="helpId" required>
            <option value="">Seleccione un responsable</option>
            @foreach ($empleados as $empleado)
                <option value="{{$empleado->id}}">{{$empleado->nombres.' '.$empleado->apellidos . ' (' . $empleado->cargo->cargo . ')'}}</option>
            @endforeach
        </select>
        <small id="helpId" class="form-text text-muted">Asignación de tarea</small>
    </div>
    <div class="col-12 col-md-4 form-group">
        <label class="requerido" for="titulo">Título historial</label>
        <input class="form-control form-control-sm" type="text" name="titulo" id="titulo" value="{{ old('titulo'?? '') }}" required>
        <small id="helpId" class="form-text text-muted">Título historial</small>
    </div>
</div>
<div class="row">
    <div class="col-12 col-md-9">
        <label class="requerido" for="resumen">Resumen / Acción</label>
        <textarea class="form-control form-control-sm" name="resumen" id="resumen" cols="30" rows="3" style="resize: none;" required></textarea>
        <small id="helpId" class="form-text text-muted">Descripción del historial</small>
    </div>
    <div class="col-12 col-md-3">
        <div class="row">
            <div class="col-12 col-md-9">
                <label class="requerido" for="progreso">Progreso de la tarea</label>
                <input type="number" min="{{$tarea->historiales->count()>0?$tarea->historiales->last()->progreso:'0'}}" max="100" value="{{$tarea->historiales->count()>0?$tarea->historiales->last()->progreso:'0'}}" class="form-control form-control-sm text-center" name="progreso" id="progreso" required>
                <small id="helpId" class="form-text text-muted">Progreso de la tarea</small>
            </div>
            <div class="col-12 col-md-9 mt-md-3">
                @if (floatval($tarea->componente->presupuesto) > 0)
                    <input type="hidden" id="disponible_componente" value="{{($tarea->componente->presupuesto+$tarea->componente->adiciones->sum('adicion')) - $tarea->componente->ejecucion}}">
                    <label class="requerido" for="costo">Costo - max({{'$ ' . number_format(($tarea->componente->presupuesto+$tarea->componente->adiciones->sum('adicion')) - $tarea->componente->ejecucion)}})</label>
                    <input type="number" step="0.01" min="0" max="{{($tarea->componente->presupuesto+$tarea->componente->adiciones->sum('adicion')) - $tarea->componente->ejecucion}}" value="0.00" class="form-control form-control-sm text-right" name="costo" id="costo" required>
                    <small id="helpId" class="form-text text-muted">Costo asociado a la tarea</small>
                @else
                    <input type="hidden" name="costo" value="0">
                @endif
            </div>
        </div>
    </div>
</div>
