import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorConsultarComponent } from './jugador-consultar.component';

describe('JugadorConsultarComponent', () => {
  let component: JugadorConsultarComponent;
  let fixture: ComponentFixture<JugadorConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
