import { Component, OnInit } from '@angular/core';

import { Ingredients } from '../shared/ingredients.component';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[] = [];

  constructor(private shoppinglistService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients()
    this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
      }
    )
  }
 
}
