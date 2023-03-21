import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('f', {static: false}) slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;

  constructor(private shoppinglistService: ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.editItemStarted.subscribe(
      (index: number) => {
        this.editMode  = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppinglistService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }
  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount)
    if(this.editMode) {
      this.shoppinglistService.updateIngredients(this.editedItemIndex, newIngredient);
    } else {
      this.shoppinglistService.AddIngredients(newIngredient)
    }
    this.editMode = false
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
