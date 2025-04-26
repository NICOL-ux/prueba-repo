import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar DatePipe

interface Commit {
  id: string;
  author: string;
  date: Date;
  message: string;
  branch?: string;
}

@Component({
  selector: 'app-historial-commit',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule
  templateUrl: './historial-commit.component.html',
  styleUrl: './historial-commit.component.scss'
})
export class HistorialCommitComponent implements OnInit {
  commits: Commit[] = []; // Inicializa el array de commits

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías cargar los datos del historial de commits desde un servicio
    this.loadCommitHistory();
  }

  loadCommitHistory() {
    // Ejemplo de datos de commits (reemplaza con tu lógica real)
    this.commits = [
      { id: 'a1b2c3d4e5f6', author: 'Usuario 1', date: new Date('2025-04-25T10:00:00Z'), message: 'feat: Implementar la funcionalidad X' },
      { id: 'f9e8d7c6b5a4', author: 'Usuario 2', date: new Date('2025-04-24T15:30:00Z'), message: 'fix: Corregir error en el módulo Y', branch: 'develop' },
      { id: '1234567890abcdef', author: 'Usuario 1', date: new Date('2025-04-23T09:15:00Z'), message: 'docs: Actualizar la documentación' },
      // ... más commits
    ];
  }
}