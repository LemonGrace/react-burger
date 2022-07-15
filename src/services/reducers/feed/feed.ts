import {TFeedOrders} from "../../../utils/type";
import {GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from '../../constants/feed'
import {TFeedActions} from "../../actions/feed";

/** редьюсер для загрузки данных */
const initialState: TFeedOrders = {
    isLoading: false,
    isError: false,
    orderSelected: null
}

export const feed = (state = initialState, action: TFeedActions) => {
    switch (action.type) {
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