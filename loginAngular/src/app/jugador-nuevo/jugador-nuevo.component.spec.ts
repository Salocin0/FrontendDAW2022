import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorNuevoComponent } from './jugador-nuevo.component';

describe('JugadorNuevoComponent', () => {
  let component: JugadorNuevoComponent;
  let fixture: ComponentFixture<JugadorNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
