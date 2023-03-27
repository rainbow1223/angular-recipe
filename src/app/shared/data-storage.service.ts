import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class DataStorageService{

    constructor(private recipeService: RecipeService, private http: HttpClient){}

    StoreRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://ng-template-database-default-rtdb.firebaseio.com/recipes.json", recipes).subscribe(
            response => {
            console.log(response);
        })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>("https://ng-template-database-default-rtdb.firebaseio.com/recipes.json")
        .pipe(map(recipes => {
            return recipes.map((recipe) => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }), tap(
            Response => {
                this.recipeService.setRecipes(Response)
        }))
        
    }
}