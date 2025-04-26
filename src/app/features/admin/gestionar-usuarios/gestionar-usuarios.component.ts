import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface Usuario {
  id: string;
  nombreApellido: string;
  correo: string;
  contrasena: string;
}

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatInputModule, MatTableModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './gestionar-usuarios.component.html',
  styleUrl: './gestionar-usuarios.component.scss'
})
export class GestionarUsuariosComponent {
  displayedColumns: string[] = ['id', 'nombreApellido', 'correo', 'contrasena', 'acciones'];
  dataSource: Usuario[] = [
    { id: '001', nombreApellido: 'Carlos Sánchez', correo: '4827341-empresa.gob.pe', contrasena: '••••••••••' },
    { id: '002', nombreApellido: 'Ana Torres', correo: '4827342-empresa.gob.pe', contrasena: '••••••••••' },
    { id: '003', nombreApellido: 'Luis Gutiérrez', correo: '4827343-empresa.gob.pe', contrasena: '••••••••••' },
  ];
}