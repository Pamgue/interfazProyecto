import { Component, OnInit, ViewChild } from '@angular/core';
import { LabelsService } from '../../services/labels.service';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {FormControl} from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', fecha: '11/04/2020'},
  { name: 'Helium', fecha: '11/04/2020'},
  { name: 'Lithium',  fecha: '11/04/2020'},
  { name: 'Beryllium',  fecha: '11/04/2020'},
  { name: 'Boron',fecha: '11/04/2020'},
  { name: 'Carbon',  fecha: '11/04/2020'},
  { name: 'Nitrogen', fecha: '11/04/2020'},
  {name: 'Oxygen',  fecha: '11/04/2020'},
  { name: 'Fluorine',  fecha: '11/04/2020'},
  { name: 'Neon',  fecha: '11/04/2020'},
];
export interface PeriodicElement {
  name: string;
  fecha: string;
}

@NgModule({
  imports: [MaterialModule],
})
@Component({
  selector: 'app-dashboard',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  providers: [LabelsService]
})

export class LabelComponent implements OnInit {
  constructor (private labelsService: LabelsService){
  }

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  public test: Array<any> = [];

  ngOnInit() {
  }

  public onClickMe(){
    this.labelsService.getTagNames().subscribe(data => this.test = data, error => console.log("Error: ", error), () => console.log(this.test[0].id));
  }


  public updateOptions() {

  }
  displayedColumns: string[] = ['name', 'fecha'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


}
