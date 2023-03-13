import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';

import { Ingredients } from 'src/app/shared/ingredients.component';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  // @Output() ingredientsAdded = new EventEmitter<Ingredients>();

  constructor(private shoppinglistService: ShoppingListService){}
  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;

    const newIngredient = new Ingredients(ingName, ingAmount)
    // this.ingredientsAdded.emit(newIngredient)
    this.shoppinglistService.AddIngredients(newIngredient)
  }
}
