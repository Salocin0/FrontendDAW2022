import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-facultad-actualizar',
  templateUrl: './facultad-actualizar.component.html',
  styleUrls: ['./facultad-actualizar.component.css']
})

export class FacultadActualizarComponent implements OnInit {
  //atributos
  actualizarFacultad:any;
  id: number=0;
  enviado = false;
  
  constructor(private builder: FormBuilder, private router:Router, private servicioFacultades: FacultadesService, private Aroute:ActivatedRoute) {
  }

  ngOnInit(): void {
    //se toman los atributos de la facultad seleccionada
    this.id=this.Aroute.snapshot.params['id']
    this.registroForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.registroForm.controls['Codigo'].setValue(this.Aroute.snapshot.params['codigo']);
    this.registroForm.controls['CodigoNumerico'].setValue(this.Aroute.snapshot.params['codigoNumerico']);
  }
  
  registroForm = this.builder.group({
    //comprobacion de que se cumplan los requisitos para la actualizacion
    Nombre:["", [Validators.required, Validators.minLength(3)]],
    Codigo:["", [Validators.required, Validators.minLength(3)]],
    CodigoNumerico:["", [Validators.required,Validators.minLength(1)]],
  })
  
  onSubmit() {
    //actualiza la variable del envio
    this.enviado = true
    //comprobar errores en los campos
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Codigo'].errors) return
    if(this.registroForm.controls['CodigoNumerico'].errors) return
    //crear una facultad con los atributos ingresados
    const facultad = {
      id:this.id,
      nombre: this.registroForm.controls["Nombre"].value,
      codigo: this.registroForm.controls["Codigo"].value,
      codigoNumerico: this.registroForm.controls["CodigoNumerico"].value,
    }
    //se actualiza la facultad y se muestra en consola
    this.actualizarFacultad=facultad
    this.servicioFacultades.actualizarFacultad(this.actualizarFacultad).subscribe()
    console.log(this.actualizarFacultad);
    //aviso de actualizacion
    Swal.fire({
      title: 'Facultad Actualizada'
    })

    this.onVolver()
  }
  //vuelve a listado de facultades
  onVolver(){
    this.router.navigate(['facultades'])
  }

}