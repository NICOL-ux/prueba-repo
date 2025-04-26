// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './users/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { SubirRepositorioComponent } from './features/usuarios/subir-repositorio/subir-repositorio.component';
import { RepositorioComponent } from './features/usuarios/repositorio/repositorio.component';
import { HistorialCommitComponent } from './features/usuarios/historial-commit/historial-commit.component';
import { ColaboradoresComponent } from './features/usuarios/colaboradores/colaboradores.component';
import { NotificacionesComponent } from './features/usuarios/notificaciones/notificaciones.component';
import { AdminComponent } from './features/admin/admin.component';
import { ReportesComponent } from './features/admin/reportes/reportes.component';
import { PanelComponent } from './features/admin/panel/panel.component';
import { DocumentosComponent } from './features/admin/documentos/documentos.component';
import { GestionarUsuariosComponent } from './features/admin/gestionar-usuarios/gestionar-usuarios.component';
import { MonitoreoComponent } from './features/admin/monitoreo/monitoreo.component';
import { RecursosComponent } from './features/admin/recursos/recursos.component';

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
    path: 'administrador',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['administrador'] },
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      { path: 'panel', component: PanelComponent },
      { path: 'documentos', component: DocumentosComponent },
      { path: 'gestionar-usuarios', component: GestionarUsuariosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'recursos', component: RecursosComponent },
      { path: 'monitoreo', component: MonitoreoComponent },
     
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
