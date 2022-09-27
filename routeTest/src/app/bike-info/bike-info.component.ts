import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bike } from '../bike';
import { BikeService } from '../bike-service.service';

@Component({
  selector: 'app-bike-info',
  templateUrl: './bike-info.component.html',
  styleUrls: ['./bike-info.component.css'],
})
export class BikeInfoComponent implements OnInit, OnDestroy {
  bikeDes!: { bike: Bike; id: number };
  paramsSubscription!: Subscription;

  constructor(
    private bikeService: BikeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bikeDes = {
      id: this.route.snapshot.params['id'],
      bike: this.route.snapshot.params['bike']
    },
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.bikeDes.id = +params['id'];
          // this.bikeDes.bike = params['bike'];
        }
      )
    this.getBikeDes();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  getBikeDes(){
    console.log("hye"+ this.bikeService.getBike(this.bikeDes.id));
    
  }
}
