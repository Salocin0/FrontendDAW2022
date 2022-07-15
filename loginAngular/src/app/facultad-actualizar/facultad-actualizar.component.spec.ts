import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadActualizarComponent } from './facultad-actualizar.component';

describe('FacultadActualizarComponent', () => {
  let component: FacultadActualizarComponent;
  let fixture: ComponentFixture<FacultadActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultadActualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
