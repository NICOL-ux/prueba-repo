import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { RoleService } from '../../../../core/services/role.service'; // Asegúrate de que la ruta sea correcta

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-menu-admin',
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
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="perfil admin"
          class="profile-image"
          [style.width.px]="profileImageSize()"
          [style.height.px]="profileImageSize()"
        />
      </div>
      <h2 class="profile-name" [class.collapsed]="collapsed">Administrador</h2>
      <h3 class="user-name" [class.collapsed]="collapsed">Admin Name</h3>
      <p class="email" [class.collapsed]="collapsed">adminxamplecom</p>
    </div>

    <mat-nav-list class="menu-list">
      <ng-container *ngFor="let item of adminMenuItems(); trackBy: trackByFn">
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
export class MenuAdminComponent {
  @Input() collapsed = false;

  // Menú para administrador
  adminMenuItems = signal<MenuItem[]>([
       { icon: 'dashboard', label: 'Panel de Control', route: 'panel' },
       { icon: 'group', label: 'Gestionar Usuarios', route: 'usuarios' },
       { icon: 'shield', label: 'Moderacion de contenidos', route: 'reportes' },
       { icon: 'folder', label: 'Gestion de Recursos', route: 'recursos' },
       { icon: 'activity', label: 'Monitoreo de Actividad', route: 'monitoreo' },
    // Agrega aquí más elementos de menú para el administrado
  ]);

  profileImageSize = computed(() => (this.collapsed ? 40 : 80));

  constructor(private router: Router, private roleService: RoleService) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(`/${route}`, true);
  }

  logout(): void {
    this.roleService.setRole(''); // O la lógica para limpiar el rol de administrador
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.route;
  }
}