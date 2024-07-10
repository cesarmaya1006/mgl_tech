@extends('intranet.layout.app')

@section('css_pagina')
@endsection

@section('titulo_pagina')
    <i class="fas fa-building mr-3" aria-hidden="true"></i> Configuración Empresas
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('$(document).ready(function () {.index') }}">Empresas</a></li>
    <li class="breadcrumb-item active">Editar</li>
@endsection

@section('titulo_card')
    <i class="fa fa-edit mr-3" aria-hidden="true"></i> Editar Empresa
@endsection

@section('botones_card')
    <a href="{{ route('grupo_empresas.index') }}" class="btn btn-success btn-sm btn-sombra text-center pl-5 pr-5 float-md-end"
        style="font-size: 0.8em;">
        <i class="fas fa-reply mr-2"></i>
        Volver
    </a>
@endsection

@section('cuerpo')
    <div class="row d-flex justify-content-center">
        <form class="col-12 form-horizontal" action="{{ route('grupo_empresas.update', ['id' => $grupo_edit->id]) }}" method="POST"
            autocomplete="off" enctype="multipart/form-data">
            @csrf
            @method('put')
            @include('intranet.empresa.grupo.form')
            <div class="row mt-5">
                <div class="col-12 col-md-6 mb-4 mb-md-0 d-grid gap-2 d-md-block ">
                    <button type="submit" class="btn btn-primary btn-sm btn-sombra pl-sm-5 pr-sm-5"
                        style="font-size: 0.8em;">Guardar</button>
                </div>
            </div>
        </form>
    </div>
@endsection

@section('footer_card')
@endsection

@section('modales')
@endsection

@section('scripts_pagina')
    <script src="{{ asset('js/intranet/configuracion/roles/crear.js') }}"></script>
@endsection
