import { Action } from '@ngrx/store';
import { Ingredients } from 'src/app/shared/ingredients.component';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'

export class AddIngredients implements Action{
    readonly type: string = ADD_INGREDIENTS;
    // payload: Ingredients;  
    constructor(public payload: Ingredients){}
}