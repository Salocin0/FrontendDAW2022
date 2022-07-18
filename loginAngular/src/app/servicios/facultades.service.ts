import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Facultad } from '../dominio/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {
  //atributos
  private URLBase = "http://localhost:8080/facultades";
  //constructor
  constructor(private httpClient:HttpClient) { }
  //traer facultades filtro + paginacion
  public getFacultadesPage(nombre:string,codigo:string,codigoNumerico:string, page: number, size:number, order:String, asc:boolean):Observable<any> {
    return this.httpClient.get<any>(`${this.URLBase}`+`/facultadesPage?`+`page=${page}&size=${size}&order=${order}&asc=${asc}&nombre=${nombre}&codigo=${codigo}&codigoNumerico=${codigoNumerico}`);
  }
  //guardar facultad
  guardarFacultad(facultad:Facultad):Observable<Facultad>{
    return this.httpClient.post<Facultad>(`${this.URLBase}`,facultad)
  }
  //actualizar facultad
  actualizarFacultad(facultad:Facultad):Observable<Facultad>{
    return this.httpClient.put<Facultad>(`${this.URLBase}`,facultad)
  }
  //eliminar facultad
  eliminarFacultad(facultad:Facultad): Observable<Facultad>{
    return this.httpClient.delete<Facultad>(`${this.URLBase}`+"/"+facultad.id)
  }
  //tomar facultad por id
  getFacultad(id:number): Observable<Facultad>{
    return this.httpClient.get<Facultad>(`${this.URLBase}`+"/"+id);
  }
  //tomar todas las facultades sin paginacion
  getFacultades(): Observable<Facultad[]>{
    return this.httpClient.get<Facultad[]>(`${this.URLBase}`);
  }
}