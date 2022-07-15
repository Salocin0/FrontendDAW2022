import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultadActualizarComponent } from './facultad-actualizar/facultad-actualizar.component';
import { FacultadNuevoComponent } from './facultad-nuevo/facultad-nuevo.component';
import { FacultadesComponent } from './facultades/facultades.component';
import { HomeComponent } from './home/home.component';
import { JugadorNuevoComponent } from './jugador-nuevo/jugador-nuevo.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'jugadores',component:JugadoresComponent},
  {path:'facultad-actualizar',component:FacultadActualizarComponent},
  {path:'jugador-nuevo',component:JugadorNuevoComponent},
  {path:'facultades',component:FacultadesComponent},
  {path:'facultad-nuevo',component:FacultadNuevoComponent},

  {path: '**', redirectTo: 'login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
