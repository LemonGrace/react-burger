import { combineReducers } from 'redux';
import {burgerIngredient, modal} from './burger'
import {order} from "./order-constructor";
import {user, resetPassword} from './auth'
import {feed} from "./feed";
import {wsReducer} from "./wsState";

export const rootReducer = combineReducers({
    burgerIngredient,
    modal,
    order,
    user,
    resetPassword,
    feed,
    wsReducer
})
