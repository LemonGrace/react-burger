import { combineReducers } from 'redux';
import {burgerIngredient, ingredientDetails, modal, order} from './burger'
import {user, login, registration, resetPassword} from "./auth";

export const rootReducer = combineReducers({
    burgerIngredient,
    ingredientDetails,
    modal,
    order,
    user,
    login,
    registration,
    resetPassword
})
