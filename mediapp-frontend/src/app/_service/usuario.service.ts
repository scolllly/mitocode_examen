import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario>{

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/menus`);
  }

  obtenerNombre() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return null;
  }
}
