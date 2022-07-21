import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {
  //constructor
  constructor(private httpClient:HttpClient) { }
  //trae las nacionalidades desde la API
  getNacionalidades(){
    return this.httpClient.get('https://restcountries.com/v2/lang/es');
  }
}