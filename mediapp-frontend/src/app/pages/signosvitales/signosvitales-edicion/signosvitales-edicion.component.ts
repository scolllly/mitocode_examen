import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { SignosVitales } from 'src/app/_model/signosvitales';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosVitalesService } from 'src/app/_service/signosvitales.service';
import { SignosVitalesDialogoComponent } from '../signosvitales-dialogo/signosvitales-dialogo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signosvitales-edicion',
  templateUrl: './signosvitales-edicion.component.html',
  styleUrls: ['./signosvitales-edicion.component.css']
})
export class SignosVitalesEdicionComponent  implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  pacientes: Paciente[] = [];
  pacienteSeleccionado: Paciente; 
  myControlPaciente: FormControl = new FormControl(); 
  pacientesFiltrados$: Observable<Paciente[]>;
  
  


  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();


  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router,
    private signosvitalesService: SignosVitalesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(0),
      'paciente': this.myControlPaciente,
      'fechaSeleccionada': new FormControl(''),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmo': new FormControl('')
      
      
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });

    // Autocomplete

    this.listarPacientes();
    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
    
   
  }

  // Autocomplete

  filtrarPacientes(val: any) {

    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(el =>
        el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || el.dni.includes(val.dni)
      );
    }
    return this.pacientes.filter(el =>
      el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidos.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
    );
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  mostrarPaciente(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
 
    });
  }



  get f() { return this.form.controls; }

  private initForm() {
    if (this.edicion) {

      this.signosvitalesService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idSignosVitales),
          'paciente': this.myControlPaciente,
          'fechaSeleccionada': new FormControl(data.fecha),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmo': new FormControl(data.ritmo)
        });

        this.myControlPaciente.setValue(data.paciente);

      });

     
     
    }
  }

  operar() {

    if (this.form.invalid) { return; }

    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['paciente'];


    let signosvitales = new SignosVitales();
    signosvitales.idSignosVitales = this.form.value['id'];
    signosvitales.paciente = this.form.value['paciente'];
    signosvitales.fecha =  moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    signosvitales.temperatura = this.form.value['temperatura'];
    signosvitales.pulso = this.form.value['pulso'];
    signosvitales.ritmo = this.form.value['ritmo'];

    if (this.edicion) {
      //MODIFICAR

      
      this.signosvitalesService.modificar(signosvitales).pipe(switchMap(() => {
        return this.signosvitalesService.listar();
      })).subscribe(data => {
        this.signosvitalesService.setSignosVitalesCambio(data);
        this.signosvitalesService.setMensajeCambio('SE MODIFICÓ');
      });
    } else {
      //REGISTRAR
     
      
      this.signosvitalesService.registrar(signosvitales).pipe(switchMap(() => {       
        return this.signosvitalesService.listar();
      })).subscribe(data => {

      
        this.signosvitalesService.setSignosVitalesCambio(data);
        this.signosvitalesService.setMensajeCambio('SE REGISTRO');
      });

    }

    this.router.navigate(['signosvitales']);
  }

  abrirDialogo() {
    this.dialog.open(SignosVitalesDialogoComponent, {
      width: '250px'
    })
  }

}
