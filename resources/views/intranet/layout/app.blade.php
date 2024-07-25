@yield('php_funciones')
<!DOCTYPE html>
<html lang="es">

<head>
    @include('intranet.layout.head')
    @yield('css_pagina')
</head>

<body class="hold-transition sidebar-mini layout-fixed text-sm layout-footer-fixed">
    <div class="wrapper">
        <div class="preloader flex-column justify-content-center align-items-center">
            <img class="animation__shake" src="{{ asset('imagenes/sistema/logo_maya.png') }}" alt="AdminLTELogo"
                height="60" width="60">
        </div>
        @include('intranet.layout.header')
        @include('intranet.layout.aside')

        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h3 class="m-0">
                                @yield('titulo_pagina')
                            </h3>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                @yield('breadcrumb')
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="row pl-md-3 pr-md-3">
                    <div class="col-12 card card-outline card-info sombra" id="caja_card_outline">
                        <div class="card-header">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12 col-md-6 mb-4 mb-md-0">
                                        <h4 class="card-title">
                                            <strong>@yield('titulo_card')</strong>
                                        </h4>
                                    </div>
                                    <div class="col-12 col-md-6 mb-4 mb-md-0 d-grid gap-2 d-md-block ">
                                        @yield('botones_card')
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row d-flex justify-content-center">
                                <div class="col-12">
                                    @include('includes.mensaje')
                                    @include('includes.error-form')
                                </div>
                                <div class="col-12">
                                    @yield('cuerpo')
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            @yield('footer_card')
                        </div>
                    </div>
                </div>
            </section>
        </div>
        @include('intranet.layout.footer')
        <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
    <!-- Notificaciones  -->
    <input type="hidden" id="getNotificacionesEmpleado" data_url="{{route('getNotificacionesEmpleado')}}">

    <!-- Modales  -->
    @yield('modales')
    <!-- Modal -->
    <input type="hidden" id="getMensajesChatUsuario" data_url="{{route('getMensajesChatUsuario')}}" data_estado="0">
    <input type="hidden" id="getMensajesNuevosDestinatarioChat" data_url="{{route('getMensajesNuevosDestinatarioChat')}}" destinatario_id="0">
    <div class="modal fade" id="chatModal" tabindex="-1" aria-labelledby="chatModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-xl sombra" style="border-top: 3px solid rgba(22, 150, 255, 0.8); border-radius: 5px; max-height: 500px">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="chatModalLabel"><span class="btn btn-primary btn-xs mini_sombra mr-5" id="botonChat"><i class="fa fa-arrow-left" id="flechaChat" aria-hidden="true"></i></span>Chat Intrared</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-11 col-sm-3" id="listaUsuarios">
                            <ul class="overflow-auto p-0" id="ul_listaUsuarios" style="max-height: 480px;">

                            </ul>
                        </div>
                        <div class="col-1 col-sm-9 bg-secondary bg-gradient pt-1 pb-1" id="cajaChat">
                            <div class="row pl-2 pr-2">
                                <div class="col-12 bg-light bg-gradient overflow-auto" id="cajonChatsFinal" data-bs-target="#cajonChatsFinal" data-bs-spy="scroll" style="height: 430px; border: 1px solid black ;position: relative;">
                                    <div class="row d-flex justify-content-center center align-items-center" style="min-height: 100%;">
                                        <div class="col-12 text-center" >
                                            <div class="row d-flex justify-content-center center align-items-center">
                                                <div class="col-12 col-md-5"><img src="{{asset('imagenes/sistema/mgl_tech_logo.png')}}" class="img-fluid"></div>
                                                <div class="col-12 col-md-8 mt-3">
                                                    <h5>Envia y recibe mensajes a través de nuestra plataforma, y mantente en contacto con los miembros de tu organización.</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="imagenMglTech" value="{{asset('imagenes/sistema/mgl_tech_logo.png')}}">
                                <div class="col-12 mb-1" style="position: absolute;bottom: -15px; left: 0;">
                                    <form class="form-horizontal d-none" id="formNuevoMensaje" action="{{ route('setNuevoMensaje') }}" method="POST" autocomplete="off">
                                        @csrf
                                        @method('post')
                                        <input type="hidden" name="remitente_id" id="remitente_id" value="{{session('id_usuario')}}">
                                        <input type="hidden" name="destinatario_id" id="destinatario_id">
                                        <div class="row">
                                            <div class="col-11 form-group">
                                                <textarea class="form-control form-control-sm" id="mensaje" name="mensaje" style="resize: none;" rows="2" placeholder="Ingrese el mensaje" required></textarea>
                                            </div>
                                            <div class="col-1 d-flex align-items-center justify-content-center">
                                                <button type="submit" class="btn btn-outline-primary btn-sm pl-3 pr-3"><i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs bg-gradient" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Notificaiones  -->
    <div class="modal fade" id="modalNotificaciones" tabindex="-1" aria-labelledby="modalNotificacionesLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalNotificacionesLabel">Notificaciones</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 table responsive">
                            <table class="table table-striped table-hover table-sm" id="table_notificaciones_general">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Notificación</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_notificaciones_general">
                                    <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    <!-- Fin Modales  -->
    @include('intranet.layout.scripts')
    @yield('scripts_pagina')
</body>

</html>
