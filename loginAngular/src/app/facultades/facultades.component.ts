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
    this.obtenerFacultades();
  }

  private obtenerFacultades(){
    this.servicioFacultades.getFacultades().subscribe(listaFacultades =>{this.facultades=listaFacultades;})
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
    if(this.iconNombre[0]===true&&this.iconCodigo[0]==true&&this.iconCodigoNumerico[0]===true){
      this.servicioFacultades.getFacultadesFiltro(nombre,codigo,codigoNumerico).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
      return
    }
    if(this.iconNombre[1]===true){//nombre asc
      const orden="ASC"
      this.servicioFacultades.getFacultadesFiltroOrdenNombre(nombre,codigo,codigoNumerico,orden).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
    }
    if(this.iconNombre[2]===true){//nombre des
      const orden="DESC"
      this.servicioFacultades.getFacultadesFiltroOrdenNombre(nombre,codigo,codigoNumerico,orden).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
    }
    if(this.iconCodigo[1]===true){//codigo asc
      const orden="ASC"
      this.servicioFacultades.getFacultadesFiltroOrdenCodigo(nombre,codigo,codigoNumerico,orden).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
    }
    if(this.iconCodigo[2]===true){//codigo des
      const orden="DESC"
      this.servicioFacultades.getFacultadesFiltroOrdenCodigo(nombre,codigo,codigoNumerico,orden).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
    }
    if(this.iconCodigoNumerico[1]===true){//codigonumerico asc
      const orden="ASC"
      this.servicioFacultades.getFacultadesFiltroOrdenCodigoNumerico(nombre,codigo,codigoNumerico,orden).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
    }
    if(this.iconCodigoNumerico[2]===true){//codigonumerico des
      const orden="DESC"
      this.servicioFacultades.getFacultadesFiltroOrdenCodigoNumerico(nombre,codigo,codigoNumerico,orden).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
    }
    
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
    this.router.navigate(['facultad-consultar',facultad.id])
  }

  onOrdenarXNombre(){
    if(this.iconNombre[0]===true){
      this.iconNombre=[false,true,false]
      this.iconCodigo=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconNombre[2]===true){
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconNombre[1]===true){
      this.iconNombre=[false,false,true]
      this.iconCodigo=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
  }

  onOrdenarXCodigo(){
    if(this.iconCodigo[0]===true){
      this.iconCodigo=[false,true,false]
      this.iconNombre=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigo[2]===true){
      this.iconCodigo=[true,false,false]
      this.iconNombre=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigo[1]===true){
      this.iconCodigo=[false,false,true]
      this.iconNombre=[true,false,false]
      this.iconCodigoNumerico=[true,false,false]
      this.onFiltrar()
      return
    }
  }
  
  onOrdenarXCodigoNumerico(){
    if(this.iconCodigoNumerico[0]===true){
      this.iconCodigoNumerico=[false,true,false]
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigoNumerico[2]===true){
      this.iconCodigoNumerico=[true,false,false]
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
    if(this.iconCodigoNumerico[1]===true){
      this.iconCodigoNumerico=[false,false,true]
      this.iconNombre=[true,false,false]
      this.iconCodigo=[true,false,false]
      this.onFiltrar()
      return
    }
  }

  onPaginaSiguiente(){
    //setea la pagina actual + 1, si la pagina actual no es la ultima
    //muestra la pagina actual
  }

  onPaginaAnterior(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }
  
}