<?php

namespace App\Http\Controllers\Proyectos;

use App\Http\Controllers\Controller;
use App\Models\Empresa\Empleado;
use App\Models\Proyectos\Componente;
use App\Models\Proyectos\Historial;
use App\Models\Proyectos\HistorialDoc;
use App\Models\Proyectos\Proyecto;
use App\Models\Proyectos\Tarea;
use App\Models\Sistema\Notificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class HistorialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create($id)
    {
        $tarea = Tarea::findOrfail($id);
        //------------------------------------------------------------------
        $proyecto = $tarea->componente->proyecto;
        $lider = $proyecto->lider;
        $ids_empresas = [];

        if ($lider->empresas_tranv->count() > 0) {
            foreach ($lider->empresas_tranv as $empresa) {
                $ids_empresas[] = $empresa->id;
            }
            $empleados1 = Empleado::where('estado', 1)
                ->whereHas('cargo', function ($p) use ($ids_empresas) {
                    $p->whereHas('area', function ($q) use ($ids_empresas) {
                        $q->whereIn('empresa_id', $ids_empresas);
                    });
                })->get();
            $empleados2 = Empleado::where('estado', 1)
                ->whereHas('cargo', function ($p) use ($ids_empresas) {
                    $p->whereHas('area', function ($q) use ($ids_empresas) {
                        $q->whereNotIn('empresa_id', $ids_empresas);
                    });
                })->whereHas('empresas_tranv', function ($p) use ($proyecto) {
                    $p->where('empresa_id', $proyecto->empresa_id);
                })->get();
            $empleados = $empleados1->concat($empleados2);
        } else {
            $empleados = Empleado::where('estado', 1)
                ->whereHas('cargo', function ($p) use ($proyecto) {
                    $p->whereHas('area', function ($q) use ($proyecto) {
                        $q->where('empresa_id', $proyecto->empresa_id);
                    });
                })->get();
        }
        //------------------------------------------------------------------
        return view('intranet.proyectos.historial.crear',compact('tarea','empleados'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $historial_new['tarea_id'] = $request['tarea_id'];
        $historial_new['empleado_id'] = $request['empleado_id'];
        $historial_new['usuarioasignado_id'] = $request['usuarioasignado_id'];
        $historial_new['titulo'] = $request['titulo'];
        $historial_new['fecha'] = $request['fecha'];
        $historial_new['resumen'] = $request['resumen'];
        $historial_new['progreso'] = $request['progreso'];
        $historial_new['costo'] = $request['costo'];
        $historial = Historial::create($historial_new);
        $tareaP = Tarea::findOrFail($request['tarea_id']);
        $tareaUpdate['progreso'] = $historial->progreso;
        Tarea::findOrFail($request['tarea_id'])->update($tareaUpdate);


        if ($request->hasFile('doc_historial')) {
            $this->guardar_archivos($request['doc_historial'], $historial->id);
        }
        if ($historial->costo > 0) {
            $tareaUpdate['costo'] = $request['costo'] + $historial->tarea->costo;
            Tarea::findOrFail($request['tarea_id'])->update($tareaUpdate);

            $componente = Componente::findOrFail($historial->tarea->componente_id);
            $componenteUpdate['ejecucion'] = $request['costo'] + $componente->ejecucion;
            $componenteUpdate['porc_ejecucion'] = (($request['costo'] + $componente->ejecucion) * 100) / $componente->presupuesto;
            Componente::findOrFail($historial->tarea->componente_id)->update($componenteUpdate);

            $proyecto = Proyecto::findOrFail($componente->proyecto_id);
            $proyectoUpdate['ejecucion'] = $request['costo'] + $proyecto->ejecucion;
            $proyectoUpdate['porc_ejecucion'] = (($request['costo'] + $proyecto->ejecucion) * 100) / ($proyecto->presupuesto + $proyecto->adiciones->sum('adicion'));
            Proyecto::findOrFail($componente->proyecto_id)->update($proyectoUpdate);
        }
        //----------------------------------------------------------------------------------------------------
        if ($request['empleado_id'] != $request['usuarioasignado_id']) {
            $dia_hora = date('Y-m-d H:i:s');
            $notificacion['usuario_id'] =  $request['empleado_id'];
            $notificacion['fec_creacion'] =  $dia_hora;
            $notificacion['titulo'] =  'Se asigno una nueva tarea';
            $notificacion['mensaje'] =  'Se creo un nuevo historial  de tarea al proyecto ' . $tareaP->componente->proyecto->titulo . ' y te fue asignada -> ' . ucfirst($request['titulo']);
            $notificacion['link'] =  route('proyectos.gestion', ['id' => $tareaP->componente->proyecto->id]);
            $notificacion['id_link'] =  $tareaP->componente->proyecto->id;
            $notificacion['tipo'] =  'tarea';
            $notificacion['accion'] =  'creacion';
            Notificacion::create($notificacion);
        }
        //----------------------------------------------------------------------------------------------------
        $this->modificarprogresos($tareaP->componente->proyecto);
        return redirect('dashboard/tareas/gestion/' . $request['tarea_id'])->with('mensaje', 'historial creado con éxito');
    }
    public function gestion(){


    }
    public function modificarprogresos($proyecto){
        $progresoProyecto = 0;
        foreach ($proyecto->componentes as $componente) {
            $progresoComponente =0;
            foreach ($componente->tareas as $tarea) {
                $progresoComponente+=($tarea->impacto_num/$componente->tareas->sum('impacto_num'))*$tarea->progreso;
            }
            $componente->update(['progreso'=>$progresoComponente]);
            $progresoProyecto+=($componente->impacto_num/$proyecto->componentes->sum('impacto_num'))*$componente->progreso;
        }
        $proyecto->update(['progreso'=>$progresoProyecto]);
    }

    public function guardar_archivos($doc_historial, $proy_historiales_id)
    {
        $i = 0;
        //dd($doc_historial);
        foreach ($doc_historial as $archivo) {
            $i++;
            $extension = $archivo->extension();
            $titulo = utf8_encode(utf8_decode($archivo->getClientOriginalName()));
            $tipo = $this->mime_content_type($titulo);
            $url = time() . '-' . utf8_encode(utf8_decode($archivo->getClientOriginalName()));
            $peso = filesize($archivo) / 1000000;
            $new_proy_historialdoc['proy_historiales_id'] = $proy_historiales_id;
            $new_proy_historialdoc['titulo'] = $titulo;
            $new_proy_historialdoc['tipo'] = $tipo;
            $new_proy_historialdoc['url'] = $url;
            $new_proy_historialdoc['peso'] = $peso;
            // - - - - - - - - - - - - - - - - - - - - - - - -
            $ruta = Config::get('constantes.folder_doc_historial');
            $ruta = trim($ruta);
            $doc_subido = $archivo;
            $doc_subido->move($ruta, $url);
            // - - - - - - - - - - - - - - - - - - - - - - - -
            HistorialDoc::create($new_proy_historialdoc);
        }
    }

    public function guardar_doc_hist(Request $request)
    {
        if ($request->ajax()) {
            // - - - - - - - - - - - - - - - - - - - - - - - -
            if ($request->hasFile('docu_historial')) {
                $ruta = Config::get('constantes.folder_doc_historial');
                $ruta = trim($ruta);
                $fichero_subido = $ruta . time() . '-' . basename($_FILES['docu_historial']['name']);


                $archivo = $request->docu_historial;
                $titulo = $archivo->getClientOriginalName();
                $tipo = $archivo->getClientMimeType();
                $url = time() . '-' . basename($_FILES['docu_historial']['name']);
                $peso = $archivo->getSize() / 1000;
                move_uploaded_file($_FILES['docu_historial']['tmp_name'], $fichero_subido);
                HistorialDoc::create([
                    'historial_id' => $request['historial_id'],
                    'titulo' => $titulo,
                    'tipo' => $tipo,
                    'url' => $url,
                    'peso' => $peso,
                ]);
                return response()->json(['mensaje' => 'ok','titulo' =>$titulo,'url' =>$url]);
            }else{
                return response()->json(['mensaje' => 'ng']);
            }
            // - - - - - - - - - - - - - - - - - - - - - - - -
            return 'ok';
        } else {
            abort(404);
        }
    }

    public function mime_content_type($filename)
    {

        $mime_types = array(

            'txt' => 'text/plain',
            'htm' => 'text/html',
            'html' => 'text/html',
            'php' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'xml' => 'application/xml',
            'swf' => 'application/x-shockwave-flash',
            'flv' => 'video/x-flv',

            // images
            'png' => 'image/png',
            'jpe' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'jpg' => 'image/jpeg',
            'gif' => 'image/gif',
            'bmp' => 'image/bmp',
            'ico' => 'image/vnd.microsoft.icon',
            'tiff' => 'image/tiff',
            'tif' => 'image/tiff',
            'svg' => 'image/svg+xml',
            'svgz' => 'image/svg+xml',

            // archives
            'zip' => 'application/zip',
            'rar' => 'application/x-rar-compressed',
            'exe' => 'application/x-msdownload',
            'msi' => 'application/x-msdownload',
            'cab' => 'application/vnd.ms-cab-compressed',

            // audio/video
            'mp3' => 'audio/mpeg',
            'qt' => 'video/quicktime',
            'mov' => 'video/quicktime',

            // adobe
            'pdf' => 'application/pdf',
            'psd' => 'image/vnd.adobe.photoshop',
            'ai' => 'application/postscript',
            'eps' => 'application/postscript',
            'ps' => 'application/postscript',

            // ms office
            'doc' => 'application/msword',
            'rtf' => 'application/rtf',
            'xls' => 'application/vnd.ms-excel',
            'ppt' => 'application/vnd.ms-powerpoint',
            'docx' => 'application/msword',
            'rtfx' => 'application/rtf',
            'xlsx' => 'application/vnd.ms-excel',
            'pptx' => 'application/vnd.ms-powerpoint',

            // open office
            'odt' => 'application/vnd.oasis.opendocument.text',
            'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
        );

        $ext = $file_extension = pathinfo($filename, PATHINFO_EXTENSION);;
        if (array_key_exists($file_extension, $mime_types)) {
            return $mime_types[$file_extension];
        } elseif (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME);
            $mimetype = finfo_file($finfo, $filename);
            finfo_close($finfo);
            return $mimetype;
        } else {
            return 'application/octet-stream';
        }
    }
}
