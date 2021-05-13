import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LabelsService } from 'src/app/services/labels.service';
import { GroupsService } from 'src/app/services/groups.service';
import { StudentsService } from 'src/app/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { element } from 'protractor';

declare const google: any;


@NgModule({
  imports: [MaterialModule],
})

@Component({
  selector: 'app-maps',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [ DatePipe]
})

export class StudentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;


  @ViewChild(MatSort) sort: MatSort;


  panelOpenState = false;

  tags = new FormControl();

  tagsList: Array<any>=[];
  groups = new FormControl();

  groupsList: Array<any> = [];

  displayedColumns: string[] = ['select','studentId', 'name', 'grupo', 'UVA', 'codeChef','codeForces', 'fecha'];

  dataSource = new MatTableDataSource();

  allStudentsResult: Array<any> = [];
  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog,private studentsService: StudentsService,private labelsService: LabelsService,private groupsService: GroupsService, private datePipe: DatePipe) { 
    this.getAlltags();
    this.getAllGroups( null);
    this.getAllStudents(null);
  }
  ngOnInit(): void {
   
  }

  getAlltags() {
    this.labelsService.getAllTags().subscribe(
      data => {
        this.tagsList = data;
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
        this.groupsList = data;

      },
      error => console.log("Error: ", error),
  
    );
  }
  getAllStudents(groupId: string) {
    if (groupId === null){
      groupId = "";
  
    }
    this.studentsService.getAllStudent(groupId).subscribe(
      data => {
        this.allStudentsResult = data;
        
      },
      error => console.log("Error: ", error),
      () => this.refreshRows()
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  refreshTable(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  refreshRows(){
    this.dataSource = new MatTableDataSource(this.allStudentsResult);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
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

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  onAddGroup(value : String){
    if(this.groups.value!=null){
      var groupsIds : Array<string> = [];
      this.groups.value.forEach(
        value => {
           const foundIndex = this.groupsList.findIndex(x => x.name === value);
           groupsIds.push(this.groupsList[foundIndex].id);

        }
     )
     var groupIdsString = groupsIds.map(String).join(';');
     
    }
  
  else
    var tagIdsString = '';

  var selectStudents: Array<any> = this.selection.selected;

  var studentsIds : Array<string> = [];
  selectStudents.forEach(student => 
    studentsIds.push(student.id)
    );

  var studentIdsString = studentsIds.map(String).join(';');
  console.log(studentIdsString);
    const selectedGroup = this.groups.value;
   
 
  if(value == 'agrupar') this.addGroup(studentIdsString,groupIdsString,selectedGroup );

  if(value == 'desagrupar') this.removeGroup(studentIdsString,groupIdsString );
  }

  addGroup(studentID :string, groupID:string, selectedGroups){
    this.studentsService.addStudentToGroup(studentID, groupID);
    const foundIndex = this.allStudentsResult.findIndex(x => x.id === studentID);
    selectedGroups.forEach(element => {
      if(!this.allStudentsResult[foundIndex].Groups.includes( element)){
        this.allStudentsResult[foundIndex].Groups = [...this.allStudentsResult[foundIndex].Groups, element];
      }
      
    });

    this.refreshTable();
    return true;
  }
  
  removeGroup(studentID :string, groupID:string){
    this.studentsService.removeStudentFromGroup(studentID, groupID);
    
    this.refreshRows();
    return true;
  }
  openDialog(action, page, obj) {
    obj.action = action;
    obj.page = page;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Agregar'){
        this.addRowData(result.data);
      }
  
    });
  }
  addRowData(result){
    var myDate = this.datePipe.transform( new Date(), 'yyyy-MM-dd');
    var judges = [result.codeForces, result.codeChef,result.uva ]
    var stringjudge =judges.join(';')
    this.studentsService.addStudent(result.studentID,result.name, result.lastName, stringjudge).subscribe(
      data => {
      //addStudents solo devuelve el id
        this.allStudentsResult.unshift({id: data.id, studentId: data.studentid, name: result.name,lastName: result.lastName, creationDate: myDate, Groups: data.Groups, UVA: result.uva, CodeChef: result.codeChef, CodeForces: result.codeForces });
      },
      error => console.log("Error: ", error),
      () => this.refreshTable()
    );
  }
}

