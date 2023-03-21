import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredients } from '../shared/ingredients.component';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[] = [];
  private igChangedSub: Subscription;
  constructor(private shoppinglistService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients()
    this.igChangedSub = this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number) {
    this.shoppinglistService.editItemStarted.next(index);
  }
  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe()
  }
 
}
