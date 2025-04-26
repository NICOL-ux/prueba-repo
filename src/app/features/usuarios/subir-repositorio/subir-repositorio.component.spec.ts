import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirRepositorioComponent } from './subir-repositorio.component';

describe('SubirRepositorioComponent', () => {
  let component: SubirRepositorioComponent;
  let fixture: ComponentFixture<SubirRepositorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirRepositorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
