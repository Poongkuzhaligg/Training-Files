import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Eggs n Bacon',
    'To enlighten your morning!  ',
    'https://i.pinimg.com/736x/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00--vector-clipart-bacon.jpg',
    [
      new Ingredient('Sausage', 3),
      new Ingredient('Fries', 1)
    ]),
    new Recipe('Sandwich',
    'Jammed with layers!',
    'http://www.clipartbest.com/cliparts/ecM/ygp/ecMygp6bi.jpg',
    [
      new Ingredient('Cheese', 2),
      new Ingredient('Patty', 1)
    ])
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
