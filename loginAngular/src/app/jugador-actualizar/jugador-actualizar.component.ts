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
  
  jugadorNuevo:any
  fechaNacimientosinformato:Date | undefined
  
  facultadSel = {id:0,nombre:"",codigo:"",codigoNumerico:""}
  disciplinaSel = {id:0,nombre:"",codigo:"",descripcion:""}

  nacionalidades: any
  disciplinas: any[]=[]
  facultades: any[]=[]
  
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

  enviado = false
  opcionSeleccionado: any;
  verSelecciondis: any;
  verSeleccionfac: any;
  verSeleccionnac: any;

  id: number=0;

  constructor(private builder: FormBuilder, private router:Router, private servicioNacionalidades:NacionalidadesService, private servicioDisciplinas:DisciplinasService,  private servicioJugador: JugadorService, private servicioFacultades: FacultadesService, private Aroute:ActivatedRoute) {
  }

  ngOnInit(): void {
    // cargar nacionalidades
    this.servicioNacionalidades.getNacionalidades().subscribe((rta) => {this.nacionalidades = rta});
    //cargar disciplinas
    this.servicioDisciplinas.getDisciplinas().subscribe((rta)=>{this.disciplinas=rta});
    //cargar facultades
    this.servicioFacultades.getFacultades().subscribe((rta) => {this.facultades=rta});
    
    this.id=this.Aroute.snapshot.params['id']
    this.actualizarForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.actualizarForm.controls['Apellido'].setValue(this.Aroute.snapshot.params['apellido']);
    this.actualizarForm.controls['Dni'].setValue(this.Aroute.snapshot.params['dni']);
    this.actualizarForm.controls['Telefono'].setValue(this.Aroute.snapshot.params['telefono']);
    this.actualizarForm.controls['Legajo'].setValue(this.Aroute.snapshot.params['legajo']);
    this.actualizarForm.controls['Email'].setValue(this.Aroute.snapshot.params['email']);
    this.actualizarForm.controls['FechaDeNacimiento'].setValue(this.Aroute.snapshot.params['fechaFormat2']);
    //this.actualizarForm.controls['Facultad'].setValue(this.Aroute.snapshot.params['facultadNombre']) 
  }

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

  onclickDisciplina(){
    this.verSelecciondis = this.actualizarForm.controls["Disciplina"].value;
    for(let i = 0 ; i < this.disciplinas.length ; i++){
      if(this.disciplinas[i].nombre==this.verSelecciondis){
        this.disciplinaSel.id=this.disciplinas[i].id
        this.disciplinaSel.nombre=this.disciplinas[i].nombre
        this.disciplinaSel.codigo=this.disciplinas[i].codigo
        this.disciplinaSel.descripcion=this.disciplinas[i].descripcion
      }
    }
  }
  
  onclickNacionalidad(){
    this.verSeleccionnac = this.actualizarForm.controls["Nacionalidad"].value
  }

  onSubmit() {
    this.enviado = true
    
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

    const jugador = {
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
    this.jugadorNuevo = jugador;
    this.servicioJugador.actualizarJugador(this.jugadorNuevo).subscribe()
    console.log(this.jugadorNuevo);

    Swal.fire({
      title: 'Jugador Actualizado'
    })
    this.onVolver()
  }

  onVolver(){
    this.router.navigate(['jugadores'])
  }

}  
