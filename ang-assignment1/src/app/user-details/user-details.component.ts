import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { userData } from '../user-data';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userDet: userData[] = [];
  entered:boolean = false ;
  constructor() { 

  }

  ngOnInit() {
    this.userDet;
  }

  onInputEnter(event:Event){
    this.entered = true;

    let inputValue = (<HTMLInputElement>event.target).value;
    console.log(inputValue);
  }
}
