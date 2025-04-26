// src/app/core/services/repositorio.service.ts
import { Injectable, signal } from '@angular/core';
import { RepositorioComponent } from '../../features/usuarios/repositorio/repositorio.component'; // Ajusta la importación si es necesario

export interface Repositorio {
  nombre: string;
  descripcion?: string;
  archivoNombre: string;
  subidoEn: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RepositorioService {
  repositoriosSubidos = signal<Repositorio[]>([]);

  agregarRepositorio(nombre: string, descripcion: string | undefined, archivo: File) {
    this.repositoriosSubidos.update((repositorios) => [
      ...repositorios,
      {
        nombre: nombre,
        descripcion: descripcion,
        archivoNombre: archivo.name,
        subidoEn: new Date(),
      },
    ]);
  }

  obtenerRepositorios() {
    return this.repositoriosSubidos.asReadonly();
  }

  editarRepositorio(repositorioEditado: Repositorio) {
    this.repositoriosSubidos.update((repositorios) =>
      repositorios.map((repo) =>
        repo.archivoNombre === repositorioEditado.archivoNombre ? { ...repositorioEditado } : repo
      )
    );
  }

  eliminarRepositorio(archivoNombre: string) {
    this.repositoriosSubidos.update((repositorios) =>
      repositorios.filter((repo) => repo.archivoNombre !== archivoNombre)
    );
  }
}