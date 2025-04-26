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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF3LjU_BWp6Kbt2KKh6ydZ_WCNsEbosyZ6Xw&s"
          alt="perfil"
          class="profile-image"
          [style.width.px]="profileImageSize()"
          [style.height.px]="profileImageSize()"
        />
      </div>
      <h2 class="profile-name" [class.collapsed]="collapsed">Profesora</h2>
      <h3 class="user-name" [class.collapsed]="collapsed">Karina</h3>
      <p class="email" [class.collapsed]="collapsed">karina123gmai</p>
    </div>

    <mat-nav-list class="menu-list">
      <ng-container *ngFor="let item of filteredMenuItems(); trackBy: trackByFn">
        <a class="menu-item" [routerLink]="item.route" routerLinkActive="active-link">
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
  `
})
export class MenuComponent {
  @Input() collapsed = false;

  profesoraMenuItems = signal<MenuItem[]>([
    { icon: 'person', label: 'Gestión Alumnos', route: 'gestion-alumnos' },
    { icon: 'tablet_mac', label: 'Gestión Tablet', route: 'gestion-tables' },
    { icon: 'download', label: 'Ingreso Tablets', route: 'ingreso-tablet' },
    { icon: 'history', label: 'Historial Asignación', route: 'historial-asignacion' },
  ]);

  usuariosMenuItems = signal<MenuItem[]>([
    { icon: 'folder_open', label: 'Mis Repositorios', route: 'repositorio' }, // 'folder_open' para repositorios
    { icon: 'upload_file', label: 'Subir Repositorios', route: 'subir-repositorio' }, // 'upload_file' para subir
    { icon: 'code', label: 'Historial de Commit', route: 'historial-commit' }, // 'code' para commits
    { icon: 'group', label: 'Colaboradores', route: 'colaboradores' }, // 'group' para colaboradores
    { icon: 'notifications', label: 'Notificaciones', route: 'notificaciones' }, // 'notifications' para notificaciones
  ]);

  filteredMenuItems = computed(() => {
    const role = this.roleService.getRole();
    switch (role) {
      case 'profesora':
        return this.profesoraMenuItems();
      case 'director':
        return this.usuariosMenuItems();
      default:
        return [];
    }
  });

  profileImageSize = computed(() => (this.collapsed ? 40 : 80));

  constructor(private router: Router, private roleService: RoleService) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(`/${route}`, true);
  }

  logout(): void {
    this.roleService.setRole('');
    this.router.navigate(['/login']);
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.route;
  }
}
