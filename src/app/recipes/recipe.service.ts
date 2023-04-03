
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store'

import { Ingredients } from '../shared/ingredients.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()

export class RecipeService{

    recipesChanged = new Subject<Recipe[]>()
    
    recipes: Recipe[] = 
    [
        new Recipe('Test Recipe', 'This is a test recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXt5sxxzVL6WzcHPpwfywcqGOCtNw0Fkm9uDZEVEShUWk2a7JkM9fHw&s=0', [new Ingredients('Meat', 1), new Ingredients('Chef', 1)]), 
        new Recipe('Another Test Recipe', 'This is a test recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXt5sxxzVL6WzcHPpwfywcqGOCtNw0Fkm9uDZEVEShUWk2a7JkM9fHw&s=0', [new Ingredients('Aipe', 1), new Ingredients('Pippter', 1)]),
        new Recipe('Bread Recipe', 'This is Bread', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2cmVIHqWjNAgW06_Jt5Q1wqTDzVqBirT5ccXzsBs8mz087BC0MiVJw&s=0', [new Ingredients('Fule', 1), new Ingredients('JKS', 1)])
    ]  
    
    constructor(private slService: ShoppingListService,
        private store: Store<{ shoppingList: { ingredients: Ingredients[] } }>
        ){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes().slice())
    }

    getRecipes() {
        return this.recipes.slice()
    }
    getRecipe(index: number) {
        return this.recipes[index]; 
    }
    addIngredients(ingredients: Ingredients[]) {
        console.log(ingredients)
        // this.slService.AddIngredientslist(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }
} 