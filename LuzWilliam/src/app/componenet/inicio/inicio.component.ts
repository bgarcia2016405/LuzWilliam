import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public state
  public token;
  public identidad;
  public user : User

  constructor(
    public UserService:UserService,
    private router:Router
  ) {
    this.identidad = this.UserService.getIdentidad();
    this.user = new User("","","","");
   }

  ngOnInit(): void {

  }

  iniciar(){
    this.UserService.login(this.user).subscribe(
      response =>{
        console.log(response)
        this.identidad = response.userFound
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken();
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.router.navigate(['/tabla'])
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Todo salio correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Usuario o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  getToken(){
    this.UserService.login(this.user).subscribe(
      response=>{
        console.log(response)
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
      }
    )
  }

}
