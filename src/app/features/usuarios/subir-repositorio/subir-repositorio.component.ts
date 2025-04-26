// src/app/features/usuarios/subir-repositorio/subir-repositorio.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RepositorioService } from '../../../core/services/repositorio.service'; // Importa el servicio

@Component({
  selector: 'app-subir-repositorio',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Usa solo ReactiveFormsModule ya que estás usando FormGroup
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './subir-repositorio.component.html',
  styleUrl: './subir-repositorio.component.scss',
})
export class SubirRepositorioComponent {
  private repositorioService = inject(RepositorioService); // Inyecta el servicio
  uploadForm: FormGroup;
  archivoSubido: File | null = null;
  subiendo: boolean = false;
  uploadProgress: number = 0;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.uploadForm = this.fb.group({
      nombreRepositorio: ['', Validators.required],
      descripcion: [''],
      archivo: [null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.archivoSubido = file;
  }

  subirRepositorio() {
    if (this.uploadForm.valid && this.archivoSubido) {
      this.subiendo = true;
      this.uploadProgress = 0;

      // **Lógica real para subir el archivo al backend**
      const formData = new FormData();
      formData.append('nombreRepositorio', this.uploadForm.value.nombreRepositorio);
      formData.append('descripcion', this.uploadForm.value.descripcion || '');
      formData.append('archivo', this.archivoSubido, this.archivoSubido.name);

      // **Aquí debes inyectar el HttpClient y hacer la petición POST a tu API**
      // Ejemplo (necesitas importar HttpClient):
      // import { HttpClient, HttpEventType } from '@angular/common/http';
      // constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private http: HttpClient) { ... }
      //
      // this.http.post('/api/repositorios/upload', formData, {
      //   reportProgress: true,
      //   observe: 'events'
      // }).subscribe(event => {
      //   if (event.type === HttpEventType.UploadProgress) {
      //     this.uploadProgress = Math.round((100 * event.loaded) / event.total);
      //   } else if (event.type === HttpEventType.Response) {
      //     this.subiendo = false;
      //     this.repositorioService.agregarRepositorio(
      //       this.uploadForm.value.nombreRepositorio,
      //       this.uploadForm.value.descripcion,
      //       this.archivoSubido! // Aseguramos que no es null aquí
      //     );
      //     this.snackBar.open(`Repositorio "${this.uploadForm.value.nombreRepositorio}" subido exitosamente.`, 'Cerrar', { duration: 3000 });
      //     this.uploadForm.reset();
      //     this.archivoSubido = null;
      //   }
      // }, error => {
      //   this.subiendo = false;
      //   this.snackBar.open('Error al subir el repositorio.', 'Cerrar', { duration: 3000 });
      // });

      // **Simulación de la subida (eliminar en la implementación real)**
      const interval = setInterval(() => {
        this.uploadProgress += 10;
        if (this.uploadProgress >= 100) {
          clearInterval(interval);
          this.subiendo = false;
          this.repositorioService.agregarRepositorio(
            this.uploadForm.value.nombreRepositorio,
            this.uploadForm.value.descripcion,
            this.archivoSubido!
          );
          this.snackBar.open(`Repositorio "${this.uploadForm.value.nombreRepositorio}" subido exitosamente.`, 'Cerrar', {
            duration: 3000,
          });
          this.uploadForm.reset();
          this.archivoSubido = null;
        }
      }, 300);
    } else {
      this.snackBar.open('Por favor, completa el formulario y selecciona un archivo.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}