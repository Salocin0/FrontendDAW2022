import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Facultad } from '../dominio/facultad';
import { FacultadesService } from '../servicios/facultades.service';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.css']
})
export class FacultadesComponent implements OnInit {
  //atributos
  iconNombre: boolean[] = [true,false,false];
  iconCodigo: boolean[] = [true,false,false];
  iconCodigoNumerico: boolean[] = [true,false,false];
  facultades: any[] = [];
  FacultadesForm: FormGroup;
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
      nombre:[""],
      codigo:[""],
      codigoNumerico:[""],
    })
  }
  //metodos al iniciar
  ngOnInit(): void {
    this.obtenerFacultades("","","");
  }
  //traer la facultades paginadas con los filtros
  private obtenerFacultades(nombre:string,codigo:string,codigoNumerico:string){
    this.servicioFacultades.getFacultadesPage(nombre,codigo,codigoNumerico,this.page,this.size,this.order,this.asc).subscribe(listaFacultades =>{
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
  //alerta eliminar facultad
  eliminar(id: number){
    alert("Eliminando a "+id)
  }
  //traer facultades con filtro
  onFiltrar(){
    const nombre=this.FacultadesForm.controls["nombre"].value
    const codigo=this.FacultadesForm.controls["codigo"].value
    const codigoNumerico=this.FacultadesForm.controls["codigoNumerico"].value
    this.obtenerFacultades(nombre,codigo,codigoNumerico)
  }
  //limpiar filtro
  onLimpiarFiltro() {
    this.FacultadesForm.controls["nombre"].setValue('')
    this.FacultadesForm.controls["codigo"].setValue('')
    this.FacultadesForm.controls["codigoNumerico"].setValue('')
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
  //borrar facultad
  onBorrar(facultad:Facultad){
    this.servicioFacultades.eliminarFacultad(facultad).subscribe(facultad =>{console.log(facultad);})
    this.servicioFacultades.getFacultades().subscribe(listaFacultades =>{this.facultades=listaFacultades;})
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