@extends('intranet.layout.app')

@section('css_pagina')
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Módulo de Proyectos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.index') }}">Proyectos</a></li>
    <li class="breadcrumb-item active">Crear</li>
@endsection

@section('titulo_card')
    <i class="fa fa-plus-square mr-3" aria-hidden="true"></i> Nuevo Proyecto
@endsection

@section('botones_card')
    <a href="{{ route('proyectos.index') }}" class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
        <i class="fas fa-reply mr-2 ml-2"></i><span class="mr-3">Volver</span>
    </a>
@endsection

@section('cuerpo')
    <div class="row d-flex justify-content-center">
        <form class="col-12 form-horizontal" action="{{ route('proyectos.store') }}" method="POST" autocomplete="off"
            enctype="multipart/form-data">
            @csrf
            @method('post')
            @include('intranet.proyectos.proyecto.crear.form')
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
<script src="{{ asset('js/intranet/proyectos/proyecto/crear.js') }}"></script>
@endsection
