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
/*
  {codigo:'FUT',nombre:'Futbol'},
  {codigo:'VOL',nombre:'Voley'},
  {codigo:'BASK',nombre:'Basket'}
*/