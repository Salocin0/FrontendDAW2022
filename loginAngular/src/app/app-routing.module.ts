import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JugadorNuevoComponent } from './jugador-nuevo/jugador-nuevo.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'jugadores',component:JugadoresComponent},
  {path:'jugador-nuevo',component:JugadorNuevoComponent},
  {path: '**', redirectTo: 'login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
