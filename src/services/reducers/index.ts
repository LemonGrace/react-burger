import { combineReducers } from 'redux';
import {burgerIngredient, modal} from './burger'
import {order} from "./order-constructor";
import {user, resetPassword} from './auth'

export const rootReducer = combineReducers({
    burgerIngredient,
    modal,
    order,
    user,
    resetPassword
})
