import { Routes } from '@angular/router';
import { LoginComponent } from './users/pages/login/login.component';
import { ProfesoraComponent } from './features/profesora/profesora.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { SubirRepositorioComponent } from './features/usuarios/subir-repositorio/subir-repositorio.component';
import { RepositorioComponent } from './features/usuarios/repositorio/repositorio.component';
import { HistorialCommitComponent } from './features/usuarios/historial-commit/historial-commit.component';
import { ColaboradoresComponent } from './features/usuarios/colaboradores/colaboradores.component';
import { NotificacionesComponent } from './features/usuarios/notificaciones/notificaciones.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profesora',
    component: ProfesoraComponent,
    canActivate: [AuthGuard],
    data: { roles: ['profesora'] },
    children: [
      { path: '', redirectTo: 'gestion-alumnos', pathMatch: 'full' },
   
    ],
  },
  {
    path: 'usuario',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['usuario'] },
    children: [
      { path: '', redirectTo: 'repositorio', pathMatch: 'full' },
      { path: 'repositorio', component: RepositorioComponent },
      { path: 'subir-repositorio', component: SubirRepositorioComponent },
      { path: 'historial-commit', component: HistorialCommitComponent },
      { path: 'colaboradores', component: ColaboradoresComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];