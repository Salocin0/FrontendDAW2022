import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jugador } from '../dominio/jugador';
@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  //atributos
  private URLBase = "http://localhost:8080/jugadores";
  //constructor
  constructor(private httpClient:HttpClient) { }
  //traer jugadores filtro + paginacion
  public getJugadoresPage(filtro:String,filtroDisciplina:String,filtroFacultad:String,filtroNacionalidad:String, page: number, size:number, order:String, asc:boolean):Observable<any> {
    return this.httpClient.get<any>(`${this.URLBase}`+`/jugadoresPage?`+`page=${page}&size=${size}&order=${order}&asc=${asc}&filtro=${filtro}&disciplina=${filtroDisciplina}&facultad=${filtroFacultad}&nacionalidad=${filtroNacionalidad}`);
  }
  //guardar jugadores
  guardarJugador(jugador:Jugador):Observable<Jugador>{
    return this.httpClient.post<Jugador>(`${this.URLBase}`,jugador)
  }
  //actualizar jugadores
  actualizarJugador(jugador:Jugador):Observable<Jugador>{
    return this.httpClient.put<Jugador>(`${this.URLBase}`,jugador)
  }
  //eliminar jugador
  eliminarJugador(jugador:Jugador): Observable<Jugador>{
    return this.httpClient.delete<Jugador>(`${this.URLBase}`+"/"+jugador.id)
  }
  //traer jugador con id
  getJugador(jugador:Jugador): Observable<Jugador>{
    return this.httpClient.get<Jugador>(`${this.URLBase}`+"/"+jugador.id);
  }
  //traer todos los jugadores
  getJugadores(): Observable<Jugador[]>{
    return this.httpClient.get<Jugador[]>(`${this.URLBase}`);
  }
}