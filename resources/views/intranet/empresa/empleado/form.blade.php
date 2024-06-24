<div class="row">
    <div class="col-12">
        <h6>Roles asignados al usuario</h6>
    </div>
    @foreach ($roles as $rol)
        @if (session('rol_principal_id')< 3)
            <div class="col-12 col-md-2 form-check">
                <input class="form-check-input"
                    type="checkbox"
                    value="{{$rol->name}}"
                    id="check_{{$rol->id}}"
                    name="roles[]"
                    {{isset($empleado_edit)?($empleado_edit->usuario->hasRole($rol->name)?'checked':''):''}}
                    >
                <label class="form-check-label" for="flexCheckDisabled">
                    {{$rol->name}}
                </label>
            </div>
        @else
            @if ($rol->id>2)
                <div class="col-12 col-md-2 form-check">
                    <input class="form-check-input"
                        type="checkbox"
                        value="{{$rol->name}}"
                        id="check_{{$rol->id}}"
                        name="roles[]"
                        {{isset($empleado_edit)?($empleado_edit->usuario->hasRole($rol->name)?'checked':''):''}}
                        {{$rol->name=='Empleado'?'required':''}}>
                    <label class="form-check-label" for="flexCheckDisabled">
                        {{$rol->name}}
                    </label>
                </div>
            @endif
        @endif
    @endforeach
