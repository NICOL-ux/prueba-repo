import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-monitoreo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="panel-container">
      <section class="estadisticas">
        <h2 class="titulo-seccion">
          <mat-icon class="icono-seccion">monitoring</mat-icon>
          Monitoreo de Actividad
        </h2>
        <div class="contenedor-estadisticas">
          <mat-card class="card total">
            <mat-card-content class="card-content">
              <div class="icono">
                <mat-icon color="primary">cloud_upload</mat-icon>
              </div>
              <h4>Repositorios subidos</h4>
              <p>5</p>
            </mat-card-content>
          </mat-card>
          <mat-card class="card aprobados">
            <mat-card-content class="card-content">
              <div class="icono">
                <mat-icon color="accent">group</mat-icon>
              </div>
              <h4>Usuarios activos</h4>
              <p>4</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="card rechazados">
            <mat-card-content class="card-content">
              <div class="icono">
                <mat-icon color="warn">warning</mat-icon>
              </div>
              <h4>Alertas de seguridad</h4>
              <p>4</p>
            </mat-card-content>
          </mat-card>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./monitoreo.component.scss'],
})
export class MonitoreoComponent {}