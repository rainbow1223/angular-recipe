

import { Ingredients } from "../shared/ingredients.component";
import { Subject } from 'rxjs'

export class ShoppingListService{
    ingredients: Ingredients[] = [new Ingredients('Apple', 5), new Ingredients('Crypto', 4)];


    ingredientsChanged = new Subject<Ingredients[]>();
    editItemStarted = new Subject<number>();
    AddIngredients(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    AddIngredientslist(ingredients: Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }


}