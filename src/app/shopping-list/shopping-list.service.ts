

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

    getIngredient(index: number) {
        return this.ingredients[index]
    }
    
    AddIngredientslist(ingredients: Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredients(index: number, newIngredient: Ingredients){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}