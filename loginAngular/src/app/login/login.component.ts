import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.builder.group(
    {
    usuario: ['',[Validators.required], Validators.minLength(4)],
    password:['',[Validators.required]]
    }
  )
  constructor(private builder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("enviado")
    console.log(this.loginForm.get("usuario")!.value);
    console.log(this.loginForm.get("password")!.value);
    if (!this.loginForm.get("usuario")?.errors && !this.loginForm.get("password")?.errors){
      this.router.navigate(['home'])
      Swal.fire({
        title: 'bienvenido al sistema'
      })
    }else{
      Swal.fire({
        title: 'Error en usuario o contraseña'
      })
    }
  }
}