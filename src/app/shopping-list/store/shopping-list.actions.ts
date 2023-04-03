import { Action } from '@ngrx/store';

import { Ingredients } from '../../shared/ingredients.component';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredients) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredients[]) {
    console.log(payload)
  }
}

export type ShoppingListActions = AddIngredient | AddIngredients;
