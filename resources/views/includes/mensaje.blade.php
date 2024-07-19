@if (session("mensaje"))
    <div class="alert alert-success alert-dismissible" data-auto-dismiss="3000">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>
        <h4><i class="icon fa fa-check"></i> Mensaje del sistema</h4>
        <ul>
            <li>{{ utf8_encode(utf8_decode(session("mensaje"))) }}</li>
        </ul>
    </div>
@elseif (session("errores"))
    <div class="alert alert-danger alert-dismissible" data-auto-dismiss="3000">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>
        <h4><i class="icon fa fa-check"></i> Mensaje del sistema</h4>
        <ul>
            <li>{{ utf8_encode(utf8_decode(session("errores"))) }}</li>
        </ul>
    </div>
@endif

