import {createOrder} from "../../utils/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REPLACE_BUN = 'REPLACE_BUN';
export const REORDER = 'REORDER';
export const DEFAULT = 'DEFAULT';

export function getOrder(data) {
    return function(dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });
        createOrder(data).then(res => {
            if (res && res.success) {
                dispatch({
                    type: CREATE_ORDER_SUCCESS, order: res.order.number
                });
            } else {
                dispatch({
                    type: CREATE_ORDER_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: CREATE_ORDER_ERROR
            });
        });
    };
}
