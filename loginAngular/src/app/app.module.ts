import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { JugadorNuevoComponent } from './jugador-nuevo/jugador-nuevo.component';
import { HttpClientModule } from '@angular/common/http';
import { FacultadNuevoComponent } from './facultad-nuevo/facultad-nuevo.component';
import { FacultadesComponent } from './facultades/facultades.component';
import { FacultadActualizarComponent } from './facultad-actualizar/facultad-actualizar.component';
import { FacultadConsultarComponent } from './facultad-consultar/facultad-consultar.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { DisciplinaNuevoComponent } from './disciplina-nuevo/disciplina-nuevo.component';
import { DisciplinaConsultarComponent } from './disciplina-consultar/disciplina-consultar.component';
import { DisciplinaActualizarComponent } from './disciplina-actualizar/disciplina-actualizar.component';
import { JugadorActualizarComponent } from './jugador-actualizar/jugador-actualizar.component';
import { JugadorConsultarComponent } from './jugador-consultar/jugador-consultar.component';
import { UsuarioNuevoComponent } from './usuario-nuevo/usuario-nuevo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    JugadoresComponent,
    JugadorNuevoComponent,
    FacultadNuevoComponent,
    FacultadesComponent,
    FacultadActualizarComponent,
    FacultadConsultarComponent,
    DisciplinasComponent,
    DisciplinaNuevoComponent,
    DisciplinaConsultarComponent,
    DisciplinaActualizarComponent,
    JugadorActualizarComponent,
    JugadorConsultarComponent,
    UsuarioNuevoComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
