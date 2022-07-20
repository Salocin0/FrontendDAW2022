import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jugador } from '../dominio/jugador';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { Disciplina } from '../dominio/disciplina';
import { Facultad } from '../dominio/facultad';
import { Nacionalidad } from '../dominio/nacionalidad';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  iconNombre: boolean[] = [true,false,false];
  iconFechaNacimiento: boolean[] = [true,false,false];
  iconDNI: boolean[] = [true,false,false];
  iconFacultad: boolean[] = [true,false,false];
  iconDisciplina: boolean[] = [true,false,false];
  iconNacionalidad: boolean[] = [true,false,false];
  iconTelefono: boolean[] = [true,false,false];
  iconLegajo: boolean[] = [true,false,false];
  iconEmail: boolean[] = [true,false,false];

  page=0;
  size=5;
  order="id"
  asc=true;
  primera=false;
  ultima=false;
  totalPages=0;

  nacionalidades: any;
  disciplinas: any[] = [];
  facultades: any[] = [];
  jugadores: Jugador[] = [];
  filtrarJugadoresForm: FormGroup;

  filtroDisciplina=""
  filtroFacultad=""
  filtroNacionalidad=""

  constructor(private  router: Router,private servicioNacionalidades: NacionalidadesService, private servicioDisciplinas: DisciplinasService, private servicioFacultades: FacultadesService, private servicioJugador: JugadorService, private formBuilder: FormBuilder) { 
      this.filtrarJugadoresForm = this.formBuilder.group({
        filtro:[""],
        filtroDisciplina: [""],
        filtroFacultad: [""],
        filtroNacionalidad: [""]
      })
  }
    
  ngOnInit(): void {
    this.servicioNacionalidades.getNacionalidades().subscribe((rta) => {this.nacionalidades = rta});
    this.servicioDisciplinas.getDisciplinas().subscribe((rta)=>{this.disciplinas=rta});
    this.servicioFacultades.getFacultades().subscribe((rta)=>{this.facultades=rta});
    this.obtenerJugadores("","","","");
  }

  onNuevoJugadorClick(){
    this.router.navigate(['jugador-nuevo'])
  }

  editar(id: number){
    alert(id)
  }

  eliminar(id: number){
    alert("Eliminando a "+id)
  }

  onFiltrar(){
    const filtro=this.filtrarJugadoresForm.controls["filtro"].value
    
    if(this.filtrarJugadoresForm.controls["filtroDisciplina"].value!="Seleccionar"){
      this.filtroDisciplina=this.filtrarJugadoresForm.controls["filtroDisciplina"].value
    }

    if(this.filtrarJugadoresForm.controls["filtroFacultad"].value.value!="Seleccionar"){
      this.filtroFacultad=this.filtrarJugadoresForm.controls["filtroFacultad"].value
    }
    
    if(this.filtrarJugadoresForm.controls["filtroNacionalidad"].value!="Seleccionar"){
      this.filtroNacionalidad=this.filtrarJugadoresForm.controls["filtroNacionalidad"].value
    }

    this.obtenerJugadores(filtro,this.filtroDisciplina,this.filtroFacultad,this.filtroNacionalidad)
  }

  private obtenerJugadores(filtro:String,filtroDisciplina:String,filtroFacultad:String,filtroNacionalidad:String){
    this.servicioJugador.getJugadoresPage(filtro,filtroDisciplina,filtroFacultad,filtroNacionalidad,this.page,this.size,this.order,this.asc).subscribe(listaJugadores =>{
      this.jugadores=listaJugadores.content;
      this.primera=listaJugadores.first;
      this.ultima=listaJugadores.last;
      this.totalPages=listaJugadores.totalPages;
    })
  }
  onLimpiarFiltro() {
    this.filtrarJugadoresForm.controls["filtro"].setValue('')
    this.onFiltrar()
  }

  onVolver(){
    this.router.navigate(['home'])
  }

  onConsultar(jugador:Jugador){
    this.router.navigate(['jugador-consultar',jugador])
  }

  onModificar(jugador:Jugador){
    this.router.navigate(['jugador-actualizar',jugador])
  }
  onBorrar(jugador:Jugador){
    this.servicioJugador.eliminarJugador(jugador).subscribe(jugador =>{console.log(jugador);})
    this.onFiltrar();
  }

  sort(asc:boolean,order:string){
    this.asc=asc
    this.order=order
  }
   //avanzar pagina
   onPaginaSiguiente(){
    if(!this.ultima){
      this.page=this.page+1
      this.onFiltrar()
    }
  }
  //retroceder pagina
  onPaginaAnterior(){
    if(!this.primera){
      this.page=this.page-1
      this.onFiltrar()
    }
  } 

  onOrdenarXNombre(){
    if(this.iconNombre[0]===true){
      this.iconNombre=[false,true,false]
      //acendente por nombre
      this.sort(true,"nombre")
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconNombre[2]===true){
      this.iconNombre=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconNombre[1]===true){
      this.iconNombre=[false,false,true]
      //descendente por nombre
      this.sort(false,"nombre")
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }

  onOrdenarXFechaNacimiento(){
    if(this.iconFechaNacimiento[0]===true){
      this.iconFechaNacimiento=[false,true,false]
      //acendente por nombre
      this.sort(true,"fechaNacimiento")
      this.iconNombre = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconFechaNacimiento[2]===true){
      this.iconFechaNacimiento=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconFechaNacimiento[1]===true){
      this.iconFechaNacimiento=[false,false,true]
      //descendente por nombre
      this.sort(false,"fechaNacimiento")
      this.iconNombre = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }
  onOrdenarXDNI(){
    if(this.iconDNI[0]===true){
      this.iconDNI=[false,true,false]
      //acendente por nombre
      this.sort(true,"dni")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconDNI[2]===true){
      this.iconDNI=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconDNI[1]===true){
      this.iconDNI=[false,false,true]
      //descendente por nombre
      this.sort(false,"dni")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }
  onOrdenarXFacultad(){
    if(this.iconFacultad[0]===true){
      this.iconFacultad=[false,true,false]
      //acendente por nombre
      this.sort(true,"facultad")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconFacultad[2]===true){
      this.iconFacultad=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconFacultad[1]===true){
      this.iconFacultad=[false,false,true]
      //descendente por nombre
      this.sort(false,"facultad")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }
  onOrdenarXDisciplina(){
    if(this.iconDisciplina[0]===true){
      this.iconDisciplina=[false,true,false]
      //acendente por nombre
      this.sort(true,"disciplina")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconDisciplina[2]===true){
      this.iconDisciplina=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconDisciplina[1]===true){
      this.iconDisciplina=[false,false,true]
      //descendente por nombre
      this.sort(false,"disciplina")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }
  onOrdenarXNacionalidad(){
    if(this.iconNacionalidad[0]===true){
      this.iconNacionalidad=[false,true,false]
      //acendente por nombre
      this.sort(true,"nacionalidad")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconNacionalidad[2]===true){
      this.iconNacionalidad=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconNacionalidad[1]===true){
      this.iconNacionalidad=[false,false,true]
      //descendente por nombre
      this.sort(false,"nacionalidad")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }
  onOrdenarXTelefono(){
    if(this.iconTelefono[0]===true){
      this.iconTelefono=[false,true,false]
      //acendente por nombre
      this.sort(true,"telefono")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconTelefono[2]===true){
      this.iconTelefono=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconTelefono[1]===true){
      this.iconTelefono=[false,false,true]
      //descendente por nombre
      this.sort(false,"telefono")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }

  onOrdenarXLegajo(){
    if(this.iconLegajo[0]===true){
      this.iconLegajo=[false,true,false]
      //acendente por nombre
      this.sort(true,"legajo")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconLegajo[2]===true){
      this.iconLegajo=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconLegajo[1]===true){
      this.iconLegajo=[false,false,true]
      //descendente por nombre
      this.sort(false,"legajo")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconEmail = [true,false,false];
      this.onFiltrar()
      return
    }
  }
  onOrdenarXEMail(){
    if(this.iconEmail[0]===true){
      this.iconEmail=[false,true,false]
      //acendente por nombre
      this.sort(true,"email")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconEmail[2]===true){
      this.iconEmail=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.onFiltrar()
      return
    }
    if(this.iconEmail[1]===true){
      this.iconEmail=[false,false,true]
      //descendente por nombre
      this.sort(false,"email")
      this.iconNombre = [true,false,false];
      this.iconFechaNacimiento = [true,false,false];
      this.iconDNI = [true,false,false];
      this.iconFacultad = [true,false,false];
      this.iconDisciplina = [true,false,false];
      this.iconNacionalidad = [true,false,false];
      this.iconTelefono = [true,false,false];
      this.iconLegajo = [true,false,false];
      this.onFiltrar()
      return
    }
  }
}