import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRepositorioDialogComponent } from './editar-repositorio-dialog.component';

describe('EditarRepositorioDialogComponent', () => {
  let component: EditarRepositorioDialogComponent;
  let fixture: ComponentFixture<EditarRepositorioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRepositorioDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRepositorioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
