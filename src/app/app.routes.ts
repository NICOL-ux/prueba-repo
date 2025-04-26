import { Routes } from '@angular/router';
import { LoginComponent } from './users/pages/login/login.component';
import { ProfesoraComponent } from './features/profesora/profesora.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UsuariosComponent } from './features/usuarios/usuarios.component';

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
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];