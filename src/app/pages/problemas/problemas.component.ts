import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-tables, ngbd-accordion-basic',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.scss'],

})
export class ProblemasComponent implements OnInit {
  actualLabel: String;
  


  constructor() { }

  ngOnInit() {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  onClickMe() {

    console.log('<Añadir Problema>')
  }
  labelFilter(value: String){
    this.actualLabel= value;
    console.log(value)
  }
  updateLabel(action:String){
    console.log("Se ha "+action+" el problema. Su nueva etiqueta es: " + this.actualLabel )

  }

}
