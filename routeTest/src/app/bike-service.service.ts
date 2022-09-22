import { Injectable } from '@angular/core';
import { Bike } from './bike';
import { BIKES } from './bike-store';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  async getBike(id: number): Promise<Bike|undefined> {
    const bikes: Bike[] = await this.getBikes();
    const bike = bikes.find((bike) => bike.id === id);
    return bike;
  }
  constructor() {}

  getBikes(): Promise<Bike[]> {
    return Promise.resolve(BIKES);
  }
}
