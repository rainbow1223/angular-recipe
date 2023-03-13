import { Component, Input } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.component';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  @Input() selectedRecipe: Recipe;
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService){}
  onAddToShoppingList(){
   this.recipeService.addIngredients(this.selectedRecipe.ingredients);
  }
}
