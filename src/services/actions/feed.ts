import {IOrderFeed} from "../../utils/type";
import {
    GET_ORDER_ERROR,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
} from "../constants/feed";
import {AppDispatch, AppThunk} from "../../index";
import {getOrderInfo} from "../../utils/api";


export interface ISetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}
export interface ISetOrderAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly data: Array<IOrderFeed>
}
export interface ISetOrderErrorAction {
    readonly type: typeof GET_ORDER_ERROR;
}

export type TFeedActions =
    | ISetOrderRequestAction
    | ISetOrderAction
    | ISetOrderErrorAction;

export const getOrderInfoDetails: AppThunk = (number: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_ORDER_REQUEST
    });
    getOrderInfo(number).then(res => {
        if (res instanceof Error) {
            dispatch({
                type: GET_ORDER_ERROR
            });
            return;
        }
        if (res && res.success) {
            dispatch({
                type: GET_ORDER_SUCCESS,
                data: res.orders
            });
        } else {
            dispatch({
                type: GET_ORDER_ERROR
            });
        }
    }).catch(e => {
        dispatch({
            type: GET_ORDER_ERROR
        });
    });
}