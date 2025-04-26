import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule

interface AccionNotificacion {
  label: string;
  handler: string; // O una función directamente
}

interface Notificacion {
  tipo: string;
  fecha: Date;
  mensaje: string;
  detalles?: string;
  acciones?: AccionNotificacion[];
}

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, MatButtonModule], // Asegúrate de importar CommonModule y MatButtonModule
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss'
})
export class NotificacionesComponent implements OnInit {
  notificaciones: Notificacion[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadNotificaciones();
  }

  loadNotificaciones() {
    // Ejemplo de datos de notificaciones (reemplaza con tu lógica real)
    this.notificaciones = [
      {
        tipo: 'Cambio',
        fecha: new Date(),
        mensaje: 'Se ha realizado una nueva commit en el repositorio principal.',
        detalles: 'Commit ID: abc1234',
      },
      {
        tipo: 'Actualización',
        fecha: new Date(Date.now() - 3600000), // Hace una hora
        mensaje: 'La rama "develop" ha sido actualizada.',
        acciones: [
          { label: 'Ver Cambios', handler: 'verCambios' },
        ],
      },
      {
        tipo: 'Alerta',
        fecha: new Date(Date.now() - 86400000), // Hace un día
        mensaje: 'Se han detectado posibles conflictos en la fusión de ramas.',
        acciones: [
          { label: 'Resolver Conflictos', handler: 'resolverConflictos' },
          { label: 'Ignorar', handler: 'ignorarAlerta' },
        ],
      },
    ];
  }

  ejecutarAccion(accion: AccionNotificacion, notificacion: Notificacion) {
    console.log(`Ejecutando acción "${accion.label}" para la notificación:`, notificacion);
    // Aquí implementarías la lógica para cada acción basada en el 'handler'
    if (accion.handler === 'verCambios') {
      // Lógica para ver los cambios
    } else if (accion.handler === 'resolverConflictos') {
      // Lógica para resolver conflictos
    } else if (accion.handler === 'ignorarAlerta') {
      // Lógica para ignorar la alerta
    }
  }
}