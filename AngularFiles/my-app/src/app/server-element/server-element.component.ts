import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ViewChild} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //you can switch to None or Native
})
export class ServerElementComponent implements OnInit, OnChanges {
  @Input('srvElement') element: {type: string, name: string, content:string};
  @Input() name:string;
  // @ViewChild() ;

  constructor() {
    console.log('constructor called!');
   }

  ngOnChanges(changes: SimpleChanges){
    console.log(' OnChanges called!');
    console.log(changes);
   }

  ngOnInit() {
    console.log('ngOnInit called!');
  }

}
