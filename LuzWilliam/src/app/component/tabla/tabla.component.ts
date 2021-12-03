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
  public lugar
  public nuevoLugar: Local;
  public local
  public Yearr: Local
  public habilitar
  public checa
  public cantidad
  public pagoLocal
  public cuotaLocal
  public pagoca = {
    cantidad: 0
  }

  constructor(
    public UserService:UserService,
    private router:Router,
    public LugarService:LugarService

  ) {
    this.user = new User('','','','')
    this.lugar = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
    this.nuevoLugar = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
    this.Yearr = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
    this.local = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
    this.pagoLocal = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
    this.cuotaLocal = new Local('','','',0,0,0,0,0,'','',[{cantidad : 0, fecha:''}])
  }

  ngOnInit(): void {
    this.getIdentidad();
    this.onChage();
    this.pagoca.cantidad = null
    this.nuevoLugar.local = null
    this.nuevoLugar.focos = null
    this.nuevoLugar.precioUnidad = null
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
    this.onChage();
  }

  onChage(){
    this.state = 'table'

    this.LugarService.ListarXYear("2021").subscribe(
      response=>{
        this.local = response
        this.lugar = response

        console.log(this.local)
      }
    )
  }

  deshabilitar(){
    if(this.habilitar == true){
      this.habilitar = false
    }else{
      this.habilitar = true
    }
  }

  iniciar(id){
    this.habilitar = true
    this.LugarService.LugarID(id).subscribe(
      response=>{
        this.pagoLocal = response
        console.log(response)
      }

    )
  }

  pago(){
    this.LugarService.Pago(this.pagoLocal.local,this.pagoca).subscribe(
      response=>{
        console.log(response)
        this.cuota(this.pagoLocal._id)
      }
    )
  }

  cuota(id){
    this.state = "textArea"
    this.LugarService.LugarID(id).subscribe(
      response=>{

        this.cuotaLocal = response
      }
    )
  }

  regresar(){
    this.state = "table"
    window.location.reload();
  }

}
