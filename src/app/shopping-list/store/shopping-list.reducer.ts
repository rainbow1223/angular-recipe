import { Ingredients } from "../../shared/ingredients.component";
import * as ShoppingListActions from "./shopping-list.actions"

const initialState = {
    ingredients: [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes', 10)
    ]
}
export function ShoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredients) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENTS:
            return { 
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        default: 
            return state
    }
}