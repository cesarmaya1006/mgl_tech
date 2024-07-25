<nav class="main-header navbar navbar-expand navbar-white navbar-light text-sm">
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
    </ul>
    <ul class="navbar-nav ml-auto">
        <!-- Get Empleados -->
        <input type="hidden"
               id="getEmpleadosChat"
               data_url="{{route('getEmpleadosChat')}}"
               data_url_MN="{{route('getMensajesNuevosEmpleadosChat')}}"
               ruta_fotos = "{{asset('imagenes/usuarios/ ')}}"
               dataMyId ="{{session('id_usuario')}}"
               >
        <!-- Messages Dropdown Menu -->
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                <i class="far fa-comments" style="font-size: 1.5em;"></i>
                <span class="badge badge-primary navbar-badge" style="font-size: 0.75em;position: absolute;" id="badge_mesajes_usu"></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right" id="ul_mensajes" style="left: inherit; right: 0px;">
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#chatModal" id="abrirModalChat" onclick="abrirModalChat()">Abrir Chat</a></li>
            </ul>
        </li>
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown" id="li_notificaciones">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                <i class="far fa-bell" style="font-size: 1.5em;"></i>
                <span class="badge badge-warning navbar-badge" style="font-size: 0.78em;position: absolute;">3</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right" id="menu_badge_cant_notificaciones_2" style="left: inherit; right: 0px;font-size: 0.75em;">
                <li><span class="dropdown-item">0 Notificaciones</span></li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item d-flex flex-row" href="#">
                        <div class="row">
                            <div class="col-12"><i class="fas fa-envelope mr-3"></i> 4 new messages</div>
                            <div class="col-12"><span class="float-right text-muted text-sm ml-5">3 mins</span></div>
                        </div>

                    </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Ver Todas las Notificaciones</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                <i class="fas fa-expand-arrows-alt"></i>
            </a>
        </li>
        <li class="nav-item">
            <form method="post" action="{{ route('logout') }}">
                @csrf
                <button class="nav-link text-danger" type="submit">
                    <i class="fas fa-power-off"></i>
                </button>
            </form>
        </li>
        @can('layout.header.control-sidebar')
            <li class="nav-item">
                <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#"
                    role="button">
                    <i class="fas fa-th-large"></i>
                </a>
            </li>
        @endcan
    </ul>
</nav>
