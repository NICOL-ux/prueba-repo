import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
  ],
  template: `
    <div class="profile-section" [class.collapsed]="collapsed">
      <div class="profile-image-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3839/3839635.png"
          alt="perfil"
          class="profile-image"
          [style.width.px]="profileImageSize()"
          [style.height.px]="profileImageSize()"
        />
      </div>
      <h2 class="profile-name" [class.collapsed]="collapsed">{{ profileName() }}</h2>
      <h3 class="user-name" [class.collapsed]="collapsed">Nombre</h3>
      <p class="email" [class.collapsed]="collapsed">correoejemplo.com</p>
    </div>

    <mat-nav-list class="menu-list">
      <ng-container *ngFor="let item of filteredMenuItems(); trackBy: trackByFn">
        <a class="menu-item" [routerLink]="[item.route]" routerLinkActive="active-link">
          <mat-list-item [activated]="isActiveRoute(item.route)">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span [class.collapsed]="collapsed">{{ item.label }}</span>
          </mat-list-item>
        </a>
      </ng-container>
    </mat-nav-list>

    <div class="logout-section" [class.collapsed]="collapsed">
      <button mat-button class="logout-button" (click)="logout()">
        <mat-icon>logout</mat-icon>
        <span [class.collapsed]="collapsed">Cerrar sesión</span>
      </button>
    </div>
  `,
  styles: `
    :host {
      transition: all 500ms ease-in-out;
    }

    .profile-section {
      text-align: center;
      padding: 16px;
    }

    .profile-image {
      border-radius: 50%;
      object-fit: cover;
    }

    .collapsed {
      display: none;
    }

    .menu-list {
      margin-top: 16px;
    }

    .menu-item {
      text-decoration: none;
      color: inherit;
    }

    .logout-section {
      padding: 16px;
    }

    .logout-button {
      width: 100%;
      justify-content: start;
    }

    .active-link {
      background-color: rgba(63, 81, 181, 0.1);
    }
  `,
})
export class MenuComponent {
  @Input() collapsed = false;

  // Menú para administrador
  adminMenuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Panel', route: '/admin/panel' },
    { icon: 'people', label: 'Usuarios', route: '/admin/usuarios' },
    { icon: 'security', label: 'Reportes', route: '/admin/reportes' },
    { icon: 'folder', label: 'Recursos', route: '/admin/recursos' },
    { icon: 'timeline', label: 'Monitoreo', route: '/admin/monitoreo' },
  ]);

  // Menú para usuario (repositorio)
  usuarioMenuItems = signal<MenuItem[]>([
    { icon: 'upload_file', label: 'Subir Repositorios', route: '/usuario/subir-repositorio' },
    { icon: 'folder_open', label: 'Mis Repositorios', route: '/usuario/repositorio' },
    { icon: 'code', label: 'Historial de Commit', route: '/usuario/historial-commit' },
    { icon: 'group', label: 'Colaboradores', route: '/usuario/colaboradores' },
    { icon: 'notifications', label: 'Notificaciones', route: '/usuario/notificaciones' },
  ]);

  // Computa el menú según el rol
  filteredMenuItems = computed(() => {
    const role = this.roleService.getRole();
    switch (role) {
      case 'admin':
        return this.adminMenuItems();
      case 'usuario':
        return this.usuarioMenuItems();
      default:
        return [];
    }
  });

  profileName = computed(() => {
    const role = this.roleService.getRole();
    return role === 'admin' ? 'Administrador' : 'Usuario';
  });

  profileImageSize = computed(() => (this.collapsed ? 40 : 80));

  constructor(private router: Router, private roleService: RoleService) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(route, true);
  }

  logout(): void {
    this.roleService.setRole('');
    this.router.navigate(['/login']);
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.route;
  }
}