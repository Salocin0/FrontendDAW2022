import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadConsultarComponent } from './facultad-consultar.component';

describe('FacultadConsultarComponent', () => {
  let component: FacultadConsultarComponent;
  let fixture: ComponentFixture<FacultadConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultadConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
