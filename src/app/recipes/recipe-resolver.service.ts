import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";

import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})

export class RecipeResolveService implements Resolve<Recipe[]>{

    constructor(private dataStorageSl: DataStorageService, 
                private recipeSl: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeSl.getRecipes();

        if (recipes.length === 0) {
            return this.dataStorageSl.fetchRecipes();
        } else {
            return recipes
        }
    }
}