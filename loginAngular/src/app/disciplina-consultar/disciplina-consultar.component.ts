import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-disciplina-consultar',
  templateUrl: './disciplina-consultar.component.html',
  styleUrls: ['./disciplina-consultar.component.css']
})
export class DisciplinaConsultarComponent implements OnInit {
  //atributos
  consultarForm = this.builder.group({
    Id:[""],
    Nombre:[""],
    Codigo:[""],
    Descripcion:[""],
  })
  //constructor 
  constructor(private builder: FormBuilder, private router:Router,private Aroute:ActivatedRoute) {
  }
  //muestra los valores de la disciplina seleccionada
  ngOnInit(): void {
    this.consultarForm.controls['Id'].setValue(this.Aroute.snapshot.params['id']);
    this.consultarForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.consultarForm.controls['Codigo'].setValue(this.Aroute.snapshot.params['codigo']);
    this.consultarForm.controls['Descripcion'].setValue(this.Aroute.snapshot.params['descripcion']);
  }
  //vuelve al listado de disciplinas
  onVolver(){
    this.router.navigate(['disciplinas'])
  }
}