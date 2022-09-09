import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { userData } from '../user-data';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userDet: userData[] = [{name:'', designation: '', city: '', university: '', imgUrl: ''}];
  entered:boolean = false ;
  CurrentName:string = '';
  CurrentDes:string = '';
  CurrentCity:string = '';
  CurrentUni:string = '';
  CurrentImg:string = '';
  constructor() { 

  }

  ngOnInit() {
  }

  onInputEnter(event:Event){
    this.entered = true;
    let inputValue = (<HTMLInputElement>event.target).value;
    if(inputValue.length < 0){
      this.entered = false;
    }
    console.log(inputValue);
    for( let i=0; i<this.userDet.length;i++){
      let userName = this.userDet[i].name;
      if( inputValue == userName){
        this.entered = false;
        this.CurrentName = userName;
        this.CurrentDes = this.userDet[i].designation;
        this.CurrentCity = this.userDet[i].city;
        this.CurrentUni = this.userDet[i].university;
        this.CurrentImg = this.userDet[i].imgUrl;
      }
    }
  }
}
