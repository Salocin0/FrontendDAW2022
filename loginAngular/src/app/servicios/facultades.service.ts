import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Facultad } from '../dominio/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {
  
  private URLBase = "http://localhost:8080/facultades";

  constructor(private httpClient:HttpClient) { }
  
  guardarFacultad(facultad:Facultad):Observable<Facultad>{
    return this.httpClient.post<Facultad>(`${this.URLBase}`,facultad)
  }
  
  actualizarFacultad(facultad:Facultad):Observable<Facultad>{
    return this.httpClient.put<Facultad>(`${this.URLBase}`,facultad)
  }

  eliminarFacultad(facultad:Facultad): Observable<Facultad>{
    return this.httpClient.delete<Facultad>(`${this.URLBase}`+"/"+facultad.id)
  }
  
  getFacultad(facultad:Facultad): Observable<Facultad>{
    return this.httpClient.get<Facultad>(`${this.URLBase}`+"/"+facultad.id);
  }

  getFacultades(): Observable<Facultad[]>{
    return this.httpClient.get<Facultad[]>(`${this.URLBase}`);
  }

}
/*
{codigo: 'CBA',nombre:'Córdoba'},
{codigo: 'SF',nombre:'San Fransisco'},
{codigo: 'VM',nombre:'Villa María'},
*/