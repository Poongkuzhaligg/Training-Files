import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Fruit } from '../fruits';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {
  public fruitss: Fruit[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showFruit(fruitss: Fruit) {
    this.router.navigate(['/fruits',fruitss.id])
  }

}
