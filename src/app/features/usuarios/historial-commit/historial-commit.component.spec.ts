import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCommitComponent } from './historial-commit.component';

describe('HistorialCommitComponent', () => {
  let component: HistorialCommitComponent;
  let fixture: ComponentFixture<HistorialCommitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialCommitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
