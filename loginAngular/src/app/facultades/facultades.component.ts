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

  constructor(private router: Router, private servicioFacultades: FacultadesService, private formBuilder: FormBuilder) { 
    this.filtrarFacultadesForm = this.formBuilder.group({
      nombre:[""],
      codigo:[""],
      codigoNumerico:[""],
    })
  }

  facultades: any[] = [];
  filtrarFacultadesForm: FormGroup;
  
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
    //alert(this.filtrarFacultadesForm.controls["nombre"].value)
    //alert(this.filtrarFacultadesForm.controls["codigo"].value)
    //alert(this.filtrarFacultadesForm.controls["codigoNumerico"].value)
    const nombre=this.filtrarFacultadesForm.controls["nombre"].value
    const codigo=this.filtrarFacultadesForm.controls["codigo"].value
    const codigoNumerico=this.filtrarFacultadesForm.controls["codigoNumerico"].value
    this.servicioFacultades.getFacultadesFiltro(nombre,codigo,codigoNumerico).subscribe(listaFacultades =>{this.facultades=listaFacultades;})
  }

  onLimpiarFiltro() {
    this.filtrarFacultadesForm.controls["nombre"].setValue('')
    this.filtrarFacultadesForm.controls["codigo"].setValue('')
    this.filtrarFacultadesForm.controls["codigoNumerico"].setValue('')
    this.onFiltrar()
  }

  onVolver(){
    this.router.navigate(['home'])
  }

  onOrdenarXNombre(){
    //ordenar de A a Z si es la primera vez q se aplica
    //ordenar de Z a A si es la segunda vez q se aplica
    //quita el orden por nombre si es la tercera ves
  }

  onOrdenarXFechaNacimiento(){
    //ordenar de fecha mas cercana a fecha mas lejana si es la primera vez q se aplica
    //ordenar de fecha mas lejana a fecha mas cercana si es la segunda vez q se aplica
    //quita el orden por fecha de nacimiento si es la tercera ves
  }

  onOrdenarXDNI(){
    //ordenar de 1 a infinito si es la primera vez q se aplica
    //ordenar de infinito a 1 si es la segunda vez q se aplica
    //quita el orden por DNI si es la tercera ves
  }

  onOrdenarXFacultad(){
    //ordenar de A a Z si es la primera vez q se aplica
    //ordenar de Z a A si es la segunda vez q se aplica
    //quita el orden por facultad si es la tercera ves
  }

  onOrdenarXDisciplina(){
    //ordenar de A a Z si es la primera vez q se aplica
    //ordenar de Z a A si es la segunda vez q se aplica
    //quita el orden por diciplina si es la tercera ves
  }

  onOrdenarXNacionalidad(){
    //ordenar de A a Z si es la primera vez q se aplica
    //ordenar de Z a A si es la segunda vez q se aplica
    //quita el orden por nacionalidad si es la tercera ves
  }

  onPaginaSiguiente(){
    //setea la pagina actual + 1, si la pagina actual no es la ultima
    //muestra la pagina actual
  }

  onPaginaAnterior(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }

  onModificar(facultad:Facultad){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }

  onBorrar(facultad:Facultad){
    this.servicioFacultades.eliminarFacultad(facultad).subscribe(facultad =>{console.log(facultad);})
    this.servicioFacultades.getFacultades().subscribe(listaFacultades =>{this.facultades=listaFacultades;})
  }

  onOrdenarXEMail(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }
  
  onOrdenarXLegajo(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }

  onOrdenarXTelefono(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }

  onOrdenarXID(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }
  onOrdenarXCodigo(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }
  onOrdenarXCodigoNumerico(){
    //setea la pagina actual - 1, si la pagina actual no es la primera 
    //muestra la pagina actual
  }
}