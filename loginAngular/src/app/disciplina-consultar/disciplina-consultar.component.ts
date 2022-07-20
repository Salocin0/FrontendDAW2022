import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disciplina-consultar',
  templateUrl: './disciplina-consultar.component.html',
  styleUrls: ['./disciplina-consultar.component.css']
})
export class DisciplinaConsultarComponent implements OnInit {

  consultarForm = this.builder.group({
    Id:[""],
    Nombre:[""],
    Codigo:[""],
    Descripcion:[""],
  })

  ngOnInit(): void {
    //muestra los valores de la facultad seleccionada
    this.consultarForm.controls['Id'].setValue(this.Aroute.snapshot.params['id']);
    this.consultarForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.consultarForm.controls['Codigo'].setValue(this.Aroute.snapshot.params['codigo']);
    this.consultarForm.controls['Descripcion'].setValue(this.Aroute.snapshot.params['descripcion']);
  }
  
  constructor(private builder: FormBuilder, private router:Router,private Aroute:ActivatedRoute) {
  }
  //vuelve al listado de facultades
  onVolver(){
    this.router.navigate(['disciplinas'])
  }
}

