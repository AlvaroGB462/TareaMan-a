import { Routes } from '@angular/router';
import { TareasComponent } from './pages/tareas/tareas.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'tareas', component: TareasComponent },
];
