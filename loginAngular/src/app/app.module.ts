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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    JugadoresComponent,
    JugadorNuevoComponent,
    FacultadNuevoComponent,
    FacultadesComponent,
    
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
