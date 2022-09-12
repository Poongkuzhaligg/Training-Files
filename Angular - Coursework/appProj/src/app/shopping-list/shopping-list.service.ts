import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Eggs n Bacon', 5),
    new Ingredient('Sandwich', 10),
  ];
}
