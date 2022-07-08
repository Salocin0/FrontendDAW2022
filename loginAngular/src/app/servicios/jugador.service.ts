import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jugador } from '../dominio/jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private URLBase = "http://localhost:8080/jugadores";

  constructor(private httpClient:HttpClient) { }

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