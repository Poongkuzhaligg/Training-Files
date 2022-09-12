import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simple a test', 'https://i.pinimg.com/736x/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00--vector-clipart-bacon.jpg'),
    new Recipe('Another Test Recipe', 'This is simple a test', 'http://www.clipartbest.com/cliparts/ecM/ygp/ecMygp6bi.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
