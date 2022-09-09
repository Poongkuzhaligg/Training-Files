import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
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
  constructor() {}

  ngOnInit() {
  }

  onInputEnter(event:Event){
    this.entered = true;
    let inputValue = (<HTMLInputElement>event.target).value;
    if(inputValue.length <= 0){
      this.entered = false;
      this.CurrentName = '';
      this.CurrentDes = '';
      this.CurrentCity = '';
      this.CurrentUni = '';
      this.CurrentImg = '';
    }
    console.log(inputValue);
    for( let i=0; i<this.userDet.length;i++){
      if( inputValue.toLowerCase() === this.userDet[i].name.toLowerCase()){
        this.entered = false;
        this.CurrentName = this.userDet[i].name;
        this.CurrentDes = this.userDet[i].designation;
        this.CurrentCity = this.userDet[i].city;
        this.CurrentUni = this.userDet[i].university;
        this.CurrentImg = this.userDet[i].imgUrl;
      }

    }
  }
}
