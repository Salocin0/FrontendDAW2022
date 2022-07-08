import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jugador } from '../dominio/jugador';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  constructor(private  router: Router,private servicioNacionalidades: NacionalidadesService, private servicioDisciplinas: DisciplinasService, private servicioFacultades: FacultadesService, private servicioJugador: JugadorService, private formBuilder: FormBuilder) { 
      this.filtrarJugadoresForm = this.formBuilder.group({
        filtro:[""],
        filtroDisciplina: [""],
        filtroFacultad: [""],
        filtroNacionalidad: [""]
      })
  }

  nacionalidades: any;
  disciplinas: any[] = [];
  facultades: any[] = [];
  jugadores: Jugador[] = [];
  filtrarJugadoresForm: FormGroup;
    
  ngOnInit(): void {
    this.servicioNacionalidades.getNacionalidades().subscribe((rta) => {this.nacionalidades = rta});
    this.servicioDisciplinas.getDisciplinas().subscribe((rta)=>{this.disciplinas=rta});
    this.servicioFacultades.getFacultades().subscribe((rta)=>{this.facultades=rta});
    this.obtenerJugadores();
  }

  private obtenerJugadores(){
    this.servicioJugador.getJugadores().subscribe(listaJugadores =>{
      this.jugadores=listaJugadores;
    })
  }

  onHomeClick() {
    this.router.navigate(['home'])
  }
  onNuevoJugadorClick(){
    this.router.navigate(['nuevo-jugador'])
  }

  editar(id: number){
    alert(id)
  }
  eliminar(id: number){
    alert("Eliminando a "+id)
  }
  onFiltrar(){
    alert(this.filtrarJugadoresForm.controls["filtro"].value)
    //this.jugador = this.servicioJugador.getJugadores()
  }
  onLimpiarFiltro() {
    this.filtrarJugadoresForm.controls["filtro"].setValue('')
    this.onFiltrar()
  }

  onVolver(){
    this.router.navigate(['home'])
  }
}
