
import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredients.component";

export class ShoppingListService{
    ingredients: Ingredients[] = [new Ingredients('Apple', 5), new Ingredients('Crypto', 4)];


    ingredientsChanged = new EventEmitter<Ingredients[]>();

    AddIngredients(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    AddIngredientslist(ingredients: Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }


}