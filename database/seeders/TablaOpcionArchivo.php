<?php

namespace Database\Seeders;

use App\Models\Empresa\Empresa;
use App\Models\Empresa\OpcionArchivo;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TablaOpcionArchivo extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('empresas_opcionarchivo')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('opcionarchivo')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        $opciones = [
            ['empresa_id' => 1, 'titulo' => 'Hojas de vida', 'contenido' => 'Gestione y custodie la información relacionada con la hoja de vida y soportes de trabajadores y contratistas', 'imagen' => '1 Hojas-de-vida.png', 'url' => 'hojas_vida.index',],
            ['empresa_id' => 1, 'titulo' => 'Manuales de funciones', 'contenido' => 'Gestione y custodie los manuales de funciones y competencias del personal de su empresa', 'imagen' => '3 Manuales-de-funciones.png', 'url' => 'manuales.index',],
            ['empresa_id' => 1, 'titulo' => 'Soportes de Afiliación', 'contenido' => 'Gestione y custodie los soportes de afiliación y traslado en Salud, Pensiones, Riesgos Laborales, Cajas de Compensación y Fondos de Cesantías, así como las planillas de pago', 'imagen' => '4 Soportes-de-Afiliación.png', 'url' => 'soportes_afiliacion.index',],
            ['empresa_id' => 1, 'titulo' => 'Documentos contractuales', 'contenido' => 'Gestione y custodie los contratos de trabajo, contratos de prestación de servicios y otro síes', 'imagen' => '2 Documentos-contractuales.png', 'url' => 'documentos_contractuales.index',],
            ['empresa_id' => 1, 'titulo' => 'Situaciones laborales generales', 'contenido' => 'Gestione y custodie información relacionada con certificaciones, solicitudes de trabajo fuera de la jornada laboral, suspensiones, día de la familia, solicitudes, derechos de petición y respuestas de la empresa a los trabajadores', 'imagen' => '13 situaciones laborales generales.png', 'url' => 'sit_lab_gen.index',],
            ['empresa_id' => 1, 'titulo' => 'Historias clínicas ocupacionales', 'contenido' => 'Gestione y custodie los exámenes médicos de ingreso, periódicos y de retiro de sus trabajadores y otros', 'imagen' => '5 Historias-clínicas-ocupacionales.png', 'url' => 'histclinicasocup.index',],
            ['empresa_id' => 1, 'titulo' => 'Entrega de dotación, elementos de trabajo y de protección', 'contenido' => 'Gestione y custodie los soportes de la dotación, elementos de trabajo y protección que sean entregados a sus trabajadores y contratistas', 'imagen' => '6 Entrega-de-dotación.png', 'url' => 'dotaciones.index',],
            ['empresa_id' => 1, 'titulo' => 'Proceso disciplinario, faltas y sanciones', 'contenido' => 'Gestione y custodie información relacionada con el debido proceso disciplinario como: citaciones, formulación de cargos, traslado de pruebas, diligencias de cargos, sanciones y terminaciones de contrato derivadas de un proceso disciplinario', 'imagen' => '7 Proceso-disciplinario.png', 'url' => 'proceso_discip.index',],
            ['empresa_id' => 1, 'titulo' => 'Evaluaciones de desempeño', 'contenido' => 'Gestione y custodie las evaluaciones de desempeño de sus trabajadores', 'imagen' => '8 Evaluaciones-de-desempeño.png', 'url' => 'evaluacion_desemp.index',],
            ['empresa_id' => 1, 'titulo' => 'Vacaciones y licencias', 'contenido' => 'Gestione y custodie información relacionada con el otorgamiento de vacaciones, permisos y licencias a sus trabajadores', 'imagen' => '10 Vacaciones-y-licencias.png', 'url' => 'vacaciones.index',],
            ['empresa_id' => 1, 'titulo' => 'Documentos de Retiro', 'contenido' => 'Gestione y custodie información relacionada con cartas de terminación, terminaciones por mutuo acuerdo, renuncias, transacciones, conciliaciones, autorización de retiro de cesantías, liquidación final de acreencias, paz y salvos, certificado laboral', 'imagen' => '9 Documentos-de-retiro.png', 'url' => 'doc_retiro.index',],
            ['empresa_id' => 1, 'titulo' => 'Capacitaciones y certificaciones', 'contenido' => 'Gestione y custodie los soportes de las capacitaciones y certificaciones que se realizan a sus trabajadores y contratistas', 'imagen' => '11 Capacitaciones.png', 'url' => 'capacitacion.index',],
            ['empresa_id' => 1, 'titulo' => 'Políticas, Reglamentos y otros', 'contenido' => 'Gestione y custodie las Políticas, Reglamentos, Planes de Beneficios, Pactos y Convenciones Colectivas que tenga su empresa, conformación y reuniones de comités', 'imagen' => '12 Políticas-y-Reglamentos.png', 'url' => 'politica.index',],
            ['empresa_id' => 1, 'titulo' => 'Diagnósticos Legales', 'contenido' => 'Haga seguimiento al estado legal de su empresa u organización', 'imagen' => 'ICONO4.png', 'url' => 'diagnosticos.index',],
            ['empresa_id' => 1, 'titulo' => 'Gestión de Clientes', 'contenido' => 'Gestione datos y documentos relevantes de sus clintes', 'imagen' => 'clientes.png', 'url' => 'cliente.index',],
            ['empresa_id' => 1, 'titulo' => 'Gestión de Proveedores', 'contenido' => 'Gestione datos y documentos relevantes de sus proveedores', 'imagen' => 'proveedores.png', 'url' => 'proveedores.index',],
            ['empresa_id' => 1, 'titulo' => 'Permisos Archivo', 'contenido' => 'Gestione los permisos de los usarios a las opciones de la plataforma', 'imagen' => '14 permisos.png', 'url' => 'permisosarchivo.index',],
        ];
        $empresas = Empresa::get();

        foreach ($opciones as $item) {
            $opcion = OpcionArchivo::create([
                'titulo' => $item['titulo'],
                'contenido' => $item['contenido'],
                'imagen' => $item['imagen'],
                'url' => $item['url'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);

            foreach ($empresas as $empresa) {
                $empresa->opcionesarchivo()->attach($opcion->id);
            }
        }
    }
}
