// src/app/features/usuarios/repositorio/repositorio.component.ts
import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repositorio, RepositorioService } from '../../../core/services/repositorio.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { EditarRepositorioDialogComponent } from './editar-repositorio-dialog/editar-repositorio-dialog.component'; // Importa el diálogo de edición
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-repositorio',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, DatePipe, MatButtonModule], // Añade MatButtonModule
  templateUrl: './repositorio.component.html',
  styleUrl: './repositorio.component.scss',
})
export class RepositorioComponent implements OnInit {
  private repositorioService = inject(RepositorioService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  repositorios: Signal<Repositorio[]> = this.repositorioService.obtenerRepositorios();

  constructor() {}

  ngOnInit(): void {}

  editarRepositorio(repositorio: Repositorio) {
    const dialogRef = this.dialog.open(EditarRepositorioDialogComponent, {
      width: '400px',
      data: { ...repositorio }, // Pasa una copia del repositorio al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.repositorioService.editarRepositorio(result);
        this.snackBar.open(`Repositorio "${result.nombre}" editado exitosamente.`, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  eliminarRepositorio(repositorio: Repositorio) {
    if (confirm(`¿Estás seguro de que quieres eliminar el repositorio "${repositorio.nombre}"?`)) {
      this.repositorioService.eliminarRepositorio(repositorio.archivoNombre); // Usamos un identificador único para eliminar
      this.snackBar.open(`Repositorio "${repositorio.nombre}" eliminado.`, 'Cerrar', {
        duration: 3000,
      });
    }
  }
}