import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaActualizarComponent } from './disciplina-actualizar.component';

describe('DisciplinaActualizarComponent', () => {
  let component: DisciplinaActualizarComponent;
  let fixture: ComponentFixture<DisciplinaActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinaActualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
