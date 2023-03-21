import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredients } from 'src/app/shared/ingredients.component';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppinglistService: ShoppingListService){}
  onAddItem(form: NgForm){

    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount)
    // this.ingredientsAdded.emit(newIngredient)
    this.shoppinglistService.AddIngredients(newIngredient)
  }

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.editItemStarted.subscribe(
      (index: number) => {
        this.editMode  = true;
        this.editedItemIndex = index
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
