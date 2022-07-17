import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Facultad } from '../dominio/facultad';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-facultad-actualizar',
  templateUrl: './facultad-actualizar.component.html',
  styleUrls: ['./facultad-actualizar.component.css']
})
export class FacultadActualizarComponent implements OnInit {
  actualizarFacultad:any;
  id: number=0;
  
  constructor(private builder: FormBuilder, private router:Router, private servicioFacultades: FacultadesService, private Aroute:ActivatedRoute) {
    //actualizarFacultad: facultad;
  }

  ngOnInit(): void {
    this.id=this.Aroute.snapshot.params['id']
    this.registroForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.registroForm.controls['Codigo'].setValue(this.Aroute.snapshot.params['codigo']);
    this.registroForm.controls['CodigoNumerico'].setValue(this.Aroute.snapshot.params['codigoNumerico']);
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
      id:this.id,
      nombre: this.registroForm.controls["Nombre"].value,
      codigo: this.registroForm.controls["Codigo"].value,
      codigoNumerico: this.registroForm.controls["CodigoNumerico"].value,
    }
    this.actualizarFacultad=facultad
    this.servicioFacultades.actualizarFacultad(this.actualizarFacultad).subscribe()
    console.log(this.actualizarFacultad);

    Swal.fire({
      title: 'Facultad Actualizada'
    })
    this.onVolver()
  }

  onVolver(){
    this.router.navigate(['facultades'])
  }

}
