import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Eggs n Bacon',
      imageUrl: 'https://i.pinimg.com/736x/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00--vector-clipart-bacon.jpg',
      ingredients: ['Sausage', 'Fries' ]
    },
    {
      id: 'r2',
      title: 'Pepperoni Pizza',
      imageUrl: 'https://t3.ftcdn.net/jpg/01/88/09/62/360_F_188096235_MAB6os5VcSOpggp2Hctu7eTlULleQXyd.jpg',
      ingredients: ['Basil', 'Siracha']
    },
    {
      id: 'r3',
      title: 'Club Sandwich',
      imageUrl: 'http://www.clipartbest.com/cliparts/ecM/ygp/ecMygp6bi.jpg',
      ingredients: ['Cheese', 'Ham']
    },
    {
      id: 'r4',
      title: 'Chocolate Milkshake',
      imageUrl: 'https://www.gameartguppy.com/wp-content/uploads/2019/04/object-object_chocolate-milkshake.png',
      ingredients: ['whipped cream', 'Ice cream']
    }

  ];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return {
      ...this.recipes.find(recipe => recipe.id === recipeId)
    };
  }
}
