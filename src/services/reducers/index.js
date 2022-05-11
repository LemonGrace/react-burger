import { combineReducers } from 'redux';
import {burgerIngredient, ingredientDetails, modal, order} from './burger'

export const rootReducer = combineReducers({
    burgerIngredient,
    ingredientDetails,
    modal,
    order
})
