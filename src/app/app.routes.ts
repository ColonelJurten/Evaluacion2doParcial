import { Routes } from '@angular/router';
import { LibroComponent } from './pages/libro/libro.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { EjercicioComponent } from './pages/ejercicio/ejercicio.component';
import { AcercaComponent } from './pages/acerca/acerca.component';

export const routes: Routes = [
    {
        path: 'libros',
        component:LibroComponent
    },
    {
        path: 'productos',
        component:ProductoComponent
    },
    {
        path: 'ejercicio',
        component:EjercicioComponent
    },
    {
        path: 'acercade',
        component:AcercaComponent
    },
    {
        path: '**',
        redirectTo: 'libros'
    }
];
