import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Local } from 'src/app/models/locals.model';
import { User } from 'src/app/models/user.model';
import { LugarService } from 'src/app/services/lugar.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  public state
  public token;
  public identidad;
  public user : User;
  public lugar: Local;
  public nuevoLugar: Local;

  constructor(
    public UserService:UserService,
    private router:Router,
    public LugarService:LugarService

  ) {
    this.user = new User('','','','')
    this.lugar = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
    this.nuevoLugar = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
  }

  ngOnInit(): void {
    this.getIdentidad();
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
  getIdentidad(){

    this.identidad = this.UserService.getIdentidad();
  }

  crearLocal(){
    this.LugarService.crearLugar(this.nuevoLugar).subscribe(
      response=>{

        console.log(response)

          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Local agregada',
          showConfirmButton: false,
          timer: 2000
        })
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al agregar local',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
    this.nuevoLugar.nombre = ""
    this.nuevoLugar.apellido = ""
    this.nuevoLugar.local = 0
    this.nuevoLugar.focos = 0
    this.nuevoLugar.precioUnidad = 0
  }



}
