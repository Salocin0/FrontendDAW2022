import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
@Component({
  selector: 'app-jugador-actualizar',
  templateUrl: './jugador-actualizar.component.html',
  styleUrls: ['./jugador-actualizar.component.css']
})
export class JugadorActualizarComponent implements OnInit {
  //atributos
  jugadorNuevo:any
  fechaNacimientosinformato:Date | undefined
  facultadSel = {id:0,nombre:"",codigo:"",codigoNumerico:""}
  disciplinaSel = {id:0,nombre:"",codigo:"",descripcion:""}
  nacionalidades: any
  disciplinas: any[]=[]
  facultades: any[]=[]
  enviado = false
  opcionSeleccionado: any;
  verSelecciondis: any;
  verSeleccionfac: any;
  verSeleccionnac: any;
  id: number=0;
  actualizarForm = this.builder.group({
    Nombre:["", [Validators.required, Validators.minLength(2)]],
    Apellido:["", [Validators.required, Validators.minLength(2)]],
    Dni:["", [Validators.required,Validators.min(1)]],
    Legajo:["", [Validators.required,Validators.min(1)]],
    Email:["", [Validators.required, Validators.email]],
    Telefono: ["", ],
    FechaDeNacimiento: ["", ], 
    Nacionalidad: ["", ],
    Facultad: ["", ], 
    Disciplina: ["", ] 
  })
  //constructor
  constructor(private builder: FormBuilder, private router:Router, private servicioNacionalidades:NacionalidadesService, private servicioDisciplinas:DisciplinasService,  private servicioJugador: JugadorService, private servicioFacultades: FacultadesService, private Aroute:ActivatedRoute) {
  }
  //cargar combos + datos jugador a actualizar
  ngOnInit(): void {
    // cargar nacionalidades
    this.servicioNacionalidades.getNacionalidades().subscribe((rta) => {this.nacionalidades = rta});
    //cargar disciplinas
    this.servicioDisciplinas.getDisciplinas().subscribe((rta)=>{this.disciplinas=rta});
    //cargar facultades
    this.servicioFacultades.getFacultades().subscribe((rta) => {this.facultades=rta});
    //cargar datos de jugador a actualizar
    this.id=this.Aroute.snapshot.params['id']
    this.actualizarForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.actualizarForm.controls['Apellido'].setValue(this.Aroute.snapshot.params['apellido']);
    this.actualizarForm.controls['Dni'].setValue(this.Aroute.snapshot.params['dni']);
    this.actualizarForm.controls['Telefono'].setValue(this.Aroute.snapshot.params['telefono']);
    this.actualizarForm.controls['Legajo'].setValue(this.Aroute.snapshot.params['legajo']);
    this.actualizarForm.controls['Email'].setValue(this.Aroute.snapshot.params['email']);
    this.actualizarForm.controls['FechaDeNacimiento'].setValue(this.Aroute.snapshot.params['fechaFormat2']);
  }
  //guardar facultad seleccionadad en variable
  onclickFacultad(){
    this.verSeleccionfac = this.actualizarForm.controls["Facultad"].value;
    for(let i = 0 ; i < this.facultades.length ; i++){
      if(this.facultades[i].codigo==this.verSeleccionfac){
        this.facultadSel.id=this.facultades[i].id
        this.facultadSel.nombre=this.facultades[i].nombre
        this.facultadSel.codigo=this.facultades[i].codigo
        this.facultadSel.codigoNumerico=this.facultades[i].codigoNumerico
      }
    }
  }
  //guardar disciplina seleccionadad en variable
  onclickDisciplina(){
    this.verSelecciondis = this.actualizarForm.controls["Disciplina"].value;
    for(let i = 0 ; i < this.disciplinas.length ; i++){
      if(this.disciplinas[i].codigo==this.verSelecciondis){
        console.log(this.disciplinas[i].id)
        this.disciplinaSel.id=this.disciplinas[i].id
        console.log(this.disciplinaSel.id)
        this.disciplinaSel.nombre=this.disciplinas[i].nombre
        this.disciplinaSel.codigo=this.disciplinas[i].codigo
        this.disciplinaSel.descripcion=this.disciplinas[i].descripcion
      }
    }
  }
   //guardar nacionalidad seleccionadad en variable
  onclickNacionalidad(){
    this.verSeleccionnac = this.actualizarForm.controls["Nacionalidad"].value
  }
  //actualizar jugador
  onSubmit() {
    this.enviado = true
    //comprobar inputs
    if(this.actualizarForm.controls['Nombre'].errors) return
    if(this.actualizarForm.controls['Apellido'].errors) return
    if(this.actualizarForm.controls['Email'].errors) return
    if(this.actualizarForm.controls['Dni'].errors) return
    if(this.actualizarForm.controls['Telefono'].errors) return
    if(this.actualizarForm.controls['Legajo'].errors) return
    if(this.actualizarForm.controls['FechaDeNacimiento'].errors) return
    if(this.actualizarForm.controls['Facultad'].errors) return
    if(this.actualizarForm.controls['Disciplina'].errors) return
    if(this.actualizarForm.controls['Nacionalidad'].errors) return
    //crear jugador con nuevos datos
    const jugador = {
      id:this.id,
      nombre: this.actualizarForm.controls["Nombre"].value,
      apellido: this.actualizarForm.controls["Apellido"].value,
      dni: this.actualizarForm.controls["Dni"].value,
      telefono: this.actualizarForm.controls["Telefono"].value,
      email: this.actualizarForm.controls["Email"].value,
      legajo: this.actualizarForm.controls["Legajo"].value,
      fechaNacimiento: this.actualizarForm.controls["FechaDeNacimiento"].value,
      nacionalidad: this.verSeleccionnac,
      facultad: this.facultadSel,
      disciplina: this.disciplinaSel
    }
    //actualizar jugador
    this.jugadorNuevo = jugador;
    this.servicioJugador.actualizarJugador(this.jugadorNuevo).subscribe()
    console.log(this.jugadorNuevo);
    //aviso de actualizacion
    Swal.fire({
      title: 'Jugador Actualizado'
    })
    //volver
    this.onVolver()
  }
  //ir a listado de jugadores
  onVolver(){
    this.router.navigate(['jugadores'])
  }
}