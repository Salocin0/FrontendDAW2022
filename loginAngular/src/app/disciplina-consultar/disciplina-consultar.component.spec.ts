import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaConsultarComponent } from './disciplina-consultar.component';

describe('DisciplinaConsultarComponent', () => {
  let component: DisciplinaConsultarComponent;
  let fixture: ComponentFixture<DisciplinaConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinaConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
