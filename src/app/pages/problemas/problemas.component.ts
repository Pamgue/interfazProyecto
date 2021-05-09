import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', grupo: 1.0079, juez: 'H', fecha: '11/04/2020'},
  {id: 2, name: 'Helium', grupo: 4.0026, juez: 'He', fecha: '11/04/2020'},
  {id: 3, name: 'Lithium', grupo: 6.941, juez: 'Li', fecha: '11/04/2020'},
  {id: 4, name: 'Beryllium', grupo: 9.0122, juez: 'Be', fecha: '11/04/2020'},
  {id: 5, name: 'Boron', grupo: 10.811, juez: 'B', fecha: '11/04/2020'},
  {id: 6, name: 'Carbon', grupo: 12.0107, juez: 'C', fecha: '11/04/2020'},
  {id: 7, name: 'Nitrogen', grupo: 14.0067, juez: 'N', fecha: '11/04/2020'},
  {id: 8, name: 'Oxygen', grupo: 15.9994, juez: 'O', fecha: '11/04/2020'},
  {id: 9, name: 'Fluorine', grupo: 18.9984, juez: 'F', fecha: '11/04/2020'},
  {id: 10, name: 'Neon', grupo: 20.1797, juez: 'Ne', fecha: '11/04/2020'},
];
export interface PeriodicElement {
  name: string;
  id: number;
  grupo: number;
  juez: string;
  fecha: string;
}

@NgModule({
  imports: [MaterialModule],
})
@Component({
  selector: 'app-tables, ngbd-accordion-basic',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.scss'],

})
export class ProblemasComponent implements OnInit {
  constructor() { }
  actualLabel: String;
  panelOpenState = false;

  tags = new FormControl();

  tagsList: string[] = ['Python', 'Intro', 'Poo', 'Geometria', 'Recursividad', 'Fibonacci'];

  groups = new FormControl();

  groupsList: string[] = ['group1', 'group2', 'group3', 'group3', 'group4', 'group5'];


  

  ngOnInit() {
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
  }
  onClickMe() {

    console.log('<Añadir Problema>')
  }
  labelFilter(value: String){
    this.actualLabel= value;
    console.log(value)
  }
  updateLabel(action:String){
    console.log("Se ha "+action+" el problema. Su nueva etiqueta es: " + this.actualLabel )

  }
  displayedColumns: string[] = ['id', 'name', 'grupo', 'juez', 'fecha'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
