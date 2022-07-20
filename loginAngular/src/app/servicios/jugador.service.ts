import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Disciplina } from '../dominio/disciplina';
import { Facultad } from '../dominio/facultad';
import { Jugador } from '../dominio/jugador';
import { Nacionalidad } from '../dominio/nacionalidad';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private URLBase = "http://localhost:8080/jugadores";

  constructor(private httpClient:HttpClient) { }

  //traer facultades filtro + paginacion
  public getJugadoresPage(filtro:String,filtroDisciplina:String,filtroFacultad:String,filtroNacionalidad:String, page: number, size:number, order:String, asc:boolean):Observable<any> {
    return this.httpClient.get<any>(`${this.URLBase}`+`/jugadoresPage?`+`page=${page}&size=${size}&order=${order}&asc=${asc}&filtro=${filtro}&disciplina=${filtroDisciplina}&facultad=${filtroFacultad}&nacionalidad=${filtroNacionalidad}`);
  }

  guardarJugador(jugador:Jugador):Observable<Jugador>{
    return this.httpClient.post<Jugador>(`${this.URLBase}`,jugador)
  }
  
  actualizarJugador(jugador:Jugador):Observable<Jugador>{
    return this.httpClient.put<Jugador>(`${this.URLBase}`,jugador)
  }

  eliminarJugador(jugador:Jugador): Observable<Jugador>{
    return this.httpClient.delete<Jugador>(`${this.URLBase}`+"/"+jugador.id)
  }
  
  getJugador(jugador:Jugador): Observable<Jugador>{
    return this.httpClient.get<Jugador>(`${this.URLBase}`+"/"+jugador.id);
  }

  getJugadores(): Observable<Jugador[]>{
    return this.httpClient.get<Jugador[]>(`${this.URLBase}`);
  }
}