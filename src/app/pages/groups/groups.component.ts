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

  //Aqui se guarda lo devuelto por el servicio
  tagResult: Array<any> = [];
  
  dataStudentsList = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);
  //displayedStudentsColumnsList: string[] = ['select','id', 'name', 'age', 'address', 'edit'];
  displayedStudentsColumnsList: string[] = ['select','name', 'edit'];
  isTableExpanded=false;

  constructor(private groupsService: GroupsService, private labelsService: LabelsService, public dialog: MatDialog) {
   this.displayedStudentsColumnsList = this.displayedStudentsColumnsList;
   this.dataStudentsList = new MatTableDataSource(this.STUDENTS_DATA);
   this.getTagNames();
   // Aqui se carga lo devuelto por el servicio
   //this.dataSource = new MatTableDataSource(this.tagResult);
 }
 /*
  constructor(){
   this.displayedStudentsColumnsList = this.displayedStudentsColumnsList;
   this.dataStudentsList = new MatTableDataSource(this.STUDENTS_DATA);
  }
*/

  ngOnInit(): void {
   
  
  
  }
  ngAfterViewInit() {

    this.dataStudentsList.paginator = this.paginator;
    this.dataStudentsList.sort = this.sort;
  }
  expandContent = true;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataStudentsList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataStudentsList.data.forEach(row => this.selection.select(row));

  }
  
  toggleTableRows(element) {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataStudentsList.data.forEach((row:any) => {
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

 onItemSelected(idx: number) {
   console.log(idx);
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

 filterGroups(tags: Object) {
   console.log(tags);
 }

 STUDENTS_DATA= [
   {
      "id":1,
      "name":"Abby Jaskolski ",
      "isExpanded":false,
 
      "subjects":[
         {
            "name":"Bio",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Chemistry",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Physics",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         }
      ]
   },
   {
      "id":2,
      "name":"Jabari Fritsch",
      "isExpanded":false,
 
      "subjects":[
         {
            "name":"Bio2",
            "type":"Medical2",
            "grade":"A2",
            "Ocupacion": "Carpintero2"
           
         },
         {
            "name":"Chemistry",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
           
         },
         {
            "name":"Physics",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         }
      ]
   },
   {
      "id":3,
      "name":"Maybell Simonis",
      "isExpanded":false,
   
      "subjects":[
         {
            "name":"Bio",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Chemistry",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Physics",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
           
         }
      ]
   },
   {
      "id":4,
     "name":"Abby Jaskolski ",
     "isExpanded":false,
     
     "subjects":[
        {
           "name":"Bio",
           "type":"Medical",
           "grade":"A",
           "Ocupacion": "Carpintero"
           
        },
        {
           "name":"Chemistry",
           "type":"Medical",
           "grade":"A",
           "Ocupacion": "Carpintero"
           
        },
        {
           "name":"Physics",
           "type":"Medical",
           "grade":"A",
           "Ocupacion": "Carpintero"
       
        }
     ]
  },   
   {
   "id":5,
   "name":"Abby Jaskolski ",
   "isExpanded":false,
 
   "subjects":[
      {
         "name":"Bio",
         "type":"Medical",
         "grade":"A",
         "Ocupacion": "Carpintero"
 
      },
      {
         "name":"Chemistry",
         "type":"Medical",
         "grade":"A",
         "Ocupacion": "Carpintero"
 
      },
      {
         "name":"Physics",
         "type":"Medical",
         "grade":"A",
         "Ocupacion": "Carpintero"
 
      }
   ]
 },
 ];

 /*
 STUDENTS_DATA= [
   {
      "id":1,
      "name":"Abby Jaskolski ",
      "age":21,
      "address":1.0079,
      "isExpanded":false,
 
      "subjects":[
         {
            "name":"Bio",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Chemistry",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Physics",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         }
      ]
   },
   {
      "id":2,
      "name":"Jabari Fritsch",
      "age":20,
      "address":1.0079,
      "isExpanded":false,
 
      "subjects":[
         {
            "name":"Bio",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
           
         },
         {
            "name":"Chemistry",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
           
         },
         {
            "name":"Physics",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         }
      ]
   },
   {
      "id":3,
      "name":"Maybell Simonis",
      "age":21,
      "address":1.0079,
      "isExpanded":false,
   
      "subjects":[
         {
            "name":"Bio",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Chemistry",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
            
         },
         {
            "name":"Physics",
            "type":"Medical",
            "grade":"A",
            "Ocupacion": "Carpintero"
           
         }
      ]
   },
   {
     "id":4,
     "name":"Abby Jaskolski ",
     "age":21,
     "address":1.0079,
     "isExpanded":false,
     
     "subjects":[
        {
           "name":"Bio",
           "type":"Medical",
           "grade":"A",
           "Ocupacion": "Carpintero"
           
        },
        {
           "name":"Chemistry",
           "type":"Medical",
           "grade":"A",
           "Ocupacion": "Carpintero"
           
        },
        {
           "name":"Physics",
           "type":"Medical",
           "grade":"A",
           "Ocupacion": "Carpintero"
       
        }
     ]
  },   
   {
   "id":5,
   "name":"Abby Jaskolski ",
   "age":21,
   "address":1.0079,
   "isExpanded":false,
 
   "subjects":[
      {
         "name":"Bio",
         "type":"Medical",
         "grade":"A",
         "Ocupacion": "Carpintero"
 
      },
      {
         "name":"Chemistry",
         "type":"Medical",
         "grade":"A",
         "Ocupacion": "Carpintero"
 
      },
      {
         "name":"Physics",
         "type":"Medical",
         "grade":"A",
         "Ocupacion": "Carpintero"
 
      }
   ]
 },
 ];
 */

}


