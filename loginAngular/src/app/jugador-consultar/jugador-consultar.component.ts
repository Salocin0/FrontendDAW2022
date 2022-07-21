import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-jugador-consultar',
  templateUrl: './jugador-consultar.component.html',
  styleUrls: ['./jugador-consultar.component.css']
})
export class JugadorConsultarComponent implements OnInit {
  //atributos
  consultarForm = this.builder.group({
    Id:[""],
    Nombre:[""],
    Apellido:[""],
    Telefono:[""],
    DNI:[""],
    Legajo:[""],
    Email:[""],
    Nacionalidad:[""],
    Facultad:[""],
    FechaNacimiento:[""],
    Disciplina:[""]

  })
  //constructor
  constructor(private builder: FormBuilder, private router:Router,private Aroute:ActivatedRoute) {
  }
  //muestra los valores de la facultad seleccionada
  ngOnInit(): void {
    this.consultarForm.controls['Id'].setValue(this.Aroute.snapshot.params['id']);
    this.consultarForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.consultarForm.controls['Apellido'].setValue(this.Aroute.snapshot.params['apellido']);
    this.consultarForm.controls['Telefono'].setValue(this.Aroute.snapshot.params['telefono']);
    this.consultarForm.controls['FechaNacimiento'].setValue(this.Aroute.snapshot.params['fechaFormat']);
    this.consultarForm.controls['DNI'].setValue(this.Aroute.snapshot.params['dni']);
    this.consultarForm.controls['Legajo'].setValue(this.Aroute.snapshot.params['legajo']);
    this.consultarForm.controls['Email'].setValue(this.Aroute.snapshot.params['email']);
    this.consultarForm.controls['Nacionalidad'].setValue(this.Aroute.snapshot.params['nacionalidad']);
    this.consultarForm.controls['Facultad'].setValue(this.Aroute.snapshot.params['facultadNombrada']);
    this.consultarForm.controls['Disciplina'].setValue(this.Aroute.snapshot.params['disciplinaNombrada']);
  }
  //vuelve al listado de jugadores
  onVolver(){
    this.router.navigate(['jugadores'])
  }
}