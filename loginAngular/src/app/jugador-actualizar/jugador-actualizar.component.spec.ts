import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorActualizarComponent } from './jugador-actualizar.component';

describe('JugadorActualizarComponent', () => {
  let component: JugadorActualizarComponent;
  let fixture: ComponentFixture<JugadorActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorActualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
