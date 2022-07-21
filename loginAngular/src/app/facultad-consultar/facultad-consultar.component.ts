import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-facultad-consultar',
  templateUrl: './facultad-consultar.component.html',
  styleUrls: ['./facultad-consultar.component.css']
})
export class FacultadConsultarComponent implements OnInit {
  //atributos
  consultarForm = this.builder.group({
    Id:[""],
    Nombre:[""],
    Codigo:[""],
    CodigoNumerico:[""],
  })
  //constructor
  constructor(private builder: FormBuilder, private router:Router,private Aroute:ActivatedRoute) {
  }
  //muestra los valores de la facultad seleccionada
  ngOnInit(): void {
    this.consultarForm.controls['Id'].setValue(this.Aroute.snapshot.params['id']);
    this.consultarForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.consultarForm.controls['Codigo'].setValue(this.Aroute.snapshot.params['codigo']);
    this.consultarForm.controls['CodigoNumerico'].setValue(this.Aroute.snapshot.params['codigoNumerico']);
  }
  //vuelve al listado de facultades
  onVolver(){
    this.router.navigate(['facultades'])
  }
}