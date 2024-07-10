<div class="row">
    @if (session('rol_principal_id')== 1 || $transversal)
        <div class="col-12 mb-2">
            <h6>{{session('rol_principal_id')== 1?'Grupo Empresarial y Empresa':'Empresa'}}</h6>
        </div>
        @if (session('rol_principal_id')== 1)
            <div class="col-12 col-md-3 form-group">
                <label class="requerido" for="emp_grupo_id">Grupo Empresarial</label>
                <select id="emp_grupo_id" class="form-control form-control-sm" data_url="{{route('proyectos.getEmpresas')}}">
                    <option value="">Elija grupo empresarial</option>
                    @foreach ($grupos as $grupo)
                        <option value="{{ $grupo->id }}" {{$grupo->id == $proyecto->empresa->grupo->id?'selected':''}}>{{ $grupo->grupo }}</option>
                    @endforeach
                </select>
            </div>
        @endif
        <div class="col-12 col-md-3 form-group">
            <label class="requerido" for="empresa_id" id="label_empresa_id">Empresa</label>
            <select id="empresa_id" name="empresa_id" class="form-control form-control-sm" data_url="{{ route('proyectos.getEmpleados') }}" required>
                <option value="">Elija empresa</option>
                @foreach ($proyecto->empresa->grupo->empresas as $empresa)
                <option value="{{$empresa->id}}" {{$empresa->id == $proyecto->empresa->id?'selected':''}}>{{$empresa->empresa}}</option>
                @endforeach
            </select>
        </div>
    @else
    <input type="hidden" name="empresa_id" value="{{$usuario->empleado->cargo->area->empresa_id}}">
    @endif
    <div class="col-12 col-md-6 form-group" id="caja_empleados">
        <label class="requerido" for="empleado_id">Lider del Proyecto</label>
        <select id="empleado_id" name="empleado_id" class="form-control form-control-sm" required>
            <option value="">{{session('rol_principal_id')== 1|| $transversal?'Elija empresa':'Elija un Lider'}}</option>
            @if (session('rol_principal_id')== 3|| !$transversal)
                @foreach ($lideres as $empleado)
                <option value="{{$empleado->id}}" {{$empleado->id == $proyecto->empleado_id?'selected':''}}>{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}}</option>
                @endforeach
            @endif
        </select>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-12 col-md-2 form-group">
        <label class="requerido" for="fec_creacion">Fecha Proyecto</label>
        <input class="form-control form-control-sm" type="date" name="fec_creacion" id="fec_creacion" value="{{ $proyecto->fec_creacion }}" required>
        <small id="helpId" class="form-text text-muted">Fecha creación proyecto</small>
    </div>
    <div class="col-12 col-md-4 form-group">
        <label class="requerido" for="titulo">Titulo Proyecto</label>
        <input type="text" class="form-control form-control-sm" name="titulo" id="titulo" value="{{$proyecto->titulo}}" aria-describedby="helpId" onkeyup="mayus(this);" required>
        <small id="helpId" class="form-text text-muted">Titulo Proyecto</small>
    </div>
    <div class="col-12 col-md-6 form-group">
        <label for="titulo">Documento Adjunto</label>
        <input type="file" class="form-control form-control-sm" name="docu_proyecto" id="docu_proyecto" aria-describedby="helpId" >
        <small id="helpId" class="form-text text-muted">Documento adjunto al proyecto (Opcional)</small>
    </div>
    <div class="col-12 form-group">
        <label class="requerido" for="titulo">Objetivo del Proyecto</label>
        <textarea class="form-control form-control-sm" id="objetivo" name="objetivo" style="resize: none;" rows="3" aria-describedby="helpId" placeholder="Ingrese el objetivo de proyecto" required>{{$proyecto->objetivo}}</textarea>
        <small id="helpId" class="form-text text-muted">Objetivo del Proyecto</small>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-12 mb-3">
        <h6><strong>Componente Financiero</strong></h6>
    </div>
    <div class="col-12 col-md-3 form-group">
        <label for="presupuesto">Presupuesto Inicial</label>
        <span class="form-control form-control-sm text-right">$ {{number_format($proyecto->presupuesto, 2, ',', '.')}}</span>
        <small id="helpId" class="form-text text-muted">Presupuesto inicial del proyecto (Opcional)</small>
    </div>
    <div class="col-12 col-md-3 form-group">
        <label for="presupuesto">Adiciones previas al Presupuesto</label>
        <span class="form-control form-control-sm text-right">$ {{number_format($proyecto->adiciones->sum('adicion'), 2, ',', '.')}}</span>
        <small id="helpId" class="form-text text-muted">Adiciones previas</small>
    </div>
    <div class="col-12 col-md-3 form-group">
        <label for="adicion">Presupuesto Adicional</label>
        <input type="number"  value="0" step="0.01" class="form-control form-control-sm text-end"  name="adicion" id="adicion">
        <small id="helpId" class="form-text text-muted">Presupuesto adicional ( <span class="text-primary">+</span> / <span class="text-danger">-</span> )</small>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-12">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="1" id="checkReasigancion">
            <label class="form-check-label" for="checkReasigancion"><strong>Reasignación</strong></label>
        </div>
    </div>
