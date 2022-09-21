import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
  //   interval(400).subscribe( count =>{
  //     console.log(count);
  //   });
  // }
    const customIntervalObservable = new Observable((observer) => {
      let count = 1
      setInterval(()=> {
        observer.next(count);
        count++
        if(count == 6){
          observer.unsubscribe();
          console.log("complete!");
        }
      }, 1000);

    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy() {

    this.firstObsSubscription.unsubscribe();
  }

}
