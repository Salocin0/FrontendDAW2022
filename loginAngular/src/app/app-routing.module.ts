import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinaActualizarComponent } from './disciplina-actualizar/disciplina-actualizar.component';
import { DisciplinaConsultarComponent } from './disciplina-consultar/disciplina-consultar.component';
import { DisciplinaNuevoComponent } from './disciplina-nuevo/disciplina-nuevo.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { FacultadActualizarComponent } from './facultad-actualizar/facultad-actualizar.component';
import { FacultadConsultarComponent } from './facultad-consultar/facultad-consultar.component';
import { FacultadNuevoComponent } from './facultad-nuevo/facultad-nuevo.component';
import { FacultadesComponent } from './facultades/facultades.component';
import { HomeComponent } from './home/home.component';
import { JugadorActualizarComponent } from './jugador-actualizar/jugador-actualizar.component';
import { JugadorConsultarComponent } from './jugador-consultar/jugador-consultar.component';
import { JugadorNuevoComponent } from './jugador-nuevo/jugador-nuevo.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { LoginComponent } from './login/login.component';
import { UsuarioNuevoComponent } from './usuario-nuevo/usuario-nuevo.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'usuario-nuevo', component: UsuarioNuevoComponent},
  {path:'home', component: HomeComponent},
  {path:'jugadores',component:JugadoresComponent},
  {path:'jugador-nuevo',component:JugadorNuevoComponent},
  {path:'jugador-consultar',component:JugadorConsultarComponent},
  {path:'jugador-actualizar',component:JugadorActualizarComponent},
  {path:'facultades',component:FacultadesComponent},
  {path:'facultad-nuevo',component:FacultadNuevoComponent},
  {path:'facultad-consultar',component:FacultadConsultarComponent},
  {path:'facultad-actualizar',component:FacultadActualizarComponent},
  {path:'disciplinas',component:DisciplinasComponent},
  {path:'disciplina-nuevo',component:DisciplinaNuevoComponent},
  {path:'disciplina-consultar',component:DisciplinaConsultarComponent},
  {path:'disciplina-actualizar',component:DisciplinaActualizarComponent},
  {path: '**', redirectTo: 'login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
