import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-facultad-consultar',
  templateUrl: './facultad-consultar.component.html',
  styleUrls: ['./facultad-consultar.component.css']
})
export class FacultadConsultarComponent implements OnInit {
  
  consultarForm = this.builder.group({
    Id:[""],
    Nombre:[""],
    Codigo:[""],
    CodigoNumerico:[""],
  })

  ngOnInit(): void {
    //muestra los valores de la facultad seleccionada
    this.consultarForm.controls['Id'].setValue(this.Aroute.snapshot.params['id']);
    this.consultarForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.consultarForm.controls['Codigo'].setValue(this.Aroute.snapshot.params['codigo']);
    this.consultarForm.controls['CodigoNumerico'].setValue(this.Aroute.snapshot.params['codigoNumerico']);
  }
  
  constructor(private builder: FormBuilder, private router:Router,private Aroute:ActivatedRoute,private servicioFacultades: FacultadesService) {
  }
  //vuelve al listado de facultades
  onVolver(){
    this.router.navigate(['facultades'])
  }
}
