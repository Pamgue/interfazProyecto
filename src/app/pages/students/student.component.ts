import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
declare const google: any;

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
  selector: 'app-maps',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {

  constructor() { }
  panelOpenState = false;

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  tags = new FormControl();

  tagsList: string[] = ['Tag1', 'Tag2', 'Tag3', 'Tag3', 'Tag4', 'Tag5'];
  groups = new FormControl();

  groupsList: string[] = ['group1', 'group2', 'group3', 'group3', 'group4', 'group5'];

  ngOnInit() {
    let map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 12,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
          {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
          {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
          {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
          {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
          {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]
    }

    map = new google.maps.Map(map, mapOptions);

    var marker = new google.maps.Marker({
        id: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!'
    });

    var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
        '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
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

