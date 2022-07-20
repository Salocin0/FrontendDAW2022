import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaNuevoComponent } from './disciplina-nuevo.component';

describe('DisciplinaNuevoComponent', () => {
  let component: DisciplinaNuevoComponent;
  let fixture: ComponentFixture<DisciplinaNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinaNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
