
import { EventEmitter, Injectable } from '@angular/core'
import { Ingredients } from '../shared/ingredients.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'

@Injectable()

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    constructor(private slService: ShoppingListService){}

    recipes: Recipe[] = 
    [
        new Recipe('Test Recipe', 'This is a test recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXt5sxxzVL6WzcHPpwfywcqGOCtNw0Fkm9uDZEVEShUWk2a7JkM9fHw&s=0', [new Ingredients('Meat', 1), new Ingredients('Chef', 1)]), 
        new Recipe('Another Test Recipe', 'This is a test recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXt5sxxzVL6WzcHPpwfywcqGOCtNw0Fkm9uDZEVEShUWk2a7JkM9fHw&s=0', [new Ingredients('Aipe', 1), new Ingredients('Pippter', 1)]),
        new Recipe('Bread Recipe', 'This is Bread', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2cmVIHqWjNAgW06_Jt5Q1wqTDzVqBirT5ccXzsBs8mz087BC0MiVJw&s=0', [new Ingredients('Fule', 1), new Ingredients('JKS', 1)])
    ]  

    getRecipes() {
        return this.recipes.slice()
    }
    getRecipe(index: number) {
        return this.recipes[index]; 
    }
    addIngredients(ingredients: Ingredients[]) {
        this.slService.AddIngredientslist(ingredients);
    }
}