import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { LabelsService } from '../../services/labels.service';

import { ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { SelectionModel} from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GroupsComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  panelOpenState = false;

  tags = new FormControl();

  //Aqui se guarda lo devuelto por el servicio para las etiquetas del filtrado (dropdown)
  tagResult: Array<any> = [];
  
  dataStudentsList = new MatTableDataSource([]);

  // Modelo para el select
  selection = new SelectionModel<any>(true, []);

   //Aqui se guarda lo devuelto por el servicio
   allGroupsResult: Array<any> = [];

   // Aqui se carga lo devuelto por el servicio
  dataSource = new MatTableDataSource();

  // Elementos que se van a mostrar en la tabla
  displayedGroupsColumnsList: string[] = ['select','name', 'edit'];
  displayedStudentsColumnsList: string[] = ['studentid','name','lastname', 'CodeForces', 'CodeChef', 'UVA'];
  isTableExpanded=false;

  constructor(private groupsService: GroupsService, private labelsService: LabelsService, public dialog: MatDialog) {
   this.getTagNames();
   this.getAllGroups(null);
 }

  ngOnInit(): void {}

  ngAfterViewInit() {
    //this.dataStudentsList.paginator = this.paginator;
    //this.dataStudentsList.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }
  expandContent = true;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  toggleTableRows(element) {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataSource.data.forEach((row:any) => {
      if(element == row.id){

        row.isExpanded = this.isTableExpanded;
      }
      
    });   
  }

  checkboxLabel(row?: Element): string {
    if (!row) {

      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`;
  }

  getKeys(object): string[] {
   //console.log(object);
   return Object.keys(object);
 }

 onStudentClick(idStudent: number) {
   console.log(idStudent);
 }

 getTagNames() {
   this.labelsService.getTagNames().subscribe(
     data => {
       this.tagResult = data;
       /*
       for(var property in this.tagResult) {
         console.log(property + "=" + this.tagResult[property]);
      }*/
     },
     error => console.log("Error: ", error),
   );
 }

 getAllGroups(tags: string) {
   if (tags === null){
      tags = "";
   }
   this.groupsService.getAllGroups(tags).subscribe(
     data => {
       this.allGroupsResult = data;
       console.log(this.allGroupsResult);
     },
     error => console.log("Error: ", error),
     () => this.refreshRows()
   );
 }

 refreshRows(){
   this.dataSource = new MatTableDataSource(this.allGroupsResult);
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }

 refreshTable(){
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }

 //Corregir, llega el body vacio entonces no hace el filtrado
 filterGroups(tags: Array<string>) {
   console.log(tags);
   var tagsString = tags.map(String).join(';');
   this.getAllGroups(tagsString);
 }

}


