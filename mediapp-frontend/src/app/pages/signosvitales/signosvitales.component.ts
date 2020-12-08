import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from './../../_model/medico';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignosVitalesService } from './../../_service/signosvitales.service';
import { switchMap } from 'rxjs/operators';
import { SignosVitalesDialogoComponent } from './signosvitales-dialogo/signosvitales-dialogo.component';
import { SignosVitales } from 'src/app/_model/signosvitales';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signosvitales',
  templateUrl: './signosvitales.component.html',
  styleUrls: ['./signosvitales.component.css']
})
export class SignosVitalesComponent implements OnInit {

  ruta: string;
  displayedColumns = ['idSignosVitales', 'paciente', 'fecha',  'temperatura', 'pulso', 'ritmo' , 'acciones'];
  dataSource: MatTableDataSource<SignosVitales>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private signosvitalesService: SignosVitalesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.signosvitalesService.getSignosVitalesCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

   
    });

    this.signosvitalesService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.signosvitalesService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idSignosVitales: number) {
    this.signosvitalesService.eliminar(idSignosVitales).pipe(switchMap(() => {
      return this.signosvitalesService.listar()
    })).subscribe(data => {
      this.signosvitalesService.setSignosVitalesCambio(data);
      this.signosvitalesService.setMensajeCambio('SE ELIMINÓ');
    });
  }

  abrirDialogo(signosvitales?: SignosVitales) {
    let med = signosvitales != null ? signosvitales : new SignosVitales();
    this.dialog.open(SignosVitalesDialogoComponent, {
      width: '250px',
      data: med
    })
  }

}
