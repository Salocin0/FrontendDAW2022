import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  constructor(private httpClient:HttpClient) { }

  getNacionalidades(){
    return this.httpClient.get('https://restcountries.com/v2/lang/es');
  }

}
