import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe   } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simple a test', 'https://i.pinimg.com/736x/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00--vector-clipart-bacon.jpg'),
    new Recipe('Another Test Recipe', 'This is simple a test', 'http://www.clipartbest.com/cliparts/ecM/ygp/ecMygp6bi.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
