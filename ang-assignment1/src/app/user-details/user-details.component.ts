import { Component, Input, OnInit } from '@angular/core';
import { userData } from '../user-data';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  entered:boolean = false ;
  InputEnt: string = ' ';
  constructor() { }

  ngOnInit() {

  }

  onInputEnter(event:Event){
    // this.InputEnt = (<HTMLInputElement>event.target).value;
  }

  onkeydown(event: KeyboardEvent){
    this.entered = true;
    if((<HTMLInputElement>event.target).value.length == 1){
      this.entered = false;
    }
    else{

    }
    console.log(event)
  }


}
