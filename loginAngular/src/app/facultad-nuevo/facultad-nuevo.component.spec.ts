import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadNuevoComponent } from './facultad-nuevo.component';

describe('FacultadNuevoComponent', () => {
  let component: FacultadNuevoComponent;
  let fixture: ComponentFixture<FacultadNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultadNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
