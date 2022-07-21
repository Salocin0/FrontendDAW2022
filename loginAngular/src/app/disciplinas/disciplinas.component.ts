import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Disciplina } from '../dominio/disciplina';
import { DisciplinasService } from '../servicios/disciplinas.service';
@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {
  //atributos icono tabla
  iconNombre: boolean[] = [true,false,false];
  iconCodigo: boolean[] = [true,false,false];
  iconDescripcion: boolean[] = [true,false,false];
  //atributos disciplinas
  disciplinas: any[] = [];
  DisciplinasForm: FormGroup;
  //atributos paginacion
  page=0;
  size=5;
  order="id"
  asc=true;
  primera=false;
  ultima=false;
  totalPages=0;
  //constructor
  constructor(private router: Router, private servicioDisciplinas: DisciplinasService, private formBuilder: FormBuilder) { 
    this.DisciplinasForm = this.formBuilder.group({
      filtro:[""]
    })
  }
  //metodos al iniciar
  ngOnInit(): void {
    this.obtenerDisciplinas("",);
  }
  //traer la disciplinas paginadas con los filtros
  private obtenerDisciplinas(filtro:string){
    this.servicioDisciplinas.getDisciplinasPage(filtro,this.page,this.size,this.order,this.asc).subscribe(listaDisciplinas =>{
      this.disciplinas=listaDisciplinas.content;
      this.primera=listaDisciplinas.first;
      this.ultima=listaDisciplinas.last;
      this.totalPages=listaDisciplinas.totalPages;
    })
  }
  //ir a registrar disciplinas
  onNuevoDisciplinaClick(){
    this.router.navigate(['disciplina-nuevo'])
  }
  //traer disciplinas con filtro
  onFiltrar(){
    const filtro = this.DisciplinasForm.controls["filtro"].value
    this.obtenerDisciplinas(filtro)
  }
  //limpiar filtro
  onLimpiarFiltro() {
    this.DisciplinasForm.controls["filtro"].setValue('')
    this.onFiltrar()
  }
  //volver al menu principal
  onVolver(){
    this.router.navigate(['home'])
  }
  //ir a modificar disciplina
  onModificar(disciplina:Disciplina){
    this.router.navigate(['disciplina-actualizar',disciplina])
  }
  //aviso si se acepta se borrar la disciplina, en caso contrario se cancela
  onBorrar(disciplina:Disciplina){
    Swal.fire({
      title: 'Borrar',
      text: "Desea eliminar disciplina " +disciplina.nombre+"?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!'
    }as any).then((result)=>{
      if(result.isConfirmed){
        this.servicioDisciplinas.eliminarDisciplinas(disciplina).subscribe(disciplina=>{console.log(disciplina);})
        this.onFiltrar();
      }
    })
  }
  //ir a consultar disciplina
  onConsultar(disciplina:Disciplina){
    this.router.navigate(['disciplina-consultar',disciplina])
  }
  //ordenar asc, desc o no ordenar por nombre
  onOrdenarXNombre(){
    if(this.iconNombre[0]===true){
      this.iconNombre=[false,true,false]
      //acendente por nombre
      this.sort(true,"nombre")
      this.iconCodigo=[true,false,false]
      this.iconDescripcion=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconNombre[2]===true){
      this.iconNombre=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconCodigo=[true,false,false]
      this.iconDescripcion=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconNombre[1]===true){
      this.iconNombre=[false,false,true]
      //descendente por nombre
      this.sort(false,"nombre")
      this.iconCodigo=[true,false,false]
      this.iconDescripcion=[true,false,false]
      this.onFiltrar()
      return
    }
  }
  //ordenar asc, desc o no ordenar por codigo
  onOrdenarXCodigo(){
    if(this.iconCodigo[0]===true){
      this.iconCodigo=[false,true,false]
      //acendente por codigo
      this.sort(true,"codigo")
      this.iconNombre=[true,false,false]
      this.iconDescripcion=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigo[2]===true){
      this.iconCodigo=[true,false,false]
      //sin orden por codigo (volver a id)
      this.sort(true,"id")
      this.iconNombre=[true,false,false]
      this.iconDescripcion=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigo[1]===true){
      this.iconCodigo=[false,false,true]
      //descendente por codigo
      this.sort(false,"codigo")
      this.iconNombre=[true,false,false]
      this.iconDescripcion=[true,false,false]
      this.onFiltrar()
      return
    }
  }
  //ordenar asc, desc o no ordenar por descripcion
  onOrdenarXDescripcion(){
    if(this.iconDescripcion[0]===true){
      this.iconDescripcion=[false,true,false]
      //acendente por descripcion
      this.sort(true,"descripcion")
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconDescripcion[2]===true){
      this.iconDescripcion=[true,false,false]
      //sin orden por descripcion (volver a id)
      this.sort(true,"id")
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconDescripcion[1]===true){
      this.iconDescripcion=[false,false,true]
      //descendente por descripcion
      this.sort(false,"descripcion")
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
  }
  //ordenar asc o desc con una columna especifica
  sort(asc:boolean,order:string){
    this.asc=asc
    this.order=order
  }
  //avanzar pagina
  onPaginaSiguiente(){
    if(!this.ultima){
      this.page=this.page+1
      this.onFiltrar()
    }
  }
  //retroceder pagina
  onPaginaAnterior(){
    if(!this.primera){
      this.page=this.page-1
      this.onFiltrar()
    }
  } 
}