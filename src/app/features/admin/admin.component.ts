import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MenuAdminComponent } from './pages/menu-admin/menu-admin.component'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MenuAdminComponent // Usa el componente de menú para admin
  ],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="example-spacer"></span>
      <h1>Administrador</h1>
      <span class="example-spacer"></span>

      <button mat-icon-button (click)="isDarkMode.set(!isDarkMode())">
        <mat-icon>
          {{ isDarkMode() ? 'dark_mode' : 'light_mode' }}
        </mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-menu-admin [collapsed]="collapsed()" />
      </mat-sidenav>

      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-toolbar {
      position: relative;
      z-index: 5;
      box-shadow: var(--mat-sys-level3);
    }

    .content {
      padding: 24px;
    }

    mat-sidenav-container {
      height: calc(100vh - 64px);
    }

    mat-sidenav {
      border-radius: 0;
    }

    mat-sidenav,
    mat-sidenav-content {
      transition: all 0.5s ease-in-out;
    }

    .example-spacer {
      flex: 1 1 auto;
    }
  `]
})
export class AdminComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  isDarkMode = signal(false);

  private _document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this._document.body.classList.toggle('dark', this.isDarkMode());
    });
  }
}