<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href=".{{ asset('css/general/bootstrap.min.css') }}">
    <link rel="stylesheet" href=".{{ asset('css/general/roboto.css') }}">
    <link rel="stylesheet" href=".{{ asset('css/general/informe.css') }}">


    <title>{{ $proyecto->titulo }}</title>
    <style>
        .roboto-thin {
            font-family: "Roboto", sans-serif;
            font-weight: 100;
            font-style: normal;
        }

        .roboto-light {
            font-family: "Roboto", sans-serif;
            font-weight: 300;
            font-style: normal;
        }

        .cabecera {
            width: 100%;
        }

        .logo_cabecera {}

        .titulo_empresa {}

        @page {
            margin: 60px 0px 0px 0px;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 80px;
            margin-left: 2cm;
            margin-right: 2cm;
            margin-bottom: 0.5cm;

            font-family: "Roboto", sans-serif;
            font-weight: 100;
            font-style: normal;
        }

        /** Definir las reglas del encabezado **/
        header {
            position: fixed;
            top: -60px;
            left: 0px;
            right: 0px;
            background-color: rgba(0, 0, 0, 0.05)
        }

        /** Definir las reglas del pie de página **/
        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 20px;
            background-color: black;
            color: white;
            text-align: center;
        }
    </style>
</head>

