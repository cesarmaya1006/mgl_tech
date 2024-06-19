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
    <!-- Modales  -->
    @yield('modales')
    <!-- Fin Modales  -->
    @include('intranet.layout.scripts')
    @yield('scripts_pagina')
</body>

</html>
