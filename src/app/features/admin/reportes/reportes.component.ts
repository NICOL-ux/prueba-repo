// reportes.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface Documento {
  nombre: string;
  fecha: string;
  usuario: string;
  estado: string;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, MatInputModule, MatButtonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
})
export class ReportesComponent {
  displayedColumns: string[] = ['nombre', 'fecha', 'usuario', 'estado', 'acciones'];
  dataSource: Documento[] = [
    { nombre: 'Oficio 001', fecha: '2025-04-01', usuario: 'Juan-edu.pe', estado: 'Activo' },
    { nombre: 'Informe Técnico', fecha: '2025-04-05', usuario: 'Maria-edu.pe', estado: 'Activo' },
    { nombre: 'Solicitud 09', fecha: '2025-04-10', usuario: 'Jesus-edu.pe', estado: 'Eliminado' },
  ];
}