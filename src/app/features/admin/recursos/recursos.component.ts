// recursos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.scss',
})
export class RecursosComponent {}