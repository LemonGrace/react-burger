import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from "../actions/ingredients";
import {DELETE_INGREDIENT, SET_INGREDIENT } from "../actions/details";
import {DELETE_TYPE, DELETE_VISIBLE, SET_TYPE, SET_VISIBLE} from "../actions/modal";
import {
    ADD_INGREDIENT,
    CREATE_ORDER_ERROR,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, DEFAULT, REORDER,
    REPLACE_BUN
} from "../actions/constructor";


/** редьюсер для загрузки данных */
const initialState = {
    ingredients: [],
    itemsRequest: false,
    itemsFailed: false,
}
export const burgerIngredient = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case INGREDIENTS_SUCCESS: {
            return { ...state, itemsFailed: false, ingredients: action.items, itemsRequest: false };
        }
        case INGREDIENTS_ERROR: {
            return { ...state, itemsFailed: true, itemsRequest: false };
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
const initialStateModal = {
    isVisible: false,
    type: ""
}
export const modal = (state = initialStateModal, action) => {
    switch (action.type) {
        case SET_VISIBLE: {
            return { ...state, isVisible: true };
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
    order: 0,
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
        case ADD_INGREDIENT: {
            let arr = [...state.content];
            arr.push({ingredient: action.item, order: arr.length + 1});
            return { ...state, content: arr};
        }
        case REORDER: {
            let arr = [...state.content];
            let indexFrom = arr.findIndex(item => item.order === action.from);
            let indexTo = arr.findIndex(item => item.order === action.to);
            arr[indexFrom] = {...arr[indexFrom], order: action.to};
            arr[indexTo] = {...arr[indexTo], order: action.from};
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
