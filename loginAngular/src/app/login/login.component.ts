import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //atributos
  loginForm = this.builder.group(
    {
    usuario: ['',[Validators.required, Validators.minLength(4)]],
    password:['',[Validators.required, Validators.minLength(4)]]
    }
  )
  //constructor
  constructor(private builder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }
  //comprueba el usuario y la contraseña para ingresar
  onSubmit(){
    if(this.loginForm.controls['usuario'].errors || this.loginForm.controls['password'].errors){
      Swal.fire({
        title: 'Error en usuario o contraseña'
      })
    }else{
      this.router.navigate(['home'])
      Swal.fire({
        title: 'Bienvenido al sistema'
      })
    }
  }

  onNuevoUsuario(){
  }
}