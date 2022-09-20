import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription, interval } from 'rxjs';
import { timeout } from 'rxjs-compat/operator/timeout';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // interval().subscribe( count =>{
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      setInterval( handler: () => {
        ObserveOnOperator.next
      }, timeout   );
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
