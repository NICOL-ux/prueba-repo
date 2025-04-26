import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule

interface Colaborador {
  nombre: string;
  avatarUrl?: string;
  rol?: string;
  email?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, MatIconModule], // Asegúrate de importar CommonModule y MatIconModule
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.scss'
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: Colaborador[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadColaboradores();
  }

  loadColaboradores() {
    // Ejemplo de datos de colaboradores (reemplaza con tu lógica real)
    this.colaboradores = [
      { nombre: 'Alice Smith', avatarUrl: 'https://via.placeholder.com/50/f0f0f0', rol: 'Desarrollador Frontend', email: 'alice.smith@example.com', githubUrl: 'https://github.com/alicesmith' },
      { nombre: 'Bob Johnson', avatarUrl: 'https://via.placeholder.com/50/e0e0e0', rol: 'Desarrollador Backend', email: 'bob.johnson@example.com', githubUrl: 'https://github.com/bobjohnson' },
      
      { nombre: 'Diana Lee', rol: 'Diseñadora UI/UX', githubUrl: 'https://github.com/dianalee' },
      { nombre: 'Eve Williams', avatarUrl: 'https://via.placeholder.com/50/c0c0c0', email: 'eve.williams@example.com' },
    ];
  }
}