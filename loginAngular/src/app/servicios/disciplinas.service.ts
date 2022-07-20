import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Disciplina } from '../dominio/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  private URLBase = "http://localhost:8080/disciplinas";
  constructor(private httpClient:HttpClient) { }

  //traer facultades filtro + paginacion
  public getDisciplinasPage(nombre:string,codigo:string,descripcion:string, page: number, size:number, order:String, asc:boolean):Observable<any> {
    return this.httpClient.get<any>(`${this.URLBase}`+`/disciplinasPage?`+`page=${page}&size=${size}&order=${order}&asc=${asc}&nombre=${nombre}&codigo=${codigo}&descripcion=${descripcion}`);
  }

  guardarDisciplinas(disciplina:Disciplina):Observable<Disciplina>{
    return this.httpClient.post<Disciplina>(`${this.URLBase}`,disciplina)
  }
  
  actualizarDisciplinas(disciplina:Disciplina):Observable<Disciplina>{
    return this.httpClient.put<Disciplina>(`${this.URLBase}`,disciplina)
  }

  eliminarDisciplinas(disciplina:Disciplina): Observable<Disciplina>{
    return this.httpClient.delete<Disciplina>(`${this.URLBase}`+"/"+disciplina.id)
  }
  
  getDiciplina(disciplina:Disciplina): Observable<Disciplina>{
    return this.httpClient.get<Disciplina>(`${this.URLBase}`+"/"+disciplina.id);
  }

  getDisciplinas(): Observable<Disciplina[]>{
    return this.httpClient.get<Disciplina[]>(`${this.URLBase}`);
  }

}