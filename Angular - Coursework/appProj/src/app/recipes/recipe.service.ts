import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // [
  //   new Recipe('Eggs n Bacon',
  //   'To enlighten your morning!  ',
  //   'https://i.pinimg.com/736x/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00--vector-clipart-bacon.jpg',
  //   [
  //     new Ingredient('Sausage', 3),
  //     new Ingredient('Fries', 1)
  //   ]),
  //   new Recipe('Sandwich',
  //   'Jammed with layers!',
  //   'http://www.clipartbest.com/cliparts/ecM/ygp/ecMygp6bi.jpg',
  //   [
  //     new Ingredient('Cheese', 2),
  //     new Ingredient('Patty', 1)
  //   ]),
  // new Recipe('Chocolate Milkshake',
  //   'With rich Belgium Chocolate!',
  //   'https://www.gameartguppy.com/wp-content/uploads/2019/04/object-object_chocolate-milkshake.png',
  //   [
  //     new Ingredient('Whipped cream', 2),
  //     new Ingredient('Vanilla syrup', 1)
  //   ]),
  // new Recipe('Pepperoni Pizza',
  //   'Cheesy and more cheesy!',
  //   'https://t3.ftcdn.net/jpg/01/88/09/62/360_F_188096235_MAB6os5VcSOpggp2Hctu7eTlULleQXyd.jpg',
  //   [
  //     new Ingredient('Basil', 2),
  //     new Ingredient('Mushroom', 1)
  //   ]),

  // ];

  constructor(private slService: ShoppingListService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
