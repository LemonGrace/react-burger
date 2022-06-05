import {DELETE_ORDER, getOrder} from "./constructor";
import {DELETE_TYPE, DELETE_VISIBLE, SET_TYPE, SET_VISIBLE} from "../reducers/burger";

export function openModal(content) {
    return function (dispatch) {
        dispatch({type: SET_VISIBLE});
        dispatch(getOrder(content));
    }
}

export function closeModal() {
    return function (dispatch) {
        dispatch({type: DELETE_VISIBLE});
        dispatch({type: DELETE_ORDER});
    }
}
