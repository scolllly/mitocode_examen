import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre: string;
  rol: string;
  helper = new JwtHelperService();
  
  constructor() { }

  ngOnInit(): void {

    let tokenDecode = this.helper.decodeToken(sessionStorage.getItem(`${environment.TOKEN_NAME}`));
    this.nombre = tokenDecode.user_name;
    this.rol = tokenDecode.authorities[0]  ;

  }

}
