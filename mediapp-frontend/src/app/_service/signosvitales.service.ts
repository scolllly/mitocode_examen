import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { SignosVitales } from '../_model/signosvitales';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignosVitalesService  extends GenericService<SignosVitales>{

  private signosvitalesCambio = new Subject<SignosVitales[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signosvitales`
    );
  }

  //get Subjects
  getSignosVitalesCambio() {
    return this.signosvitalesCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setSignosVitalesCambio(signosvitales: SignosVitales[]) {
    this.signosvitalesCambio.next(signosvitales);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}






