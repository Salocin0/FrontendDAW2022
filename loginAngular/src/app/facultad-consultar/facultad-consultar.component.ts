import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facultad } from '../dominio/facultad';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-facultad-consultar',
  templateUrl: './facultad-consultar.component.html',
  styleUrls: ['./facultad-consultar.component.css']
})
export class FacultadConsultarComponent implements OnInit {
  id: number=0;
  facultad:any;

  ngOnInit(): void {
    this.id=this.Aroute.snapshot.params['id']
    this.facultad = this.servicioFacultades.getFacultad(this.id)

  }
  
  constructor(private router:Router,private Aroute:ActivatedRoute,private servicioFacultades: FacultadesService) {
  }

  onVolver(){
    this.router.navigate(['facultades'])
  }
}
