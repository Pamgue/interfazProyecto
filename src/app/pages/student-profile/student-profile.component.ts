import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { StudentsService } from 'src/app/services/students.service';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';


@NgModule({
  imports: [MaterialModule],
})

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent  {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  //id del estudiante 
  studentId: string;
  displayedColumns: string[] = ['id', 'name', 'grupo', 'juez', 'fecha'];
  dataSource = new MatTableDataSource();
  studentProblems: Array<any> = [];
  studentJudges:Array<any> = [];
  studentProfile: any = {};
  editJudge = false;

  constructor(private _router: ActivatedRoute,private studentsService: StudentsService,public dialog: MatDialog,) {
    this.studentId =this._router.snapshot.paramMap.get('id');
    console.log(this._router.snapshot.paramMap.get('id'));
    this.getStudentInfo(this.studentId)

  
   }


  



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getStudentInfo(id: string){
    this.studentsService.getStudentProfile(id).subscribe(
      (data) => {
        this.studentProblems=data["Problems"];
        this.studentProfile = data
        this.studentJudges = data["Judges"]

       
      },
      (error) => console.log("Error: ", error),
      () => {this.refreshRows();
              console.log(this.studentProfile)}//
    );
   
  }
  refreshTable(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  refreshRows() {
    this.dataSource = new MatTableDataSource(this.studentProblems);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(action, page, obj) {

    obj.action = action;
    obj.page = page;

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: "250px",
      data: obj,
   
    });


    dialogRef.afterClosed().subscribe((result) => {
    if (result.event == "Editar") {
        this.updateRowData(result.data);
      }
    });
   
  }

  updateRowData(row_obj) {
    var judges = [row_obj.Judges.UVA, row_obj.Judges.CodeChef, row_obj.Judges.CodeForces];
    var judgesString =judges.join(";");
    this.studentsService.updateStudent(row_obj.id,row_obj.userid, row_obj.name, row_obj.lastname, judgesString);
    console.log(this.studentProfile)
    this.studentProfile.id = row_obj.id;
    this.studentProfile.name= row_obj.name;
    this.studentProfile.lastname = row_obj.lastname;
    this.studentProfile.userid = row_obj.userid;
    this.studentProfile.Judges.UVA = row_obj.Judges.UVA;
    this.studentProfile.Judges.CodeForces =row_obj.Judges.CodeChef;
    this.studentProfile.Judges.CodeChef = row_obj.Judges.CodeForces;

    this.refreshTable();
    return true;
  }


}
