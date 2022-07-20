import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisciplinasService } from '../servicios/disciplinas.service';

@Component({
  selector: 'app-disciplina-actualizar',
  templateUrl: './disciplina-actualizar.component.html',
  styleUrls: ['./disciplina-actualizar.component.css']
})
export class DisciplinaActualizarComponent implements OnInit {
  //atributos
  actualizarDisciplina:any;
  id: number=0;
  enviado = false;

  constructor(private builder: FormBuilder, private router:Router, private servicioDisciplinas: DisciplinasService, private Aroute:ActivatedRoute) {
  }

  ngOnInit(): void {
    //se toman los atributos de la facultad seleccionada
    this.id=this.Aroute.snapshot.params['id']
    this.registroForm.controls['Nombre'].setValue(this.Aroute.snapshot.params['nombre']);
    this.registroForm.controls['Codigo'].setValue(this.Aroute.snapshot.params['codigo']);
    this.registroForm.controls['Descripcion'].setValue(this.Aroute.snapshot.params['descripcion']);
  }

registroForm = this.builder.group({
  //comprobacion de que se cumplan los requisitos para la actualizacion
  Nombre:["", [Validators.required, Validators.minLength(3)]],
  Codigo:["", [Validators.required, Validators.minLength(3)]],
  Descripcion:["", [Validators.required,Validators.minLength(1)]],
})

  onSubmit() {
    //actualiza la variable del envio
    this.enviado = true
    //comprobar errores en los campos
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Codigo'].errors) return
    if(this.registroForm.controls['Descripcion'].errors) return
    //crear una facultad con los atributos ingresados
    const disciplina = {
      id:this.id,
      nombre: this.registroForm.controls["Nombre"].value,
      codigo: this.registroForm.controls["Codigo"].value,
      descripcion: this.registroForm.controls["Descripcion"].value,
    }
    //se actualiza la facultad y se muestra en consola
    this.actualizarDisciplina=disciplina
    this.servicioDisciplinas.actualizarDisciplinas(this.actualizarDisciplina).subscribe()
    console.log(this.actualizarDisciplina);
    //aviso de actualizacion
    Swal.fire({
      title: 'Disciplinas Actualizada'
    })

    this.onVolver()
  }
  //vuelve a listado de facultades
  onVolver(){
    this.router.navigate(['disciplinas'])
  }

}