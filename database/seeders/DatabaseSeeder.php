<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            TablaTiposDocuSeeder::class,
            TablaEmpGrupos::class,
            TablaEmpresas::class,
            TablaAreas::class,
            TablaRolesSeeder::class,
            TablaCargos::class,
            TablaMenusSeeder::class,
            TablaUsuariosSeeder::class,
            TablaProyectos::class,
            TablaComponentes::class,
            TablaTareas::class,
            TablaOpcionArchivo::class,

        ]);
    }
}
