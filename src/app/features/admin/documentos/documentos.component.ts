import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentos',
  standalone: true,
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
  imports: [CommonModule]
})
export class DocumentosComponent {
  documentos = [
    { titulo: 'Informe Anual', codigo: 'DOC-001', etiqueta: 'amarilla', url: '/assets/docs/informe-anual.pdf', fecha: '2025-01-15' },
    { titulo: 'Acta de Reunión', codigo: 'DOC-002', etiqueta: 'verde', url: '/assets/docs/acta-reunion.pdf', fecha: '2025-02-10' },
    { titulo: 'Plan de Trabajo', codigo: 'DOC-003', etiqueta: 'roja', url: '/assets/docs/plan-trabajo.pdf', fecha: '2025-02-20' },
    { titulo: 'Memorando Interno', codigo: 'DOC-004', etiqueta: 'verde', url: '/assets/docs/memorando-interno.pdf', fecha: '2025-03-01' },
    { titulo: 'Carta de Solicitud', codigo: 'DOC-005', etiqueta: 'amarilla', url: '/assets/docs/carta-solicitud.pdf', fecha: '2025-03-10' },
    { titulo: 'Presupuesto 2025', codigo: 'DOC-006', etiqueta: 'roja', url: '/assets/docs/presupuesto-2025.pdf', fecha: '2025-03-18' },
    { titulo: 'Reporte Mensual', codigo: 'DOC-007', etiqueta: 'verde', url: '/assets/docs/reporte-mensual.pdf', fecha: '2025-03-30' },
    { titulo: 'Constancia de Estudios', codigo: 'DOC-008', etiqueta: 'amarilla', url: '/assets/docs/constancia-estudios.pdf', fecha: '2025-04-05' },
    { titulo: 'Plan Estratégico', codigo: 'DOC-009', etiqueta: 'roja', url: '/assets/docs/plan-estrategico.pdf', fecha: '2025-04-10' }
  ];

  modalAbierto = false;
  documentoSeleccionado: any = null;

  verDocumento(doc: any) {
    this.documentoSeleccionado = doc;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.documentoSeleccionado = null;
  }

  descargarDocumento(doc: any) {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.titulo + '.pdf';
    link.click();
  }
}