</div>
<div class="row" id="caja_reasignaciones">
    @foreach ($proyecto->componentes as $componente)
    <div class="col-12">
        <div class="row">
            <div class="col-12 p-1">
                <div class="card card-light mini_sombra">
                    <div class="card-header">
                        <h3 class="card-title">
                            Componente: <strong>{{$componente->titulo}}</strong>
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-4 form-group">
                                <label class="requerido" for="empleado_asignado">Empleado Asignado</label>
                                <span class="form-control form-control-sm" id="empleado_asignado_comp_{{$componente->id}}">{{$componente->responsable->nombres . ' ' . $componente->responsable->apellidos}}</span>
                            </div>
                            <div class="col-12 col-md-4 form-group">
                                <label class="requerido" for="empleado_id">Nueva Asignación</label>
                                <select id="reasignacion_comp_{{$componente->id}}"
                                        name="empleado_id"
                                        class="form-control form-control-sm reasignacion_componente"
                                        data_url="{{route('componentes.reasignacionComponente')}}"
                                        data_componente="{{$componente->id}}">
                                    <option value="">Elija un Empleado</option>
                                    @foreach ($empleados as $empleado)
                                        <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}} {{$componente->empresa_id != $empleado->cargo->area_empresa_id?' - *'. $empleado->cargo->area->empresa->empresa:''}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6><strong>Tareas Componente</strong></h6>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <div class="row info-box bg-light">
                                <div class="col-12 table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">Tarea</th>
                                                <th class="text-center" scope="col">Asignación Actual</th>
                                                <th class="text-center" scope="col">Nueva Asignación</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($componente->tareas as $tarea)
                                                <tr>
                                                    <th scope="row" style="white-space:nowrap;">{{$tarea->titulo}}</th>
                                                    <td style="text-align: center;vertical-align: middle;white-space:nowrap;min-width: 250px;">
                                                        <div class="form-group">
                                                            <span class="form-control form-control-sm text-left" id="empleado_asignado_tarea_{{$tarea->id}}">{{$tarea->empleado->nombres . ' ' . $tarea->empleado->apellidos}}</span>
                                                        </div>
                                                    </td>
                                                    <td style="text-align: center;vertical-align: middle;white-space:nowrap;min-width: 250px;">
                                                        <div class="form-group">
                                                            <select id="reasignacion_tarea_{{$tarea->id}}"
                                                                    name="empleado_id"
                                                                    class="form-control form-control-sm reasignacio_tarea">
                                                                <option value="">Elija un Empleado</option>
                                                                @foreach ($empleados as $empleado)
                                                                    <option value="{{$empleado->id}}">{{$empleado->nombres.' '. $empleado->apellidos.'   --   cargo : '.$empleado->cargo->cargo}} {{$componente->empresa_id != $empleado->cargo->area_empresa_id?' - *'. $empleado->cargo->area->empresa->empresa:''}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endforeach
</div>
