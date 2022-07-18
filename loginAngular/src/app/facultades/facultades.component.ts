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
  iconNombre: boolean[] = [true,false,false];
  iconCodigo: boolean[] = [true,false,false];
  iconCodigoNumerico: boolean[] = [true,false,false];

  page=0;
  size=5;
  order="id"
  asc=true;

  primera=false;
  ultima=false;
  totalPages=0;
  
  constructor(private router: Router, private servicioFacultades: FacultadesService, private formBuilder: FormBuilder) { 
    this.FacultadesForm = this.formBuilder.group({
      nombre:[""],
      codigo:[""],
      codigoNumerico:[""],
    })
  }

  facultades: any[] = [];
  FacultadesForm: FormGroup;
  
  ngOnInit(): void {
    this.obtenerFacultades("","","");
  }

  private obtenerFacultades(nombre:string,codigo:string,codigoNumerico:string){
    this.servicioFacultades.getFacultadesPage(nombre,codigo,codigoNumerico,this.page,this.size,this.order,this.asc).subscribe(listaFacultades =>{
      this.facultades=listaFacultades.content;
      this.primera=listaFacultades.first;
      this.ultima=listaFacultades.last;
      this.totalPages=listaFacultades.totalPages;
    })
  }

  onNuevoFacultadClick(){
    this.router.navigate(['facultad-nuevo'])
  }

  editar(id: number){
    alert(id)
  }

  eliminar(id: number){
    alert("Eliminando a "+id)
  }

  onFiltrar(){
    const nombre=this.FacultadesForm.controls["nombre"].value
    const codigo=this.FacultadesForm.controls["codigo"].value
    const codigoNumerico=this.FacultadesForm.controls["codigoNumerico"].value
    this.obtenerFacultades(nombre,codigo,codigoNumerico)
  }

  onLimpiarFiltro() {
    this.FacultadesForm.controls["nombre"].setValue('')
    this.FacultadesForm.controls["codigo"].setValue('')
    this.FacultadesForm.controls["codigoNumerico"].setValue('')
    this.onFiltrar()
  }

  onVolver(){
    this.router.navigate(['home'])
  }

  onModificar(facultad:Facultad){
    this.router.navigate(['facultad-actualizar',facultad])
  }

  onBorrar(facultad:Facultad){
    this.servicioFacultades.eliminarFacultad(facultad).subscribe(facultad =>{console.log(facultad);})
    this.servicioFacultades.getFacultades().subscribe(listaFacultades =>{this.facultades=listaFacultades;})
  }

  onConsultar(facultad:Facultad){
    this.router.navigate(['facultad-consultar',facultad])
  }

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

  sort(asc:boolean,order:string){
    this.asc=asc
    this.order=order
  }

  onPaginaSiguiente(){
    if(!this.ultima){
      this.page=this.page+1
      this.onFiltrar()
    }
  }

  onPaginaAnterior(){
    if(!this.primera){
      this.page=this.page-1
      this.onFiltrar()
    }
  }
  
}
