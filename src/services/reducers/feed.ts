import {TFeedOrders} from "../../utils/type";
import {DELETE_ORDERS, GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SET_ORDERS} from '../constants/feed'
import {TFeedActions} from "../actions/feed";

/** редьюсер для загрузки данных */
const initialState: TFeedOrders = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    isError: false,
    orderSelected: null
}

export const feed = (state = initialState, action: TFeedActions) => {
    switch (action.type) {
        case SET_ORDERS: {
            return {
                ...state,
                total: action.data.total,
                totalToday: action.data.totalToday,
                orders: action.data.orders
            }
        }
        case DELETE_ORDERS: {
            return initialState;
        }
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_ORDER_ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                orderSelected: action.data[0]
            }
        }
        default: return state;
    }
}