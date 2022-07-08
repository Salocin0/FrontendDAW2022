import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { JugadorService } from '../servicios/jugador.service';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-jugador-nuevo',
  templateUrl: './jugador-nuevo.component.html',
  styleUrls: ['./jugador-nuevo.component.css']
})

export class JugadorNuevoComponent implements OnInit {
  
  jugadorNuevo:any

  nacionalidades: any
  disciplinas: any[]=[]
  facultades: any[]=[]
  
  registroForm = this.builder.group({
    Nombre:["", [Validators.required, Validators.minLength(2)]],
    Apellido:["", [Validators.required, Validators.minLength(2)]],
    Dni:["", [Validators.required,Validators.min(1)]],
    Legajo:["", [Validators.required,Validators.min(1)]],
    Email:["", [Validators.required, Validators.email]],
    Telefono: ["", ],
    FechaDeNacimiento: ["", ], 
    Nacionalidad: ["", ],
    Localidad: ["", ], 
    Disciplina: ["", ] 
  })

  enviado = false

  constructor(private builder: FormBuilder, private router:Router, private servicioNacionalidades:NacionalidadesService, private servicioDisciplinas:DisciplinasService,  private servicioJugador: JugadorService, private servicioFacultades: FacultadesService) {
  }

  ngOnInit(): void {
    // cargar nacionalidades
    this.servicioNacionalidades.getNacionalidades().subscribe((rta) => {this.nacionalidades = rta});
    //cargar disciplinas
    this.servicioDisciplinas.getDisciplinas().subscribe((rta)=>{this.disciplinas=rta});
    //cargar facultades
    this.servicioFacultades.getFacultades().subscribe((rta) => {this.facultades=rta});
  }

  onSubmit() {
    this.enviado = true
    
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Apellido'].errors) return
    if(this.registroForm.controls['Email'].errors) return
    if(this.registroForm.controls['Dni'].errors) return
    if(this.registroForm.controls['Telefono'].errors) return
    if(this.registroForm.controls['Legajo'].errors) return
    if(this.registroForm.controls['FechaDeNacimiento'].errors) return
    if(this.registroForm.controls['Localidad'].errors) return
    if(this.registroForm.controls['Disciplina'].errors) return
    if(this.registroForm.controls['Nacionalidad'].errors) return
    
    const jugador = {
      nombre: this.registroForm.controls["Nombre"].value,
      apellido: this.registroForm.controls["Apellido"].value,
      dni: this.registroForm.controls["Dni"].value,
      telefono: this.registroForm.controls["Telefono"].value,
      email: this.registroForm.controls["Email"].value,
      legajo: this.registroForm.controls["Legajo"].value,
      fecNacimiento: this.registroForm.controls["FechaDeNacimiento"].value,
      //guardar objeto/id, no el nombre
      nacionalidad: this.registroForm.controls["Nacionalidad"].value,
      localidad: this.registroForm.controls["Localidad"].value,
      disciplina: this.registroForm.controls["Disciplina"].value
    }
    
    this.jugadorNuevo = jugador;
    this.servicioJugador.guardarJugador(this.jugadorNuevo).subscribe()
    console.log(this.jugadorNuevo);

    Swal.fire({
      title: 'Jugador registrado'
    })
    this.onVolver()
  }

  onVolver(){
    this.router.navigate(['home'])
  }

  buscarNacionalidad(){
  }
  
}                