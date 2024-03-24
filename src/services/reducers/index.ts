import { combineReducers } from 'redux';
import {order} from "./constructor/order-constructor";
import {user, resetPassword} from './auth/auth'
import {feed} from "./feed/feed";
import {wsReducer} from "./ws/wsState";
import {modal} from "./modal/modal";
import {burgerIngredient} from "./burger/burger";

export const rootReducer = combineReducers({
    burgerIngredient,
    modal,
    order,
    user,
    resetPassword,
    feed,
    wsReducer
})