</div>
<hr>
<div class="row">
    @if (session('rol_principal_id')== 1)
        <div class="col-12 col-md-3 form-group">
            <label class="requerido" for="emp_grupo_id">Grupo Empresarial</label>
            <select id="emp_grupo_id" class="form-control form-control-sm" data_url="{{route('grupo_empresas.getEmpresas')}}" required>
                <option value="">Elija grupo empresarial</option>
                @foreach ($grupos as $grupo)
                    <option value="{{ $grupo->id }}" {{isset($empleado_edit)? ($empleado_edit->cargo->area->empresa->emp_grupo_id==$grupo->id? 'selected':''):''}}>
                        {{ $grupo->grupo }}
                    </option>
                @endforeach
            </select>
        </div>
    @endif
    @if (session('rol_principal_id')== 1 || $transversal)
        <div class="col-12 col-md-3 form-group">
            <label class="requerido" for="empresa_id" id="label_empresa_id">Empresa</label>
            <select id="empresa_id" class="form-control form-control-sm" data_url="{{ route('areas.getAreas') }}">
                <option value="">{{session('rol_principal_id')== 1?'Elija grupo':'Elija empresa'}}</option>
                @if (isset($empleado_edit))
                    @if (session('rol_principal_id')== 3)
                        @foreach ($usuario->empleado->empresas_tranv as $empresa)
                            <option value="{{ $empresa->id }}" {{isset($empleado_edit) && $empleado_edit->cargo->area->empresa_id==$empresa->id? 'selected':''}}>
                                {{ $empresa->empresa }}
                            </option>
                        @endforeach
                    @else
                        @foreach ($empleado_edit->cargo->area->empresa->grupo->empresas as $empresa)
                            <option value="{{ $empresa->id }}" {{isset($empleado_edit) && $empleado_edit->cargo->area->empresa_id==$empresa->id? 'selected':''}}>
                                {{ $empresa->empresa }}
                            </option>
                        @endforeach
                    @endif
                @endif
            </select>
        </div>
    @endif
    <div class="col-12 col-md-3 form-group" id="caja_areas">
        <label class="requerido" for="area_id">Área</label>
        <select id="area_id" class="form-control form-control-sm" data_url="{{ route('empleados.getCargos') }}">
            @if (isset($empleado_edit))
            <option value="">Elija área</option>
                @foreach ($empleado_edit->cargo->area->empresa->areas as $area)
                    <option value="{{ $area->id }}" {{$empleado_edit->cargo->area_id==$area->id? 'selected':''}}>
                        {{ $area->area }}
                    </option>
                @endforeach
            @else
                <option value="">Elija empresa</option>
            @endif
        </select>
    </div>
    <div class="col-12 col-md-3 form-group" id="caja_areas">
        <label class="requerido" for="cargo_id">Cargo</label>
        <select id="cargo_id" class="form-control form-control-sm" name="cargo_id" >
            @if (isset($empleado_edit))
                @foreach ($empleado_edit->cargo->area->cargos as $cargo)
                    <option value="{{ $cargo->id }}" {{$empleado_edit->cargo_id==$cargo->id? 'selected':''}}>
                        {{ $cargo->cargo }}
                    </option>
                @endforeach
            @else
                <option value="">Elija area</option>
            @endif
        </select>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-12 col-md-6">
        <div class="row">
            <div class="col-12 col-md-6 form-group">
                <label class="requerido" for="tipo_documento_id">Tipo de identificación</label>
                <select id="tipo_documento_id" class="form-control form-control-sm" name="tipo_documento_id" required>
                    <option value="">Elija tipo</option>
                    @foreach ($tiposdocu as $tipoDocu)
                        <option value="{{ $tipoDocu->id }}" {{isset($empleado_edit)?$empleado_edit->tipo_documento_id == $tipoDocu->id?'selected':'':''}}>
                            {{ $tipoDocu->abreb_id .' - ' . $tipoDocu->tipo_id}}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-12 col-md-6 form-group">
                <label class="requerido" for="identificacion">Identificación</label>
                <input type="text" class="form-control form-control-sm" value="{{ old('identificacion', $empleado_edit->identificacion ?? '') }}" name="identificacion" id="identificacion" required>
            </div>
            <div class="col-12 col-md-6 form-group">
                <label class="requerido" for="nombres">Nombres</label>
                <input type="text" class="form-control form-control-sm" value="{{ old('nombres', $empleado_edit->nombres ?? '') }}" name="nombres" id="nombres" required>
            </div>
            <div class="col-12 col-md-6 form-group">
                <label class="requerido" for="apellidos">Apellidos</label>
                <input type="text" class="form-control form-control-sm" value="{{ old('apellidos', $empleado_edit->apellidos ?? '') }}" name="apellidos" id="apellidos" required>
            </div>
            <div class="col-12 col-md-8 form-group">
                <label class="requerido" for="email">Correo Electrónico</label>
                <input type="email" class="form-control form-control-sm" value="{{ old('email', $empleado_edit->usuario->email ?? '') }}" name="email" id="email" required>
            </div>
            <div class="col-12 col-md-4 form-group">
                <label class="requerido" for="telefono">Teléfono</label>
                <input type="text" class="form-control form-control-sm" value="{{ old('telefono', $empleado_edit->telefono ?? '') }}" name="telefono" id="telefono" required>
            </div>
            <div class="col-12 form-group">
                <label class="requerido" for="direccion">Dirección</label>
                <input type="text" class="form-control form-control-sm" value="{{ old('direccion', $empleado_edit->direccion ?? '') }}" name="direccion" id="direccion" required>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <div class="row">
                    @if (session('rol_principal_id')<3)
                        <div class="col-12">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="1" name="mgl" id="mgl" {{isset($empleado_edit)?$empleado_edit->mgl ?'checked':'':''}}>
                                    <label class="form-check-label" for="mgl">
                                        Usuario MGL
                                    </label>
                                </div>
                            </div>
                        </div>
                    @endif
                    <div class="col-12">
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="1" name="lider" id="lider" {{isset($empleado_edit)?$empleado_edit->lider ?'checked':'':''}}>
                                <label class="form-check-label" for="lider">
                                    Lider de Proyectos
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-6">
        <div class="row">
            <div class="col-12 form-group">
                <label for="foto" class="requerido">Fotografía</label>
                <input type="file" class="form-control form-control-sm" id="foto" name="foto" placeholder="Foto del usuario" accept="image/png,image/jpeg" onchange="mostrar()">
                <small id="helpId" class="form-text text-muted">Fotografía</small>
            </div>
            <div class="col-12">
                <div class="row d-flex justify-content-evenly">
                    <div class="col-6 col-md-4">
                        <img class="img-fluid fotoUsuario" id="fotoUsuario" src="{{ isset($empleado_edit) ?($empleado_edit->foto!=null?asset('/imagenes/usuarios/'.$empleado_edit->foto) : asset('/imagenes/usuarios/usuario-inicial.jpg')) : asset('/imagenes/usuarios/usuario-inicial.jpg') }}" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-12" id="check_usuTranv_all">
        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="1" name="usuario_tranv" id="usuario_tranv" {{isset($empleado_edit)?$empleado_edit->empresas_tranv->count()>0 ?'checked':'':''}}>
                <label class="form-check-label" for="usuario_tranv">
                    Usuario Transversal
                </label>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-6 table-responsive {{isset($empleado_edit)?$empleado_edit->empresas_tranv->count()>0 ?'':'d-none':'d-none'}}" id="id_tabla_transv" style="max-height: 800px;">
        <table class="table table-hover table-bordered table-sm align-middle">
            <thead>
                <tr>
                    <th colspan="2">Empresas / Grupos Empresariales</th>
              </tr>
            </thead>
            <tbody id="body_usuario_tranv">
                @foreach ($grupos as $grupo)
                    <tr class="table-primary">
                        <th colspan="2" scope="col">{{$grupo->grupo}}</th>
                    </tr>
                    @foreach ($grupo->empresas as $empresa)
                        <tr class="table-light">
                            <th scope="row">{{$empresa->empresa}}</th>
                            <td class="text-center">
                                <div class="form-check">
                                    <input
                                        class="form-check-input label_checkbox"
                                        type="checkbox"
                                        value="{{$empresa->id}}"
                                        name="empresa_id[]"
                                        id="input_checkbox{{$empresa->id}}"
                                        {{isset($empleado_edit)?($empleado_edit->empresas_tranv->where('id',$empresa->id)->count()>0?($empleado_edit->empresas_tranv->where('id',$empresa->id)->first()->id=$empresa->id?'checked':''):''):''}}
                                        >
                                    <label class="form-check-label" id="label_checkbox{{$empresa->id}}" for="lider">{{isset($empleado_edit)?'':'No'}}</label>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                @endforeach
            </tbody>
          </table>
    </div>
</div>
<hr>

