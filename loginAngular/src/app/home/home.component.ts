import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //constructor
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  //ir a nuevo jugador
  onNuevoJugadorClick(){
    this.router.navigate(['jugador-nuevo'])
  }
  //ir a listado jugadores
  onJugadoresClick(){
    this.router.navigate(['jugadores'])
  }
  //ir a listado disciplinas
  onDisciplinasClick(){
    this.router.navigate(['disciplinas'])
  }
  //ir a listado facultades
  onFacultadesClick(){
    this.router.navigate(['facultades'])
  }
  //ir a nueva disciplina
  onNuevaDisciplinaClick(){
    this.router.navigate(['disciplina-nuevo'])

  }
  //ir a nueva facultad
  onNuevaFacultadClick(){
    this.router.navigate(['facultad-nuevo'])
  }
  //ir a login
  onSalir(){
    this.router.navigate(['login'])
  }
}