import { Component, OnInit } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {DataSource} from '@angular/cdk/collections';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
 
})
export class GroupsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  expandContent = true;
  data1 = [{
    'name': 'Grupo 1',
    'place': 'forest',
    'phone': '124-896-8963',
    'expanded': false
  }, {
    'name': 'Grupo 2',
    'place': 'City',
    'phone': '124-896-1234',
    'expanded': false
  }, {
    'name': 'Grupo 3',
    'place': 'sky',
    'phone': '124-896-9632',
    'expanded': false
  },
  ]

  data2 = [{
    'whoseData': 'Grupo 2',
    'datades': {
      'name': 'john',
      'hobbies': 'singing',
      'profession': 'singer'
    }
  }, {
    'whoseData': 'Grupo 1',
    'datades': {
      'name': 'jay',
      'hobbies': 'coding',
      'profession': 'coder'
    }
  }, {
    'whoseData': 'Grupo 2',
    'datades': {
      'name': 'jay',
      'hobbies': 'testing',
      'profession': 'tester'
    },
    
  },
  {
    'whoseData': 'Grupo 3',
    'datades': {
      'name': 'jay',
      'hobbies': 'testing',
      'profession': 'tester'
    },
  }
  ]


  findDetails(data) {
    return this.data2.filter(x => x.whoseData === data.name);
  }
}