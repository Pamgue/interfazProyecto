import { Component, OnInit } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
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
  ],
 
})
export class GroupsComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  panelOpenState = false;

  tags = new FormControl();

  tagsList: string[] = ['Python', 'Intro', 'Poo', 'Geometria', 'Recursividad', 'Fibonacci'];
  
  groups = new FormControl();

  groupsList: string[] = ['group1', 'group2', 'group3', 'group3', 'group4', 'group5'];

  dataStudentsList = new MatTableDataSource<Element>(STUDENTS_DATA);
  selection = new SelectionModel<Element>(true, []);
  displayedStudentsColumnsList: string[] = ['select','id', 'name', 'age', 'address', 'actions'];
  
  isTableExpanded=false;
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

}

export interface Element {
  id: number;
  name: string;
  age: number;
  address: number;
  isExpanded: boolean;
  subjects:  any;

}
const STUDENTS_DATA: Element[] = [
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
           "grade":"A"
        },
        {
           "name":"Chemistry",
           "type":"Medical",
           "grade":"A"
        },
        {
           "name":"Physics",
           "type":"Medical",
           "grade":"A"
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
           "grade":"A"
        },
        {
           "name":"Chemistry",
           "type":"Medical",
           "grade":"A"
        },
        {
           "name":"Physics",
           "type":"Medical",
           "grade":"A"
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
           "grade":"A"
        },
        {
           "name":"Chemistry",
           "type":"Medical",
           "grade":"A"
        },
        {
           "name":"Physics",
           "type":"Medical",
           "grade":"A"
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
          "grade":"A"
       },
       {
          "name":"Chemistry",
          "type":"Medical",
          "grade":"A"
       },
       {
          "name":"Physics",
          "type":"Medical",
          "grade":"A"
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
        "grade":"A"
     },
     {
        "name":"Chemistry",
        "type":"Medical",
        "grade":"A"
     },
     {
        "name":"Physics",
        "type":"Medical",
        "grade":"A"
     }
  ]
},
];