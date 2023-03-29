import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor(
        private recipeService: RecipeService, 
        private http: HttpClient, 
        private authService: AuthService
        ){}

    StoreRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put("https://ng-template-database-default-rtdb.firebaseio.com/recipes.json", recipes).subscribe(
            response => {
            console.log(response);
        })
    }

    fetchRecipes() {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(
                user => {
                    console.log(user.token)
                    return this.http.get<Recipe[]>("https://ng-template-database-default-rtdb.firebaseio.com/recipes.json", 
                    {
                        params: new HttpParams().set('auth', user.token)
                    })
                }
            ), 
            map(recipes => {
                console.log(recipes)
                return recipes.map((recipe) => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                })
            }), 
            tap(
                Response => {
                    this.recipeService.setRecipes(Response)
        }))
       
        
    }
}