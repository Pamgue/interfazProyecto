import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


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
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
