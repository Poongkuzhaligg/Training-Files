import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bike } from '../bike';
import { BikeService } from '../bike-service.service';

@Component({
  selector: 'app-bike-info',
  templateUrl: './bike-info.component.html',
  styleUrls: ['./bike-info.component.css'],
})
export class BikeInfoComponent implements OnInit {
  bike: Bike;
  id:number;
  constructor(
    private bikeService: BikeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }
}
