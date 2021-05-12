import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

import { LabelsService } from '../../services/labels.service';
import { ProblemsService } from '../../services/problems.service';


import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


export interface PeriodicElement {
  name: string;
  id: number;
  tags: number;
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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ProblemasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  


  selection = new SelectionModel<any>(true, []);


  displayedColumns: string[] = ['select','id', 'tags', 'juez', 'fecha'];

  dataSource = new MatTableDataSource();
  isTableExpanded=false;

  constructor(private problemsService: ProblemsService, private labelsService: LabelsService, public dialog: MatDialog) {
    this.displayedColumns = this.displayedColumns;
    this.getTagNames();
    this.getJudgesNames();
    this.getProblems(null,null);
  }

  actualLabel: String;
  panelOpenState = false;

  tags = new FormControl();

  problemsList: Array<any> = [];

  selectedTags : Array<any> = [];

  selectedJudges : Array<any> = [];

  tagsList : Array<any> = [];

  judges = new FormControl();


  judgesList: Array<any> = [];


  toggleTableRows(element) {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataSource.data.forEach((row:any) => {
      if(element == row.problemid){

        row.isExpanded = this.isTableExpanded;
      }

    });
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


  ngOnInit() {
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
  }

  onClick(value : String){
    if(this.tags.value!=null){
      var tagIds : Array<string> = [];
      this.tags.value.forEach(
        value => {
           const foundIndex = this.tagsList.findIndex(x => x.name === value);
           tagIds.push(this.tagsList[foundIndex].id);
        }
     )
     var tagIdsString = tagIds.map(String).join(';');
    }
    else
      var tagIdsString = '';

    var selectProblems: Array<any> = this.selection.selected;
    console.log(this.tags.value);
    var problemsIds : Array<string> = [];
    selectProblems.forEach(problem => 
      problemsIds.push(problem.UUID)
      );
    console.log(problemsIds);
    var problemIdsString = problemsIds.map(String).join(';');

    if(value == 'etiquetado') this.addTags(problemIdsString,tagIdsString);

    if(value == 'desetiquetado') this.deleteTags(problemIdsString,tagIdsString);

  }

  addTags( problems : string , tags : string) {
    if (tags === null){
      tags = "";
    }
    if (problems === null){
    problems = "";
    }
    this.problemsService.addTagToProblem(tags,problems);
    this.getProblems(null,null);
  }

  deleteTags( problems : string , tags : string) {
    if (tags === null){
      tags = "";
    }
    if (problems === null){
    problems = "";
    }
    this.problemsService.removeTagFromProblem(tags,problems);
    this.getProblems(null,null);
  }


  labelFilter(value: String){
    this.actualLabel= value;
  }

  filterProblems(action:String){

    if(this.tags.value!=null){
      var tagIds : Array<string> = [];
      this.tags.value.forEach(
        value => {
           const foundIndex = this.tagsList.findIndex(x => x.name === value);
           tagIds.push(this.tagsList[foundIndex].id);
        }
     )
     var tagIdsString = tagIds.map(String).join(';');
    }
    else
      var tagIdsString = '';

    if(this.judges.value!=null){
      
    var judgeIds : Array<string> = [];
    this.judges.value.forEach(
      value => {
          const foundIndex = this.judgesList.findIndex(x => x.name === value);
          judgeIds.push(this.judgesList[foundIndex].id);
      }
    )
    var judgeIdsString = judgeIds.map(String).join(';');
    }
    else
      var judgeIdsString = '';

  this.getProblems(judgeIdsString,tagIdsString);
  }


  getTagNames() {
    console.log('TESTING GET TAGS NAMES');
    this.labelsService.getTagNames().subscribe(
      data => {
        this.tagsList = data;
        console.log(this.tagsList);
 
      },

      error => console.log("Error: ", error),
    );
  }

  getProblems( judges : string , tags : string) {
    if (tags === null){
      tags = "";
    }
    if (judges === null){
    judges = "";
    }
    console.log(judges);
    this.problemsService.getAllProblem(judges,tags).subscribe(
      data => {
        console.log(data);
        this.problemsList = data;
      },
      error => console.log("Error: ", error),
      () => this.refreshRows()
    );
  }

  refreshRows(){
    this.dataSource = new MatTableDataSource(this.problemsList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getJudgesNames(){
    console.log('TESTING GET JUDGES NAMES');
    this.problemsService.getJudges().subscribe(
      data => {
        this.judgesList = data;
        console.log(this.judgesList);

      },
      error => console.log("Error: ", error),
    );



  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
