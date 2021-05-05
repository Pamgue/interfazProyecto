import { Component, OnInit } from '@angular/core';
import { LabelsService } from '../../services/labels.service';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {FormControl} from '@angular/forms';

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

}
