import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from "../actions/ingredients";
import {DELETE_INGREDIENT, SET_INGREDIENT } from "../actions/details";
import {
    ADD_INGREDIENT,
    CREATE_ORDER_ERROR,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, DEFAULT, DELETE_ORDER, REORDER,
    REPLACE_BUN
} from "../actions/constructor";
import {DATA} from "../../utils/data";


/** редьюсер для загрузки данных */
const initialState = {
    ingredients: DATA,
    isIngredientsLoading: false,
    isIngredientsFailed: false,
}
export const burgerIngredient = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
            return {
                ...state,
                isIngredientsLoading: true
            };
        }
        case INGREDIENTS_SUCCESS: {
            return { ...state, isIngredientsFailed: false, ingredients: action.items, isIngredientsLoading: false };
        }
        case INGREDIENTS_ERROR: {
            return { ...state, isIngredientsFailed: true, isIngredientsLoading: false };
        }
        default: return state;
    }
}


/** редьюсер для работы с выбранным ингредиентом */
const initialStateSelectedItem = {
    ingredient: {}
}
export const ingredientDetails = (state = initialStateSelectedItem, action) => {
    switch (action.type) {
        case SET_INGREDIENT: {
            return {
                ...state,
                ingredient: action.item
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                ingredient: {}
            };
        }
        default: return state;
    }
}

/** редьюсер для работы с модальным окном */

export const SET_VISIBLE = 'SET_VISIBLE';
export const SET_INTERNAL = 'SET_INTERNAL';
export const DELETE_VISIBLE = 'DELETE_VISIBLE';
export const SET_TYPE = 'SET_TYPE';
export const DELETE_TYPE = 'DELETE_TYPE';

const initialStateModal = {
    isVisible: false,
    isInternalLink: false,
    type: ""
}
export const modal = (state = initialStateModal, action) => {
    switch (action.type) {
        case SET_VISIBLE: {
            return { ...state, isVisible: true };
        }
        case SET_INTERNAL: {
            return { ...state, isInternalLink: true };
        }
        case DELETE_VISIBLE: {
            return { ...state, isVisible: false };
        }
        case DELETE_TYPE: {
            return { ...state, type: "" };
        }
        case SET_TYPE: {
            return { ...state, type: action.modalType };
        }
        default: return state;
    }
}

/** редьюсер для работы с заказом */
const initialStateOrder = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    content: []
}

export const order = (state = initialStateOrder, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case CREATE_ORDER_SUCCESS: {
            return { ...state, orderFailed: false, order: action.order, orderRequest: false };
        }
        case CREATE_ORDER_ERROR: {
            return { ...state, orderFailed: true, orderRequest: false };
        }
        case DELETE_ORDER: {
            return {...state, order: null};
        }
        case ADD_INGREDIENT: {
            let arr = [...state.content];
            arr.push({ingredient: action.item, order: arr.length + 1});
            return { ...state, content: arr};
        }
        case REORDER: {
            let arr = [...state.content];
            const indexFrom = arr.findIndex(item => item.order === action.from);
            if (action.from >  action.to) {
                arr.map((item) => {
                    return item.order >= action.to ?
                        item.order !== action.from ? ++item.order : item.order : item.order;
                })
                arr[indexFrom] = {...arr[indexFrom], order: action.to};
            } else {
                arr.map((item) => {
                    return item.order <= action.to ?
                        item.order !== action.from ? --item.order : item.order : item.order;
                })
                arr[indexFrom] = {...arr[indexFrom], order: action.to};
            }
            return { ...state, content: arr};
        }
        case REPLACE_BUN: {
            let arr = [...state.content].filter(item => item.order !== 1 && item.order !== 2);
            arr.push({ingredient: action.item, order: 1});
            arr.push({ingredient: action.item, order: 2});
            return { ...state, content: arr};
        }
        case DELETE_INGREDIENT: {
            let arr = [...state.content];
            arr = arr.filter(item => item.order !== action.order);
            arr.map((item) => {
                return item.order > action.order ? --item.order : item.order;
            })
            return { ...state, content: arr};
        }
        case DEFAULT:
        default: return state;
    }
}
