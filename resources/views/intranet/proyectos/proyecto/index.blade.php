@extends('intranet.layout.app')

@section('css_pagina')

@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Módulo de Proyectos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item active">Proyectos</li>
@endsection

@section('titulo_card')
    Proyectos
@endsection

@section('botones_card')
    @can('proyectos.create')
        <a href="{{ route('proyectos.create') }}" type="button" class="btn btn-primary btn-xs btn-sombra pl-5 pr-5 float-md-end">
            <i class="ico ico-left fa fa-home mr-3 ml-2"></i>Nuevo proyecto
        </a>
    @endcan
@endsection

@section('cuerpo')
    @can('proyectos.index')

    @else
    <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-6">
            <div class="alert alert-warning alert-dismissible mini_sombra">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h5><i class="icon fas fa-exclamation-triangle"></i> Sin Acceso!</h5>
                <p style="text-align: justify">Su usuario no tiene permisos de acceso para este modulo, Comuniquese con el
                    administrador del sistema.</p>
            </div>
        </div>
    </div>
    @endcan
@endsection

@section('footer_card')
@endsection

@section('modales')
@endsection

@section('scripts_pagina')
    <script src="{{ asset('js/intranet/proyectos/proyecto/index.js') }}"></script>
@endsection
