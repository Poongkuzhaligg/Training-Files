import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipet-item',
  templateUrl: './recipet-item.component.html',
  styleUrls: ['./recipet-item.component.css']
})
export class RecipetItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit() {
  }

}