<body>
    @include('intranet.proyectos.pdf.partials.header')
    @include('intranet.proyectos.pdf.partials.footer')
    <main style="font-size: 0.9em;">
        <div>
            <h3>Informe proyecto: {{ $proyecto->titulo }}</h3>
        </div>
        <br>
        <div>
            <span style="text-align: justify;"><strong>Objetivo del proyecto:</strong>{{ $proyecto->objetivo }}</span>
        </div>
        <br>
        <div style="white-space:nowrap;"><strong>Lider del proyecto:
                {{ $proyecto->lider->nombres . ' ' . $proyecto->lider->apellidos }}</strong></div>
        <hr>
        <div>
            <table>
                <tr>
                    <td colspan="2">
                        <strong>Miembros del Equipo</strong>
                    </td>
                </tr>
                @foreach ($proyecto->miembros_proyecto as $empleado)
                    @if ($empleado->id != $proyecto->config_usuario_id)
                        <tr>
                            <td><span>{{ $empleado->nombres . ' ' . $empleado->apellidos }}</span></td>
                            <td><span>{{ $empleado->empleado->cargo->cargo }}</span></td>
                        </tr>
                    @endif
                @endforeach
            </table>
        </div>
        <hr>
        <div>
            <strong>Datos Generales del proyecto</strong>
            <br>
            <?php
            switch ($proyecto->progreso) {
                case 0:
                    $color = 'red';
                    break;
                case $proyecto->progreso <= 25:
                    $color = 'navy';
                    break;
                case $proyecto->progreso <= 50:
                    $color = 'dodgerblue';
                    break;
                case $proyecto->progreso <= 75:
                    $color = 'aquamarine';
                    break;
                default:
                    $color = 'green';
                    break;
            }
            $porcentaje1 = $proyecto->progreso;
            $porcentaje2 = 100 - $porcentaje1;
            $red = 0;
            $green = ($porcentaje1 * 255) / 100;
            $blue = ($porcentaje2 * 255) / 100;

            $date1 = new DateTime($proyecto->fec_creacion);
            $date2 = new DateTime(Date('Y-m-d'));
            $diff = date_diff($date1, $date2);
            $differenceFormat = '%a';
            ?>
            <table>
                <tr>
                    <td style="padding-right: 15px">Fecha de creación:</td>
                    <td><span>{{ $proyecto->fec_creacion }}</span></td>
                </tr>
                <tr>
                    <td style="padding-right: 15px">Progeso General del proyecto:</td>
                    <td><span style="color: {{ $color }}">{{ number_format($proyecto->progreso, 2, ',', '.') }}
                            %</span></td>
                </tr>
                <tr>
                    <td style="padding-right: 15px">Estado del Proyecto:</td>
                    <td><span>{{ $proyecto->estado }}</span></td>
                </tr>
                <tr>
                    <td style="padding-right: 15px">Tiempo de gestión:</td>
                    <td><span>{{ $diff->format($differenceFormat) }} días</span></td>
                </tr>
            </table>

            @if ($proyecto->presupuesto > 0)
                <hr>
                <div
                    style="width: 95%; background-color: rgba(97, 97, 97, 0.1); padding: 15px; border-radius: 5px; border: 1px black solid;">
                    <table>
                        <tr>
                            <td colspan="2">
                                <h3><strong>Informacion Presupuestal de Proyecto</strong></h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Presupuesto del Proyecto:</span>
                            </td>
                            <td>
                                <span>{{ '$ ' . number_format($proyecto->presupuesto, 2, ',', '.') }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Ejecución del presupuesto:</span>
                            </td>
                            <td>
                                <span>{{ '$ ' . number_format($proyecto->ejecucion, 2, ',', '.') }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Porcentaje de ejecución:</span>
                            </td>
                            <td>
                                <span>{{ number_format($proyecto->porc_ejecucion, 2, ',', '.') }}%</span>
                            </td>
                        </tr>
                    </table>
                </div>
            @endif
            <hr>
            <div>
                <strong>Estadísticas del proyecto</strong>
            </div>
            <div>
                <div>
                    <h5><strong>Ponderacíon de Componentes</strong></h5>
                </div>
                <div>
                    <img src="{{$strUrlChart}}">
                </div>
                <br><br>
                <div>
                    <h5><strong>Avance de los Componentes</strong></h5>
                </div>
                <div>
                    <img src="{{$urlChartAvance}}">
                </div>
                <br><br>
                <div>
                    <h5><strong>Detalles Presupuestales</strong></h5>
                </div>
                <div>
                    <img src="{{$urlChartPresupuesto}}">
                </div>
                <br>
            </div>
            <hr>
            <div>
                <strong>Componentes del proyecto</strong>
            </div>
            <div>
                <ul>
                    @foreach ($proyecto->componentes as $componente)
                        <li><span>{{ $componente->titulo }}</span></li>
                    @endforeach
                </ul>
            </div>
            <br>
            @foreach ($proyecto->componentes as $componente)
                <hr>
                <strong>{{ $componente->titulo }}</strong>
                <br>
                <div>
                    <span style="text-align: justify;">Objetivo del componente: {{ $componente->objetivo }}</span>
                </div>
                <br>
                <div>
                    <table>
                        <tr>
                            <td><span>Responsable:</span></td>
                            <td><span>{{ $componente->responsable->nombres . ' ' . $componente->responsable->apellidos }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td><span>Cargo:</span></td>
                            <td><span>{{ $componente->responsable->empleado->cargo->cargo }}</span></td>
                        </tr>
                        <tr>
                            <td><span>Fecha de creación:</span></td>
                            <td><span>{{ $componente->fec_creacion }}</span></td>
                        </tr>
                        <tr>
                            <td><span>Estado:</span></td>
                            <td><span>{{ $componente->estado }}</span></td>
                        </tr>
                        <tr>
                            <td><span>Impacto:</span></td>
                            <td><span>{{ $componente->impacto }}</span></td>
                        </tr>
                        <tr>
                            <td><span>Porcentaje de avance:</span></td>
                            <td><span>{{ number_format(intval($componente->progreso), 2, ',', '.') }} %</span></td>
                        </tr>
                    </table>
                </div>
                @if ($componente->presupuesto > 0)
                    <br>
                    <div
                        style="width: 95%; background-color: rgba(97, 97, 97, 0.1); padding: 15px; border-radius: 5px; border: 1px black solid;">
                        <table>
                            <tr>
                                <td colspan="2">
                                    <strong>Informacion Presupuestal de Componente</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Presupuesto del Componente:</span>
                                </td>
                                <td style="text-align: right">
                                    <span>{{ '$ ' . number_format($componente->presupuesto, 2, ',', '.') }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Ejecución del presupuesto:</span>
                                </td>
                                <td style="text-align: right">
                                    <span>{{ '$ ' . number_format($componente->ejecucion, 2, ',', '.') }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Porcentaje de ejecución:</span>
                                </td>
                                <td style="text-align: right">
                                    <span>{{ number_format($componente->porc_ejecucion, 2, ',', '.') }}%</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                @endif
                <hr>
                <strong>Listado de tareas:</strong>
                <ol>
                    @foreach ($componente->tareas as $tarea)
                        <li><span>{{ $tarea->titulo }}</span>
                            <ul style="list-style-type: none;">
                                <li style="margin-top: 5px; margin-bottom: 5px;"><span>Objetivo de
                                        Tarea:{{ $tarea->objetivo }}</span></li>
                                <li>
                                    <table>
                                        <tr>
                                            <td><span>Responsable:</span></td>
                                            <td><span>{{ ucfirst(strtolower($tarea->responsable->nombres)) . ' ' . ucfirst(strtolower($tarea->responsable->apellidos)) }}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span>Fecha de creación</span></td>
                                            <td><span>{{ $tarea->fec_creacion }}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Fecha límite</span></td>
                                            <td><span>{{ $tarea->fec_limite }}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Progreso</span></td>
                                            <td><span>{{ $tarea->progreso }} %</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Estado</span></td>
                                            <td><span>{{ $tarea->estado }}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Impacto</span></td>
                                            <td><span>{{ $tarea->impacto }}</span></td>
                                        </tr>
                                    </table>
                                </li>
                                @if ($tarea->historiales->count() > 0)
                                    <li style="margin-top: 20px;"><strong>Historiales de la tarea:</strong>
                                        @foreach ($tarea->historiales as $historial)
                                            <ol>
                                                <li style="margin-bottom: 20px; margin-top: 10px;"><span>Titulo
                                                        historial: {{ $historial->titulo }}</span>
                                                    <table style="margin-top: 5px;">
                                                        <tr>
                                                            <td><span>Usuario registro:</span></td>
                                                            <td><span>{{ ucfirst(strtolower($tarea->responsable->nombres)) . ' ' . ucfirst(strtolower($tarea->responsable->apellidos)) }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Fecha de registro:</span></td>
                                                            <td><span>{{ $historial->fecha }}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Usuario asignado:</span></td>
                                                            <td><span>{{ ucfirst(strtolower($historial->asignado->nombres)) . ' ' . ucfirst(strtolower($historial->asignado->apellidos)) }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Avance progresivo:</span></td>
                                                            <td><span>{{ $historial->progreso }} %</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Costo asociado:</span></td>
                                                            <td><span>{{ $historial->costo }}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Resumen del Historial:</span></td>
                                                            <td><span
                                                                    style="text-align: justify">{{ $historial->resumen }}</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </li>
                                            </ol>
                                        @endforeach
                                    </li>
                                @else
                                    <li style="margin-bottom: 20px; margin-top: 20px;"><strong>Tarea sin
                                            historiales</strong></li>
                                @endif
                            </ul>
                        </li>
                    @endforeach
                </ol>
                <hr>
            @endforeach
        </div>
    </main>
</body>

</html>
