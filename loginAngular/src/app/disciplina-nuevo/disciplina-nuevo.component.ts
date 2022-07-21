import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisciplinasService } from '../servicios/disciplinas.service';
@Component({
  selector: 'app-disciplina-nuevo',
  templateUrl: './disciplina-nuevo.component.html',
  styleUrls: ['./disciplina-nuevo.component.css']
})
export class DisciplinaNuevoComponent implements OnInit {
  //atributos
  disciplinaNueva:any
  enviado = false
  //constructor
  constructor(private builder: FormBuilder, private router:Router, private serviciodisciplinas: DisciplinasService) {
  }

  ngOnInit(): void {
  }
  //validaciones al registrar una nueva facultad
  registroForm = this.builder.group({
    Nombre:["", [Validators.required, Validators.minLength(3)]],
    Codigo:["", [Validators.required, Validators.minLength(3)]],
    Descripcion:["", [Validators.required,Validators.minLength(1)]],
  })  
  //registrar nueva disciplina
  onSubmit() {
    this.enviado = true
    //comprobar validaciones
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Codigo'].errors) return
    if(this.registroForm.controls['Descripcion'].errors) return
    //crear objeto disciplina
    const disciplina = {
      nombre: this.registroForm.controls["Nombre"].value,
      codigo: this.registroForm.controls["Codigo"].value,
      descripcion : this.registroForm.controls["Descripcion"].value,
    }
    //guardar disciplina
    this.disciplinaNueva=disciplina
    this.serviciodisciplinas.guardarDisciplinas(this.disciplinaNueva).subscribe()
    console.log(this.disciplinaNueva);
    //aviso registro
    Swal.fire({
      title: 'Disciplina registrada'
    })
    //volver
    this.onVolver()
  }
  //volver a menu principal
  onVolver(){
    this.router.navigate(['home'])
  }
}