@extends('intranet.layout.app')

@section('css_pagina')
@endsection

@section('titulo_pagina')
    <i class="fas fa-project-diagram mr-3" aria-hidden="true"></i> Módulo de Proyectos
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item"><a href="{{ route('proyectos.gestion',['id' => $proyecto->id ]) }}">Gestión</a></li>
    <li class="breadcrumb-item active">Editar</li>
@endsection

@section('titulo_card')
    <i class="fa fa-edit mr-3" aria-hidden="true"></i> Editar Proyecto
@endsection

@section('botones_card')
    <a href="{{ route('proyectos.gestion',['id' => $proyecto->id ]) }}"
        class="btn btn-success btn-xs btn-sombra text-center float-md-end"
        style="font-size: 0.8em; padding-left: 55px;">
        <span class="ml-md-5 mr-md-5">
            <i class="fas fa-reply mr-2"></i>
            Volver
        </span>
    </a>
@endsection

@section('cuerpo')
    @can('proyectos.edit')
        <div class="row d-flex justify-content-center">
            <form class="col-12 form-horizontal" action="{{ route('proyectos.update', ['id' => $proyecto->id]) }}" method="POST"
                autocomplete="off" enctype="multipart/form-data">
                @csrf
                @method('put')
                @include('intranet.proyectos.proyecto.editar.form')
                <div class="row mt-5">
                    <div class="col-12 col-md-6 mb-4 mb-md-0 d-grid gap-2 d-md-block ">
                        <button type="submit" class="btn btn-primary btn-xs btn-sombra pl-sm-5 pr-sm-5"
                            style="font-size: 0.8em;"><span class="ml-md-5 mr-md-5">Guardar</span></button>
                    </div>
                </div>
            </form>
        </div>
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
    <script src="{{ asset('js/intranet/proyectos/proyecto/editar.js') }}"></script>
@endsection
