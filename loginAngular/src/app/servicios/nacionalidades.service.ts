import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  constructor(private http:HttpClient) { }

  getNacionalidades(){
    return this.http.get('https://restcountries.com/v2/lang/es');
  }
}
