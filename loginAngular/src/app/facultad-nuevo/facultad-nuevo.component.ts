import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-facultad-nuevo',
  templateUrl: './facultad-nuevo.component.html',
  styleUrls: ['./facultad-nuevo.component.css']
})

export class FacultadNuevoComponent implements OnInit {
  //atributos
  facultadNueva:any
  enviado = false
  //constructor
  constructor(private builder: FormBuilder, private router:Router, private servicioFacultades: FacultadesService) {
  }

  ngOnInit(): void {
  }
  //validaciones al registrar una nueva facultad
  registroForm = this.builder.group({
    Nombre:["", [Validators.required, Validators.minLength(3)]],
    Codigo:["", [Validators.required, Validators.minLength(3)]],
    CodigoNumerico:["", [Validators.required,Validators.minLength(1)]],
  })  

  onSubmit() {
    //actualizar variable
    this.enviado = true
    //comprobar validaciones
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Codigo'].errors) return
    if(this.registroForm.controls['CodigoNumerico'].errors) return
    //crear objeto facultad
    const facultad = {
      nombre: this.registroForm.controls["Nombre"].value,
      codigo: this.registroForm.controls["Codigo"].value,
      codigoNumerico: this.registroForm.controls["CodigoNumerico"].value,
    }
    //guardar facultad
    this.facultadNueva=facultad
    this.servicioFacultades.guardarFacultad(this.facultadNueva).subscribe()
    console.log(this.facultadNueva);
    //aviso facultad
    Swal.fire({
      title: 'Facultad registrada'
    })
    this.onVolver()
  }
  //volver a menu principal
  onVolver(){
    this.router.navigate(['home'])
  }

}