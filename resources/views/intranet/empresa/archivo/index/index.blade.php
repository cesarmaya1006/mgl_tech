@extends('intranet.layout.app')

@section('css_pagina')

@endsection

@section('titulo_pagina')
    <i class="far fa-folder-open mr-3" aria-hidden="true"></i> Módulo Archivo
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Inicio</a></li>
    <li class="breadcrumb-item active">Empresas</li>
@endsection

@section('titulo_card')
    Documentación
@endsection

@section('botones_card')

@endsection

@section('cuerpo')
    @can('archivo-modulo.index')
        <div class="row d-flex justify-content-evenly">
            @foreach ($opciones as $opcion)
                @can($opcion->url)
                    <div class="col-7 col-md-2 pl-2 pr-2 mb-2">
                        <div class="row" style="font-size: 0.8em;">
                            <div class="col-12 text-center pl-3 pr-3 imagenesArchivo">
                                <a class="linkImagenesArchivo" href="{{ route($opcion->url) }}"><img class="img-fluid" src="{{ asset('imagenes/sistema/' . $opcion->imagen) }}" style="max-width: 150px;width: 80%;"></a>
                            </div>
                            <div class="col-12 text-center pl-3 pr-3" >
                                <h6><strong>{{ $opcion->titulo }}</strong></h6>
                            </div>
                            <div class="col-12 text-center pl-4 pr-4">
                                <p class="text-justify" style="font-size: 0.9em;">{{ $opcion->contenido }}</p>
                            </div>
                        </div>
                    </div>
                @endcan
            @endforeach
        </div>
    @else
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-6">
                <div class="alert alert-warning alert-dismissible">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h5><i class="icon fas fa-exclamation-triangle"></i> Sin Acceso!</h5>
                    <p style="text-align: justify">Su usuario no tiene permisos de acceso para esta vista, Comuniquese con el
                        administrador del sistema.</p>
                </div>
            </div>
        </div>
    @endcan
@endsection

@section('footer_card')
@endsection

@section('modales')
    <!-- Modales  -->

    <!-- Fin Modales  -->
@endsection

@section('scripts_pagina')
<script src="{{ asset('js/intranet/empresa/archivo/index/index.js') }}"></script>
@endsection
