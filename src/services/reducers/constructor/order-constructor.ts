import {
    ADD_INGREDIENT, CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DEFAULT,
    DELETE_INGREDIENT,
    DELETE_ORDER, REORDER, REPLACE_BUN
} from "../../constants/order-constructor";
import {TConstructorActions} from "../../actions/constructor";
import {IOrderItem} from "../../../utils/type";

/** Работа с заказом */
type TOrderConstructor = {
    order: number | null,
    orderRequest: boolean,
    orderFailed: boolean,
    content: Array<IOrderItem>
};
const initialStateOrder: TOrderConstructor = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    content: []
}

export const order = (state = initialStateOrder, action: TConstructorActions) => {
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
            return {...state, order: null, content: []};
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