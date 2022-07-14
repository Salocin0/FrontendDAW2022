import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Facultad } from '../dominio/facultad';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-facultad-nuevo',
  templateUrl: './facultad-nuevo.component.html',
  styleUrls: ['./facultad-nuevo.component.css']
})
export class FacultadNuevoComponent implements OnInit {
  facultadNueva:any
  
  constructor(private builder: FormBuilder, private router:Router, private servicioFacultades: FacultadesService) {
  }

  ngOnInit(): void {
  }
  
  registroForm = this.builder.group({
    Nombre:["", [Validators.required, Validators.minLength(3)]],
    Codigo:["", [Validators.required, Validators.minLength(3)]],
    CodigoNumerico:["", [Validators.required,Validators.minLength(1)]],
  })

  enviado = false

  onSubmit() {
    this.enviado = true
    
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Codigo'].errors) return
    if(this.registroForm.controls['CodigoNumerico'].errors) return
    
    const facultad = {
      nombre: this.registroForm.controls["Nombre"].value,
      codigo: this.registroForm.controls["Codigo"].value,
      codigoNumerico: this.registroForm.controls["CodigoNumerico"].value,
    }
    this.facultadNueva=facultad
    this.servicioFacultades.guardarFacultad(this.facultadNueva).subscribe()
    console.log(this.facultadNueva);

    Swal.fire({
      title: 'Facultad registrada'
    })
    this.onVolver()
  }

  onVolver(){
    this.router.navigate(['home'])
  }

  buscarNacionalidad(){
  }

}
