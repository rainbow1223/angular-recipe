import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from "@ngrx/store"
import { Ingredients } from '../shared/ingredients.component';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredients[]}>;
  // private igChangedSub: Subscription;
  constructor(private shoppinglistService: ShoppingListService, 
              private store: Store<{shoppingList: {ingredients: Ingredients[]}}>){}

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppinglistService.getIngredients()
    // this.igChangedSub = this.shoppinglistService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredients[]) => {
    //     this.ingredients = ingredients;
    //   }
    // )
  }

  onEditItem(index: number) {
    this.shoppinglistService.editItemStarted.next(index);
  }
  ngOnDestroy(): void {
    // this.igChangedSub.unsubscribe()
  }
 
}
