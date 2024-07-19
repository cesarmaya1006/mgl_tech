<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Logo -->
    <link rel="icon" type="image/vnd.microsoft.icon" href="{{ asset('imagenes/sistema/mgl_logo.png') }}" sizes="64x64">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/extranet/general/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/extranet/login/login_mgl.css') }}">
    <link rel="stylesheet" href="{{ asset('lte/plugins/fontawesome-free/css/all.min.css') }}">

    <title>Plataforma MGL</title>
</head>

<body>
    <div class="fondo" style="background-image: url('{{ asset('imagenes/sistema/fondo' . rand(1, 6) . '.jpg') }}');background-repeat: no-repeat;background-size: 100% 100%; ">
        <div class="pantalla d-flex justify-content-center align-content-center">
            <div class="row d-flex justify-content-center align-content-center">
                <div class="login col-11 col-md-8">
                    <div class="formulario_caja row d-flex flex-row p-2">
                        <div class="caja_logo col-12 col-md-6 d-flex justify-content-center align-content-center">
                            <img class="img-fluid imagen_logo" src="{{ asset('imagenes/sistema/mgl_logo.png') }}" alt="">
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="row text-white d-flex justify-content-center pt-5">
                                <div class="col-12">
                                    @include('includes.error-form')
                                    @include('includes.mensaje')
                                </div>
                                <div class="col-12 text-center mt-md-5">
                                    <h1 style="-webkit-text-stroke-width: 1px;-webkit-text-stroke-color: black;"><strong>ACCESO DE USUARIOS</strong></h1>
                                </div>
                                <div class="col-12 col-md-10">
                                    <form class="row mt-2" style="width: 100%;" action="{{ route('login') }}" method="post">
                                        @method('post')
                                        @csrf
                                        <div class="row mt-3" style="width: 100%;">
                                            <div class="col-1 text-right">
                                                <i class="fas fa-at mr-4" style="color:white;text-shadow: 1px 1px black"></i>
                                            </div>
                                            <div class="col-8">
                                                <div class="form-group">
                                                    <input type="email" class="form-control form-control-sm fadeIn second" name="email" id="email" required>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-3 mb-3" style="width: 100%;">
                                            <div class="col-1 text-right">
                                                <i class="fas fa-key mr-4" style="color:white;text-shadow: 1px 1px black"></i>
                                            </div>
                                            <div class="col-8">
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-sm fadeIn third" name="password" id="password" required>
                                                </div>
                                            </div>
                                            <div class="col-1 text-right">
                                                <button class="btn btn-secondarybtn-xs" type="button" id="botoneye">
                                                    <i class="fa fa-eye-slash text-white" id="togglePassword"aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="row mt-3 mb-3" style="width: 100%;">
                                            <div class="col-5 col-md-3 pl-5">
                                                <div class="form-group mr-5">
                                                    <button type="submit" class="btn btn-info btn-sombra btn-md pl-5 pr-5 ">Ingresar</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-5 mt-5">
                                            <div class="col-12 d-flex justify-content-center">
                                                <a href="#" style="text-decoration: none; color:white;">¿Olvidó su contraseña?</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/extranet/login/login_mgl.js') }}"></script>
</body>

</html>
