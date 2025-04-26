// src/app/features/usuarios/editar-repositorio-dialog/editar-repositorio-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Repositorio } from '../../../../core/services/repositorio.service';
import { DatePipe } from '@angular/common'; // Importa DatePipe

@Component({
  selector: 'app-editar-repositorio-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    DatePipe, // Añade DatePipe a los imports
  ],
  templateUrl: './editar-repositorio-dialog.component.html',
  styleUrl: './editar-repositorio-dialog.component.scss',
})
export class EditarRepositorioDialogComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarRepositorioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Repositorio,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion],
      archivoNombre: [data.archivoNombre, Validators.required],
      subidoEn: [data.subidoEn],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}