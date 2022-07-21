import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Jugador } from '../dominio/jugador';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  //atributos iconos tabla
  iconNombre: boolean[] = [true,false,false];
  iconFechaNacimiento: boolean[] = [true,false,false];
  iconDNI: boolean[] = [true,false,false];
  iconFacultad: boolean[] = [true,false,false];
  iconDisciplina: boolean[] = [true,false,false];
  iconNacionalidad: boolean[] = [true,false,false];
  iconTelefono: boolean[] = [true,false,false];
  iconLegajo: boolean[] = [true,false,false];
  iconEmail: boolean[] = [true,false,false];
  //atributos paginacion
  page=0;
  size=5;
  order="id"
  asc=true;
  primera=false;
  ultima=false;
  totalPages=0;
  //atributos combos
  nacionalidades: any;
  disciplinas: any[] = [];
  facultades: any[] = [];
  jugadores: Jugador[] = [];
  //atributos filtro
  filtrarJugadoresForm: FormGroup;
  filtroDisciplina=""
  filtroFacultad=""
  filtroNacionalidad=""
  //constructor
  constructor(private  router: Router,private servicioNacionalidades: NacionalidadesService, private servicioDisciplinas: DisciplinasService, private servicioFacultades: FacultadesService, private servicioJugador: JugadorService, private formBuilder: FormBuilder) { 
      this.filtrarJugadoresForm = this.formBuilder.group({
        filtro:[""],
        filtroDisciplina: [""],
        filtroFacultad: [""],
        filtroNacionalidad: [""]
      })
  }
  //carga de combo y traer jugadores
  ngOnInit(): void {
    this.servicioNacionalidades.getNacionalidades().subscribe((rta) => {this.nacionalidades = rta});
    this.servicioDisciplinas.getDisciplinas().subscribe((rta)=>{this.disciplinas=rta});
    this.servicioFacultades.getFacultades().subscribe((rta)=>{this.facultades=rta});
    this.obtenerJugadores("","","","");
  }
  //ir a nuevo jugador
  onNuevoJugadorClick(){
    this.router.navigate(['jugador-nuevo'])
  }
  //filtra jugadores con combos y input
  onFiltrar(){
    //guarda el valor de input
    const filtro=this.filtrarJugadoresForm.controls["filtro"].value
    //guarda filtro disciplina si esta seleccionado
    if(this.filtrarJugadoresForm.controls["filtroDisciplina"].value!="Seleccionar"){
      this.filtroDisciplina=this.filtrarJugadoresForm.controls["filtroDisciplina"].value
    }
    //guarda filtro facultad si esta seleccionado
    if(this.filtrarJugadoresForm.controls["filtroFacultad"].value.value!="Seleccionar"){
      this.filtroFacultad=this.filtrarJugadoresForm.controls["filtroFacultad"].value
    }
    //guarda filtro nacionalidad si esta seleccionado
    if(this.filtrarJugadoresForm.controls["filtroNacionalidad"].value!="Seleccionar"){
      this.filtroNacionalidad=this.filtrarJugadoresForm.controls["filtroNacionalidad"].value
    }
    //obtiene los jugadores con los filtros
    this.obtenerJugadores(filtro,this.filtroDisciplina,this.filtroFacultad,this.filtroNacionalidad)
  }
  //trae los jugadores con los filtros y paginados
  private obtenerJugadores(filtro:String,filtroDisciplina:String,filtroFacultad:String,filtroNacionalidad:String){
    //trae los jugadores con los filtros y paginados
    this.servicioJugador.getJugadoresPage(filtro,filtroDisciplina,filtroFacultad,filtroNacionalidad,this.page,this.size,this.order,this.asc).subscribe(listaJugadores =>{
      //guarda los jugadores
      this.jugadores=listaJugadores.content;
      //guarda si la pagina es la primera
      this.primera=listaJugadores.first;
      //guarda si la pagina es la ultima
      this.ultima=listaJugadores.last;
      //guarda el total de paginas
      this.totalPages=listaJugadores.totalPages;
    })
  }
  //limpia el input de filtro
  onLimpiarFiltro() {
    this.filtrarJugadoresForm.controls["filtro"].setValue('')
    this.onFiltrar()
  }
  //ir a menu principal
  onVolver(){
    this.router.navigate(['home'])
  }
  //ir a consultar jugador
  onConsultar(jugador:Jugador){
    this.router.navigate(['jugador-consultar',jugador])
  }
  //ir a modificar jugador
  onModificar(jugador:Jugador){
    this.router.navigate(['jugador-actualizar',jugador])
  }
  //borrar jugador
  onBorrar(jugador:Jugador){
    //muestra aviso antes de borrar, en caso de aceptar se borra, en caso contrario se cancela la accion
    Swal.fire({
      title: 'Borrar',
      text: "Desea eliminar jugador " +jugador.nombre+"?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!'
    }as any).then((result)=>{
      if(result.isConfirmed){
        this.servicioJugador.eliminarJugador(jugador).subscribe(jugador =>{console.log(jugador);})
        this.onFiltrar();
      }
    })
  }
  //cambia el orden (asc o desc) y el tipo de orden
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
  //ordena los jugadores por nombre
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
  //ordena los jugadores por fecha de nacimiento
  onOrdenarXFechaNacimiento(){
    if(this.iconFechaNacimiento[0]===true){
      this.iconFechaNacimiento=[false,true,false]
      //acendente por fecha de nacimiento
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
      //sin orden por fecha de nacimiento (volver a id)
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
      //descendente por fecha de nacimiento
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
  //ordena los jugadores por dni
  onOrdenarXDNI(){
    if(this.iconDNI[0]===true){
      this.iconDNI=[false,true,false]
      //acendente por dni
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
      //sin orden por dni (volver a id)
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
      //descendente por dni
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
  //ordena los jugadores por facultad
  onOrdenarXFacultad(){
    if(this.iconFacultad[0]===true){
      this.iconFacultad=[false,true,false]
      //acendente por facultad
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
      //sin orden por facultad (volver a id)
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
      //descendente por facultad
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
  //ordena los jugadores por disciplina
  onOrdenarXDisciplina(){
    if(this.iconDisciplina[0]===true){
      this.iconDisciplina=[false,true,false]
      //acendente por disciplina
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
      //sin orden por disciplina (volver a id)
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
      //descendente por disciplina
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
  //ordena los jugadores por nacionalidad
  onOrdenarXNacionalidad(){
    if(this.iconNacionalidad[0]===true){
      this.iconNacionalidad=[false,true,false]
      //acendente por nacionalidad
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
      //sin orden por nacionalidad (volver a id)
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
      //descendente por nacionalidad
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
  //ordenar los jugadores por telefono
  onOrdenarXTelefono(){
    if(this.iconTelefono[0]===true){
      this.iconTelefono=[false,true,false]
      //acendente por telefono
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
      //sin orden por telefono (volver a id)
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
      //descendente por telefono
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
//ordenar los jugadores por legajo
  onOrdenarXLegajo(){
    if(this.iconLegajo[0]===true){
      this.iconLegajo=[false,true,false]
      //acendente por legajo
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
      //sin orden por legajo (volver a id)
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
      //descendente por legajo
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
  //ordenar los jugadores por email
  onOrdenarXEMail(){
    if(this.iconEmail[0]===true){
      this.iconEmail=[false,true,false]
      //acendente por email
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
      //sin orden por email (volver a id)
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
      //descendente por email
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