import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onNuevoJugadorClick(){
    this.router.navigate(['jugador-nuevo'])
  }

  onJugadoresClick(){
    this.router.navigate(['jugadores'])
  }

  onDisciplinasClick(){
  }
  
  onFacultadesClick(){
  }

  onNuevaDisciplinaClick(){
  }

  onNuevaFacultadClick(){
  }
  
  onSalir(){
    this.router.navigate(['login'])
  }
}
