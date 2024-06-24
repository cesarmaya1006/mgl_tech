<div class="row">
    @if (session('rol_principal_id')== 1 || $transversal)
        <div class="col-12 mb-2">
            <h6>{{session('rol_principal_id')== 1?'Grupo Empresarial y Empresa':'Empresa'}}</h6>
        </div>
        @if (session('rol_principal_id')== 1)
            <div class="col-12 col-md-3 form-group">
                <label class="requerido" for="emp_grupo_id">Grupo Empresarial</label>
                <select id="emp_grupo_id" class="form-control form-control-sm" data_url="{{route('proyectos.getEmpresas')}}" required>
                    <option value="">Elija grupo empresarial</option>
                    @foreach ($grupos as $grupo)
                        <option value="{{ $grupo->id }}" {{isset($proyecto_edit)? ($proyecto_edit->empresa->emp_grupo_id==$grupo->id? 'selected':''):''}}>
                            {{ $grupo->grupo }}
                        </option>
                    @endforeach
                </select>
            </div>
        @endif
        <div class="col-12 col-md-3 form-group">
            <label class="requerido" for="empresa_id" id="label_empresa_id">Empresa</label>
            <select id="empresa_id" name="empresa_id" class="form-control form-control-sm" data_url="{{ route('proyectos.getEmpleados') }}">
                <option value="">{{session('rol_principal_id')== 1?'Elija grupo':'Elija empresa'}}</option>
                @if (isset($proyecto_edit))
                    @if (session('rol_principal_id')== 3)
                        @foreach ($usuario->empleado->empresas_tranv as $empresa)
                            <option value="{{ $empresa->id }}" {{isset($proyecto_edit) && $proyecto_edit->empresa_id==$empresa->id? 'selected':''}}>
                                {{ $empresa->empresa }}
                            </option>
                        @endforeach
                    @else
                        @foreach ($proyecto_edit->empresa->grupo->empresas as $empresa)
                            <option value="{{ $empresa->id }}" {{isset($proyecto_edit) && $proyecto_edit->empresa_id==$empresa->id? 'selected':''}}>
                                {{ $empresa->empresa }}
                            </option>
                        @endforeach
                    @endif
                @endif
            </select>
        </div>
    @else
    <input type="hidden" name="empresa_id" value="{{$usuario->cargo->area->empresa_id}}">
    @endif
    <div class="col-12 col-md-3 form-group" id="caja_empleados">
        <label class="requerido" for="empleado_id">Lider del Proyecto</label>
        <select id="empleado_id" name="empleado_id" class="form-control form-control-sm">
            @if (session('rol_principal_id')== 1|| $transversal)
                <option value="">Elija empresa</option>
            @else
                <option value="">Elija empleado</option>
                @if (isset($proyecto_edit))
                    @foreach ($proyecto_edit->lider as $empleado)
                        <option value="{{ $empleado->id }}" {{$proyecto_edit->empleado_id==$empleado->id? 'selected':''}}>
                            {{ $empleado->nombres . ' ' . $empleado->apellidos . ' - area : ' . $empleado->cargo->area->area . ' - cargo : ' . $empleado->cargo->cargo}}
                        </option>
                    @endforeach
                @else
                    @foreach ($lideres as $empleado)
                        <option value="{{ $usuario->id }}">
                            {{ $empleado->nombres . ' ' . $empleado->apellidos . ' - area : ' . $empleado->cargo->area->area . ' - cargo : ' . $empleado->cargo->cargo}}
                        </option>
                    @endforeach
                @endif
            @endif
        </select>
    </div>
</div>
<hr>


