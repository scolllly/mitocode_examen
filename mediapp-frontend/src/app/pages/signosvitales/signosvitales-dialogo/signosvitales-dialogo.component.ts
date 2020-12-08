import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-signosvitales-dialogo',
  templateUrl: './signosvitales-dialogo.component.html',
  styleUrls: ['./signosvitales-dialogo.component.css']
})
export class SignosVitalesDialogoComponent implements OnInit {

  paciente: Paciente;

  constructor(
    private dialogRef: MatDialogRef<SignosVitalesDialogoComponent>,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.paciente = new Paciente();
    this.paciente.nombres = '';
    this.paciente.apellidos = '';
    this.paciente.dni = '';
    this.paciente.telefono = '';
    this.paciente.direccion = '';
    this.paciente.email = '';
  }


  operar() {
    

      //REGISTRAR
      
      this.pacienteService.registrar(this.paciente).pipe(switchMap(() => {
        return this.pacienteService.listar();
      })).subscribe(data => {
        this.pacienteService.setPacienteCambio(data);
        this.pacienteService.setMensajecambio('SE REGISTRO');
      });
    
    this.cerrar(); 
  }

  cerrar() {
    this.dialogRef.close();
  }

}
