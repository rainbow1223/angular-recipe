import { Ingredients } from "../shared/ingredients.component";

const initialState = {
    ingredients: [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes', 10)
    ]
}
export function ShoppingListReducer(state = initialState, action) {

}