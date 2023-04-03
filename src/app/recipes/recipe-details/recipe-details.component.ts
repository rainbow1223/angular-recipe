import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Ingredients } from 'src/app/shared/ingredients.component';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{
  id: number;
  recipe: Recipe;


  constructor(private recipeService: RecipeService,
            private route: ActivatedRoute,
            private rotuer: Router){}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }
  onAddToShoppingList(){
    // console.log(this.recipe.ingredients)
   this.recipeService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.rotuer.navigate(['edit'], {relativeTo: this.route})
    // this.rotuer.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.rotuer.navigate(['/recipes'])
  }
}
