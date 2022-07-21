import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Disciplina } from '../dominio/disciplina';
@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  //atributos
  private URLBase = "http://localhost:8080/disciplinas";
  //constructor
  constructor(private httpClient:HttpClient) { }
  //traer disciplina filtro + paginacion
  public getDisciplinasPage(filtro:String, page: number, size:number, order:String, asc:boolean):Observable<any> {
    return this.httpClient.get<any>(`${this.URLBase}`+`/disciplinasPage?`+`page=${page}&size=${size}&order=${order}&asc=${asc}&filtro=${filtro}`);
  }
  //guardar disciplinas
  guardarDisciplinas(disciplina:Disciplina):Observable<Disciplina>{
    return this.httpClient.post<Disciplina>(`${this.URLBase}`,disciplina)
  }
  //actualizar disciplinas
  actualizarDisciplinas(disciplina:Disciplina):Observable<Disciplina>{
    return this.httpClient.put<Disciplina>(`${this.URLBase}`,disciplina)
  }
  //eliminar disciplinas
  eliminarDisciplinas(disciplina:Disciplina): Observable<Disciplina>{
    return this.httpClient.delete<Disciplina>(`${this.URLBase}`+"/"+disciplina.id)
  }
  //tomar disciplina por id
  getDiciplina(disciplina:Disciplina): Observable<Disciplina>{
    return this.httpClient.get<Disciplina>(`${this.URLBase}`+"/"+disciplina.id);
  }
  //tomar todas las disciplinas
  getDisciplinas(): Observable<Disciplina[]>{
    return this.httpClient.get<Disciplina[]>(`${this.URLBase}`);
  }
}