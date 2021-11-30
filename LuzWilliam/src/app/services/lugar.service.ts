import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  public url:String;
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }


  crearLugar(lugar){
    let params = JSON.stringify(lugar);
    let token = this.headers.set('Authorization', this.getToken())

    return this.http.post(this.url + '/CrearLugar', params, {headers:token})
  }

  EditarLugar(lugar, id){
    let params = JSON.stringify(lugar);
    let token = this.headers.set('Authorization', this.getToken())

    return this.http.put(this.url + '/EditarLugar/' + id, params, {headers:token})
  }

  EliminarLugar(id){
    let token = this.headers.set('Authorization', this.getToken())

    return this.http.delete(this.url + '/EliminarLugar/' + id, {headers:token})
  }

  ListarXYear(Year){
    return this.http.get(this.url + '/ListarXYear/' + Year, {headers:this.token})
  }

  ListaXLugarYear(Year,Lugar){
    return this.http.get(this.url + '/ListarXLugarYear/'+ Year + '/' + Lugar, {headers:this.token})
  }

  Pago(Lugar,Body){
    let params = JSON.stringify(Body);

    return this.http.put(this.url + '/PagarCuota/' + Lugar, params, {headers:this.token})
  }

   getToken(){
    var token2 = localStorage.token;
    if(token2 != undefined){
      this.token = token2;
    }else{
      this.token = null
    }
    return this.token
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem("identidad"))
    if(identidad2 != undefined){
       this.identidad = identidad2;
    }else{
       this.identidad = null;
    }
    return this.identidad;
 }
}
