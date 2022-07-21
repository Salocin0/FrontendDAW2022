import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Facultad } from '../dominio/facultad';
import { FacultadesService } from '../servicios/facultades.service';
@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.css']
})
export class FacultadesComponent implements OnInit {
  //atributos iconos tabla
  iconNombre: boolean[] = [true,false,false];
  iconCodigo: boolean[] = [true,false,false];
  iconCodigoNumerico: boolean[] = [true,false,false];
  //atributos facultades
  facultades: any[] = [];
  FacultadesForm: FormGroup;
  //atributos paginacion
  page=0;
  size=5;
  order="id"
  asc=true;
  primera=false;
  ultima=false;
  totalPages=0;
  //constructor
  constructor(private router: Router, private servicioFacultades: FacultadesService, private formBuilder: FormBuilder) { 
    this.FacultadesForm = this.formBuilder.group({
      filtro:[""],
    })
  }
  //metodos al iniciar
  ngOnInit(): void {
    this.obtenerFacultades("");
  }
  //traer la facultades paginadas con los filtros
  private obtenerFacultades(filtro:string){
    this.servicioFacultades.getFacultadesPage(filtro,this.page,this.size,this.order,this.asc).subscribe(listaFacultades =>{
      this.facultades=listaFacultades.content;
      this.primera=listaFacultades.first;
      this.ultima=listaFacultades.last;
      this.totalPages=listaFacultades.totalPages;
    })
  }
  //ir a registrar facultad
  onNuevoFacultadClick(){
    this.router.navigate(['facultad-nuevo'])
  }
  //traer facultades con filtro
  onFiltrar(){
    const filtro = this.FacultadesForm.controls["filtro"].value
    this.obtenerFacultades(filtro)
  }
  //limpiar filtro
  onLimpiarFiltro() {
    this.FacultadesForm.controls["filtro"].setValue('')
    this.onFiltrar()
  }
  //volver al menu principal
  onVolver(){
    this.router.navigate(['home'])
  }
  //ir a modificar facultad
  onModificar(facultad:Facultad){
    this.router.navigate(['facultad-actualizar',facultad])
  }
  //aviso, en caso de aceptar se borra la facultad, en caso contrario se cancela 
  onBorrar(facultad:Facultad){
    Swal.fire({
      title: 'Borrar',
      text: "Desea eliminar facultad " +facultad.nombre+"?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!'
    }as any).then((result)=>{
      if(result.isConfirmed){
        this.servicioFacultades.eliminarFacultad(facultad).subscribe(facultad =>{console.log(facultad);})
        this.onFiltrar();
      }
    })
  }
  //ir a consultar facultad
  onConsultar(facultad:Facultad){
    this.router.navigate(['facultad-consultar',facultad])
  }
  //ordenar asc, desc o no ordenar por nombre
  onOrdenarXNombre(){
    if(this.iconNombre[0]===true){
      this.iconNombre=[false,true,false]
      //acendente por nombre
      this.sort(true,"nombre")
      this.iconCodigo=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconNombre[2]===true){
      this.iconNombre=[true,false,false]
      //sin orden por nombre (volver a id)
      this.sort(true,"id")
      this.iconCodigo=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconNombre[1]===true){
      this.iconNombre=[false,false,true]
      //descendente por nombre
      this.sort(false,"nombre")
      this.iconCodigo=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
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
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigo[2]===true){
      this.iconCodigo=[true,false,false]
      //sin orden por codigo (volver a id)
      this.sort(true,"id")
      this.iconNombre=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigo[1]===true){
      this.iconCodigo=[false,false,true]
      //descendente por codigo
      this.sort(false,"codigo")
      this.iconNombre=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
  }
  //ordenar asc, desc o no ordenar por codigoNumerico
  onOrdenarXCodigoNumerico(){
    if(this.iconCodigoNumerico[0]===true){
      this.iconCodigoNumerico=[false,true,false]
      //acendente por codigo numerico
      this.sort(true,"codigoNumerico")
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigoNumerico[2]===true){
      this.iconCodigoNumerico=[true,false,false]
      //sin orden por codigo numerico (volver a id)
      this.sort(true,"id")
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigoNumerico[1]===true){
      this.iconCodigoNumerico=[false,false,true]
      //descendente por codigo numerico
      this.sort(false,"codigoNumerico")
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