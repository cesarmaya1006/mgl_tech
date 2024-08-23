@extends('intranet.layout.app')
@section('css_pagina')
@endsection
@section('titulo_pagina')
<i class="fas fa-list-ul mr-3" aria-hidden="true"></i>    Configuración Menus
@endsection
@section('breadcrumb')
    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Inicio</a></li>
    <li class="breadcrumb-item active">Menús</li>
@endsection
@section('titulo_card')
Listado de Menus
@endsection
@section('botones_card')
    <a href="#" class="btn btn-success btn-sm btn-xs btn-sombra pl-3 pr-3 float-md-end">
        <i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>
        Nuevo registro
    </a>
    <a href="#" class="btn btn-info btn-sm btn-xs btn-sombra pl-3 pr-3 float-md-end">
        <i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>
        Nuevo registro 2
    </a>
@endsection
@section('cuerpo')
    <div class="row">
        <div class="col-12">
            <h4>Cuerpo de la pagina</h4>
            <br>
            <p>{{session('prueba')}}</p>
            <br>
            <p>Usuario:</p>
            <p>{{session('id_usuario')}}</p>
            <br>
            <p>roles:</p>
            <p>{{session('roles')}}</p>

        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-12">
            @foreach (session('roles') as $rol)
            <p>{{$rol['name']}}</p>
            @endforeach
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-12">Middleware</div>
        <div class="col-12">
            @php
                $rolArray = [];
                foreach (session('roles') as $rol) {
                    $rolArray[] = $rol['name'];
                }
            @endphp
            @if (in_array("Super Administrador", $rolArray))
                <p>Sipi</p>
            @else
                <p>Nop</p>
            @endif
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
        </div>
    </div>
@endsection
@section('footer_card')

@endsection
@section('modales')

@endsection
