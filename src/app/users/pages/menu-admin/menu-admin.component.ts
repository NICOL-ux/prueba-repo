// src/app/users/pages/menu-admin/menu-admin.component.ts
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
    <mat-list>
      <mat-list-item *ngFor="let item of filteredMenuItems(); trackBy: trackByFn">
        <button mat-button [routerLink]="['/administrador', item.route]" routerLinkActive="active-link">
          <mat-icon>{{ item.icon }}</mat-icon>
          <span *ngIf="!collapsed">{{ item.label }}</span>
        </button>
      </mat-list-item>
    </mat-list>
    <button mat-raised-button color="warn" (click)="logout()">Cerrar sesión</button>
  `,
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {
  @Input() collapsed = false;

  administradorMenuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Panel', route: 'panel' },
    { icon: 'people', label: 'Usuarios', route: 'gestionar-usuarios' },
    { icon: 'security', label: 'Reportes', route: 'reportes' },
    { icon: 'folder', label: 'Recursos', route: 'recursos' },
    { icon: 'timeline', label: 'Monitoreo', route: 'monitoreo' },
  ]);

  filteredMenuItems = computed(() => {
    const role = this.roleService.getRole();
    switch (role) {
      case 'administrador':
        return this.administradorMenuItems();
      default:
        return [];
    }
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
